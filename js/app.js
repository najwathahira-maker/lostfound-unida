const IMG={hero:"assets/hero.jpg"};
const P={
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',
 shield:'<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
 users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.8 0 4.5 1.8 4.5 4.5"/>',
 box:'<path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z"/><path d="m4 7 8 4 8-4M12 11v10"/>',
 bell:'<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Z"/><path d="M10 21h4"/>',
 back:'<path d="M19 12H5m6-6-6 6 6 6"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',check:'<path d="m5 12 5 5 9-10"/>',
 pin:'<path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
 cal:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
 tag:'<path d="M3 12V4h8l10 10-8 8L3 12Z"/><circle cx="7.5" cy="8.5" r="1.2"/>',
 send:'<path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z"/>',home:'<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4v-9Z"/>',
 doc:'<path d="M6 3h9l4 4v14H6V3Z"/><path d="M9 12h7M9 16h7"/>',logout:'<path d="M10 4H5v16h5M15 8l5 4-5 4M20 12H9"/>',
 grid:'<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
 list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
 alert:'<path d="M12 4 2.5 20h19L12 4Z"/><path d="M12 10v4M12 17h.01"/>',moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',tags:'<path d="M3 12V4h8l10 10-8 8L3 12Z"/><circle cx="7.5" cy="8.5" r="1.2"/>'
};
const ic=n=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
const LOGO=`<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="18" cy="18" r="14" fill="none" stroke="var(--brand)" stroke-width="3"/><path d="m28.5 28.5 8 8" stroke="var(--brand)" stroke-width="4" stroke-linecap="round"/><path d="M18 9.5 25 13.5v8l-7 4-7-4v-8l7-4Z" fill="var(--accent)" stroke="var(--brand)" stroke-width="1.6" stroke-linejoin="round"/><path d="m11 13.5 7 4 7-4M18 17.5v8" stroke="var(--brand)" stroke-width="1.6" fill="none"/></svg>`;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const BL=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const fd=iso=>{const[y,m,d]=iso.split('-').map(Number);return `${d} ${BL[m-1]} ${y}`};
const fdl=iso=>{const[y,m,d]=iso.split('-').map(Number);return `${d} ${['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'][m-1]} ${y}`};
const TODAY='2026-11-05';

/* ---------- top bar ---------- */
function renderBar(route){
  const cur=h=>route===h||(h==='barang'&&/^barang/.test(route))?' aria-current="page"':'';
  const u=S.user;
  document.getElementById('bar').innerHTML=`
   <a class="brand" href="#beranda">${LOGO}<span>Lost&amp;Found<small>UNIDA GONTOR</small></span></a>
   <nav class="nav" aria-label="Utama">
     <a href="#beranda"${cur('beranda')}>${ic('home')}<span class="lbl">Beranda</span></a>
     <a href="#barang"${cur('barang')}>${ic('search')}<span class="lbl">Informasi Barang</span></a>
     <a href="#cara-kerja"${cur('cara-kerja')}>${ic('list')}<span class="lbl">Cara Kerja</span></a>
     
     ${isAdmin()?`<a href="#admin"${/^admin/.test(route)?' aria-current="page"':''}>${ic('grid')}<span class="lbl">Panel Admin</span></a>`:''}
     <button class="theme" id="themeBtn" aria-label="Ganti tema terang atau gelap" title="Ganti tema">${ic('moon')}</button>
     ${u?`<span class="avatar" title="${esc(u.name)}">${initials(u.name)}</span><button data-act="logout">${ic('logout')}<span class="lbl">Keluar</span></button>`
        :`<a href="#login"${cur('login')}>${ic('user')}<span class="lbl">Login</span></a><a class="btn sm" href="#login" data-tab="register">${ic('plus')}<span class="lbl">Register</span></a>`}
   </nav>`;
}

