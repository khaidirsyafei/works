/* ========== ISI HALAMAN DARI config.js ========== */
const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#222"/>' +
  '<text x="50%" y="50%" fill="#888" font-family="sans-serif" font-size="22" text-anchor="middle">Image not found</text></svg>');
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const br = s => esc(s).replace(/\n/g, '<br>');
document.addEventListener('error', e => {
  if (e.target.tagName === 'IMG' && e.target.src !== PLACEHOLDER) e.target.src = PLACEHOLDER;
}, true);

(function buildFromConfig() {
  const $ = id => document.getElementById(id);
  // judul halaman diatur di index.html (SEO)
  $('logoText').textContent = SITE.nama.replace(/\s+/g, '');
  document.querySelectorAll('.owner').forEach(e => e.textContent = SITE.nama);
  document.querySelectorAll('[data-teks]').forEach(e => e.textContent = SITE.teks[e.dataset.teks] || '');
  $('mail').textContent = SITE.email + ' →';
  $('mail').href = 'mailto:' + SITE.email + '?subject=' + encodeURIComponent('Hi, I have a project idea');
  document.querySelector('.hero-under').style.backgroundImage =
    `linear-gradient(#0000004d,#00000080), url("${SITE.fotoHeroSesudah}")`;

  // logo klien (auto scroll): daftar digandakan agar putarannya tak putus
  let items = SITE.logoKlien.map(l => l.file
    ? `<img class="logo-img${SITE.logoPutih ? ' mono' : ''}" src="${esc(l.file)}" alt="${esc(l.nama)}">`
    : `<span class="logo-txt">${esc(l.nama)}</span>`);
  while (items.length && items.length < 8) items = items.concat(items);
  const group = items.join('');
  $('marquee').innerHTML = `<div class="track"><div class="group">${group}</div><div class="group" aria-hidden="true">${group}</div></div>`;

  // buku: cover + isi + cover belakang (jumlah ganjil otomatis digenapkan)
  const pages = SITE.halamanBuku.map(p => p.teks
    ? `<div class="page page-text"><div class="pt"><h4>${esc(p.judul)}</h4><p>${br(p.teks.replace(/([.!?])\s+(?=[A-Z])/g, '$1\n'))}</p></div></div>`
    : `<div class="page"><img src="${esc(p.foto)}" alt="${esc(p.alt || p.caption || '')}">${p.caption ? `<span class="cap">${esc(p.caption)}</span>` : ''}</div>`);
  if (pages.length % 2 === 1) pages.push('<div class="page"></div>');
  const fc = SITE.sampulDepan, bc = SITE.sampulBelakang;
  const cover = (c, inner) => `<div class="page page-cover cover-yellow" data-density="hard"${c.gambar ? ` style="background-image:url('${esc(c.gambar)}')"` : ''}>${c.gambar ? '' : `<div class="cover-inner">${inner}</div>`}</div>`;
  $('flipbook').innerHTML =
    cover(fc, `<h3>${esc(fc.judul)}</h3>${fc.catatan ? `<p>${esc(fc.catatan)}</p>` : ''}`) +
    pages.join('') +
    cover(bc, `<h3>${esc(bc.judul)}</h3><p>${esc(bc.teks)}</p>`);

  // gambar proyek: dibuat otomatis dari prefix + jumlah (atau daftar "gambar" manual)
  const pagesOf = k => k.gambar ? k.gambar.map(x => typeof x === 'string' ? { foto: x } : x)
    : Array.from({ length: k.jumlah || 0 }, (_, i) => ({ foto: `${k.prefix}(${i + 1})${k.ext || '.jpg'}` }));
  const coverOf = k => encodeURI(k.foto || (pagesOf(k)[(k.sampul || 1) - 1] || {}).foto || '');

  // kartu karya
  $('grid').innerHTML = SITE.karya.map((k, i) =>
    `<button class="card" type="button" data-i="${i}"><img src="${esc(coverOf(k))}" alt="${esc(k.judul)} — children's book illustration by ${esc(SITE.nama)}" loading="lazy">` +
    `<div class="info"><h3>${esc(k.judul)}</h3><p>${esc(k.subjudul)}</p></div>` +
    `<div class="hover">View Project Details →</div></button>`).join('');

  // sosmed
  $('sosmed').innerHTML = SITE.sosmed.map(s =>
    `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.nama)} ↗</a>`).join('');

  // detail proyek (jendela layar penuh berisi 3–4 karya)
  const modal = $('modal'), body = $('modalBody');
  let opener = null;
  $('grid').addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    const k = SITE.karya[card.dataset.i];
    opener = card;
    body.innerHTML = `<h2>${esc(k.judul)}</h2><p class="cat">${esc(k.subjudul)}</p><p class="desc">${esc(k.deskripsi)}</p>` +
      pagesOf(k).map((g, n) => {
        return `<figure><img src="${esc(encodeURI(g.foto))}" alt="${esc(g.caption || k.judul + ' – ' + (n + 1))}" loading="lazy">${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ''}</figure>`; }).join('');
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
    $('modalClose').focus();
  });
  const closeModal = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    if (opener) opener.focus();
  };
  $('modalClose').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();

