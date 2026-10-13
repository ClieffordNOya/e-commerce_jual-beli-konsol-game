/**
 * CONSOLE HUB - Master Data Produk (20 Dummy Products)
 * Mencakup: Konsol Game, Suku Cadang/Tools Servis, Aksesoris, & Game Fisik
 * Mendukung model hybrid: Sewa (Rental) dan Beli (Retail)
 * Atribut utama: isOnSale (boolean), originalPrice (number), price (number), discountPrice (number), rating (number), reviews (array)
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
    isOnSale: true,
    originalPrice: 9600000,
    price: 8400000,
    buyPrice: 8400000,
    discountPrice: 8400000,
    rentPricePerDay: 120000,
    rentPricePerWeek: 700000,
    securityDeposit: 500000,
    stockReady: 8,
    stockRented: 5,
    nextAvailableDate: "2026-09-11",
    promo: {
      hasPromo: true,
      badgeText: "Diskon 12.5%",
      discountPercent: 13,
      promoType: "buy",
      promoDescription: "Promo Diskon Spesial PlayStation 5 Slim Disc Edition!"
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
      { id: "rv-01-3", reviewer: "Budi Santoso", avatar: "BS", rating: 5, date: "2026-09-01", comment: "Beli unit-nya worth banget, harga diskon lebih murah dari tempat lain dan dapat garansi 1 tahun. Pengiriman cepat, packing aman.", type: "buy" }
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
    isOnSale: true,
    originalPrice: 8500000,
    price: 7400000,
    buyPrice: 7400000,
    discountPrice: 7400000,
    rentPricePerDay: 100000,
    rentPricePerWeek: 580000,
    securityDeposit: 400000,
    stockReady: 4,
    stockRented: 6,
    nextAvailableDate: "2026-09-10",
    promo: {
      hasPromo: true,
      badgeText: "Diskon 13%",
      discountPercent: 13,
      promoType: "buy",
      promoDescription: "Diskon PS5 Digital Edition unit resmi Sony!"
    },
    rentalTerms: [
      "Wajib verifikasi KTP & domisili jelas",
      "Dilarang mengubah kredensial akun PSN bawaan unit",
      "Deposit jaminan Rp 400.000 dikembalikan saat selesai sewa"
    ],
    rating: 4.8,
    reviewsCount: 98,
    reviews: [
      { id: "rv-02-1", reviewer: "Kevin Lie", avatar: "KL", rating: 5, date: "2026-08-10", comment: "Sewa buat main Baldur's Gate 3 seminggu, nyaman banget! Akun PSN-nya banyak game gratis.", type: "rent" },
      { id: "rv-02-2", reviewer: "Arif Rahman", avatar: "AR", rating: 5, date: "2026-09-03", comment: "Beli setelah coba sewa 2x. Kondisi unit seperti baru, ada garansi resmi. Harga diskonnya mantap.", type: "buy" }
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
    isOnSale: true,
    originalPrice: 5500000,
    price: 4675000,
    buyPrice: 4675000,
    discountPrice: 4675000,
    rentPricePerDay: 65000,
    rentPricePerWeek: 390000,
    securityDeposit: 300000,
    stockReady: 6,
    stockRented: 3,
    nextAvailableDate: "2026-09-09",
    promo: {
      hasPromo: true,
      badgeText: "Diskon 15%",
      discountPercent: 15,
      promoType: "buy",
      promoDescription: "Harga spesial Zelda Edition hemat 15%!"
    },
    rentalTerms: [
      "Deposit Rp 300.000 untuk unit + Joy-Con",
      "Tidak diperkenankan mengakses Nintendo eShop dengan akun sendiri",
      "Dikembalikan beserta case dan semua aksesori lengkap"
    ],
    rating: 4.9,
    reviewsCount: 211,
    reviews: [
      { id: "rv-03-1", reviewer: "Hana Pratiwi", avatar: "HP", rating: 5, date: "2026-07-20", comment: "Edisi Zelda ini luar biasa! Joy-Con warnanya kece, layar OLED-nya tajam banget.", type: "rent" },
      { id: "rv-03-2", reviewer: "Dimas Kurniawan", avatar: "DK", rating: 5, date: "2026-08-05", comment: "Beli unit ini karena desainnya eksklusif. Harga diskonnya sangat worth it.", type: "buy" }
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
    isOnSale: false,
    originalPrice: 8200000,
    price: 8200000,
    buyPrice: 8200000,
    discountPrice: 8200000,
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
      { id: "rv-04-1", reviewer: "Galih Permana", avatar: "GP", rating: 5, date: "2026-08-12", comment: "Xbox Series X emang raja 4K gaming! Quick Resume-nya keren.", type: "rent" }
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
    isOnSale: true,
    originalPrice: 8800000,
    price: 7480000,
    buyPrice: 7480000,
    discountPrice: 7480000,
    rentPricePerDay: 95000,
    rentPricePerWeek: 560000,
    securityDeposit: 400000,
    stockReady: 3,
    stockRented: 4,
    nextAvailableDate: "2026-09-13",
    promo: {
      hasPromo: true,
      badgeText: "Diskon 15%",
      discountPercent: 15,
      promoType: "buy",
      promoDescription: "Harga spesial pembelian Steam Deck OLED 512GB!"
    },
    rentalTerms: [
      "Deposit Rp 400.000, sudah termasuk akun Steam dengan 30+ game terinstal",
      "Tidak boleh uninstall game atau mengubah settingan akun Steam",
      "Kembalikan dengan charger dan case bawaan unit"
    ],
    rating: 4.8,
    reviewsCount: 134,
    reviews: [
      { id: "rv-05-1", reviewer: "Yusuf Hakim", avatar: "YH", rating: 5, date: "2026-07-30", comment: "Steam Deck OLED ini game changer buat gaming mobile. Layarnya luar biasa.", type: "rent" },
      { id: "rv-05-2", reviewer: "Mira Sari", avatar: "MS", rating: 5, date: "2026-08-14", comment: "Beli karena harganya lagi sale. Kondisi unit new, worth it!", type: "buy" }
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
    isOnSale: true,
    originalPrice: 12900000,
    price: 11200000,
    buyPrice: 11200000,
    discountPrice: 11200000,
    rentPricePerDay: 130000,
    rentPricePerWeek: 780000,
    securityDeposit: 600000,
    stockReady: 2,
    stockRented: 5,
    nextAvailableDate: "2026-09-15",
    promo: {
      hasPromo: true,
      badgeText: "Diskon 13%",
      discountPercent: 13,
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
      { id: "rv-06-1", reviewer: "Hendri Kurnia", avatar: "HK", rating: 5, date: "2026-08-08", comment: "ROG Ally X baterai 80Wh ini endgame banget! Bisa gaming lama tanpa charger.", type: "rent" }
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
    isOnSale: true,
    originalPrice: 3200000,
    price: 2560000,
    buyPrice: 2560000,
    discountPrice: 2560000,
    rentPricePerDay: 40000,
    rentPricePerWeek: 240000,
    securityDeposit: 200000,
    stockReady: 10,
    stockRented: 8,
    nextAvailableDate: "2026-09-09",
    promo: {
      hasPromo: true,
      badgeText: "Diskon 20%",
      discountPercent: 20,
      promoType: "buy",
      promoDescription: "PS4 Pro refurbished terbaik harga terjangkau!"
    },
    rentalTerms: [
      "Deposit Rp 200.000 untuk unit PS4 Pro",
      "Tersedia 10 judul game pilihan, pilih 3 per periode sewa",
      "Garansi penggantian unit jika ada kerusakan non-pemakai"
    ],
    rating: 4.6,
    reviewsCount: 203,
    reviews: [
      { id: "rv-07-1", reviewer: "Pak Bambang", avatar: "PB", rating: 5, date: "2026-07-15", comment: "Beli buat anak-anak main di rumah, kondisi mulus kayak baru.", type: "buy" }
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
    isOnSale: true,
    originalPrice: 1000000,
    price: 840000,
    buyPrice: 840000,
    discountPrice: 840000,
    rentPricePerDay: 18000,
    rentPricePerWeek: 100000,
    securityDeposit: 100000,
    stockReady: 15,
    stockRented: 3,
    nextAvailableDate: "2026-09-09",
    promo: {
      hasPromo: true,
      badgeText: "Diskon 16%",
      discountPercent: 16,
      promoType: "buy",
      promoDescription: "Diskon toolkit presisi iFixit original!"
    },
    rentalTerms: [
      "Kembalikan semua 64 mata bor dalam case aluminium",
      "Deposit Rp 100.000 untuk keamanan toolkit"
    ],
    rating: 4.8,
    reviewsCount: 67,
    reviews: [
      { id: "rv-08-1", reviewer: "Mas Teknisi Budi", avatar: "MB", rating: 5, date: "2026-08-01", comment: "Toolkit lengkap banget! Semua bit buat servis konsol ada.", type: "buy" }
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
    isOnSale: true,
    originalPrice: 240000,
    price: 195000,
    buyPrice: 195000,
    discountPrice: 195000,
    rentPricePerDay: 0,
    rentPricePerWeek: 0,
    securityDeposit: 0,
    stockReady: 25,
    stockRented: 0,
    nextAvailableDate: null,
    promo: {
      hasPromo: true,
      badgeText: "Diskon 19%",
      discountPercent: 19,
      promoType: "buy",
      promoDescription: "Harga promo thermal paste terbaik untuk repaste konsol overheat!"
    },
    rentalTerms: [],
    rating: 4.9,
    reviewsCount: 89,
    reviews: [
      { id: "rv-09-1", reviewer: "Rizal Teknisi", avatar: "RT", rating: 5, date: "2026-07-25", comment: "Suhu PS5 drop signifikan setelah repaste pakai Kryonaut Extreme ini!", type: "buy" }
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
    isOnSale: false,
    originalPrice: 650000,
    price: 650000,
    buyPrice: 650000,
    discountPrice: 650000,
    rentPricePerDay: 45000,
    rentPricePerWeek: 265000,
    securityDeposit: 200000,
    stockReady: 5,
    stockRented: 2,
    nextAvailableDate: "2026-09-09",
    promo: {
      hasPromo: false,
      badgeText: "",
      discountPercent: 0,
      promoType: "none",
      promoDescription: ""
    },
    rentalTerms: [
      "Deposit Rp 200.000 untuk station",
      "Kembalikan dengan semua tip dan accessories"
    ],
    rating: 4.6,
    reviewsCount: 44,
    reviews: [
      { id: "rv-10-1", reviewer: "Yanto Repair", avatar: "YR", rating: 5, date: "2026-08-05", comment: "Beli untuk workshop. Hot air gun-nya stabil.", type: "buy" }
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
    isOnSale: true,
    originalPrice: 180000,
    price: 144000,
    buyPrice: 144000,
    discountPrice: 144000,
    rentPricePerDay: 0,
    rentPricePerWeek: 0,
    securityDeposit: 0,
    stockReady: 20,
    stockRented: 0,
    nextAvailableDate: null,
    promo: {
      hasPromo: true,
      badgeText: "Diskon 20%",
      discountPercent: 20,
      promoType: "buy",
      promoDescription: "Paket RCM Kit Switch hemat 20%!"
    },
    rentalTerms: [],
    rating: 4.5,
    reviewsCount: 56,
    reviews: [
      { id: "rv-11-1", reviewer: "Modder Pro", avatar: "MP", rating: 5, date: "2026-08-03", comment: "Kit lengkap, jig fit sempurna di slot Joy-Con.", type: "buy" }
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
    isOnSale: true,
    originalPrice: 320000,
    price: 256000,
    buyPrice: 256000,
    discountPrice: 256000,
    rentPricePerDay: 0,
    rentPricePerWeek: 0,
    securityDeposit: 0,
    stockReady: 30,
    stockRented: 0,
    nextAvailableDate: null,
    promo: {
      hasPromo: true,
      badgeText: "Diskon 20%",
      discountPercent: 20,
      promoType: "buy",
      promoDescription: "Solusi anti-drift terbaik, harga promo!"
    },
    rentalTerms: [],
    rating: 4.9,
    reviewsCount: 112,
    reviews: [
      { id: "rv-12-1", reviewer: "Gamer Anti Drift", avatar: "GA", rating: 5, date: "2026-07-22", comment: "Pasang GuliKit di DualSense, drift langsung hilang total!", type: "buy" }
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
    isOnSale: false,
    originalPrice: 95000,
    price: 95000,
    buyPrice: 95000,
    discountPrice: 95000,
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
      { id: "rv-13-1", reviewer: "Console Care", avatar: "CC", rating: 5, date: "2026-08-04", comment: "Kit lengkap untuk maintenance konsol.", type: "buy" }
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
    isOnSale: true,
    originalPrice: 380000,
    price: 304000,
    buyPrice: 304000,
    discountPrice: 304000,
    rentPricePerDay: 0,
    rentPricePerWeek: 0,
    securityDeposit: 0,
    stockReady: 12,
    stockRented: 0,
    nextAvailableDate: null,
    promo: {
      hasPromo: true,
      badgeText: "Diskon 20%",
      discountPercent: 20,
      promoType: "buy",
      promoDescription: "Harga terbaik PS5 fan replacement original!"
    },
    rentalTerms: [],
    rating: 4.8,
    reviewsCount: 53,
    reviews: [
      { id: "rv-14-1", reviewer: "Teknisi PS5", avatar: "TP", rating: 5, date: "2026-08-07", comment: "Fan original Bisonic/NMB. Suara fan senyap.", type: "buy" }
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
    isOnSale: true,
    originalPrice: 500000,
    price: 425000,
    buyPrice: 425000,
    discountPrice: 425000,
    rentPricePerDay: 0,
    rentPricePerWeek: 0,
    securityDeposit: 0,
    stockReady: 18,
    stockRented: 0,
    nextAvailableDate: null,
    promo: {
      hasPromo: true,
      badgeText: "Diskon 15%",
      discountPercent: 15,
      promoType: "buy",
      promoDescription: "Upgrade controller PS5 dengan 4 tombol tambahan!"
    },
    rentalTerms: [],
    rating: 4.7,
    reviewsCount: 61,
    reviews: [
      { id: "rv-15-1", reviewer: "Pro Player", avatar: "PP", rating: 5, date: "2026-08-13", comment: "Paddle 4 tombol bikin main game kompetitif jauh lebih responsif.", type: "buy" }
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
    isOnSale: true,
    originalPrice: 1200000,
    price: 1020000,
    buyPrice: 1020000,
    discountPrice: 1020000,
    rentPricePerDay: 25000,
    rentPricePerWeek: 145000,
    securityDeposit: 150000,
    stockReady: 12,
    stockRented: 7,
    nextAvailableDate: "2026-09-10",
    promo: {
      hasPromo: true,
      badgeText: "Diskon 15%",
      discountPercent: 15,
      promoType: "buy",
      promoDescription: "DualSense Midnight Black promo hemat 15%!"
    },
    rentalTerms: [
      "Deposit Rp 150.000 per controller",
      "Sudah termasuk kabel USB-C untuk charging"
    ],
    rating: 4.9,
    reviewsCount: 178,
    reviews: [
      { id: "rv-16-1", reviewer: "Gaming Addict", avatar: "GD", rating: 5, date: "2026-07-28", comment: "DualSense Midnight Black keren banget look-nya!", type: "buy" }
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
    isOnSale: true,
    originalPrice: 8000000,
    price: 6800000,
    buyPrice: 6800000,
    discountPrice: 6800000,
    rentPricePerDay: 95000,
    rentPricePerWeek: 560000,
    securityDeposit: 500000,
    stockReady: 3,
    stockRented: 5,
    nextAvailableDate: "2026-09-14",
    promo: {
      hasPromo: true,
      badgeText: "Diskon 15%",
      discountPercent: 15,
      promoType: "buy",
      promoDescription: "PS VR2 bundle Horizon diskon 15%!"
    },
    rentalTerms: [
      "Deposit Rp 500.000 untuk headset + 2 controller VR2",
      "Pembersihan lensa wajib sebelum dan sesudah sewa"
    ],
    rating: 4.7,
    reviewsCount: 94,
    reviews: [
      { id: "rv-17-1", reviewer: "VR Enthusiast", avatar: "VE", rating: 5, date: "2026-08-02", comment: "Pengalaman VR terbaik di konsol! Visual OLED HDR memukau.", type: "rent" }
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
      "Kompatibel: Nintendo Switch (semua model)"
    ],
    isRentable: true,
    isBuyable: true,
    isOnSale: false,
    originalPrice: 750000,
    price: 750000,
    buyPrice: 750000,
    discountPrice: 750000,
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
      "Deposit Rp 100.000 per controller"
    ],
    rating: 4.8,
    reviewsCount: 143,
    reviews: [
      { id: "rv-18-1", reviewer: "Switch Gamer", avatar: "SG", rating: 5, date: "2026-08-06", comment: "Pro Controller nyaman banget, baterai tahan 40 jam nyata.", type: "buy" }
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
      "Bahasa: Subtitle Indonesia & English",
      "Target Frame Rate: 4K/30fps Quality | 1440p/60fps Performance"
    ],
    isRentable: true,
    isBuyable: true,
    isOnSale: true,
    originalPrice: 950000,
    price: 760000,
    buyPrice: 760000,
    discountPrice: 760000,
    rentPricePerDay: 25000,
    rentPricePerWeek: 145000,
    securityDeposit: 100000,
    stockReady: 5,
    stockRented: 8,
    nextAvailableDate: "2026-09-13",
    promo: {
      hasPromo: true,
      badgeText: "Diskon 20%",
      discountPercent: 20,
      promoType: "buy",
      promoDescription: "Black Myth: Wukong diskon spesial 20%!"
    },
    rentalTerms: [
      "Deposit Rp 100.000 per keping game",
      "Kembalikan disc dalam kondisi tidak tergores"
    ],
    rating: 4.9,
    reviewsCount: 289,
    reviews: [
      { id: "rv-19-1", reviewer: "Action Gamer", avatar: "AG", rating: 5, date: "2026-08-05", comment: "MASTERPIECE! Visual jaw-dropping, boss fight-nya sangat seru.", type: "rent" }
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
      "Mode: Single Player",
      "Ukuran: 18.2GB (cartridge)"
    ],
    isRentable: true,
    isBuyable: true,
    isOnSale: false,
    originalPrice: 780000,
    price: 780000,
    buyPrice: 780000,
    discountPrice: 780000,
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
      "Deposit Rp 100.000 per cartridge"
    ],
    rating: 4.9,
    reviewsCount: 312,
    reviews: [
      { id: "rv-20-1", reviewer: "Zelda Fan", avatar: "ZF", rating: 5, date: "2026-07-18", comment: "Zelda TotK adalah masterpiece terbaik Nintendo. Gameplay tanpa batas!", type: "buy" }
    ]
  }
];

// Expose ke window global
window.CONSOLE_PRODUCTS = products;
const productsData = products;