/* ---------- screens ---------- */
function vBeranda(){
  return `<section class="hero">
    <div>
      <h1>Lost &amp; Found <span>UNIDA Gontor</span></h1>
      <p class="lead">Temukan atau laporkan barang dengan mudah dan aman.</p>
      <div class="cta"><a class="btn" href="#barang">${ic('search')}Lihat Barang${ic('arrow')}</a><a class="btn ghost" href="#lapor">${ic('plus')}Laporkan Barang${ic('arrow')}</a></div>
    </div>
    <img src="${IMG.hero}" alt="Maskot mahasiswi UNIDA memegang kaca pembesar di depan gedung kampus">
  </section>
  <section class="features">
    <div class="feat"><span class="ico">${ic('search')}</span><h3>Cepat &amp; Mudah</h3><p>Laporkan dan cari barang dengan praktis, lengkap dengan foto dan kategori.</p></div>
    <div class="feat"><span class="ico">${ic('shield')}</span><h3>Terpercaya</h3><p>Dikelola oleh UNIDA Gontor. Klaim diverifikasi admin sebelum barang diserahkan.</p></div>
    <div class="feat"><span class="ico">${ic('users')}</span><h3>Untuk Semua</h3><p>Mahasiswa, dosen, dan tenaga kependidikan dapat memakainya dengan akun Google.</p></div>
  </section>`;
}
function vCara(){
  const st=[['user','Login','Masuk dengan akun Google atau email. Login diperlukan untuk melapor, mengklaim, dan melihat ID Telegram.'],
    ['plus','Laporkan','Isi nama, lokasi, kategori, foto, dan ID Telegram. Laporan ditinjau admin sebelum tampil.'],
    ['search','Cari & Hubungi','Telusuri daftar barang, buka detailnya, lalu hubungi pelapor lewat Telegram.'],
    ['shield','Ajukan Klaim','Jelaskan ciri atau bukti kepemilikan. Admin memverifikasi sebelum barang diserahkan.']];
  return `<section class="page"><div class="pagehead"><div><h1>Cara Kerja</h1><p>Empat langkah dari laporan sampai barang kembali ke pemiliknya.</p></div></div>
   <div class="features" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">${st.map((x,i)=>`<div class="feat"><span class="ico">${ic(x[0])}</span><h3>${i+1}. ${x[1]}</h3><p>${x[2]}</p></div>`).join('')}</div></section>`;
}
function vLogin(){
  const reg=S.tab==='register';
  return `<section class="login">
    <div class="welcome"><h1>Selamat datang!</h1><p>${reg?'Buat akun untuk melaporkan dan mengklaim barang.':'Masuk untuk melanjutkan ke akun kamu.'}</p></div>
    <div class="card">
      <div class="tabs" role="tablist"><button role="tab" data-tab="login" aria-selected="${!reg}">Login</button><button role="tab" data-tab="register" aria-selected="${reg}">Register</button></div>
      ${S.after?`<div class="note">Login dulu untuk melanjutkan.</div>`:''}
      <button class="gbtn" data-act="google"><svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z"/><path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-2.9-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.100 0 24s.9 7.600 2.600 10.800l7.900-6.100z"/><path fill="#34A853" d="M24 48c6.500 0 11.900-2.100 15.900-5.800l-7.400-5.700c-2.100 1.400-4.800 2.300-8.500 2.300-6.300 0-11.600-4.100-13.500-9.800l-7.900 6.100C6.500 42.600 14.600 48 24 48z"/></svg>Login dengan Google</button>
      <div class="or">atau</div>
      <form class="form" id="loginForm" novalidate>
        ${reg?`<div class="field"><label for="lf-name">Nama lengkap</label><input id="lf-name" autocomplete="name" placeholder="Nama kamu"></div>`:''}
        <div class="field"><label for="lf-user">Email</label><input id="lf-user" type="email" autocomplete="email" placeholder="nama@email.com"></div>
        <div class="field"><label for="lf-pass">Password</label><input id="lf-pass" type="password" autocomplete="${reg?'new-password':'current-password'}" placeholder="Password"></div>
        ${reg?'':'<button type="button" class="linkbtn" data-act="forgot" style="justify-self:end;font-size:13px">Lupa password?</button>'}
        <button class="btn block" type="submit">${reg?'Daftar':'Masuk'}${ic('arrow')}</button>
      </form>
      <p style="margin-top:14px;text-align:center;font-size:14px;color:var(--muted)">${reg?'Sudah punya akun?':'Belum punya akun?'} <button class="linkbtn" data-tab="${reg?'login':'register'}">${reg?'Masuk sekarang':'Daftar sekarang'}</button></p>
    </div>
  </section>`;
}
function vHome(){
  const u=S.user, mine=S.items.filter(i=>i.pelapor===u.id), myClaims=S.claims.filter(c=>c.pemohon===u.id);
  const found=S.items.filter(i=>i.jenis==='Ditemukan'&&(i.status==='Disetujui'||i.status==='Diselesaikan')).length;
  const claimable=pubItems().filter(i=>i.status==='Disetujui'&&i.pelapor!==u.id&&!myClaims.some(c=>c.itemId===i.id)).sort((a,b)=>b.tgl.localeCompare(a.tgl)).slice(0,3);
  const cl=myClaims.map(c=>{const it=item(c.itemId);return `<li><span class="dot" style="background:var(--soft);color:var(--brand)">${ic('doc')}</span><div><a href="#barang-${c.itemId}"><b>${esc(it?it.nama:'Barang')}</b></a><small>${esc(c.alasan)}</small></div><span class="pill ${statusPill(c.status)}" style="margin-left:auto">${c.status}</span></li>`}).join('');
  const ev=[...mine.map(i=>({t:`Laporan kamu "${i.nama}" ${i.status==='Menunggu'?'sedang ditinjau admin':i.status==='Ditolak'?'ditolak admin':'sudah tampil di daftar'}`,d:i.created,k:'box'})),
            ...myClaims.map(c=>({t:`Klaim kamu untuk "${item(c.itemId)?item(c.itemId).nama:'barang'}" ${c.status==='Menunggu'?'menunggu verifikasi admin':c.status.toLowerCase()}`,d:c.created,k:'shield'}))].sort((a,b)=>(b.d||'').localeCompare(a.d||'')).slice(0,5);
  const acts=ev.map((a,i)=>`<li><span class="dot" style="background:${i%2?'var(--info-soft)':'var(--warn-soft)'};color:${i%2?'var(--info)':'var(--warn)'}">${ic(a.k)}</span><div>${esc(a.t)}<small>${a.d?fd(a.d.slice(0,10)):''}</small></div></li>`).join('');
  const cards=claimable.map(i=>`<article class="item"><div class="ph">${thumb(i)}<span class="pill ${i.jenis==='Hilang'?'p-hilang':'p-temu'}">${i.jenis}</span></div><h3>${esc(i.nama)}</h3><div class="meta"><span>${ic('pin')} ${esc(i.lokasi)}</span><a href="#barang-${i.id}">Detail ${ic('arrow')}</a></div><div style="padding:0 6px"><a class="btn sm block" href="#klaim-${i.id}">${ic('send')}Ajukan Klaim</a></div></article>`).join('');
  return `<section class="page">
    <div class="greet"><h1>Assalamu'alaikum, ${esc(u.name)}!</h1><p>Cari barangmu, laporkan temuan, atau pantau klaim yang sedang diproses.</p></div>
    <div class="quick">
      <a class="qa" href="#barang"><span class="ico">${ic('search')}</span><b>Cari Barang</b><small>Lihat barang hilang dan temuan</small></a>
      <a class="qa" href="#lapor"><span class="ico">${ic('plus')}</span><b>Lapor Barang</b><small>Hilang atau menemukan sesuatu</small></a>
      <a class="qa" href="#klaim-saya"><span class="ico">${ic('shield')}</span><b>Klaim Barang</b><small>${myClaims.filter(c=>c.status==='Menunggu').length} klaim menunggu verifikasi</small></a>
    </div>
    <div class="stats" style="margin-top:14px">
      <a class="stat" href="#barang"><span class="ico">${ic('user')}</span><div><span>Laporan Saya</span><b>${mine.length}</b></div></a>
      <a class="stat" href="#klaim-saya"><span class="ico">${ic('doc')}</span><div><span>Pengajuan Klaim</span><b>${myClaims.length}</b></div></a>
      <a class="stat" href="#barang"><span class="ico">${ic('box')}</span><div><span>Barang Ditemukan</span><b>${found}</b></div></a>
    </div>
    <div class="section-title"><h2>Barang yang bisa kamu klaim</h2><a class="btn ghost sm" href="#barang">Lihat semua ${ic('arrow')}</a></div>
    <div class="grid">${cards||'<div class="card empty" style="grid-column:1/-1">Belum ada barang baru untuk diklaim.</div>'}</div>
    <div class="twocol2" id="klaim-saya">
      <div class="card"><div class="section-title" style="margin-top:0"><h2>Klaim Saya</h2></div><ul class="acts">${cl||'<li class="empty">Kamu belum mengajukan klaim.</li>'}</ul></div>
      <div class="card"><div class="section-title" style="margin-top:0"><h2>Aktivitas Terbaru</h2></div><ul class="acts">${acts||'<li class="empty">Belum ada aktivitas.</li>'}</ul></div>
    </div>
  </section>`;
}
function vBarang(){
  let L=pubItems().filter(i=>(S.filter==='Semua'||i.jenis===(S.filter==='Hilang'?'Hilang':'Ditemukan'))&&(i.nama+' '+i.lokasi+' '+i.kat).toLowerCase().includes(S.q.toLowerCase()));
  L.sort((a,b)=>S.sort==='Terbaru'?b.tgl.localeCompare(a.tgl):a.tgl.localeCompare(b.tgl));
  const cards=L.map(i=>`<article class="item"><div class="ph">${thumb(i)}<span class="pill ${i.jenis==='Hilang'?'p-hilang':'p-temu'}">${i.jenis}</span></div><h3>${esc(i.nama)}</h3><div class="meta"><span>${ic('cal')} ${fd(i.tgl)}</span><a href="#barang-${i.id}">Detail ${ic('arrow')}</a></div></article>`).join('');
  return `<section class="page">
    <div class="pagehead"><div><h1>Daftar Barang</h1><p>Barang hilang dan barang temuan di lingkungan kampus.</p></div><a class="btn" href="#lapor">${ic('plus')}Laporkan Barang</a></div>
    <div class="tools">
      <label class="search" for="q">${ic('search')}<input id="q" type="search" placeholder="Cari barang..." value="${esc(S.q)}" autocomplete="off"></label>
      <div class="chips" role="group" aria-label="Filter status">${['Semua','Hilang','Ditemukan'].map(f=>`<button class="chip" data-filter="${f}" aria-pressed="${S.filter===f}">${f}</button>`).join('')}</div>
      <select class="sel" id="sort" aria-label="Urutkan"><option ${S.sort==='Terbaru'?'selected':''}>Terbaru</option><option ${S.sort==='Terlama'?'selected':''}>Terlama</option></select>
    </div>
    <div class="grid" id="grid">${cards||`<div class="empty card" style="grid-column:1/-1">Tidak ada barang yang cocok dengan pencarian.</div>`}</div>
  </section>`;
}
function vDetail(id){
  const i=item(id); if(!i||(i.status==='Menunggu'&&!isAdmin()&&!(S.user&&i.pelapor===S.user.id))) return `<section class="page"><div class="card empty">Barang tidak ditemukan. <a href="#barang">Kembali ke daftar</a></div></section>`;
  const mine=S.user&&i.pelapor===S.user.id;
  const done=i.status==='Diselesaikan';
  return `<section class="page"><button class="back" data-go="barang">${ic('back')}Kembali</button>
   <div class="card detail" style="margin-top:8px">
    <div class="ph">${thumb(i)}</div>
    <div>
      <h1>${esc(i.nama)}</h1>
      <span class="pill ${i.jenis==='Hilang'?'p-hilang':'p-temu'}">${ic(i.jenis==='Hilang'?'alert':'check')}${i.jenis==='Hilang'?'Barang Hilang':'Barang Ditemukan'}</span> ${done?'<span class="pill p-done">Sudah diserahkan</span>':''}
      <ul class="facts"><li><span class="ico">${ic('cal')}</span>${fdl(i.tgl)}</li><li><span class="ico">${ic('pin')}</span>${esc(i.lokasi)}</li><li><span class="ico">${ic('tag')}</span>${esc(i.kat)}</li></ul>
      <div class="block-t"><h3>Deskripsi</h3><p>${esc(i.desk)}</p></div>
      <div class="block-t"><h3>Kontak</h3>${S.user?`<span class="tg">${ic('send')}${esc(i.tg)} (Telegram)</span>`:`<div class="lock">ID Telegram hanya terlihat setelah login. <a href="#login" data-need="barang-${i.id}"><b>Login</b></a></div>`}</div>
      <div style="margin-top:18px">${done?`<button class="btn block quiet" disabled>Klaim ditutup</button>`:mine?`<button class="btn block quiet" disabled>Ini laporan kamu</button>`:`<a class="btn block" href="#klaim-${i.id}">${ic('send')}Ajukan Klaim</a>`}</div>
    </div></div></section>`;
}
function vKlaim(id){
  const i=item(id); if(!i) return vDetail(id);
  return `<section class="page"><button class="back" data-go="barang-${i.id}">${ic('back')}Kembali</button>
   <div class="split" style="margin-top:8px">
    <div class="claim-side"><span style="color:var(--brand);font-size:54px">${ic('shield')}</span><h1>Ajukan Klaim</h1><p>Pastikan barang yang kamu klaim sesuai dengan deskripsi.</p></div>
    <form class="card form" id="claimForm" data-id="${i.id}" novalidate>
      <div class="mini"><div class="th">${thumb(i)}</div><div><b>${esc(i.nama)}</b><span style="color:var(--muted)">Barang ${i.jenis}</span></div></div>
      <div class="field"><label for="reason">Alasan klaim</label><textarea id="reason" placeholder="Jelaskan alasan klaim kamu..."></textarea><small>Sebutkan ciri khusus atau bukti kepemilikan agar admin dapat memverifikasi.</small></div>
      <button class="btn block" type="submit">Kirim Pengajuan Klaim</button>
    </form></div></section>`;
}
function vLapor(){
  const j=S.draft.jenis;
  return `<section class="page narrow">
    <div class="pagehead"><div><h1>Laporkan Barang</h1><p>Laporan akan ditinjau admin sebelum tampil di daftar.</p></div></div>
    <form class="card form" id="reportForm" novalidate>
      <div class="field"><span style="font-weight:700;font-size:14px">Jenis laporan</span><div class="seg"><button type="button" data-jenis="Hilang" aria-pressed="${j==='Hilang'}">Barang hilang</button><button type="button" data-jenis="Ditemukan" aria-pressed="${j==='Ditemukan'}">Barang temuan</button></div></div>
      <div class="field"><label for="r-nama">Nama barang</label><input id="r-nama" placeholder="Contoh: Dompet cokelat"></div>
      <div class="row2"><div class="field"><label for="r-kat">Kategori</label><select id="r-kat">${S.cats.map(c=>`<option>${esc(c)}</option>`).join('')}</select></div>
      <div class="field"><label for="r-tgl">Tanggal</label><input id="r-tgl" type="date" value="${TODAY}"></div></div>
      <div class="field"><label for="r-lok">${j==='Hilang'?'Perkiraan lokasi hilang':'Lokasi penemuan'}</label><input id="r-lok" placeholder="Contoh: Perpustakaan"></div>
      <div class="field"><label for="r-desk">Deskripsi</label><textarea id="r-desk" placeholder="Warna, merk, ciri khusus..."></textarea></div>
      <div class="field"><label for="r-tg">ID / Username Telegram</label><input id="r-tg" placeholder="@username" value=""><small>Hanya terlihat oleh pengguna yang sudah login.</small></div>
      <div class="field"><label for="r-foto">Foto barang</label><input id="r-foto" type="file" accept="image/*">${S.draft.foto?`<img src="${S.draft.foto}" alt="Pratinjau foto" style="max-width:180px;border-radius:14px;margin-top:6px">`:''}</div>
      <button class="btn block" type="submit">Kirim Laporan${ic('arrow')}</button>
    </form></section>`;
}