/* ========== MENU (sliding dari kanan) ========== */
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');

function toggleMenu(open) {
  menu.classList.toggle('open', open);
  overlay.classList.toggle('show', open);
  burger.setAttribute('aria-expanded', open);
  menu.setAttribute('aria-hidden', !open);
}
burger.addEventListener('click', () => toggleMenu(!menu.classList.contains('open')));
overlay.addEventListener('click', () => toggleMenu(false));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });

document.getElementById('year').textContent = new Date().getFullYear();

/* ========== HERO: SCRATCH TO REVEAL ========== */
const canvas = document.getElementById('scratch');
const ctx = canvas.getContext('2d');
const hint = document.getElementById('hint');
let lastW = 0, drawing = false, last = null;
const heroImg = new Image();
heroImg.src = SITE.fotoHeroSebelum;

function paintCover() {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.globalCompositeOperation = 'source-over';

  // lapisan atas: gambar "sebelum" (cover-fit) + sedikit gelap agar teks terbaca
  if (heroImg.complete && heroImg.naturalWidth) {
    const k = Math.max(w / heroImg.naturalWidth, h / heroImg.naturalHeight);
    const dw = heroImg.naturalWidth * k, dh = heroImg.naturalHeight * k;
    ctx.drawImage(heroImg, (w - dw) / 2, (h - dh) / 2, dw, dh);
    ctx.fillStyle = 'rgba(15,15,15,0.5)';
    ctx.fillRect(0, 0, w, h);
  } else {
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(0, 0, w, h);
  }

  // teks statis "From Idea..." (ikut terhapus saat digosok)
  const size = Math.max(38, Math.min(w * 0.09, 112));
  ctx.fillStyle = '#ffffff';
  ctx.font = `700 ${size}px 'Bricolage Grotesque', system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('From Idea...', w / 2, h / 2);
  lastW = w;
}

function getPos(e) {
  const r = canvas.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}

function scratchTo(p) {
  const size = Math.max(50, Math.min(canvas.clientWidth * 0.07, 90));
  ctx.globalCompositeOperation = 'destination-out';
  ctx.lineWidth = size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(last.x, last.y);
  ctx.lineTo(p.x, p.y);
  ctx.stroke();
  last = p;
}

canvas.addEventListener('pointerdown', e => {
  drawing = true;
  canvas.setPointerCapture(e.pointerId);
  last = getPos(e);
  scratchTo({ x: last.x + 0.01, y: last.y }); // titik awal (tap)
  hint.classList.add('hide');
});
canvas.addEventListener('pointermove', e => {
  if (!drawing) return;
  // coalesced events = goresan lebih halus di layar sentuh/pen
  const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
  (events.length ? events : [e]).forEach(ev => scratchTo(getPos(ev)));
});
['pointerup', 'pointercancel', 'pointerleave'].forEach(t =>
  canvas.addEventListener(t, () => { drawing = false; }));

// gambar ulang hanya jika LEBAR berubah (agar goresan tidak hilang saat address bar HP bergerak)
window.addEventListener('resize', () => {
  if (Math.abs(canvas.clientWidth - lastW) > 1) paintCover();
});
Promise.all([
  document.fonts ? document.fonts.ready : Promise.resolve(),
  new Promise(r => { heroImg.onload = r; heroImg.onerror = r; })
]).then(paintCover);
paintCover(); // tampilan awal sementara sambil gambar dimuat

/* ========== 3D BOARD BOOK (St.PageFlip) ========== */
window.addEventListener('load', () => {
  const el = document.getElementById('flipbook');

  if (typeof St === 'undefined' || !St.PageFlip) {
    el.innerHTML = '<p class="book-fallback">Buku gagal dimuat. Periksa koneksi internet lalu muat ulang halaman.</p>';
    return;
  }

  const pages = el.querySelectorAll('.page');
  // tandai halaman kiri/kanan untuk bayangan lipatan (cover = indeks 0)
  pages.forEach((p, i) => {
    if (i === 0) p.classList.add('is-front');
    else if (i === pages.length - 1) p.classList.add('is-back');
    else p.classList.add(i % 2 === 1 ? 'is-left' : 'is-right');
  });

  const flip = new St.PageFlip(el, {
    width: 500, height: 500,          // halaman persegi
    size: 'stretch',
    minWidth: 260, maxWidth: 560,
    minHeight: 260, maxHeight: 560,
    maxShadowOpacity: 0.5,
    showCover: true,
    drawShadow: true,
    flippingTime: 900,
    usePortrait: true,
    mobileScrollSupport: false
  });
  flip.loadFromHTML(pages);

  const prevBtn = document.getElementById('prev'), nextBtn = document.getElementById('next');
  const update = () => {
    prevBtn.disabled = flip.getCurrentPageIndex() <= 0;
    nextBtn.disabled = flip.getCurrentPageIndex() >= flip.getPageCount() - 1;
  };
  flip.on('flip', update);
  update();

  document.getElementById('prev').addEventListener('click', () => flip.flipPrev());
  document.getElementById('next').addEventListener('click', () => flip.flipNext());
});
