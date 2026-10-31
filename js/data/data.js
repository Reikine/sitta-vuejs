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
    items: ["BIOL4201", "FISIP4001"],
    price: 135000
  },
  {
    code: "PAKET-UT-003",
    name: "Paket Praktikum Basis Data dan Struktur Data",
    items: ["STSI4104", "STSI4105"],
    price: 170000
  },
  {
    code: "PAKET-UT-004",
    name: "Paket Pengembangan Web dan Mobile",
    items: ["STSI4209", "STSI4303"],
    price: 186000
  }
];

export const initialStockData = [
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
];
