-- ============================================================
-- Lost & Found UNIDA Gontor - skema database Supabase
-- Jalankan SELURUH file ini di Supabase > SQL Editor > New query > Run.
-- Aman dijalankan ulang (idempotent).
-- ============================================================

-- 1. TABEL ---------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nama text,
  email text,
  role text not null default 'user' check (role in ('admin','user')),
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id serial primary key,
  nama text not null unique
);

create table if not exists public.items (
  id bigint generated always as identity primary key,
  nama text not null,
  jenis text not null check (jenis in ('Hilang','Ditemukan')),
  tanggal date not null default current_date,
  lokasi text not null,
  kategori text,
  deskripsi text,
  telegram text,
  foto_url text,
  status text not null default 'Menunggu'
    check (status in ('Menunggu','Disetujui','Ditolak','Diselesaikan')),
  pelapor uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.claims (
  id bigint generated always as identity primary key,
  item_id bigint not null references public.items(id) on delete cascade,
  pemohon uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  alasan text not null,
  status text not null default 'Menunggu' check (status in ('Menunggu','Diterima','Ditolak')),
  created_at timestamptz not null default now(),
  unique (item_id, pemohon)
);

insert into public.categories (nama) values
  ('Dompet'),('Kunci'),('Telepon Genggam'),('Alat Tulis'),('Tas'),
  ('Pakaian'),('Dokumen'),('Elektronik'),('Lainnya')
on conflict (nama) do nothing;

-- 2. PROFIL OTOMATIS SAAT USER DAFTAR (email atau Google) ----
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, nama, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email,'@',1)),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- profil untuk akun yang sudah terlanjur dibuat sebelum trigger ada
insert into public.profiles (id, nama, email)
select u.id, coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', split_part(u.email,'@',1)), u.email
from auth.users u on conflict (id) do nothing;

-- 3. RBAC: fungsi cek admin ----------------------------------
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- 4. KLAIM DITERIMA -> BARANG OTOMATIS "Diselesaikan" ----------
create or replace function public.claim_accepted()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.status = 'Diterima' and old.status is distinct from 'Diterima' then
    update public.items set status = 'Diselesaikan' where id = new.item_id;
  end if;
  return new;
end $$;

drop trigger if exists on_claim_accepted on public.claims;
create trigger on_claim_accepted
  after update on public.claims
  for each row execute function public.claim_accepted();

-- 5. ROW LEVEL SECURITY --------------------------------------
alter table public.profiles   enable row level security;
alter table public.categories enable row level security;
alter table public.items      enable row level security;
alter table public.claims     enable row level security;

-- profiles
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_admin());
drop policy if exists profiles_admin_update on public.profiles;
create policy profiles_admin_update on public.profiles for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- categories
drop policy if exists categories_select on public.categories;
create policy categories_select on public.categories for select to anon, authenticated using (true);
drop policy if exists categories_admin_write on public.categories;
create policy categories_admin_write on public.categories for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- items
drop policy if exists items_select_public on public.items;
create policy items_select_public on public.items for select to anon
  using (status in ('Disetujui','Diselesaikan'));
drop policy if exists items_select_auth on public.items;
create policy items_select_auth on public.items for select to authenticated
  using (status in ('Disetujui','Diselesaikan') or pelapor = auth.uid() or public.is_admin());
drop policy if exists items_insert on public.items;
create policy items_insert on public.items for insert to authenticated
  with check (pelapor = auth.uid() and status = 'Menunggu');
drop policy if exists items_admin_update on public.items;
create policy items_admin_update on public.items for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists items_admin_delete on public.items;
create policy items_admin_delete on public.items for delete to authenticated
  using (public.is_admin());

-- ID Telegram HANYA untuk user login: anon cuma boleh baca kolom publik
revoke all on public.items from anon;
grant select (id,nama,jenis,tanggal,lokasi,kategori,deskripsi,foto_url,status,created_at)
  on public.items to anon;

-- claims
drop policy if exists claims_select on public.claims;
create policy claims_select on public.claims for select to authenticated
  using (pemohon = auth.uid() or public.is_admin());
drop policy if exists claims_insert on public.claims;
create policy claims_insert on public.claims for insert to authenticated
  with check (
    pemohon = auth.uid() and status = 'Menunggu'
    and exists (select 1 from public.items i
                where i.id = item_id and i.status = 'Disetujui' and i.pelapor <> auth.uid())
  );
drop policy if exists claims_admin_update on public.claims;
create policy claims_admin_update on public.claims for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

revoke all on public.profiles, public.categories, public.claims from anon;
grant select on public.categories to anon;

-- 6. STORAGE FOTO BARANG -------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('foto-barang','foto-barang', true, 5242880, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set public = true, file_size_limit = 5242880;

drop policy if exists foto_select on storage.objects;
create policy foto_select on storage.objects for select to anon, authenticated
  using (bucket_id = 'foto-barang');
drop policy if exists foto_insert on storage.objects;
create policy foto_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'foto-barang' and (storage.foldername(name))[1] = auth.uid()::text);

-- 7. JADIKAN DIRIMU ADMIN ------------------------------------
-- Daftar/login dulu di web, lalu jalankan baris ini (ganti emailnya):
--
-- update public.profiles set role = 'admin' where email = 'emailkamu@gmail.com';
