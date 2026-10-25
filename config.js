/* =====================================================
   FILE PENGATURAN — CUKUP EDIT FILE INI SAJA
   Foto: taruh di folder  images  lalu tulis misalnya "images/karya1.jpg"
   Teks: ganti isi di antara tanda kutip "...", jangan hapus tanda kutipnya.
   ===================================================== */

const SITE = {
  nama: "Khaidir Syafei",
  email: "hello@Khaidirsyafei.com",

  // ---- Hero (gosok untuk membuka) ----
  fotoHeroSebelum: "images/hero1before.jpg",
  fotoHeroSesudah: "images/hero1after.jpg",

  // ---- Semua teks pendek (microcopy). Bebas diubah sesuai gayamu ----
  teks: {
    tentang: "Hi, I’m Khaidir Syafei, a children's book illustrator and visual designer. Over the past few years, I’ve been helping clients and Muslim brands create warm, thoughtful character designs, children's books, and brand visuals.",
    labelLogo: "Trusted by many Muslim-owned brands",
    bukuJudul: "This is how I made illustrations",
    intipJudul: "That's just a short snippet..",
    intipIsi: "There are many other projects I'm working on wholeheartedly. Click on any of them to see more of my work.",
    karyaJudul: "Selected Works",
    kontakJudul: "Got a project in mind?",
    kontakIsi: "Just tell me what you have in mind, no need to be formal. A quick intro, what you need, and your rough timeline will do. I read every message myself and usually reply within 1–2 business days.",
    sosJudul: "Find me online",
    sosIsi: "Catch my latest work, sketching process, and studio updates over on social media."
  },

  // ---- Logo klien ----
  // Isi "file" dengan logo (PNG/SVG transparan) di folder images.
  // Kalau "file" dikosongkan, yang tampil nama brand dalam bentuk tulisan.
  logoPutih: true,   // true = semua logo dibuat putih polos agar seragam di latar gelap. false = warna asli
  logoKlien: [
    { nama: "Brand One",  file: "images/logo-brandsatu.png" },   // contoh: file: "images/logo-brandsatu.png"
    { nama: "Brand Two",   file: "images/logo-branddua.png" },
    { nama: "Brand Six",  file: "images/logo-brandenam.png" },
    { nama: "Brand Three",  file: "images/logo-brandtiga.png" },
    { nama: "Brand Four", file: "images/logo-brandempat.png" },
    { nama: "Brand Five",  file: "images/logo-brandlima.png" }
    
  ],

  // ---- Buku cerita "how I work" ----
  // Sampul: kalau "gambar" diisi (mis. "images/cover-depan.png"), sampul memakai gambar itu saja (teks ada di dalam gambarmu).
  // Kalau dikosongkan, sampul kuning bertekstur + teks di bawah ini yang tampil.
  sampulDepan:    { judul: "This is HOW I create Illustrations", catatan: "*without AI", gambar: "" },
  sampulBelakang: { judul: "The end.", teks: "Scroll down to start our project.", gambar: "" },

  // Urutan halaman: teks di kiri, gambar di kanan. Satu pasang = satu spread.
  halamanBuku: [
    { judul: "Listen and discuss.", teks: "Great illustrations start with a solid story.\nListening to yours is where\nthe real work begins." },
    { foto: "images/bookpage1.png", alt: "Page 1 illustration" },
    { judul: "Start scratching.", teks: "Once the initial deposit is settled, I dive right into character concepts and sketch out every page and cover based on your brief." },
    { foto: "images/bookpage2.png", alt: "Page 2 illustration" },
    { judul: "Illustrations in the making.", teks: "With the sketches approved on your end, I move on to bringing the full-color illustrations to life." },
    { foto: "images/bookpage3.png", alt: "Page 3 illustration" },
    { judul: "It’s beautiful, but..", teks: "It’s getting there, but your feedback is what truly makes it complete." },
    { foto: "images/bookpage4.png", alt: "Page 4 illustration" }
  ],

  // ---- 6 karya pilihan ----
  // judul     = judul proyek (tampil di kartu & jendela detail)
  // subjudul  = teks kecil di bawah judul
  // deskripsi = cerita singkat proyek (tampil di jendela detail)
  // prefix + jumlah = semua halaman proyek diambil otomatis dari folder images.
  //   Contoh: prefix "images/Book1 Page " + jumlah 8  ->  "Book1 Page (1).jpg" sampai "Book1 Page (8).jpg"
  //   Tambah/kurangi halaman cukup dengan mengubah angka jumlah.
  // sampul    = halaman nomor berapa yang jadi gambar sampul kartu (default 1)
  karya: [
    { judul: "Iam! affirmation for little Muslim",
      subjudul: "Children's book project",
      deskripsi: "Written by Umm Laith and Published by Proud Little Muslims. 26 Pages.",
      prefix: "images/Book1 Page ", jumlah: 8, sampul: 1 },
    { judul: "My Feelings are like a balloon",
      subjudul: "Children's book project",
      deskripsi: "Written by Zahie El Hajj and Published by Little Hibba. 28 Pages.",
      prefix: "images/Book2 page ", jumlah: 5, sampul: 1 },
    { judul: "Zayd's Journey to Zakat",
      subjudul: "Children's book project",
      deskripsi: "Written by Umm Inaayah and Published by Fitrah Beginnings. 40 Pages.",
      prefix: "images/Book3 Page ", jumlah: 7, sampul: 1 },
    { judul: "I WANT TO BE LIKE.. The Ten Promised Paradise",
      subjudul: "Children's book project",
      deskripsi: "Written by Umm Inaayah and Published by Fitrah Beginnings. 26 Pages.",
      prefix: "images/Book4 Page ", jumlah: 4, sampul: 1 },
    { judul: "My Mama's Hijab",
      subjudul: "Children's book project",
      deskripsi: "Written by Sana Vawda and Published by Little Hibba. 26 Pages.",
      prefix: "images/Book5 Page ", jumlah: 7, sampul: 1 },
    { judul: "Inventors of the Golden Age: Just Like..",
      subjudul: "Personalized Children's book project",
      deskripsi: "Written by Umm Laith and Published by Proud Little Muslims. 32 Pages. Came with 22 boy and girl characters to choose from.",
      prefix: "images/Book6 Page ", jumlah: 7, sampul: 1 }
  ],

  // ---- Sosial media (hapus baris yang tidak dipakai) ----
  sosmed: [
    { nama: "Instagram", url: "https://instagram.com/" },
    { nama: "Threads",   url: "https://threads.net/" },
    { nama: "X",         url: "https://x.com/" },
    { nama: "Behance",   url: "https://behance.net/" },
    { nama: "LinkedIn",  url: "https://linkedin.com/" }
  ]
};
