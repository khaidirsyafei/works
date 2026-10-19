/* =====================================================
   FILE PENGATURAN — CUKUP EDIT FILE INI SAJA
   Tidak perlu menyentuh index.html, style.css, atau script.js

   CARA GANTI FOTO:
   1. Taruh foto kamu di folder bernama  images  (sebelah index.html)
   2. Tulis nama filenya di bawah, contoh:  "images/karya1.jpg"
   Perhatikan: huruf besar/kecil dan tanda kutip harus persis.
   Foto contoh dari internet (https://...) boleh dihapus/diganti.
   ===================================================== */

const SITE = {

  // ---- Identitas ----
  nama: "Khaidir Syafei",
  email: "hello@khaidirsyafei.com",
  instagram: "https://instagram.com/khaidirsyafei",
  behance: "https://behance.net/khaidirsyafei",
  linkedin: "https://linkedin.com/",

  // ---- Foto latar bagian paling atas ("...Jadi Kenyataan") ----
  fotoHero: "images\hero1before.jpg",   // ganti: "images/hero.jpg"

  // ---- Buku ilustrasi ----
  judulBuku: "Judul Buku",
  subJudulBuku: "Kumpulan ilustrasi oleh Nama Kamu",
  // Tambah/hapus baris sesuka hati. Jumlah ganjil pun aman.
  halamanBuku: [
    { foto: "https://picsum.photos/seed/book1/600/800", caption: "Sketsa awal" },
    { foto: "https://picsum.photos/seed/book2/600/800", caption: "Pewarnaan" },
    { foto: "https://picsum.photos/seed/book3/600/800", caption: "Detail karakter" },
    { foto: "https://picsum.photos/seed/book4/600/800", caption: "Latar suasana" },
    { foto: "https://picsum.photos/seed/book5/600/800", caption: "Komposisi akhir" },
    { foto: "https://picsum.photos/seed/book6/600/800", caption: "Versi cetak" }
  ],

  // ---- Karya pilihan ----
  // link = halaman detail proyek. Isi "#" kalau belum ada.
  karya: [
    { foto: "https://picsum.photos/seed/work1/1200/900", judul: "Judul Proyek Satu",  kategori: "Ilustrasi Buku Anak", link: "#" },
    { foto: "https://picsum.photos/seed/work2/1200/900", judul: "Judul Proyek Dua",   kategori: "Desain Karakter",     link: "#" },
    { foto: "https://picsum.photos/seed/work3/1200/900", judul: "Judul Proyek Tiga",  kategori: "Branding & Identitas", link: "#" },
    { foto: "https://picsum.photos/seed/work4/1200/900", judul: "Judul Proyek Empat", kategori: "Poster & Editorial",   link: "#" }
  ]
};
