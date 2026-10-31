export const initialUserData = [
  { id: 1, name: "Rina Wulandari", email: "rina@ut.ac.id", password: "rina123", role: "User", location: "UPBJJ Jakarta" },
  { id: 2, name: "Agus Pranoto", email: "agus@ut.ac.id", password: "agus123", role: "User", location: "UPBJJ Bandung" },
  { id: 3, name: "Siti Marlina", email: "siti@ut.ac.id", password: "siti123", role: "Administrator", location: "Pusat" },
  { id: 4, name: "Doni Setiawan", email: "doni@ut.ac.id", password: "doni123", role: "User", location: "FISIP" },
  { id: 5, name: "Admin SITTA", email: "admin@ut.ac.id", password: "admin123", role: "Administrator", location: "Pusat" }
];

export const trackingData = {
  "DO2026-001": {
    doNumber: "DO2026-001",
    nim: "123456789",
    name: "Rina Wulandari",
    status: "Dalam Perjalanan",
    courier: "JNE Regular",
    shipmentDate: "2026-08-25",
    packageCode: "PAKET-UT-001",
    total: 120000,
    history: [
      { time: "2026-08-25 10:12:20", description: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka" },
      { time: "2026-08-25 14:07:56", description: "Tiba di Hub: JAKSEL" },
      { time: "2026-08-26 08:44:01", description: "Diteruskan ke Kantor Tujuan" }
    ]
  },
  "DO2026-002": {
    doNumber: "DO2026-002",
    nim: "123653876",
    name: "Agus Pranoto",
    status: "Selesai",
    courier: "Pos Indonesia",
    shipmentDate: "2026-08-25",
    packageCode: "PAKET-UT-002",
    total: 220000,
    history: [
      { time: "2026-08-25 10:12:20", description: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka" },
      { time: "2026-08-25 14:07:56", description: "Tiba di Hub: TANGERANG SELATAN" },
      { time: "2026-08-25 16:30:10", description: "Diteruskan ke Kantor Kota Bandung" },
      { time: "2026-08-26 12:15:33", description: "Tiba di Hub: Kota BANDUNG" },
      { time: "2026-08-26 15:06:12", description: "Proses antar ke Cimahi" },
      { time: "2026-08-26 20:00:06", description: "Selesai Antar. Penerima: Agus Pranoto" }
    ]
  }
};

export const regionList = [
  "Jakarta",
  "Surabaya",
  "Makassar",
  "Padang",
  "Denpasar"
];

export const categoryList = [
  "MK Wajib",
  "MK Pilihan",
  "Praktikum",
  "Problem-Based"
];

export const deliveryList = [
  { code: "REG", name: "Reguler (3-5 hari)" },
  { code: "EXP", name: "Ekspres (1-2 hari)" }
];

export const packageList = [
  {
    code: "PAKET-UT-001",
    name: "Paket Pengantar Bisnis & Manajemen",
    items: ["EKMA4116", "EKMA4115"],
    price: 125000
  },
  {
    code: "PAKET-UT-002",
    name: "Paket Mata Kuliah Wajib Umum",
    items: ["MKWN4101", "MKWN4109", "MKWN4108"],
    price: 156000
  },
  {
    code: "PAKET-UT-003",
    name: "Paket Dasar Sistem Informasi",
    items: ["STSI4101", "STSI4102"],
    price: 152000
  },
  {
    code: "PAKET-UT-004",
    name: "Paket Praktikum Basis Data dan Struktur Data",
    items: ["STSI4104", "STSI4105"],
    price: 170000
  },
  {
    code: "PAKET-UT-005",
    name: "Paket Pengembangan Web dan Mobile",
    items: ["STSI4209", "STSI4303"],
    price: 186000
  },
  {
    code: "PAKET-UT-006",
    name: "Paket Perangkat Lunak dan Perancangan Sistem",
    items: ["STSI4202", "STSI4208"],
    price: 176000
  },
  {
    code: "PAKET-UT-007",
    name: "Paket Sains Data dan Analisis Data",
    items: ["STDA4101", "STIK4111", "STSI4204"],
    price: 218000
  },
  {
    code: "PAKET-UT-008",
    name: "Paket Jaringan dan Infrastruktur TI",
    items: ["STSI4205", "STSI4304"],
    price: 148000
  },
  {
    code: "PAKET-UT-009",
    name: "Paket Tata Kelola dan Layanan TI",
    items: ["STSI4207", "STSI4402", "STSI4407"],
    price: 214000
  },
  {
    code: "PAKET-UT-010",
    name: "Paket Keamanan dan Audit Sistem Informasi",
    items: ["STSI4403", "STSI4405"],
    price: 156000
  }
];

export const initialStockData = [
  {
    itemCode: "EKMA4116",
    title: "Pengantar Manajemen",
    category: "MK Wajib",
    region: "Jakarta",
    rackLocation: "R1-A3",
    price: 65000,
    qty: 28,
    safetyStock: 20,
    notesHTML: "<em>Edisi 2024, cetak ulang</em>"
  },
  {
    itemCode: "EKMA4115",
    title: "Pengantar Akuntansi",
    category: "MK Wajib",
    region: "Jakarta",
    rackLocation: "R1-A4",
    price: 60000,
    qty: 7,
    safetyStock: 15,
    notesHTML: "<strong>Cover baru</strong>"
  },
  {
    itemCode: "BIOL4201",
    title: "Biologi Umum (Praktikum)",
    category: "Praktikum",
    region: "Surabaya",
    rackLocation: "R3-B2",
    price: 80000,
    qty: 12,
    safetyStock: 10,
    notesHTML: "Butuh <u>pendingin</u> untuk kit basah"
  },
  {
    itemCode: "FISIP4001",
    title: "Dasar-Dasar Sosiologi",
    category: "MK Pilihan",
    region: "Makassar",
    rackLocation: "R2-C1",
    price: 55000,
    qty: 2,
    safetyStock: 8,
    notesHTML: "Stok <i>menipis</i>, prioritaskan reorder"
  },
  {
    itemCode: "MKWN4101",
    title: "Pendidikan Agama Islam",
    category: "MK Wajib",
    region: "Jakarta",
    rackLocation: "R1-A1",
    price: 54000,
    qty: 35,
    safetyStock: 15,
    notesHTML: "<em>Edisi 2024, cetak ulang</em>"
  },
  {
    itemCode: "MKWN4109",
    title: "Pendidikan Kewarganegaraan",
    category: "MK Wajib",
    region: "Surabaya",
    rackLocation: "R1-B3",
    price: 52000,
    qty: 42,
    safetyStock: 20,
    notesHTML: "<b>Revisi terbaru</b>, persediaan terbatas"
  },
  {
    itemCode: "STMA4112",
    title: "Matematika Dasar",
    category: "MK Wajib",
    region: "Makassar",
    rackLocation: "R2-A4",
    price: 68000,
    qty: 18,
    safetyStock: 12,
    notesHTML: "<em>Termasuk suplemen soal latihan</em>"
  },
  {
    itemCode: "STSI4101",
    title: "Pengantar Sistem Informasi",
    category: "MK Wajib",
    region: "Padang",
    rackLocation: "R2-C1",
    price: 72000,
    qty: 25,
    safetyStock: 10,
    notesHTML: "<span>Stok modul baru terkirim</span>"
  },
  {
    itemCode: "STSI4102",
    title: "Algoritma dan Pemrograman",
    category: "Praktikum",
    region: "Denpasar",
    rackLocation: "R3-A2",
    price: 80000,
    qty: 12,
    safetyStock: 25,
    notesHTML: "<em>Edisi kurikulum baru</em>"
  },
  {
    itemCode: "STSI4103",
    title: "Sistem Operasi",
    category: "MK Wajib",
    region: "Jakarta",
    rackLocation: "R3-B5",
    price: 76000,
    qty: 48,
    safetyStock: 18,
    notesHTML: "<b>Cetakan 2023</b>, kondisi baik"
  },
  {
    itemCode: "MKDI4201",
    title: "Bahasa Inggris",
    category: "MK Wajib",
    region: "Surabaya",
    rackLocation: "R1-C2",
    price: 58000,
    qty: 30,
    safetyStock: 14,
    notesHTML: "<em>Dilengkapi audio companion</em>"
  },
  {
    itemCode: "MKKI4201",
    title: "Pengantar Statistika",
    category: "MK Wajib",
    region: "Makassar",
    rackLocation: "R4-A1",
    price: 64000,
    qty: 22,
    safetyStock: 22,
    notesHTML: "<em>Edisi revisi ketiga</em>"
  },
  {
    itemCode: "MKWN4108",
    title: "Bahasa Indonesia",
    category: "MK Wajib",
    region: "Denpasar",
    rackLocation: "R1-A2",
    price: 50000,
    qty: 50,
    safetyStock: 30,
    notesHTML: "<b>Stok reguler</b>"
  },
  {
    itemCode: "MKWN4110",
    title: "Pancasila",
    category: "MK Wajib",
    region: "Padang",
    rackLocation: "R1-D4",
    price: 56000,
    qty: 15,
    safetyStock: 11,
    notesHTML: "<em>Edisi 2024, siap kirim</em>"
  },
  {
    itemCode: "STMA4113",
    title: "Aljabar Linear Elementer",
    category: "MK Wajib",
    region: "Jakarta",
    rackLocation: "R2-B2",
    price: 62000,
    qty: 8,
    safetyStock: 16,
    notesHTML: "<b>Perlu re-stock</b>"
  },
  {
    itemCode: "STSI4104",
    title: "Struktur Data",
    category: "Praktikum",
    region: "Surabaya",
    rackLocation: "R3-C3",
    price: 84000,
    qty: 29,
    safetyStock: 20,
    notesHTML: "<em>Materi praktikum diperbarui</em>"
  },
  {
    itemCode: "STSI4105",
    title: "Basis Data",
    category: "Praktikum",
    region: "Makassar",
    rackLocation: "R3-D1",
    price: 86000,
    qty: 40,
    safetyStock: 15,
    notesHTML: "<em>Edisi cetak 2024</em>"
  },
  {
    itemCode: "MKDI4202",
    title: "Belajar di Era Digital",
    category: "MK Wajib",
    region: "Denpasar",
    rackLocation: "R4-B2",
    price: 52000,
    qty: 33,
    safetyStock: 12,
    notesHTML: "<span>Modul interaktif</span>"
  },
  {
    itemCode: "STIK4111",
    title: "Dasar Pemrograman R",
    category: "Praktikum",
    region: "Padang",
    rackLocation: "R2-D3",
    price: 78000,
    qty: 19,
    safetyStock: 10,
    notesHTML: "<em>Paket modul praktikum</em>"
  },
  {
    itemCode: "STSI4106",
    title: "Logika Informatika",
    category: "MK Wajib",
    region: "Jakarta",
    rackLocation: "R3-A5",
    price: 66000,
    qty: 27,
    safetyStock: 17,
    notesHTML: "<b>Edisi terbaru</b>"
  },
  {
    itemCode: "STSI4201",
    title: "Pemrograman Berbasis Desktop",
    category: "Praktikum",
    region: "Surabaya",
    rackLocation: "R4-C1",
    price: 82000,
    qty: 14,
    safetyStock: 28,
    notesHTML: "<em>Suplemen latihan kode</em>"
  },
  {
    itemCode: "STSI4202",
    title: "Rekayasa Perangkat Lunak",
    category: "MK Wajib",
    region: "Makassar",
    rackLocation: "R4-D4",
    price: 90000,
    qty: 38,
    safetyStock: 24,
    notesHTML: "<em>Edisi cetak ulang 2024</em>"
  },
  {
    itemCode: "STSI4203",
    title: "Interaksi Manusia dan Komputer",
    category: "MK Wajib",
    region: "Padang",
    rackLocation: "R2-A3",
    price: 74000,
    qty: 21,
    safetyStock: 13,
    notesHTML: "<b>Rekomendasi dosen</b>"
  },
  {
    itemCode: "STSI4205",
    title: "Jaringan Komputer",
    category: "Praktikum",
    region: "Denpasar",
    rackLocation: "R3-B1",
    price: 88000,
    qty: 10,
    safetyStock: 19,
    notesHTML: "<em>Persediaan terbatas</em>"
  },
  {
    itemCode: "EMBS4207",
    title: "Perilaku Organisasi",
    category: "MK Wajib",
    region: "Jakarta",
    rackLocation: "R1-C4",
    price: 70000,
    qty: 45,
    safetyStock: 26,
    notesHTML: "<span>Modul cetak standar</span>"
  },
  {
    itemCode: "MKDI4203",
    title: "Kewirausahaan di Era Digital",
    category: "MK Wajib",
    region: "Surabaya",
    rackLocation: "R4-A3",
    price: 60000,
    qty: 31,
    safetyStock: 15,
    notesHTML: "<em>Edisi 2024, revisi ringkas</em>"
  },
  {
    itemCode: "STSI4204",
    title: "Analisis dan Visualisasi Data",
    category: "Praktikum",
    region: "Makassar",
    rackLocation: "R2-B4",
    price: 64000,
    qty: 23,
    safetyStock: 21,
    notesHTML: "<b>Materi studi kasus baru</b>"
  },
  {
    itemCode: "STSI4206",
    title: "Proses Bisnis",
    category: "MK Wajib",
    region: "Padang",
    rackLocation: "R1-B1",
    price: 58000,
    qty: 36,
    safetyStock: 18,
    notesHTML: "<em>Edisi standar 2023</em>"
  },
  {
    itemCode: "STSI4207",
    title: "Sistem Informasi Manajemen",
    category: "MK Wajib",
    region: "Denpasar",
    rackLocation: "R3-C2",
    price: 78000,
    qty: 16,
    safetyStock: 22,
    notesHTML: "<em>Bahan ajar utama</em>"
  },
  {
    itemCode: "STSI4208",
    title: "Analisis dan Perancangan Sistem",
    category: "MK Wajib",
    region: "Jakarta",
    rackLocation: "R4-B1",
    price: 86000,
    qty: 41,
    safetyStock: 25,
    notesHTML: "<b>Cetak ulang 2024</b>"
  },
  {
    itemCode: "STSI4209",
    title: "Pemrograman Berbasis Web",
    category: "Praktikum",
    region: "Surabaya",
    rackLocation: "R3-D3",
    price: 92000,
    qty: 26,
    safetyStock: 14,
    notesHTML: "<em>Termasuk panduan praktikum HTML/CSS</em>"
  },
  {
    itemCode: "EMBS4102",
    title: "Pengantar Bisnis",
    category: "MK Wajib",
    region: "Makassar",
    rackLocation: "R1-D2",
    price: 68000,
    qty: 47,
    safetyStock: 29,
    notesHTML: "<span>Stok melimpah</span>"
  },
  {
    itemCode: "FSAP4102",
    title: "Teori Organisasi",
    category: "MK Wajib",
    region: "Padang",
    rackLocation: "R2-C4",
    price: 66000,
    qty: 11,
    safetyStock: 10,
    notesHTML: "<em>Edisi 2022, perbaruan ringan</em>"
  },
  {
    itemCode: "FSSI4101",
    title: "Basic Reading",
    category: "MK Wajib",
    region: "Denpasar",
    rackLocation: "R1-A4",
    price: 54000,
    qty: 39,
    safetyStock: 17,
    notesHTML: "<em>Dilengkapi glossary</em>"
  },
  {
    itemCode: "STMA4111",
    title: "Kalkulus Diferensial",
    category: "MK Wajib",
    region: "Jakarta",
    rackLocation: "R2-A1",
    price: 72000,
    qty: 7,
    safetyStock: 20,
    notesHTML: "<b>Stok hampir habis</b>"
  },
  {
    itemCode: "STSI4301",
    title: "Sistem Pendukung Keputusan (Pilihan)",
    category: "Pilihan",
    region: "Surabaya",
    rackLocation: "R4-C3",
    price: 80000,
    qty: 20,
    safetyStock: 12,
    notesHTML: "<em>Modul materi pilihan</em>"
  },
  {
    itemCode: "STSI4302",
    title: "Administrasi Server (Pilihan)",
    category: "Pilihan",
    region: "Makassar",
    rackLocation: "R4-D2",
    price: 84000,
    qty: 13,
    safetyStock: 16,
    notesHTML: "<em>Edisi 2024, sistem Linux/Windows</em>"
  },
  {
    itemCode: "STSI4303",
    title: "Pemrograman Berbasis Perangkat Bergerak",
    category: "Praktikum",
    region: "Padang",
    rackLocation: "R3-C1",
    price: 94000,
    qty: 34,
    safetyStock: 27,
    notesHTML: "<b>Panduan pengembangan Android</b>"
  },
  {
    itemCode: "STSI4308",
    title: "Komunikasi Bisnis dan Teknis",
    category: "MK Wajib",
    region: "Denpasar",
    rackLocation: "R1-C3",
    price: 56000,
    qty: 28,
    safetyStock: 15,
    notesHTML: "<em>Edisi cetak 2023</em>"
  },
  {
    itemCode: "EMBS4101",
    title: "Manajemen",
    category: "MK Wajib",
    region: "Jakarta",
    rackLocation: "R1-B2",
    price: 96000,
    qty: 44,
    safetyStock: 30,
    notesHTML: "<em>Modul tebal (4 SKS)</em>"
  },
  {
    itemCode: "MKKI4301",
    title: "Pemberdayaan Masyarakat (Pilihan)",
    category: "Pilihan",
    region: "Surabaya",
    rackLocation: "R2-B1",
    price: 62000,
    qty: 17,
    safetyStock: 11,
    notesHTML: "<span>Modul pengabdian masyarakat</span>"
  },
  {
    itemCode: "STPL4211",
    title: "Sistem Informasi Perencanaan (Pilihan)",
    category: "Pilihan",
    region: "Makassar",
    rackLocation: "R3-A1",
    price: 74000,
    qty: 22,
    safetyStock: 13,
    notesHTML: "<em>Edisi 2023</em>"
  },
  {
    itemCode: "STSI4304",
    title: "Dasar Infrastruktur TI",
    category: "MK Wajib",
    region: "Padang",
    rackLocation: "R3-D4",
    price: 60000,
    qty: 37,
    safetyStock: 19,
    notesHTML: "<b>Persediaan aman</b>"
  },
  {
    itemCode: "STSI4305",
    title: "Etika Profesi",
    category: "MK Wajib",
    region: "Denpasar",
    rackLocation: "R1-D1",
    price: 52000,
    qty: 49,
    safetyStock: 28,
    notesHTML: "<em>Materi etika IT terupdate</em>"
  },
  {
    itemCode: "STSI4306",
    title: "Arsitektur dan Perancangan Sistem Enterprise",
    category: "MK Wajib",
    region: "Jakarta",
    rackLocation: "R4-A2",
    price: 98000,
    qty: 15,
    safetyStock: 10,
    notesHTML: "<em>Modul tingkat lanjut</em>"
  },
  {
    itemCode: "STSI4307",
    title: "Data Mining (Pilihan)",
    category: "Pilihan",
    region: "Surabaya",
    rackLocation: "R4-B4",
    price: 88000,
    qty: 24,
    safetyStock: 18,
    notesHTML: "<b>Edisi algoritma modern</b>"
  },
  {
    itemCode: "STSI4309",
    title: "Administrasi Jaringan (Pilihan)",
    category: "Pilihan",
    region: "Makassar",
    rackLocation: "R3-C4",
    price: 82000,
    qty: 32,
    safetyStock: 23,
    notesHTML: "<em>Panduan konfigurasi jaringan</em>"
  },
  {
    itemCode: "STSI4310",
    title: "Metodologi Penelitian",
    category: "MK Wajib",
    region: "Padang",
    rackLocation: "R2-D1",
    price: 70000,
    qty: 43,
    safetyStock: 25,
    notesHTML: "<em>Edisi penulisan karya ilmiah</em>"
  },
  {
    itemCode: "STDA4101",
    title: "Pengantar Sains Data",
    category: "MK Wajib",
    region: "Denpasar",
    rackLocation: "R2-C3",
    price: 76000,
    qty: 27,
    safetyStock: 16,
    notesHTML: "<span>Dasar Python & analisis data</span>"
  },
  {
    itemCode: "STSI4402",
    title: "Tata Kelola Teknologi Informasi",
    category: "MK Wajib",
    region: "Jakarta",
    rackLocation: "R4-D1",
    price: 64000,
    qty: 19,
    safetyStock: 12,
    notesHTML: "<em>Kerangka kerja COBIT / ITIL</em>"
  },
  {
    itemCode: "STSI4403",
    title: "Manajemen Resiko dan Audit Sistem Informasi",
    category: "MK Wajib",
    region: "Surabaya",
    rackLocation: "R4-C4",
    price: 90000,
    qty: 9,
    safetyStock: 15,
    notesHTML: "<b>Perlu pengadaan ulang</b>"
  },
  {
    itemCode: "STSI4404",
    title: "Keamanan Jaringan (Pilihan)",
    category: "Pilihan",
    region: "Makassar",
    rackLocation: "R3-A3",
    price: 86000,
    qty: 28,
    safetyStock: 22,
    notesHTML: "<em>Modul keamanan siber</em>"
  },
  {
    itemCode: "STSI4409",
    title: "Data Warehouse (Pilihan)",
    category: "Pilihan",
    region: "Padang",
    rackLocation: "R4-A4",
    price: 84000,
    qty: 16,
    safetyStock: 14,
    notesHTML: "<em>Materi perancangan ETL</em>"
  },
  {
    itemCode: "STSI4440",
    title: "Capstone Project (Pilihan)",
    category: "Pilihan",
    region: "Denpasar",
    rackLocation: "R4-B3",
    price: 100000,
    qty: 5,
    safetyStock: 10,
    notesHTML: "<b>Panduan tugas akhir 6 SKS</b>"
  },
  {
    itemCode: "EACC4207",
    title: "Sistem Informasi Akuntansi",
    category: "MK Wajib",
    region: "Jakarta",
    rackLocation: "R1-D3",
    price: 78000,
    qty: 33,
    safetyStock: 20,
    notesHTML: "<em>Stok cetak ulang 2024</em>"
  },
  {
    itemCode: "STSI4405",
    title: "Keamanan Sistem Informasi",
    category: "MK Wajib",
    region: "Surabaya",
    rackLocation: "R2-A2",
    price: 66000,
    qty: 25,
    safetyStock: 17,
    notesHTML: "<em>Materi enkripsi dan proteksi</em>"
  },
  {
    itemCode: "STSI4406",
    title: "Manajemen Proyek Sistem Informasi",
    category: "MK Wajib",
    region: "Makassar",
    rackLocation: "R2-B3",
    price: 70000,
    qty: 38,
    safetyStock: 19,
    notesHTML: "<span>Panduan Agile & Waterfall</span>"
  },
  {
    itemCode: "STSI4407",
    title: "Manajemen Layanan Teknologi Informasi",
    category: "MK Wajib",
    region: "Padang",
    rackLocation: "R3-D2",
    price: 72000,
    qty: 21,
    safetyStock: 11,
    notesHTML: "<em>Edisi 2024</em>"
  },
  {
    itemCode: "STSI4408",
    title: "E-Bisnis",
    category: "MK Wajib",
    region: "Denpasar",
    rackLocation: "R1-C1",
    price: 80000,
    qty: 46,
    safetyStock: 26,
    notesHTML: "<em>Modul strategi e-commerce</em>"
  }
];

