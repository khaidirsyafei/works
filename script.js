/* ========== ISI HALAMAN DARI config.js ========== */
const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#222"/>' +
  '<text x="50%" y="50%" fill="#888" font-family="sans-serif" font-size="22" text-anchor="middle">Foto tidak ditemukan</text></svg>');
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// jika foto gagal dimuat (salah nama file), tampilkan kotak abu-abu
document.addEventListener('error', e => {
  if (e.target.tagName === 'IMG' && e.target.src !== PLACEHOLDER) e.target.src = PLACEHOLDER;
}, true);

(function buildFromConfig() {
  const set = (id, fn) => { const el = document.getElementById(id); if (el) fn(el); };
  document.title = SITE.nama + ' — Portofolio';
  set('logoText', e => e.textContent = SITE.nama.replace(/\s+/g, ''));
  set('owner', e => e.textContent = SITE.nama);
  set('owner2', e => e.textContent = SITE.nama);
  set('mail', e => { e.textContent = SITE.email; e.href = 'mailto:' + SITE.email; });
  set('ig', e => e.href = SITE.instagram);
  set('be', e => e.href = SITE.behance);
  set('li', e => e.href = SITE.linkedin);
  document.querySelector('.hero-under').style.backgroundImage =
    `linear-gradient(#0f0f0f66,#0f0f0f99), url("${SITE.fotoHero}")`;

  // halaman buku: cover + isi (+ halaman kosong bila ganjil) + cover belakang
  const pages = SITE.halamanBuku.map(p =>
    `<div class="page"><img src="${esc(p.foto)}" alt="${esc(p.caption || '')}">${p.caption ? `<span class="cap">${esc(p.caption)}</span>` : ''}</div>`);
  if (pages.length % 2 === 1) pages.push('<div class="page"></div>');
  document.getElementById('flipbook').innerHTML =
    `<div class="page page-cover" data-density="hard"><div class="cover-inner"><h3>${esc(SITE.judulBuku)}</h3><p>${esc(SITE.subJudulBuku)}</p></div></div>` +
    pages.join('') +
    `<div class="page page-cover" data-density="hard"><div class="cover-inner"><p>Terima kasih sudah membaca.</p></div></div>`;

  // kartu karya
  document.getElementById('grid').innerHTML = SITE.karya.map(k =>
    `<a class="card" href="${esc(k.link)}"><img src="${esc(k.foto)}" alt="${esc(k.judul)}" loading="lazy">` +
    `<div class="info"><h3>${esc(k.judul)}</h3><p>${esc(k.kategori)}</p></div>` +
    `<div class="hover">Lihat Detail Proyek →</div></a>`).join('');
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

function paintCover() {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.globalCompositeOperation = 'source-over';

  // lapisan gelap bertekstur
  ctx.fillStyle = '#0f0f0f';
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 2500; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }

  // teks statis "Dari Ide..." (ikut terhapus saat digosok)
  const size = Math.max(38, Math.min(w * 0.09, 112));
  ctx.fillStyle = '#ffffff';
  ctx.font = `700 ${size}px 'Bricolage Grotesque', system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Dari Ide...', w / 2, h / 2);
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
(document.fonts ? document.fonts.ready : Promise.resolve()).then(paintCover);

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
    if (!p.classList.contains('page-cover')) p.classList.add(i % 2 === 1 ? 'is-left' : 'is-right');
  });

  const flip = new St.PageFlip(el, {
    width: 400, height: 560,
    size: 'stretch',
    minWidth: 260, maxWidth: 520,
    minHeight: 364, maxHeight: 728,
    maxShadowOpacity: 0.5,
    showCover: true,
    drawShadow: true,
    flippingTime: 900,
    usePortrait: true,
    mobileScrollSupport: false
  });
  flip.loadFromHTML(pages);

  const info = document.getElementById('pageInfo');
  const update = () => { info.textContent = `${flip.getCurrentPageIndex() + 1} / ${flip.getPageCount()}`; };
  flip.on('flip', update);
  update();

  document.getElementById('prev').addEventListener('click', () => flip.flipPrev());
  document.getElementById('next').addEventListener('click', () => flip.flipNext());
});
