/**
 * CONSOLE HUB - Master Data Produk (20 Dummy Products)
 * Mencakup: Konsol Game, Suku Cadang/Tools Servis, Aksesoris, & Game Fisik
 * Mendukung model hybrid: Sewa (Rental) dan Beli (Retail)
 * v2.0 — tambahan: isOnSale, originalPrice, discountPrice, reviews[]
 */

const products = [
  {
    id: "prod-01",
    name: "PlayStation 5 Slim Disc Edition",
    category: "console",
    categoryLabel: "Konsol Game",
    brand: "Sony PlayStation",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
    description: "Konsol generasi terbaru dari Sony dengan optical drive Ultra HD Blu-ray, grafis 4K 120Hz, ray tracing, dan controller haptic DualSense yang memukau.",
    specs: [
      "Prosesor: Custom AMD Zen 2 (8-core, 3.5 GHz)",
      "Grafis: Custom RDNA 2 10.28 TFLOPs",
      "Penyimpanan: 1TB Custom NVMe SSD",
      "Drive Optik: Ultra HD Blu-ray (4K)",
      "Kelengkapan Rental: 1 Unit PS5, 2 DualSense Controller, Kabel HDMI 2.1, Kabel Power, 3 Game Pilihan"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 8900000,
    originalPrice: 9500000,
    discountPrice: 8900000,
    isOnSale: false,
    rentPricePerDay: 120000,
    rentPricePerWeek: 700000,
    securityDeposit: 500000,
    stockReady: 8,
    stockRented: 5,
    nextAvailableDate: "2026-09-11",
    promo: {
      hasPromo: true,
      badgeText: "Diskon 15% Sewa Weekend",
      discountPercent: 15,
      promoType: "rental",
      promoDescription: "Gunakan kupon WEEKENDGAS untuk diskon 15% biaya sewa konsol minimal 2 hari!"
    },
    rentalTerms: [
      "Wajib menyertakan foto e-KTP dan 1 identitas pendukung (SIM/NPWP/KK)",
      "Deposit jaminan Rp 500.000 akan dikembalikan 100% setelah unit dicek utuh",
      "Termasuk garansi unit pengganti jika ada kendala teknis non-human error"
    ],
    rating: 4.9,
    reviewsCount: 142,
    reviews: [
      { id: "rv-01-1", reviewer: "Andi Prasetyo", avatar: "AP", rating: 5, date: "2026-08-15", comment: "Konsol bersih, controller responsif banget. PS5 Slim emang ringan dan kecil. Recommended buat yang pengen main Spider-Man 2 sama God of War Ragnarok!", type: "rent" },
      { id: "rv-01-2", reviewer: "Reni Susanti", avatar: "RS", rating: 5, date: "2026-08-20", comment: "Sewa 3 hari buat weekend marathon, kondisi unit mulus kayak baru. Deposit balik semua. Paling suka DualSense-nya yang kerasa banget getarannya!", type: "rent" },
      { id: "rv-01-3", reviewer: "Budi Santoso", avatar: "BS", rating: 5, date: "2026-09-01", comment: "Beli unit-nya worth banget, harga lebih murah dari tempat lain dan dapat garansi 1 tahun. Pengiriman cepat, packing aman.", type: "buy" },
      { id: "rv-01-4", reviewer: "Nadia Putri", avatar: "NP", rating: 4, date: "2026-09-05", comment: "Oke sih, tapi waktu pickup lumayan lama nunggu konfirmasi. Unitnya sendiri bagus, game pilihan-nya seru-seru.", type: "rent" }
    ]
  },
  {
    id: "prod-02",
    name: "PlayStation 5 Digital Edition (Slim)",
    category: "console",
    categoryLabel: "Konsol Game",
    brand: "Sony PlayStation",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    description: "Edisi ramping PS5 tanpa drive disc optik, ideal untuk gamer serba digital dengan akun PlayStation Plus Extra/Deluxe.",
    specs: [
      "Penyimpanan: 1TB Custom SSD",
      "Resolusi: Hingga 4K 120Hz / 8K output",
      "Audio: Tempest 3D AudioTech",
      "Kelengkapan Rental: 1 Unit PS5 Digital, 2 Controller, Akun PSN terisi 15+ game populer"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 7600000,
    originalPrice: 8200000,
    discountPrice: 7600000,
    isOnSale: true,
    rentPricePerDay: 100000,
    rentPricePerWeek: 580000,
    securityDeposit: 400000,
    stockReady: 4,
    stockRented: 6,
    nextAvailableDate: "2026-09-10",
    promo: {
      hasPromo: true,
      badgeText: "Best Value",
      discountPercent: 10,
      promoType: "all",
      promoDescription: "Diskon 10% sewa mingguan, sudah include akses PS Plus Deluxe!"
    },
    rentalTerms: [
      "Wajib verifikasi KTP & domisili jelas",
      "Dilarang mengubah kredensial akun PSN bawaan unit",
      "Deposit jaminan Rp 400.000 dikembalikan saat selesai sewa"
    ],
    rating: 4.8,
    reviewsCount: 98,
    reviews: [
      { id: "rv-02-1", reviewer: "Kevin Lie", avatar: "KL", rating: 5, date: "2026-08-10", comment: "Sewa buat main Baldur's Gate 3 seminggu, nyaman banget! Akun PSN-nya banyak game gratis. Recommended banget buat yang budget terbatas.", type: "rent" },
      { id: "rv-02-2", reviewer: "Sari Dewi", avatar: "SD", rating: 4, date: "2026-08-22", comment: "Unitnya mulus, tapi lebih suka versi disc edition karena bisa main kaset. Selain itu oke banget!", type: "rent" },
      { id: "rv-02-3", reviewer: "Arif Rahman", avatar: "AR", rating: 5, date: "2026-09-03", comment: "Beli setelah coba sewa 2x. Kondisi unit seperti baru, ada garansi resmi. Harga paling kompetitif di pasaran.", type: "buy" }
    ]
  },
  {
    id: "prod-03",
    name: "Nintendo Switch OLED - Zelda Tears Edition",
    category: "console",
    categoryLabel: "Konsol Game",
    brand: "Nintendo",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80",
    description: "Nintendo Switch OLED edisi spesial The Legend of Zelda: Tears of the Kingdom, dengan layar OLED 7 inci cerah untuk gaming portabel maupun docked.",
    specs: [
      "Layar: 7 inci OLED (1280x720 portable, 1080p docked)",
      "Baterai: 4.5 – 9 jam",
      "Penyimpanan: 64GB Internal + Slot MicroSD",
      "Kelengkapan: Joy-Con Gold Edition, Zelda Dock, Case eksklusif"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 5200000,
    originalPrice: 5200000,
    discountPrice: 4600000,
    isOnSale: true,
    rentPricePerDay: 65000,
    rentPricePerWeek: 390000,
    securityDeposit: 300000,
    stockReady: 6,
    stockRented: 3,
    nextAvailableDate: "2026-09-09",
    promo: {
      hasPromo: true,
      badgeText: "Hemat 11.5%",
      discountPercent: 11,
      promoType: "buy",
      promoDescription: "Harga spesial Rp 4.600.000 untuk unit Zelda Edition! Stok terbatas."
    },
    rentalTerms: [
      "Deposit Rp 300.000 untuk unit + Joy-Con",
      "Tidak diperkenankan mengakses Nintendo eShop dengan akun sendiri",
      "Dikembalikan beserta case dan semua aksesori lengkap"
    ],
    rating: 4.9,
    reviewsCount: 211,
    reviews: [
      { id: "rv-03-1", reviewer: "Hana Pratiwi", avatar: "HP", rating: 5, date: "2026-07-20", comment: "Edisi Zelda ini luar biasa! Joy-Con warnanya kece, layar OLED-nya tajam banget. Sewa buat liburan keluarga, anak-anak senang!", type: "rent" },
      { id: "rv-03-2", reviewer: "Dimas Kurniawan", avatar: "DK", rating: 5, date: "2026-08-05", comment: "Beli unit ini karena desainnya eksklusif. Kondisi mint, ada bonus case. Harga sale-nya worth banget.", type: "buy" },
      { id: "rv-03-3", reviewer: "Fitri Anggraini", avatar: "FA", rating: 4, date: "2026-08-18", comment: "Sewa seminggu buat main Zelda TotK, pengalaman luar biasa! Joy-Con-nya masih mulus, tidak ada drift.", type: "rent" },
      { id: "rv-03-4", reviewer: "Rizky Maulana", avatar: "RM", rating: 5, date: "2026-09-02", comment: "Unit limited edition seperti ini jarang ada yang mau sewain. Langsung beli setelah lihat kualitasnya. Best purchase ever!", type: "buy" }
    ]
  },
  {
    id: "prod-04",
    name: "Xbox Series X - 1TB SSD",
    category: "console",
    categoryLabel: "Konsol Game",
    brand: "Microsoft Xbox",
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80",
    description: "Konsol paling powerful dari Microsoft dengan GPU 12 TFLOPs, Quick Resume untuk berpindah game instan, dan akses Game Pass Ultimate dengan 100+ game.",
    specs: [
      "GPU: 12 TFLOPs Custom RDNA 2",
      "CPU: Custom AMD Zen 2 (8-core, 3.8 GHz)",
      "Penyimpanan: 1TB Custom NVMe SSD (1TB/s)",
      "Resolusi: 4K 60fps native, hingga 8K output"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 8200000,
    originalPrice: 8200000,
    discountPrice: 8200000,
    isOnSale: false,
    rentPricePerDay: 100000,
    rentPricePerWeek: 600000,
    securityDeposit: 450000,
    stockReady: 5,
    stockRented: 4,
    nextAvailableDate: "2026-09-12",
    promo: {
      hasPromo: false,
      badgeText: "",
      discountPercent: 0,
      promoType: "none",
      promoDescription: ""
    },
    rentalTerms: [
      "Deposit Rp 450.000 untuk unit Xbox + Controller",
      "Akun Game Pass Ultimate sudah tersedia, dilarang mengubah password",
      "Kembalikan dalam kondisi sama seperti saat diterima"
    ],
    rating: 4.7,
    reviewsCount: 87,
    reviews: [
      { id: "rv-04-1", reviewer: "Galih Permana", avatar: "GP", rating: 5, date: "2026-08-12", comment: "Xbox Series X emang raja 4K gaming! Quick Resume-nya keren, bisa lompat-lompat antar game tanpa loading. Game Pass-nya isi game AAA semua.", type: "rent" },
      { id: "rv-04-2", reviewer: "Tiara Wulandari", avatar: "TW", rating: 4, date: "2026-08-25", comment: "Performa top, tapi ukurannya gede banget kayak menara. Unit bersih dan responsive. Game Pass Ultimate-nya lengkap.", type: "rent" },
      { id: "rv-04-3", reviewer: "Fajar Nugroho", avatar: "FN", rating: 5, date: "2026-09-07", comment: "Beli unit ini karena mau main Forza Motorsport dan Starfield. Kualitas unit bagus, pengiriman tepat waktu.", type: "buy" }
    ]
  },
  {
    id: "prod-05",
    name: "Steam Deck OLED 512GB",
    category: "console",
    categoryLabel: "Konsol Game",
    brand: "Valve",
    image: "https://images.unsplash.com/photo-1707143775807-b3a6b487a8ef?auto=format&fit=crop&w=800&q=80",
    description: "Handheld gaming PC dari Valve dengan layar OLED HDR 7.4 inci, koneksi WiFi 6E, baterai lebih tahan lama, dan akses ke seluruh library Steam Anda.",
    specs: [
      "Layar: 7.4 inci OLED HDR (1280x800, 90Hz)",
      "APU: AMD Zen 2 4-core + RDNA 2 (8 CU)",
      "RAM: 16GB LPDDR5",
      "Penyimpanan: 512GB NVMe SSD",
      "Baterai: 50Wh (2-12 jam tergantung game)"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 7800000,
    originalPrice: 8500000,
    discountPrice: 7800000,
    isOnSale: true,
    rentPricePerDay: 95000,
    rentPricePerWeek: 560000,
    securityDeposit: 400000,
    stockReady: 3,
    stockRented: 4,
    nextAvailableDate: "2026-09-13",
    promo: {
      hasPromo: true,
      badgeText: "Sale 8% Off",
      discountPercent: 8,
      promoType: "buy",
      promoDescription: "Harga spesial pembelian Steam Deck OLED 512GB, hemat Rp 700.000!"
    },
    rentalTerms: [
      "Deposit Rp 400.000, sudah termasuk akun Steam dengan 30+ game terinstal",
      "Tidak boleh uninstall game atau mengubah settingan akun Steam",
      "Kembalikan dengan charger dan case bawaan unit"
    ],
    rating: 4.8,
    reviewsCount: 134,
    reviews: [
      { id: "rv-05-1", reviewer: "Yusuf Hakim", avatar: "YH", rating: 5, date: "2026-07-30", comment: "Steam Deck OLED ini game changer buat gaming mobile. Layarnya jauh lebih enak dari versi LCD. Library Steam-nya lengkap banget.", type: "rent" },
      { id: "rv-05-2", reviewer: "Mira Sari", avatar: "MS", rating: 5, date: "2026-08-14", comment: "Beli karena harganya lagi sale. Kondisi unit new, worth it banget buat harga segitu. Gaming PC portable yang sesungguhnya!", type: "buy" },
      { id: "rv-05-3", reviewer: "Eko Prasetya", avatar: "EP", rating: 4, date: "2026-08-28", comment: "Sewa 5 hari buat cobain sebelum beli. Performanya keren, tapi agak berat dipegang lama-lama. Overall recommended.", type: "rent" }
    ]
  },
  {
    id: "prod-06",
    name: "ASUS ROG Ally X - Ryzen Z1 Extreme",
    category: "console",
    categoryLabel: "Konsol Game",
    brand: "ASUS ROG",
    image: "https://images.unsplash.com/photo-1633436375153-d7045cb93a38?auto=format&fit=crop&w=800&q=80",
    description: "Handheld gaming PC Windows 11 dari ASUS ROG dengan APU AMD Ryzen Z1 Extreme, layar 120Hz FHD, dan baterai 80Wh terbesar di kelasnya.",
    specs: [
      "APU: AMD Ryzen Z1 Extreme (8-core, 12 CU RDNA 3)",
      "Layar: 7 inci IPS FHD 120Hz",
      "RAM: 24GB LPDDR5X",
      "Penyimpanan: 1TB NVMe SSD",
      "Baterai: 80Wh (2-8 jam)"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 11500000,
    originalPrice: 12500000,
    discountPrice: 11500000,
    isOnSale: true,
    rentPricePerDay: 130000,
    rentPricePerWeek: 780000,
    securityDeposit: 600000,
    stockReady: 2,
    stockRented: 5,
    nextAvailableDate: "2026-09-15",
    promo: {
      hasPromo: true,
      badgeText: "Hemat 8% Beli",
      discountPercent: 8,
      promoType: "buy",
      promoDescription: "Harga spesial untuk ROG Ally X, unit terbatas!"
    },
    rentalTerms: [
      "Deposit Rp 600.000 untuk unit ROG Ally X",
      "Windows 11 sudah aktif, jangan factory reset",
      "Kembalikan dengan charger ROG 65W dan case ROG"
    ],
    rating: 4.7,
    reviewsCount: 76,
    reviews: [
      { id: "rv-06-1", reviewer: "Hendri Kurnia", avatar: "HK", rating: 5, date: "2026-08-08", comment: "ROG Ally X baterai 80Wh ini endgame banget! Bisa gaming 5 jam non-stop. Windows 11 full, jadi bisa install apa aja.", type: "rent" },
      { id: "rv-06-2", reviewer: "Wulan Astuti", avatar: "WA", rating: 4, date: "2026-08-20", comment: "Performa luar biasa, tapi agak panas kalau di-push full. Fan-nya lumayan berisik tapi wajar untuk GPU 12 CU. Sale price-nya worth.", type: "buy" }
    ]
  },
  {
    id: "prod-07",
    name: "PlayStation 4 Pro 1TB (Refurbished A+)",
    category: "console",
    categoryLabel: "Konsol Game",
    brand: "Sony PlayStation",
    image: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?auto=format&fit=crop&w=800&q=80",
    description: "PlayStation 4 Pro refurbished grade A+ dengan output 4K upscaled, HDR, dan library game PS4 terlengkap. Pilihan budget terbaik untuk gaming keluarga.",
    specs: [
      "GPU: AMD GCN 4.2 TFLOPs (4K upscaled, HDR)",
      "Penyimpanan: 1TB HDD (dapat upgrade SSD)",
      "Kondisi: Refurbished Grade A+ (teruji 72 jam burn-in)",
      "Kelengkapan: 2 Controller DualShock 4, 10 Game BD"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 2600000,
    originalPrice: 3000000,
    discountPrice: 2600000,
    isOnSale: true,
    rentPricePerDay: 40000,
    rentPricePerWeek: 240000,
    securityDeposit: 200000,
    stockReady: 10,
    stockRented: 8,
    nextAvailableDate: "2026-09-09",
    promo: {
      hasPromo: true,
      badgeText: "Budget Best Pick",
      discountPercent: 13,
      promoType: "buy",
      promoDescription: "PS4 Pro refurbished terbaik harga terjangkau, garansi 6 bulan!"
    },
    rentalTerms: [
      "Deposit Rp 200.000 untuk unit PS4 Pro",
      "Tersedia 10 judul game pilihan, pilih 3 per periode sewa",
      "Garansi penggantian unit jika ada kerusakan non-pemakai"
    ],
    rating: 4.6,
    reviewsCount: 203,
    reviews: [
      { id: "rv-07-1", reviewer: "Pak Bambang", avatar: "PB", rating: 5, date: "2026-07-15", comment: "Beli buat anak-anak main di rumah, kondisi mulus kayak baru. Harga Rp 2.6jt worth banget, library game PS4 bejibun!", type: "buy" },
      { id: "rv-07-2", reviewer: "Citra Lestari", avatar: "CL", rating: 4, date: "2026-08-02", comment: "Sewa 2 minggu, kondisi unit oke. Nggak ada drift, controller lancar. Budget-friendly banget!", type: "rent" },
      { id: "rv-07-3", reviewer: "Ahmad Fauzi", avatar: "AF", rating: 5, date: "2026-08-17", comment: "Refurbished tapi kualitasnya premium. Sudah test 3 hari, tidak ada masalah sama sekali. Recommended!", type: "buy" }
    ]
  },
  {
    id: "prod-08",
    name: "iFixit Pro Tech Toolkit - 64 Bit Driver Kit",
    category: "tools",
    categoryLabel: "Tools & Reparasi",
    brand: "iFixit",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
    description: "Toolkit profesional 64-in-1 dari iFixit untuk membongkar dan memperbaiki PlayStation, Nintendo Switch, Xbox, dan berbagai elektronik. Mata bor presisi tinggi dengan magnet.",
    specs: [
      "64 mata bor presisi (Phillips, Torx, Pentalobe, Tri-wing, dll)",
      "Driver handle ESD-safe anti-statik",
      "Termasuk spudger, tweezer, opening picks, suction cup",
      "Case aluminium tahan banting",
      "Garansi seumur hidup dari iFixit"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 890000,
    originalPrice: 890000,
    discountPrice: 890000,
    isOnSale: false,
    rentPricePerDay: 18000,
    rentPricePerWeek: 100000,
    securityDeposit: 100000,
    stockReady: 15,
    stockRented: 3,
    nextAvailableDate: "2026-09-09",
    promo: {
      hasPromo: true,
      badgeText: "Kupon SERVISPRO",
      discountPercent: 0,
      promoType: "rental",
      promoDescription: "Gunakan SERVISPRO untuk diskon Rp 25.000 sewa toolkit reparasi!"
    },
    rentalTerms: [
      "Kembalikan semua 64 mata bor dalam case aluminium",
      "Deposit Rp 100.000 untuk keamanan toolkit",
      "Tersedia layanan antar-jemput untuk teknisi langganan"
    ],
    rating: 4.8,
    reviewsCount: 67,
    reviews: [
      { id: "rv-08-1", reviewer: "Mas Teknisi Budi", avatar: "MB", rating: 5, date: "2026-08-01", comment: "Toolkit lengkap banget! Semua bit yang dibutuhkan buat servis PS5, Switch, ROG Ally ada. Presisi tinggi, tidak mudah dol.", type: "buy" },
      { id: "rv-08-2", reviewer: "Deni Repair", avatar: "DR", rating: 5, date: "2026-08-19", comment: "Sewa buat servis 5 unit PS4, sangat membantu. Driver handle-nya ergonomis dan magnet bit-nya kuat.", type: "rent" }
    ]
  },
  {
    id: "prod-09",
    name: "Thermal Grizzly Kryonaut Extreme 2g",
    category: "tools",
    categoryLabel: "Tools & Reparasi",
    brand: "Thermal Grizzly",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    description: "Thermal paste premium dengan konduktivitas termal 14.2 W/m·K, solusi terbaik untuk repaste APU PS5, PS4 Pro, Steam Deck, dan ROG Ally yang overheat.",
    specs: [
      "Konduktivitas Termal: 14.2 W/m·K (tertinggi di kelasnya)",
      "Viskositas: Mudah diaplikasikan, tidak messy",
      "Volume: 2 gram (cukup untuk 2-3 unit konsol)",
      "Non-conductive, Non-capacitive, Non-corrosive",
      "Termasuk spatula aplikator presisi"
    ],
    isRentable: false,
    isBuyable: true,
    buyPrice: 195000,
    originalPrice: 220000,
    discountPrice: 195000,
    isOnSale: true,
    rentPricePerDay: 0,
    rentPricePerWeek: 0,
    securityDeposit: 0,
    stockReady: 25,
    stockRented: 0,
    nextAvailableDate: null,
    promo: {
      hasPromo: true,
      badgeText: "Sale 11%",
      discountPercent: 11,
      promoType: "buy",
      promoDescription: "Harga promo thermal paste terbaik untuk repaste konsol overheat!"
    },
    rentalTerms: [],
    rating: 4.9,
    reviewsCount: 89,
    reviews: [
      { id: "rv-09-1", reviewer: "Rizal Teknisi", avatar: "RT", rating: 5, date: "2026-07-25", comment: "Thermal paste terbaik yang pernah aku pakai. Suhu PS5 drop dari 82°C ke 68°C setelah repaste pakai Kryonaut Extreme ini!", type: "buy" },
      { id: "rv-09-2", reviewer: "Ike Elektronik", avatar: "IE", rating: 5, date: "2026-08-11", comment: "Harga promo lumayan murah untuk kualitas top tier. 2 gram cukup buat repaste 2 unit PS5. Direkomendasikan.", type: "buy" },
      { id: "rv-09-3", reviewer: "Pak Servis Pro", avatar: "SP", rating: 4, date: "2026-09-01", comment: "Kualitas premium. Satu-satunya kekurangan adalah sedikit susah karena viskositas agak kental. Tapi hasilnya luar biasa.", type: "buy" }
    ]
  },
  {
    id: "prod-10",
    name: "Kaisi 863 Solder Rework Station 862D+",
    category: "tools",
    categoryLabel: "Tools & Reparasi",
    brand: "Kaisi",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
    description: "Soldering + Hot Air Rework Station 2-in-1 untuk repair motherboard konsol, BGA reballing, dan komponen SMD. Suhu presisi 100-480°C.",
    specs: [
      "Soldering Iron: 60W, suhu 100-480°C adjustable",
      "Hot Air Gun: 700W, airflow & suhu terpisah",
      "Layar digital dual display",
      "Tip yang disertakan: Chisel, Conical, Bevel",
      "Cocok untuk: PS5 HDMI port, BGA reballing, kapasitor"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 580000,
    originalPrice: 650000,
    discountPrice: 580000,
    isOnSale: true,
    rentPricePerDay: 45000,
    rentPricePerWeek: 265000,
    securityDeposit: 200000,
    stockReady: 5,
    stockRented: 2,
    nextAvailableDate: "2026-09-09",
    promo: {
      hasPromo: true,
      badgeText: "Kupon SERVISPRO",
      discountPercent: 0,
      promoType: "rental",
      promoDescription: "Kupon SERVISPRO berlaku untuk diskon Rp 25.000!"
    },
    rentalTerms: [
      "Deposit Rp 200.000 untuk station",
      "Kembalikan dengan semua tip dan accessories",
      "Wajib bersihkan ujung solder sebelum dikembalikan"
    ],
    rating: 4.6,
    reviewsCount: 44,
    reviews: [
      { id: "rv-10-1", reviewer: "Yanto Repair", avatar: "YR", rating: 5, date: "2026-08-05", comment: "Beli untuk kebutuhan workshop. Solder station 2-in-1 ini harganya sangat terjangkau untuk kualitas segini. Hot air gun-nya stabil.", type: "buy" },
      { id: "rv-10-2", reviewer: "Servis Kilat", avatar: "SK", rating: 4, date: "2026-08-22", comment: "Sewa buat repair HDMI port PS5 dan BGA reballing. Kerjanya presisi. Layar digital memudahkan kontrol suhu.", type: "rent" }
    ]
  },
  {
    id: "prod-11",
    name: "Nintendo Switch RCM Jig + SD Loader Kit",
    category: "tools",
    categoryLabel: "Tools & Reparasi",
    brand: "Generic Pro",
    image: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?auto=format&fit=crop&w=800&q=80",
    description: "Paket lengkap RCM Jig untuk masuk Recovery Mode Nintendo Switch (OLED/V1/V2/Lite), dilengkapi USB-C loader, SD card adapter, dan panduan CFW.",
    specs: [
      "RCM Jig berbahan aluminium (V1/V2/OLED compatible)",
      "USB-C SD Card Loader (RCM payload injector)",
      "MicroSD 64GB Class 10 sudah di-format FAT32",
      "Panduan install Atmosphère CFW + Homebrew"
    ],
    isRentable: false,
    isBuyable: true,
    buyPrice: 145000,
    originalPrice: 175000,
    discountPrice: 145000,
    isOnSale: true,
    rentPricePerDay: 0,
    rentPricePerWeek: 0,
    securityDeposit: 0,
    stockReady: 20,
    stockRented: 0,
    nextAvailableDate: null,
    promo: {
      hasPromo: true,
      badgeText: "Sale 17%",
      discountPercent: 17,
      promoType: "buy",
      promoDescription: "Paket RCM Kit Switch hemat 17%, stok terbatas!"
    },
    rentalTerms: [],
    rating: 4.5,
    reviewsCount: 56,
    reviews: [
      { id: "rv-11-1", reviewer: "Modder Pro", avatar: "MP", rating: 5, date: "2026-08-03", comment: "Kit lengkap, jig fit sempurna di slot Joy-Con. MicroSD sudah siap pakai. Harga murah untuk kualitas aluminium.", type: "buy" },
      { id: "rv-11-2", reviewer: "DIY Switch", avatar: "DS", rating: 4, date: "2026-09-01", comment: "Bekerja dengan baik untuk Switch V1. Panduan CFW-nya detail banget. Sale price sangat worth!", type: "buy" }
    ]
  },
  {
    id: "prod-12",
    name: "Hall Effect Joystick Kit - Anti Drift PS4/PS5/Xbox",
    category: "tools",
    categoryLabel: "Tools & Reparasi",
    brand: "GuliKit",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    description: "Modul joystick Hall Effect pengganti dari GuliKit, solusi permanen untuk masalah analog drift pada controller PS4, PS5 DualSense, dan Xbox Series. Drop-in replacement.",
    specs: [
      "Teknologi: Hall Effect Magnetic (tanpa plastik kontak fisik)",
      "Kompatibel: DualSense PS5, DualShock 4 PS4, Xbox Series X/S",
      "Keawetan: 5 juta siklus (vs 2 juta siklus OEM)",
      "Performa: Zero drift, respons ultra-presisi",
      "Paket: 2x joystick + 2x ABXY button + tool"
    ],
    isRentable: false,
    isBuyable: true,
    buyPrice: 265000,
    originalPrice: 310000,
    discountPrice: 265000,
    isOnSale: true,
    rentPricePerDay: 0,
    rentPricePerWeek: 0,
    securityDeposit: 0,
    stockReady: 30,
    stockRented: 0,
    nextAvailableDate: null,
    promo: {
      hasPromo: true,
      badgeText: "Sale 14.5%",
      discountPercent: 14,
      promoType: "buy",
      promoDescription: "Solusi anti-drift terbaik, harga promo terbatas!"
    },
    rentalTerms: [],
    rating: 4.9,
    reviewsCount: 112,
    reviews: [
      { id: "rv-12-1", reviewer: "Gamer Anti Drift", avatar: "GA", rating: 5, date: "2026-07-22", comment: "Pasang GuliKit di DualSense, drift langsung hilang! Sudah 3 bulan tidak ada masalah. Teknologi Hall Effect memang beda level.", type: "buy" },
      { id: "rv-12-2", reviewer: "Servis Controller", avatar: "SC", rating: 5, date: "2026-08-09", comment: "Sudah install 50+ unit pakai GuliKit ini. Zero complaint dari customer. Drop-in replacement yang mudah dipasang.", type: "buy" },
      { id: "rv-12-3", reviewer: "Pro Gamer ID", avatar: "PG", rating: 5, date: "2026-08-30", comment: "Beli 2 set buat 2 controller PS5. Harga sale sangat worth. Respons lebih presisi dari stick original!", type: "buy" }
    ]
  },
  {
    id: "prod-13",
    name: "Console Cleaning Pro Kit - Ultrasonic + Brush Set",
    category: "tools",
    categoryLabel: "Tools & Reparasi",
    brand: "CleanTech Pro",
    image: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&w=800&q=80",
    description: "Kit pembersih konsol profesional lengkap dengan cairan isopropyl 99%, brush PCB anti-statik, compressed air kaleng, dan microfiber khusus optik Blu-ray.",
    specs: [
      "Isopropyl Alcohol 99% - 100ml (IPA non-ionik)",
      "Brush set: PCB brush, crevice brush, lens brush",
      "Compressed Air 400ml (HFC-free)",
      "Microfiber non-scratch 30x30cm x2",
      "Cotton swab presisi x20"
    ],
    isRentable: false,
    isBuyable: true,
    buyPrice: 95000,
    originalPrice: 95000,
    discountPrice: 95000,
    isOnSale: false,
    rentPricePerDay: 0,
    rentPricePerWeek: 0,
    securityDeposit: 0,
    stockReady: 40,
    stockRented: 0,
    nextAvailableDate: null,
    promo: {
      hasPromo: false,
      badgeText: "",
      discountPercent: 0,
      promoType: "none",
      promoDescription: ""
    },
    rentalTerms: [],
    rating: 4.7,
    reviewsCount: 78,
    reviews: [
      { id: "rv-13-1", reviewer: "Console Care", avatar: "CC", rating: 5, date: "2026-08-04", comment: "Kit lengkap untuk maintenance konsol. IPA 99%-nya bersih banget, cocok untuk PCB dan optik disc. Harga affordable.", type: "buy" },
      { id: "rv-13-2", reviewer: "Bersih Optimal", avatar: "BO", rating: 4, date: "2026-08-21", comment: "Compressed air-nya powerful, dust langsung keluar dari ventilasi PS5. Microfiber tidak meninggalkan goresan.", type: "buy" }
    ]
  },
  {
    id: "prod-14",
    name: "PS5 Replacement Cooling Fan - Bisonic NMB Original",
    category: "tools",
    categoryLabel: "Tools & Reparasi",
    brand: "Bisonic/NMB",
    image: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&w=800&q=80",
    description: "Fan pendingin pengganti original untuk PlayStation 5 Disc dan Digital Edition. Kompatibel semua revisi hardware CFI-1000 hingga CFI-2000 (Slim).",
    specs: [
      "Merk: Bisonic (OEM NMB Minebea) - Original",
      "Kompatibel: PS5 CFI-1000A/B, CFI-1100A/B, CFI-1200, CFI-2000 (Slim)",
      "RPM: 1300-4500 RPM auto-regulated",
      "Noise Level: < 30dB pada idle",
      "Konektor: 4-pin PWM original"
    ],
    isRentable: false,
    isBuyable: true,
    buyPrice: 320000,
    originalPrice: 380000,
    discountPrice: 320000,
    isOnSale: true,
    rentPricePerDay: 0,
    rentPricePerWeek: 0,
    securityDeposit: 0,
    stockReady: 12,
    stockRented: 0,
    nextAvailableDate: null,
    promo: {
      hasPromo: true,
      badgeText: "Sale 16%",
      discountPercent: 16,
      promoType: "buy",
      promoDescription: "Harga terbaik PS5 fan replacement original Bisonic/NMB!"
    },
    rentalTerms: [],
    rating: 4.8,
    reviewsCount: 53,
    reviews: [
      { id: "rv-14-1", reviewer: "Teknisi PS5", avatar: "TP", rating: 5, date: "2026-08-07", comment: "Fan original Bisonic/NMB. Ganti fan PS5 customer pakai ini, hasilnya unit lebih senyap dan suhu drop signifikan.", type: "buy" },
      { id: "rv-14-2", reviewer: "DIY PS5 Repair", avatar: "DP", rating: 5, date: "2026-08-24", comment: "Kompatibel sempurna dengan PS5 CFI-2000 (Slim). Pemasangan mudah, suara fan nyaris tidak terdengar.", type: "buy" }
    ]
  },
  {
    id: "prod-15",
    name: "eXtremeRate RISE Remap Kit PS5 DualSense",
    category: "tools",
    categoryLabel: "Tools & Reparasi",
    brand: "eXtremeRate",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    description: "Papan paddle remap 4-tombol untuk DualSense PS5 dari eXtremeRate. Tambahkan 4 tombol ekstra di bagian belakang controller tanpa memotong atau menyolder.",
    specs: [
      "Kompatibel: DualSense semua revisi (BDM-010 hingga BDM-030)",
      "4 tombol paddle dapat di-remap ke semua tombol face/shoulder",
      "Board FPC drop-in, tidak perlu solder",
      "Tersedia: Black, White, Crystal, Clear",
      "Paket: Board RISE + 4 paddle + screw + shell back"
    ],
    isRentable: false,
    isBuyable: true,
    buyPrice: 425000,
    originalPrice: 500000,
    discountPrice: 425000,
    isOnSale: true,
    rentPricePerDay: 0,
    rentPricePerWeek: 0,
    securityDeposit: 0,
    stockReady: 18,
    stockRented: 0,
    nextAvailableDate: null,
    promo: {
      hasPromo: true,
      badgeText: "Sale 15%",
      discountPercent: 15,
      promoType: "buy",
      promoDescription: "Upgrade controller PS5 Anda dengan 4 tombol tambahan, harga promo!"
    },
    rentalTerms: [],
    rating: 4.7,
    reviewsCount: 61,
    reviews: [
      { id: "rv-15-1", reviewer: "Pro Player", avatar: "PP", rating: 5, date: "2026-08-13", comment: "Game changer buat competitive gaming! Paddle 4 tombol bikin crouch, jump, dan reload jauh lebih cepat. Tidak perlu solder sama sekali.", type: "buy" },
      { id: "rv-15-2", reviewer: "FPS Master", avatar: "FM", rating: 4, date: "2026-09-02", comment: "Build quality solid. Harga promo worth banget. Satu-satunya kelemahan pasang awalnya agak tricky.", type: "buy" }
    ]
  },
  {
    id: "prod-16",
    name: "DualSense Wireless Controller - Midnight Black",
    category: "accessory",
    categoryLabel: "Aksesoris & VR",
    brand: "Sony PlayStation",
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80",
    description: "Controller PS5 DualSense edisi Midnight Black dengan haptic feedback adaptif, adaptive triggers, dan speaker built-in. Unit baru resmi dengan garansi Sony 1 tahun.",
    specs: [
      "Teknologi: Haptic Feedback & Adaptive Triggers",
      "Konektivitas: Bluetooth 5.1 + USB-C",
      "Baterai: Built-in Li-ion ~12 jam",
      "Warna: Midnight Black",
      "Kompatibel: PS5, PC (Steam/DS4Windows), Android"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 1050000,
    originalPrice: 1150000,
    discountPrice: 1050000,
    isOnSale: true,
    rentPricePerDay: 25000,
    rentPricePerWeek: 145000,
    securityDeposit: 150000,
    stockReady: 12,
    stockRented: 7,
    nextAvailableDate: "2026-09-10",
    promo: {
      hasPromo: true,
      badgeText: "Sale 8.7%",
      discountPercent: 9,
      promoType: "buy",
      promoDescription: "DualSense Midnight Black harga promo, garansi Sony resmi 1 tahun!"
    },
    rentalTerms: [
      "Deposit Rp 150.000 per controller",
      "Laporkan kerusakan sebelum sewa berikutnya",
      "Sudah termasuk kabel USB-C untuk charging"
    ],
    rating: 4.9,
    reviewsCount: 178,
    reviews: [
      { id: "rv-16-1", reviewer: "Gaming Addict", avatar: "GD", rating: 5, date: "2026-07-28", comment: "DualSense Midnight Black ini keren banget look-nya! Haptic feedback-nya next level, terasa beda banget saat main Returnal atau Astro's Playroom.", type: "buy" },
      { id: "rv-16-2", reviewer: "Sewa Kontroller", avatar: "SL", rating: 5, date: "2026-08-16", comment: "Sewa sebagai controller tambahan buat multiplayer. Kondisi bersih dan terawat, grip masih bagus.", type: "rent" },
      { id: "rv-16-3", reviewer: "Reviewer Pro", avatar: "RP", rating: 4, date: "2026-09-04", comment: "Beli karena harga promo. Kualitas sama dengan yang beli di store resmi, tapi lebih murah. Recommended!", type: "buy" }
    ]
  },
  {
    id: "prod-17",
    name: "PlayStation VR2 + Horizon: CoE Bundle",
    category: "accessory",
    categoryLabel: "Aksesoris & VR",
    brand: "Sony PlayStation",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=800&q=80",
    description: "Headset VR terkini Sony dengan layar OLED 4K HDR per mata (2000x2040), haptic feedback di headset, eye tracking, dan bundel game Horizon: Call of the Mountain.",
    specs: [
      "Layar: OLED 4K HDR per mata (2000x2040 per eye, 110° FOV)",
      "Refresh Rate: 90Hz / 120Hz",
      "Tracking: Inside-out 4 kamera + Eye Tracking",
      "Controller: PS VR2 Sense (haptic + adaptive trigger)",
      "Koneksi: USB-C tunggal ke PS5"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 7200000,
    originalPrice: 8000000,
    discountPrice: 7200000,
    isOnSale: true,
    rentPricePerDay: 95000,
    rentPricePerWeek: 560000,
    securityDeposit: 500000,
    stockReady: 3,
    stockRented: 5,
    nextAvailableDate: "2026-09-14",
    promo: {
      hasPromo: true,
      badgeText: "Sale 10%",
      discountPercent: 10,
      promoType: "buy",
      promoDescription: "PS VR2 bundle Horizon hemat 10%, pengalaman VR terbaik di konsol!"
    },
    rentalTerms: [
      "Deposit Rp 500.000 untuk headset + 2 controller VR2",
      "Pembersihan lensa wajib sebelum dan sesudah sewa",
      "Memerlukan PS5 (tidak termasuk dalam paket sewa VR)"
    ],
    rating: 4.7,
    reviewsCount: 94,
    reviews: [
      { id: "rv-17-1", reviewer: "VR Enthusiast", avatar: "VE", rating: 5, date: "2026-08-02", comment: "Pengalaman VR terbaik di konsol! Eye tracking-nya akurat banget, tidak perlu kalibrasi berulang. Horizon CoE di VR itu amazing!", type: "rent" },
      { id: "rv-17-2", reviewer: "Tech Reviewer ID", avatar: "TR", rating: 4, date: "2026-08-19", comment: "Beli untuk review konten. Kualitas layar OLED per mata unggul dari semua headset VR yang pernah aku coba. Harga promo worth it!", type: "buy" }
    ]
  },
  {
    id: "prod-18",
    name: "Nintendo Switch Pro Controller - Original",
    category: "accessory",
    categoryLabel: "Aksesoris & VR",
    brand: "Nintendo",
    image: "https://images.unsplash.com/photo-1605085653773-1e7c7c4f1a15?auto=format&fit=crop&w=800&q=80",
    description: "Controller Pro premium Nintendo Switch dengan layout mirip konsol rumahan, baterai 40 jam, NFC untuk amiibo, dan konektivitas USB-C + Bluetooth.",
    specs: [
      "Konektivitas: Bluetooth 3.0 + USB-C Wired",
      "Baterai: Li-ion 40 jam (wired unlimited)",
      "Fitur: HD Rumble, NFC (amiibo), Gyroscope",
      "Tombol: Standard face + shoulder + trigger + capture",
      "Kompatibel: Nintendo Switch (semua model)"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 750000,
    originalPrice: 750000,
    discountPrice: 750000,
    isOnSale: false,
    rentPricePerDay: 20000,
    rentPricePerWeek: 115000,
    securityDeposit: 100000,
    stockReady: 8,
    stockRented: 4,
    nextAvailableDate: "2026-09-11",
    promo: {
      hasPromo: false,
      badgeText: "",
      discountPercent: 0,
      promoType: "none",
      promoDescription: ""
    },
    rentalTerms: [
      "Deposit Rp 100.000 per controller",
      "Kembalikan dengan kabel USB-C bawaan",
      "Laporkan jika ada tombol yang terasa tidak responsif"
    ],
    rating: 4.8,
    reviewsCount: 143,
    reviews: [
      { id: "rv-18-1", reviewer: "Switch Gamer", avatar: "SG", rating: 5, date: "2026-08-06", comment: "Pro Controller jauh lebih nyaman dari Joy-Con buat gaming panjang. Baterai 40 jam itu real! NFC untuk amiibo works perfect.", type: "buy" },
      { id: "rv-18-2", reviewer: "Family Gamer", avatar: "FG", rating: 5, date: "2026-08-23", comment: "Sewa sebagai controller tambahan buat main Mario Kart bersama keluarga. Kondisi mulus, tombol responsive semua.", type: "rent" }
    ]
  },
  {
    id: "prod-19",
    name: "Black Myth: Wukong - PS5 (Physical/Disc)",
    category: "game",
    categoryLabel: "Game Fisik",
    brand: "Game Science",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80",
    description: "Game action-RPG epik berlatar mitologi Cina klasik. Versi fisik PS5 dengan resolusi 4K/60fps Performance Mode dan visual next-gen. GOTY 2024 nominee.",
    specs: [
      "Platform: PlayStation 5 (Disc Edition)",
      "Genre: Action RPG, Mythology",
      "Bahasa: Mandarin, Subtitle Indonesia tersedia",
      "Mode: Single Player",
      "Target Frame Rate: 4K/30fps Quality | 1440p/60fps Performance"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 850000,
    originalPrice: 950000,
    discountPrice: 850000,
    isOnSale: true,
    rentPricePerDay: 25000,
    rentPricePerWeek: 145000,
    securityDeposit: 100000,
    stockReady: 5,
    stockRented: 8,
    nextAvailableDate: "2026-09-13",
    promo: {
      hasPromo: true,
      badgeText: "Sale 10.5%",
      discountPercent: 10,
      promoType: "buy",
      promoDescription: "Black Myth: Wukong harga promo, game terlaris 2024!"
    },
    rentalTerms: [
      "Deposit Rp 100.000 per keping game",
      "Kembalikan disc dalam kondisi tidak tergores",
      "Gunakan case penyimpanan saat tidak dipakai"
    ],
    rating: 4.9,
    reviewsCount: 289,
    reviews: [
      { id: "rv-19-1", reviewer: "Action Gamer", avatar: "AG", rating: 5, date: "2026-08-05", comment: "MASTERPIECE! Visual PS5-nya jaw-dropping, boss fight-nya epic. Sewa dulu buat cobain, akhirnya beli karena mau play ulang. Wajib punya!", type: "rent" },
      { id: "rv-19-2", reviewer: "Mythology Fan", avatar: "MF", rating: 5, date: "2026-08-12", comment: "Ceritanya keren banget, mitologi Cina yang diangkat sangat detail. Beli versi fisik karena mau koleksi. Harga promo sangat worth!", type: "buy" },
      { id: "rv-19-3", reviewer: "PS5 Owner", avatar: "PO", rating: 5, date: "2026-08-25", comment: "Sewa 5 hari, habis main terus. Sulit berhenti! Disc dalam kondisi perfect. Definitif membeli setelah sewa.", type: "rent" },
      { id: "rv-19-4", reviewer: "JRPG Lover", avatar: "JL", rating: 4, date: "2026-09-06", comment: "Bagus banget, tapi agak susah di awal karena kurang terbiasa gameplay-nya. Setelah paham, addictive banget!", type: "rent" }
    ]
  },
  {
    id: "prod-20",
    name: "The Legend of Zelda: Tears of the Kingdom (Switch)",
    category: "game",
    categoryLabel: "Game Fisik",
    brand: "Nintendo",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80",
    description: "Sekuel epik Breath of the Wild dengan mekanik Ultrahand, Fuse, Ascend, dan Recall. Open-world Hyrule yang lebih luas dengan Sky Islands dan Depths. GOTY 2023.",
    specs: [
      "Platform: Nintendo Switch (semua model)",
      "Genre: Open World Action Adventure",
      "Bahasa: Inggris, Jepang (subtitle Indonesia via unofficial patch)",
      "Mode: Single Player",
      "Ukuran: 18.2GB (cartridge)"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 780000,
    originalPrice: 780000,
    discountPrice: 780000,
    isOnSale: false,
    rentPricePerDay: 22000,
    rentPricePerWeek: 130000,
    securityDeposit: 100000,
    stockReady: 7,
    stockRented: 5,
    nextAvailableDate: "2026-09-10",
    promo: {
      hasPromo: false,
      badgeText: "",
      discountPercent: 0,
      promoType: "none",
      promoDescription: ""
    },
    rentalTerms: [
      "Deposit Rp 100.000 per cartridge",
      "Kembalikan cartridge dalam kondisi baik tanpa goresan di konektor",
      "Save data akan dihapus setelah pengembalian (backup sendiri jika diperlukan)"
    ],
    rating: 4.9,
    reviewsCount: 312,
    reviews: [
      { id: "rv-20-1", reviewer: "Zelda Fan", avatar: "ZF", rating: 5, date: "2026-07-18", comment: "Zelda TotK adalah masterpiece terbesar Nintendo. Mekanik Ultrahand bikin kreativitas nggak ada batasnya. GOTY 2023 yang sangat layak!", type: "buy" },
      { id: "rv-20-2", reviewer: "Open World Fan", avatar: "OF", rating: 5, date: "2026-08-03", comment: "Sewa 7 hari tapi ternyata tidak cukup, langsung beli setelahnya! World-building dan gameplay loop-nya sempurna.", type: "rent" },
      { id: "rv-20-3", reviewer: "Nintendo Fan", avatar: "NF", rating: 5, date: "2026-08-20", comment: "200+ jam dan masih banyak yang belum dijelajahi. Ini bukan sekedar game, ini karya seni interaktif.", type: "buy" },
      { id: "rv-20-4", reviewer: "Casual Gamer", avatar: "CG", rating: 4, date: "2026-09-08", comment: "Bagus banget, tapi karena pertama kali main Zelda sedikit overwhelming dengan banyaknya pilihan. Tapi sangat seru!", type: "rent" }
    ]
  }
];

// Expose ke window global (kompatibel dengan file:// protocol)
window.CONSOLE_PRODUCTS = products;
const productsData = products;
