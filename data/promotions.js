/**
 * CONSOLE HUB - Data Promosi & Kupon Voucher Diskon
 */

const promoBanners = [
  {
    id: "banner-1",
    title: "WEEKEND RENTAL FIESTA!",
    subtitle: "Sewa PlayStation 5 & Nintendo Switch Diskon 15%",
    code: "WEEKENDGAS",
    tag: "PROMO TERBATAS",
    bgGradient: "from-blue-700 via-indigo-800 to-purple-900",
    buttonText: "Klaim Voucher",
    description: "Nikmati liburan akhir pekan main game AAA tanpa ribet beli konsol. Sudah termasuk 2 stik & 3 game bebas pilih."
  },
  {
    id: "banner-2",
    title: "MEMBER BARU POTONGAN RP 50.000",
    subtitle: "Berlaku untuk transaksi Sewa maupun Beli Unit Pertama",
    code: "GAMERBARU",
    tag: "SPESIAL MEMBER",
    bgGradient: "from-emerald-700 via-teal-800 to-cyan-900",
    buttonText: "Pakai Kupon",
    description: "Daftar dan checkout transaksi pertamamu sekarang! Minimal belanja atau sewa hanya Rp 200.000."
  },
  {
    id: "banner-3",
    title: "UPGRADE & SERVIS WORKSHOP",
    subtitle: "Sewa Tools Reparasi atau Beli Sparepart Anti-Drift",
    code: "SERVISPRO",
    tag: "TEKNISI & MODDER",
    bgGradient: "from-amber-600 via-orange-700 to-red-900",
    buttonText: "Lihat Tools",
    description: "Tersedia toolkit iFixit presisi, solder uap Kaisi, liquid metal PS5, dan modul joystick Hall Effect anti drift."
  }
];

const coupons = [
  {
    code: "GAMERBARU",
    name: "Diskon Member Baru Rp 50.000",
    type: "fixed", // Potongan nominal langsung
    value: 50000,
    minOrder: 200000,
    applicableTo: "all", // 'rental', 'buy', 'all'
    description: "Potongan Rp 50.000 untuk minimal transaksi Rp 200.000"
  },
  {
    code: "WEEKENDGAS",
    name: "Diskon Sewa Weekend 15%",
    type: "percent",
    value: 15, // 15%
    maxDiscount: 100000,
    minOrder: 150000,
    applicableTo: "rental",
    description: "Diskon 15% khusus biaya sewa (maksimal potongan Rp 100.000)"
  },
  {
    code: "SEWAHEMAT",
    name: "Sewa Mingguan Super Hemat 20%",
    type: "percent",
    value: 20,
    maxDiscount: 150000,
    minOrder: 250000,
    applicableTo: "rental",
    description: "Diskon 20% khusus pesanan rental dengan durasi 7 hari atau lebih"
  },
  {
    code: "SERVISPRO",
    name: "Voucher Diskon Tools & Parts Rp 25.000",
    type: "fixed",
    value: 25000,
    minOrder: 100000,
    applicableTo: "tools",
    description: "Potongan Rp 25.000 untuk pembelian atau sewa kategori Tools/Servis"
  }
];

if (typeof window !== "undefined") {
  window.CONSOLE_BANNERS = promoBanners;
  window.CONSOLE_COUPONS = coupons;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { promoBanners, coupons };
}
