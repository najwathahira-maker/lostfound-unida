# Lost & Found UNIDA Gontor

Web pelaporan barang hilang/temuan (HTML + JS + Supabase), sesuai proposal.

## Halaman
Beranda · Cara Kerja · Login/Register (Google OAuth2 + email) · Dashboard Pengguna · Daftar Barang · Detail Barang (Telegram hanya untuk user login) · Form Klaim · Lapor Barang · Admin: Dashboard, Kelola Laporan (setujui/tolak), Kelola Klaim, Kelola Pengguna, Kelola Kategori.

## Setup (urut)
1. **Database**: Supabase > SQL Editor > paste isi `supabase/schema.sql` > Run.
2. **Kunci**: Supabase > Project Settings > API, salin URL dan publishable/anon key ke `js/config.js`.
3. **Auth email**: Authentication > Providers > Email aktif. Saat uji coba boleh matikan "Confirm email".
4. **Google login**: Google Cloud Console > OAuth client (Web). Authorized redirect URI = `https://<project-ref>.supabase.co/auth/v1/callback`. Isi Client ID/Secret di Supabase > Authentication > Providers > Google.
5. **Redirect URL**: Supabase > Authentication > URL Configuration. Isi Site URL dan Redirect URLs dengan alamat webmu (mis. `http://localhost:8000/` dan `https://username.github.io/lostfound-unida/`).
6. **Admin pertama**: daftar di web, lalu jalankan di SQL Editor:
   `update public.profiles set role='admin' where email='emailkamu@gmail.com';`

## Menjalankan
Jangan buka lewat preview Claude (koneksi ke Supabase diblokir di sana). Jalankan lokal:
```
cd lostfound-unida
python3 -m http.server 8000     # buka http://localhost:8000
```

## Deploy + CI/CD
Push ke GitHub (branch `main`), lalu Settings > Pages > Source: **GitHub Actions**. Workflow `.github/workflows/deploy.yml` mengecek kode lalu deploy otomatis.

## Keamanan
Akses dijaga RLS (bukan kunci): user biasa hanya melihat barang yang sudah disetujui + laporan sendiri; kolom `telegram` tidak bisa dibaca tanpa login; hanya admin yang bisa menyetujui laporan/klaim dan mengelola kategori; klaim diterima otomatis menandai barang "Diselesaikan".