/* ---------- admin ---------- */
function rail(route){
  const l=(h,i,t)=>`<a href="#${h}" ${route===h||(h!=='admin'&&route.startsWith(h+'-'))?'aria-current="page"':route==='admin'&&h==='admin'?'aria-current="page"':''}>${ic(i)}${t}</a>`;
  return `<aside class="rail" aria-label="Menu admin"><div class="tagrole">Admin</div>${l('admin','grid','Dashboard')}${l('admin-laporan','list','Kelola Laporan')}${l('admin-klaim','doc','Kelola Klaim')}${l('admin-pengguna','users','Kelola Pengguna')}${l('admin-kategori','tags','Kelola Kategori')}<div class="sep"></div><a href="#beranda" data-act="logout">${ic('logout')}Logout</a></aside>`;
}
function trendSvg(){
  const {d,lab}=trendData();
  const W=300,H=140,pl=24,pr=8,pt=12,pb=22,max=Math.max(...d,1)+2;
  const x=i=>pl+i*(W-pl-pr)/Math.max(d.length-1,1), y=v=>pt+(H-pt-pb)*(1-v/max);
  const pts=d.map((v,i)=>[x(i),y(v)]);
  const line=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
  const area=line+` L${x(d.length-1)} ${H-pb} L${x(0)} ${H-pb} Z`;
  const ticks=[0,Math.round(max/2),max].map(v=>`<line x1="${pl}" x2="${W-pr}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${pl-5}" y="${y(v)+3.5}" text-anchor="end" font-size="9.5" fill="var(--muted)">${v}</text>`).join('');
  const last=pts[pts.length-1];
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Tren laporan bulanan, ${lab.map((l,i)=>l+' '+d[i]).join(', ')}">${ticks}<path d="${area}" fill="var(--c2)" opacity=".25"/><path d="${line}" fill="none" stroke="var(--c1)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>${lab.map((l,i)=>`<text x="${x(i)}" y="${H-6}" text-anchor="middle" font-size="9.5" fill="var(--muted)">${l}</text>`).join('')}<circle cx="${last[0]}" cy="${last[1]}" r="4" fill="var(--c1)" stroke="var(--surface)" stroke-width="2"/></svg>`;
}
function donutSvg(){
  const cnt={};S.items.forEach(i=>cnt[i.kat]=(cnt[i.kat]||0)+1);
  const ent=Object.entries(cnt).sort((a,b)=>b[1]-a[1]), tot=S.items.length, cols=['var(--c1)','var(--c2)','var(--c3)','var(--c4)'];
  const R=46,C=2*Math.PI*R; let off=0;
  const seg=ent.map(([k,v],i)=>{const len=v/tot*C;const s=`<circle r="${R}" cx="60" cy="60" fill="none" stroke="${cols[Math.min(i,3)]}" stroke-width="18" stroke-dasharray="${len-1.5} ${C-len+1.5}" stroke-dashoffset="${-off}" transform="rotate(-90 60 60)"/>`;off+=len;return s}).join('');
  const leg=ent.map(([k,v],i)=>`<div><i style="background:${cols[Math.min(i,3)]}"></i>${esc(k)} <b style="margin-left:auto">${v}</b></div>`).join('');
  return `<svg viewBox="0 0 120 120" width="130" height="130" role="img" aria-label="Distribusi jenis barang" style="display:block;margin:0 auto">${seg}<text x="60" y="62" text-anchor="middle" font-size="22" font-weight="800" fill="var(--ink)" font-family="var(--f-display)">${tot}</text><text x="60" y="76" text-anchor="middle" font-size="9" fill="var(--muted)">laporan</text></svg><div class="legend">${leg}</div>`;
}
function itemRows(list,limit){
  return list.slice(0,limit||99).map(i=>`<tr data-go="admin-laporan-${i.id}"><td><b>${esc(i.nama)}</b></td><td>${jenisPill(i)}</td><td><span class="pill ${statusPill(i.status)}">${i.status}</span></td><td class="num">${fd(i.tgl)}</td><td>${ic('arrow')}</td></tr>`).join('');
}
function vAdmin(route){
  const pend=S.items.filter(i=>i.status==='Menunggu').length;
  const recent=[...S.items].sort((a,b)=>b.tgl.localeCompare(a.tgl)||b.id-a.id);
  return `<div class="admin">${rail(route)}<div class="adm-main">
   <div class="pagehead" style="margin:0"><div><h1>Dashboard Admin</h1><p>${pend?`${pend} laporan menunggu verifikasi.`:'Tidak ada laporan yang menunggu.'}</p></div></div>
   <div class="stats">
     <div class="stat kpi"><div><span>Total Laporan</span><b>${S.items.length}</b></div></div>
     <div class="stat kpi"><div><span>Total Klaim</span><b>${S.claims.length}</b></div></div>
     <div class="stat kpi"><div><span>Total Pengguna</span><b>${S.users.length}</b></div></div>
   </div>
   <div class="twocol">
     <div class="card"><div class="section-title" style="margin-top:0"><h2>Laporan Terbaru</h2><a class="btn ghost sm" href="#admin-laporan">Lihat Semua ${ic('arrow')}</a></div>
       <div class="scroll"><table class="tbl"><thead><tr><th>Nama Barang</th><th>Jenis</th><th>Status</th><th>Tanggal</th><th></th></tr></thead><tbody>${itemRows(recent,5)}</tbody></table></div></div>
     <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;align-items:start">
       <div class="card"><h2 style="font-size:18px;margin-bottom:8px">Tren Laporan Bulanan</h2>${trendSvg()}</div>
       <div class="card"><h2 style="font-size:18px;margin-bottom:10px">Distribusi Jenis Barang</h2>${donutSvg()}</div>
     </div>
   </div></div></div>`;
}
function vAdminLaporan(route){
  const L=[...S.items].sort((a,b)=>(a.status==='Menunggu'?0:1)-(b.status==='Menunggu'?0:1)||b.tgl.localeCompare(a.tgl));
  return `<div class="admin">${rail(route)}<div class="adm-main"><div class="pagehead" style="margin:0"><div><h1>Kelola Laporan</h1><p>Klik laporan untuk memeriksa dan memutuskan.</p></div></div>
   <div class="card"><div class="scroll"><table class="tbl"><thead><tr><th>Nama Barang</th><th>Jenis</th><th>Status</th><th>Tanggal</th><th></th></tr></thead><tbody>${itemRows(L)}</tbody></table></div></div></div></div>`;
}
function vAdminVerifLaporan(route,id){
  const i=item(id); if(!i) return vAdminLaporan('admin-laporan');
  const dec=i.status!=='Menunggu';
  return `<div class="admin">${rail(route)}<div class="adm-main"><div><button class="back" data-go="admin-laporan">${ic('back')}Kembali</button></div>
   <div class="card verify"><div class="ph">${thumb(i)}</div><div>
     <h1 style="font-size:clamp(28px,4vw,40px);margin-bottom:10px">${esc(i.nama)}</h1>
     ${jenisPill(i)} <span class="pill ${statusPill(i.status)}">${i.status}</span>
     <ul class="facts"><li><span class="ico">${ic('cal')}</span>${fdl(i.tgl)}</li><li><span class="ico">${ic('pin')}</span>${esc(i.lokasi)}</li><li><span class="ico">${ic('user')}</span>Dilaporkan oleh ${esc(i.pelaporNama||'-')}</li></ul>
     <p>${esc(i.desk)}</p>
     ${dec?`<div class="note" style="margin-top:18px">Laporan ini sudah diputuskan: ${i.status}.</div>`:`<div class="actions"><button class="btn danger" data-act="reject-item" data-id="${i.id}">Tolak</button><button class="btn" data-act="approve-item" data-id="${i.id}">Setujui &amp; Publikasikan</button></div>`}
   </div></div></div></div>`;
}
function vAdminKlaim(route){
  const rows=S.claims.map(c=>{const it=item(c.itemId);return `<tr data-go="admin-klaim-${c.id}"><td><b>${esc(it.nama)}</b></td><td>${esc(c.pemohonNama||'-')}</td><td><span class="pill ${statusPill(c.status)}">${c.status}</span></td><td>${ic('arrow')}</td></tr>`}).join('');
  return `<div class="admin">${rail(route)}<div class="adm-main"><div class="pagehead" style="margin:0"><div><h1>Kelola Klaim</h1><p>Verifikasi kepemilikan sebelum barang diserahkan.</p></div></div>
   <div class="card"><div class="scroll"><table class="tbl"><thead><tr><th>Barang</th><th>Pemohon</th><th>Status</th><th></th></tr></thead><tbody>${rows||''}</tbody></table></div>${S.claims.length?'':'<div class="empty">Belum ada klaim.</div>'}</div></div></div>`;
}
function vAdminVerifKlaim(route,id){
  const c=S.claims.find(x=>x.id===+id); if(!c) return vAdminKlaim('admin-klaim');
  const i=item(c.itemId), dec=c.status!=='Menunggu';
  return `<div class="admin">${rail(route)}<div class="adm-main"><div><button class="back" data-go="admin-klaim">${ic('back')}Kembali</button></div>
   <div class="card verify"><div class="ph">${thumb(i)}</div><div>
     <h1 style="font-size:clamp(28px,4vw,40px)">Pengajuan Klaim</h1><h2 style="font-size:24px;margin-top:6px;font-weight:600">${esc(i.nama)}</h2>
     <div class="kv"><div><b>Alasan:</b> ${esc(c.alasan)}</div><div><b>Pemohon:</b> ${esc(c.pemohonNama||'-')}</div><div><b>Status:</b> <span class="pill ${statusPill(c.status)}">${c.status}</span></div></div>
     ${dec?`<div class="note">Klaim ini sudah diputuskan: ${c.status}.</div>`:`<div class="actions"><button class="btn danger" data-act="reject-claim" data-id="${c.id}">Tolak</button><button class="btn" data-act="approve-claim" data-id="${c.id}">Setujui</button></div>`}
   </div></div></div></div>`;
}
function vAdminUsers(route){
  return `<div class="admin">${rail(route)}<div class="adm-main"><div class="pagehead" style="margin:0"><div><h1>Kelola Pengguna</h1><p>Hak akses diatur dengan Role-Based Access Control: Admin dan User.</p></div></div>
   <div class="card"><div class="scroll"><table class="tbl"><thead><tr><th>Nama</th><th>Email</th><th>Peran</th></tr></thead><tbody>${S.users.map(u=>`<tr><td><b>${esc(u.n)}</b></td><td>${esc(u.e)}</td><td><span class="pill ${u.r==='Admin'?'p-done':'p-no'}">${u.r}</span></td></tr>`).join('')}</tbody></table></div></div></div></div>`;
}
function vAdminCats(route){
  const n=c=>S.items.filter(i=>i.kat===c).length;
  return `<div class="admin">${rail(route)}<div class="adm-main"><div class="pagehead" style="margin:0"><div><h1>Kelola Kategori</h1><p>Kategori dipakai pada formulir laporan dan filter pencarian.</p></div></div>
   <div class="card"><form class="row2" id="catForm" style="grid-template-columns:1fr auto;margin-bottom:12px" novalidate><label class="search" for="catName" style="padding:0 14px"><input id="catName" placeholder="Nama kategori baru" autocomplete="off"></label><button class="btn" type="submit">${ic('plus')}Tambah</button></form>
   <div class="scroll"><table class="tbl"><thead><tr><th>Kategori</th><th>Jumlah laporan</th></tr></thead><tbody>${S.cats.map(c=>`<tr><td><b>${esc(c)}</b></td><td class="num">${n(c)}</td></tr>`).join('')}</tbody></table></div></div></div></div>`;
}

/* ---------- Supabase ---------- */
const sb=supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{flowType:'pkce',persistSession:true,detectSessionInUrl:true}});
const PUB_COLS='id,nama,jenis,tanggal,lokasi,kategori,deskripsi,foto_url,status,created_at';

/* ---------- state ---------- */
const S={user:null,after:null,tab:'login',loading:true,cats:[],items:[],claims:[],users:[],draft:{jenis:'Hilang',foto:null,file:null},filter:'Semua',sort:'Terbaru',q:''};
const isAdmin=()=>S.user&&S.user.role==='admin';
const item=id=>S.items.find(i=>i.id===+id);
const pubItems=()=>S.items.filter(i=>i.status==='Disetujui'||i.status==='Diselesaikan');
const initials=n=>(n||'?').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
const thumb=i=>i.foto?`<img src="${esc(i.foto)}" alt="Foto ${esc(i.nama)}">`:ic('box');
const jenisPill=i=>i.jenis==='Hilang'?`<span class="pill p-hilang">Hilang</span>`:`<span class="pill p-temu">Ditemukan</span>`;
const statusPill=s=>({Menunggu:'p-wait',Disetujui:'p-ok',Ditolak:'p-no',Diselesaikan:'p-done',Diterima:'p-temu'}[s]||'p-no');
const mapItem=r=>({id:r.id,nama:r.nama,jenis:r.jenis,tgl:r.tanggal,lokasi:r.lokasi,kat:r.kategori||'-',desk:r.deskripsi||'',tg:r.telegram||null,foto:r.foto_url,status:r.status,pelapor:r.pelapor||null,pelaporNama:r.profiles?r.profiles.nama:'',created:r.created_at});
const mapClaim=r=>({id:r.id,itemId:r.item_id,pemohon:r.pemohon,pemohonNama:r.profiles?r.profiles.nama:'',alasan:r.alasan,status:r.status,created:r.created_at});
function trendData(){
  const now=new Date(), lab=[], d=[];
  for(let k=5;k>=0;k--){const m=new Date(now.getFullYear(),now.getMonth()-k,1);lab.push(BL[m.getMonth()]);
    d.push(S.items.filter(i=>{const c=new Date(i.created);return c.getFullYear()===m.getFullYear()&&c.getMonth()===m.getMonth()}).length)}
  return {d,lab};
}
function errText(e){if(!e)return'';if(typeof e==='string')return e;return [e.message,e.details,e.hint,e.code].filter(Boolean).join(' | ')||JSON.stringify(e)}
function fail(err,msg){const t=errText(err);console.error('[Supabase]',t,err);toast((msg||'Gagal.')+(t?' ('+t.slice(0,150)+')':''))}

async function loadData(){
  const q=[sb.from('categories').select('nama').order('id')];
  if(S.user){
    q.push(sb.from('items').select('*, profiles(nama)').order('created_at',{ascending:false}));
    q.push(sb.from('claims').select('*, profiles(nama)').order('created_at',{ascending:false}));
    if(isAdmin()) q.push(sb.from('profiles').select('nama,email,role').order('created_at'));
  }else q.push(sb.from('items').select(PUB_COLS).order('created_at',{ascending:false}));
  const r=await Promise.all(q);
  const bad=r.find(x=>x.error); if(bad) fail(bad.error,'Data belum bisa dimuat dari Supabase.');
  S.cats=(r[0].data||[]).map(c=>c.nama);
  S.items=(r[1].data||[]).map(mapItem);
  S.claims=S.user&&r[2]?(r[2].data||[]).map(mapClaim):[];
  S.users=isAdmin()&&r[3]?(r[3].data||[]).map(u=>({n:u.nama,e:u.email,r:u.role==='admin'?'Admin':'User'})):[];
}
async function setSession(session){
  if(session&&session.user){
    const {data}=await sb.from('profiles').select('nama,role').eq('id',session.user.id).maybeSingle();
    S.user={id:session.user.id,name:(data&&data.nama)||session.user.email,role:(data&&data.role)||'user'};
  }else S.user=null;
}
async function refresh(){S.loading=true;route();await loadData();S.loading=false;route()}

/* ---------- router ---------- */
function toast(t){const e=document.getElementById('toast');e.textContent=t;e.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>e.hidden=true,6000)}
function go(h){if(location.hash==='#'+h)route();else location.hash=h}
function route(){
  let h=(location.hash||'#beranda').slice(1)||'beranda', html;
  const need=()=>{S.after=h;S.tab='login';toast('Login dulu untuk melanjutkan.');h='login';history.replaceState(null,'','#login')};
  if(!S.loading){
    if(/^(dashboard|lapor|klaim)/.test(h)&&!S.user) need();
    if(/^admin/.test(h)&&!isAdmin()){ if(!S.user){need()}else{h='beranda';history.replaceState(null,'','#beranda');toast('Halaman ini khusus admin.')} }
    if((h==='dashboard'||h==='beranda')&&isAdmin()){h='admin';history.replaceState(null,'','#admin')}
    if(h==='dashboard'&&S.user){h='beranda';history.replaceState(null,'','#beranda')}
    if(h==='login'&&S.user){h=isAdmin()?'admin':'beranda';history.replaceState(null,'','#'+h)}
  }
  if(h==='klaim-saya') h='beranda';
  let m;
  const wait=S.loading&&!/^(beranda|login)$/.test(h);
  if(wait) html='<section class="page"><div class="card empty">Memuat data...</div></section>';
  else if(h==='beranda') html=S.user?(S.loading?'<section class="page"><div class="card empty">Memuat data...</div></section>':vHome()):vBeranda();
  else if(h==='cara-kerja') html=vCara();
  else if(h==='login') html=vLogin();
  else if(h==='dashboard') html=vHome();
  else if(h==='barang') html=vBarang();
  else if(m=h.match(/^barang-(\d+)$/)) html=vDetail(m[1]);
  else if(m=h.match(/^klaim-(\d+)$/)) html=vKlaim(m[1]);
  else if(h==='lapor') html=vLapor();
  else if(h==='admin') html=vAdmin(h);
  else if(h==='admin-laporan') html=vAdminLaporan(h);
  else if(m=h.match(/^admin-laporan-(\d+)$/)) html=vAdminVerifLaporan(h,m[1]);
  else if(h==='admin-klaim') html=vAdminKlaim(h);
  else if(m=h.match(/^admin-klaim-(\d+)$/)) html=vAdminVerifKlaim(h,m[1]);
  else if(h==='admin-pengguna') html=vAdminUsers(h);
  else if(h==='admin-kategori') html=vAdminCats(h);
  else html=vBeranda();
  document.getElementById('app').innerHTML=html;
  renderBar(h);
  const t=document.getElementById('themeBtn'); if(t) t.onclick=toggleTheme;
}
function toggleTheme(){
  const r=document.documentElement, dark=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
  r.dataset.theme=dark?'light':'dark';
}
addEventListener('hashchange',route);

/* ---------- events ---------- */
document.addEventListener('click',async e=>{
  const t=e.target.closest('[data-go],[data-tab],[data-act],[data-filter],[data-jenis],[data-need]'); if(!t) return;
  if(t.dataset.need){S.after=t.dataset.need;return}
  if(t.dataset.tab){S.tab=t.dataset.tab; if(t.tagName==='A'){if(location.hash==='#login')route();return} e.preventDefault();route();return}
  if(t.dataset.go&&!t.dataset.act){go(t.dataset.go);return}
  if(t.dataset.filter){S.filter=t.dataset.filter;route();return}
  if(t.dataset.jenis){S.draft.jenis=t.dataset.jenis;const keep={};['r-nama','r-lok','r-desk','r-tg','r-kat','r-tgl'].forEach(k=>keep[k]=document.getElementById(k).value);route();Object.entries(keep).forEach(([k,v])=>document.getElementById(k).value=v);return}
  const a=t.dataset.act, id=+t.dataset.id;
  try{
  if(a==='logout'){await sb.auth.signOut();return}
  if(a==='forgot'){const em=document.getElementById('lf-user').value.trim();if(!em){toast('Isi email dulu, lalu klik Lupa password.');return}
    const {error}=await sb.auth.resetPasswordForEmail(em,{redirectTo:location.origin+location.pathname});if(error) return fail(error);toast('Tautan reset password dikirim ke email.');return}
  if(a==='google'){const {error}=await sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname}});if(error) fail(error,'Login Google belum aktif di proyek Supabase.');return}
  if(a==='approve-item'||a==='reject-item'){
    const st=a==='approve-item'?'Disetujui':'Ditolak';
    const {error}=await sb.from('items').update({status:st}).eq('id',id); if(error) return fail(error);
    toast(st==='Disetujui'?'Laporan dipublikasikan.':'Laporan ditolak.');await loadData();go('admin-laporan');return}
  if(a==='approve-claim'||a==='reject-claim'){
    const st=a==='approve-claim'?'Diterima':'Ditolak';
    const {error}=await sb.from('claims').update({status:st}).eq('id',id); if(error) return fail(error);
    toast(st==='Diterima'?'Klaim disetujui. Barang siap diserahkan.':'Klaim ditolak.');await loadData();go('admin-klaim');return}
  }catch(err){fail(err)}
});
document.addEventListener('input',e=>{
  if(e.target.id==='q'){S.q=e.target.value;const pos=e.target.selectionStart;route();const q=document.getElementById('q');q.focus();q.setSelectionRange(pos,pos)}
});
document.addEventListener('change',e=>{
  if(e.target.id==='sort'){S.sort=e.target.value;route()}
  if(e.target.id==='r-foto'){
    const f=e.target.files[0]; if(!f) return;
    if(f.size>5*1024*1024){toast('Foto maksimal 5 MB.');e.target.value='';return}
    const keep={};['r-nama','r-lok','r-desk','r-tg','r-kat','r-tgl'].forEach(k=>keep[k]=document.getElementById(k).value);
    S.draft.file=f;S.draft.foto=URL.createObjectURL(f);route();Object.entries(keep).forEach(([k,v])=>document.getElementById(k).value=v);
  }
});
document.addEventListener('submit',async e=>{
  e.preventDefault(); const f=e.target;
  const btn=f.querySelector('button[type="submit"]'); if(btn) btn.disabled=true;
  try{
  if(f.id==='loginForm'){
    const em=document.getElementById('lf-user').value.trim(), pw=document.getElementById('lf-pass').value;
    if(!em||!pw){toast('Isi email dan password.');return}
    const nm=document.getElementById('lf-name');
    if(nm){
      if(pw.length<6){toast('Password minimal 6 karakter.');return}
      const {data,error}=await sb.auth.signUp({email:em,password:pw,options:{data:{full_name:nm.value.trim()||em.split('@')[0]}}});
      if(error) return fail(error);
      if(!data.session){toast('Akun dibuat. Cek email untuk konfirmasi, lalu login.');S.tab='login';route()}
    }else{
      const {error}=await sb.auth.signInWithPassword({email:em,password:pw});
      if(error) return fail(error,'Email atau password salah.');
    }
  }
  if(f.id==='claimForm'){
    const r=document.getElementById('reason').value.trim(); if(r.length<8){toast('Jelaskan alasan klaim minimal beberapa kata.');return}
    const {error}=await sb.from('claims').insert({item_id:+f.dataset.id,alasan:r}); if(error) return fail(error);
    toast('Klaim terkirim ke admin.');await loadData();go('beranda');
  }
  if(f.id==='reportForm'){
    const v=k=>document.getElementById(k).value.trim();
    if(!v('r-nama')||!v('r-lok')||!v('r-tg')){toast('Nama barang, lokasi, dan ID Telegram wajib diisi.');return}
    let foto_url=null;
    if(S.draft.file){
      const ext=(S.draft.file.name.split('.').pop()||'jpg').toLowerCase().replace(/[^a-z0-9]/g,'');
      const path=`${S.user.id}/${Date.now()}.${ext}`;
      const up=await sb.storage.from('foto-barang').upload(path,S.draft.file,{contentType:S.draft.file.type});
      if(up.error) return fail(up.error,'Foto gagal diunggah.');
      foto_url=sb.storage.from('foto-barang').getPublicUrl(path).data.publicUrl;
    }
    const {error}=await sb.from('items').insert({nama:v('r-nama'),jenis:S.draft.jenis,tanggal:v('r-tgl')||TODAY,lokasi:v('r-lok'),kategori:v('r-kat')||null,deskripsi:v('r-desk')||null,telegram:v('r-tg'),foto_url});
    if(error) return fail(error);
    S.draft={jenis:'Hilang',foto:null,file:null};toast('Laporan terkirim. Menunggu verifikasi admin.');await loadData();go('beranda');
  }
  if(f.id==='catForm'){
    const n=document.getElementById('catName').value.trim(); if(!n) return;
    const {error}=await sb.from('categories').insert({nama:n}); if(error) return fail(error,'Kategori sudah ada atau gagal disimpan.');
    await loadData();route();toast(`Kategori "${n}" ditambahkan.`);
  }
  }catch(err){fail(err)}finally{if(btn) btn.disabled=false}
});

/* ---------- start ---------- */
sb.auth.onAuthStateChange((ev,session)=>{
  if(ev==='PASSWORD_RECOVERY'){setTimeout(async()=>{const p=prompt('Masukkan password baru (minimal 6 karakter):');
    if(p&&p.length>=6){const {error}=await sb.auth.updateUser({password:p});error?fail(error):toast('Password berhasil diganti.')}},400)}
  if(ev==='INITIAL_SESSION'||ev==='SIGNED_IN'||ev==='SIGNED_OUT'||ev==='USER_UPDATED'){
    setTimeout(async()=>{
      const was=S.user&&S.user.id; await setSession(session);
      if(ev==='SIGNED_IN'&&S.user&&S.user.id!==was){toast(`Masuk sebagai ${S.user.name}`);const d=isAdmin()?'admin':(S.after||'beranda');S.after=null;await refresh();go(d);return}
      if(ev==='SIGNED_OUT'){toast('Kamu sudah keluar.');S.items=[];S.claims=[];S.users=[];await refresh();go('beranda');return}
      await refresh();
    },0);
  }
});
route();

