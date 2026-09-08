/**
 * CONSOLE HUB - Master Data Produk (20 Dummy Products)
 * Mencakup: Konsol Game, Suku Cadang/Tools Servis, Aksesoris, & Game Fisik
 * Mendukung model hybrid: Sewa (Rental) dan Beli (Retail)
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
    rentPricePerDay: 120000,
    rentPricePerWeek: 700000,
    securityDeposit: 500000, // Deposit jaminan sewa (refundable)
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
    reviewsCount: 142
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
    reviewsCount: 98
  },
  {
    id: "prod-03",
    name: "Nintendo Switch OLED - Zelda Tears Edition",
    category: "console",
    categoryLabel: "Konsol Game",
    brand: "Nintendo",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80",
    description: "Konsol hybrid portabel dengan layar OLED 7 inci super vibrant edisi khusus The Legend of Zelda: Tears of the Kingdom.",
    specs: [
      "Layar: 7.0-inch OLED Multi-touch (720p handheld, 1080p docked)",
      "Penyimpanan Internal: 64GB + MicroSD 128GB",
      "Baterai: Hingga 9 jam pemakaian",
      "Kelengkapan: Switch OLED, Joy-Con Zelda, Dock, Grip, Tas Travel Pouch"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 4650000,
    rentPricePerDay: 70000,
    rentPricePerWeek: 420000,
    securityDeposit: 300000,
    stockReady: 6,
    stockRented: 4,
    nextAvailableDate: "2026-09-12",
    promo: {
      hasPromo: true,
      badgeText: "Free 1 Game Rental",
      discountPercent: 0,
      promoType: "rental",
      promoDescription: "Sewa Switch OLED minimal 3 hari, gratis pilih 1 kaset game fisik favorit!"
    },
    rentalTerms: [
      "Verifikasi identitas KTP/Pelajar aktif",
      "Termasuk tempered glass terpasang dan casing silikon proteksi",
      "Deposit Rp 300.000"
    ],
    rating: 4.9,
    reviewsCount: 175
  },
  {
    id: "prod-04",
    name: "Xbox Series X 1TB Console",
    category: "console",
    categoryLabel: "Konsol Game",
    brand: "Microsoft Xbox",
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80",
    description: "Konsol Xbox paling bertenaga di dunia dengan performa 12 Teraflops, dukungan Quick Resume, dan Xbox Game Pass Ultimate.",
    specs: [
      "Prosesor: AMD Zen 2 kustom 8-core 3.8GHz",
      "Grafis: 12 TFLOPS, 52 CUs @ 1.825 GHz RDNA 2",
      "Penyimpanan: 1TB Custom NVMe SSD",
      "Kelengkapan: Konsol Xbox Series X, 2 Xbox Wireless Controller, Akun Xbox Game Pass Ultimate"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 8350000,
    rentPricePerDay: 110000,
    rentPricePerWeek: 650000,
    securityDeposit: 500000,
    stockReady: 3,
    stockRented: 3,
    nextAvailableDate: "2026-09-13",
    promo: {
      hasPromo: true,
      badgeText: "Cashback 10%",
      discountPercent: 10,
      promoType: "buy",
      promoDescription: "Cashback 10% untuk pembelian unit baru dengan kupon GAMERBARU"
    },
    rentalTerms: [
      "KTP asli + Deposit Rp 500.000",
      "Akses bebas ke ratusan game di Game Pass Ultimate selama sewa"
    ],
    rating: 4.7,
    reviewsCount: 64
  },
  {
    id: "prod-05",
    name: "Valve Steam Deck OLED 512GB",
    category: "console",
    categoryLabel: "Konsol Game Handheld",
    brand: "Valve",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    description: "PC gaming portabel terbaik dengan layar HDR OLED 90Hz, daya tahan baterai superior, dan ekosistem Steam library Anda di genggaman.",
    specs: [
      "Layar: 7.4 inci 90Hz HDR OLED 1000 nits",
      "APU: 6nm AMD Zen 2 + RDNA 2",
      "RAM: 16 GB LPDDR5",
      "Penyimpanan: 512GB NVMe SSD berkecepatan tinggi",
      "Kelengkapan: Unit Steam Deck, Case Eksklusif Valve, Charger 45W Type-C"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 9400000,
    rentPricePerDay: 95000,
    rentPricePerWeek: 570000,
    securityDeposit: 500000,
    stockReady: 5,
    stockRented: 2,
    nextAvailableDate: "2026-09-14",
    promo: {
      hasPromo: true,
      badgeText: "Promo Liburan",
      discountPercent: 12,
      promoType: "rental",
      promoDescription: "Cocok untuk dibawa bepergian, hemat 12% sewa 5 hari ke atas!"
    },
    rentalTerms: [
      "Wajib verifikasi KTP",
      "Pelanggan bebas login akun Steam pribadi (otomatis ter-reset saat pengembalian)",
      "Deposit Rp 500.000"
    ],
    rating: 4.9,
    reviewsCount: 110
  },
  {
    id: "prod-06",
    name: "ASUS ROG Ally Z1 Extreme 512GB",
    category: "console",
    categoryLabel: "Konsol Game Handheld",
    brand: "ASUS Republic of Gamers",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    description: "Handheld Windows 11 bertenaga prosesor AMD Ryzen Z1 Extreme, layar 120Hz FHD, mendukung Steam, Epic Games, Game Pass, dan emulator.",
    specs: [
      "Prosesor: AMD Ryzen Z1 Extreme (8-core/16-thread)",
      "Layar: 7 inci FHD (1920x1080) 120Hz FreeSync Premium",
      "OS: Windows 11 Home Asli",
      "Kelengkapan: ROG Ally, Charger 65W, Hardcase Dobe"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 9100000,
    rentPricePerDay: 90000,
    rentPricePerWeek: 540000,
    securityDeposit: 500000,
    stockReady: 4,
    stockRented: 3,
    nextAvailableDate: "2026-09-10",
    promo: {
      hasPromo: true,
      badgeText: "Diskon Beli 5%",
      discountPercent: 5,
      promoType: "buy",
      promoDescription: "Diskon Rp 455.000 untuk pembelian langsung hari ini!"
    },
    rentalTerms: [
      "Identitas KTP/SIM valid",
      "Deposit Rp 500.000 refundable"
    ],
    rating: 4.6,
    reviewsCount: 83
  },
  {
    id: "prod-07",
    name: "PlayStation 4 Pro 1TB Refurbished Like-New",
    category: "console",
    categoryLabel: "Konsol Game",
    brand: "Sony PlayStation",
    image: "https://images.unsplash.com/photo-1507457379470-08b800bebc67?auto=format&fit=crop&w=800&q=80",
    description: "Pilihan rental paling ekonomis untuk main bareng game legendaris FIFA/PES, God of War, GTA V, dan Spider-Man dalam resolusi 4K dinamis.",
    specs: [
      "Resolusi: Dynamic 4K Gaming",
      "Penyimpanan: 1TB HDD Internal (Terisi 25+ Game)",
      "Kelengkapan Rental: PS4 Pro, 2 DualShock 4 Controller, Kabel HDMI, Kabel Power"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 3750000,
    rentPricePerDay: 45000,
    rentPricePerWeek: 260000,
    securityDeposit: 250000,
    stockReady: 10,
    stockRented: 8,
    nextAvailableDate: "2026-09-09",
    promo: {
      hasPromo: true,
      badgeText: "Rental Hemat",
      discountPercent: 20,
      promoType: "rental",
      promoDescription: "Sewa seminggu hanya Rp 208.000 dengan kode SEWAHEMAT!"
    },
    rentalTerms: [
      "Syarat mudah hanya foto KTP",
      "Deposit bersahabat Rp 250.000"
    ],
    rating: 4.8,
    reviewsCount: 230
  },
  {
    id: "prod-08",
    name: "iFixit Pro Tech Toolkit Precision 64-Bit Set",
    category: "tools",
    categoryLabel: "Tools Konsol",
    brand: "iFixit",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    description: "Set perkakas reparasi elektronik presisi terlengkap. Wajib punya untuk bongkar pasang PS5, PS4, Xbox, Nintendo Switch, dan laptop gaming tanpa merusak baut.",
    specs: [
      "Mata Obeng: Torx T8H, T9H, T10H Security (baut konsol), Tri-point Y00 (Switch), Pentalobe, Phillips, Hex",
      "Material: Baja CNC Machined S2 Steel anti karat",
      "Alat Bantu: Opening picks, Jimmy, Suction handle, ESD-safe tweezers, Spudger nylon",
      "Cocok untuk: Servis stick drift, ganti kipas PS5, thermal paste repaste"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 380000,
    rentPricePerDay: 25000,
    rentPricePerWeek: 110000,
    securityDeposit: 150000,
    stockReady: 15,
    stockRented: 2,
    nextAvailableDate: "2026-09-10",
    promo: {
      hasPromo: true,
      badgeText: "Terlaris Teknisi",
      discountPercent: 10,
      promoType: "all",
      promoDescription: "Koleksi tools favorit para modder dan teknisi konsol rumahan!"
    },
    rentalTerms: [
      "Semua 64 bit mata obeng harus kembali lengkap sesuai tray magnetik",
      "Deposit Rp 150.000 dikembalikan penuh"
    ],
    rating: 4.9,
    reviewsCount: 89
  },
  {
    id: "prod-09",
    name: "Thermal Grizzly Conductonaut Liquid Metal 1g",
    category: "tools",
    categoryLabel: "Thermal & Pasta",
    brand: "Thermal Grizzly",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80",
    description: "Logam cair konduktivitas super tinggi (73 W/mk) standar industri untuk servis thermal APU PlayStation 5 saat konsol overheat atau berisik.",
    specs: [
      "Konduktivitas Termal: 73 W/mK",
      "Kuantitas: 1 Gram jarum suntik mikro",
      "Aplikasi: Khusus APU PS5 dan CPU delidded (Bukan untuk heatsink aluminium)",
      "Termasuk: 2 aplikator kapas presisi dan wiper alkohol pembersih"
    ],
    isRentable: false,
    isBuyable: true,
    buyPrice: 175000,
    rentPricePerDay: 0,
    rentPricePerWeek: 0,
    securityDeposit: 0,
    stockReady: 25,
    stockRented: 0,
    nextAvailableDate: null,
    promo: {
      hasPromo: true,
      badgeText: "Wajib Repaste PS5",
      discountPercent: 5,
      promoType: "buy",
      promoDescription: "Produk original Jerman segel hologram resmi!"
    },
    rentalTerms: [],
    rating: 4.9,
    reviewsCount: 164
  },
  {
    id: "prod-10",
    name: "Kaisi Mini Hot Air & Soldering Station 2-in-1",
    category: "tools",
    categoryLabel: "Tools Servis",
    brand: "Kaisi",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    description: "Alat pemanas blower uap & solder elektrik portabel dengan kontrol suhu digital presisi. Sangat praktis untuk penggantian port HDMI PS5 dan potentiometer joystick.",
    specs: [
      "Daya Blower: 450W Suhu 100°C - 480°C",
      "Daya Solder: 60W dengan pemanasan keramik cepat 8 detik",
      "Tampilan: Dual LED Digital Temperature Display",
      "Nozzle: 3 ukuran nozzle blower mikro untuk komponen SMD papan konsol"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 680000,
    rentPricePerDay: 45000,
    rentPricePerWeek: 210000,
    securityDeposit: 300000,
    stockReady: 5,
    stockRented: 1,
    nextAvailableDate: "2026-09-12",
    promo: {
      hasPromo: true,
      badgeText: "Sewa Alat Pro",
      discountPercent: 15,
      promoType: "rental",
      promoDescription: "Hemat biaya tanpa harus beli alat solder mahal untuk perbaikan sekali pakai!"
    },
    rentalTerms: [
      "Wajib memiliki pengalaman dasar menyolder komponen SMD",
      "Kembalikan dalam kondisi bersih dan nozzle lengkap",
      "Deposit Rp 300.000"
    ],
    rating: 4.7,
    reviewsCount: 42
  },
  {
    id: "prod-11",
    name: "RCM Jig & Auto-Payload Injector Dongle (Switch V1)",
    category: "tools",
    categoryLabel: "Tools Modding",
    brand: "RCM Loader",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    description: "Kit dongle RCM payload injector portable lengkap dengan jig pin jumper untuk Nintendo Switch V1 unpatched. Mendukung injeksi Atmosphere / Hekate.",
    specs: [
      "Kompatibilitas: Nintendo Switch V1 Serial Unpatched",
      "Fitur: Multi-payload switcher dengan indikator lampu LED warna",
      "Baterai: Internal Li-ion dapat diisi ulang via Micro-USB",
      "Paket: 1x RCM Injector Dongle, 1x RCM Jig tembaga presisi, 1x Micro-USB Cable"
    ],
    isRentable: false,
    isBuyable: true,
    buyPrice: 115000,
    rentPricePerDay: 0,
    rentPricePerWeek: 0,
    securityDeposit: 0,
    stockReady: 30,
    stockRented: 0,
    nextAvailableDate: null,
    promo: {
      hasPromo: true,
      badgeText: "Siap Pakai",
      discountPercent: 0,
      promoType: "buy",
      promoDescription: "Sudah terisi payload Atmosphere versi paling mutakhir!"
    },
    rentalTerms: [],
    rating: 4.8,
    reviewsCount: 95
  },
  {
    id: "prod-12",
    name: "Hall Effect 3D Analog Joystick Kit (Anti-Drift Magnetik)",
    category: "tools",
    categoryLabel: "Suku Cadang & Mod",
    brand: "GuliKit / K-Silver",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    description: "Modul stick analog sensor medan magnet (Hall Effect) anti aus fisik. Solusi permanen untuk controller PS5 DualSense, Xbox, atau Switch yang mengalami analog drift.",
    specs: [
      "Teknologi: Sensor Elektromagnetik Hall (Zero physical friction wear)",
      "Kompatibilitas: Stik PS5 DualSense BDM-010 / 020 / 030, Xbox Series, Switch Pro",
      "Kelengkapan: 2 Pcs Module Analog Kiri & Kanan + Panduan Kalibrasi PCB",
      "Umur Pakai: Hingga 5.000.000 putaran putar presisi"
    ],
    isRentable: false,
    isBuyable: true,
    buyPrice: 145000,
    rentPricePerDay: 0,
    rentPricePerWeek: 0,
    securityDeposit: 0,
    stockReady: 40,
    stockRented: 0,
    nextAvailableDate: null,
    promo: {
      hasPromo: true,
      badgeText: "Solusi Drift",
      discountPercent: 10,
      promoType: "buy",
      promoDescription: "Beli 2 pasang langsung dapat potongan ekstra Rp 20.000!"
    },
    rentalTerms: [],
    rating: 4.9,
    reviewsCount: 215
  },
  {
    id: "prod-13",
    name: "Console Deep Cleaning Kit & High-Pressure Blower",
    category: "tools",
    categoryLabel: "Perawatan Konsol",
    brand: "TechClean Pro",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    description: "Paket lengkap pembersih debu konsol dan PC: Blower angin elektrik kecepatan tinggi 110.000 RPM, kuas anti-statis ESD, cairan Isopropyl 99%, dan lap microfiber.",
    specs: [
      "Blower Elektrik: Motor tanpa sikat 110.000 RPM bertenaga baterai Type-C",
      "Kuas: 5 jenis kuas pembersih sirip heatsink dan kisi ventilasi",
      "Cairan Pembersih: 100ml Isopropyl Alcohol (IPA) 99.9% Electronic Grade cepat kering",
      "Aksesoris: Pinset lengkung, lap optik, cotton swab runcing"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 240000,
    rentPricePerDay: 20000,
    rentPricePerWeek: 90000,
    securityDeposit: 100000,
    stockReady: 12,
    stockRented: 3,
    nextAvailableDate: "2026-09-10",
    promo: {
      hasPromo: true,
      badgeText: "Bundle Bersih",
      discountPercent: 0,
      promoType: "all",
      promoDescription: "Jaga performa konsol tetap dingin dan senyap tanpa debu tebal!"
    },
    rentalTerms: [
      "Blower dan alat kuas wajib dikembalikan lengkap",
      "Deposit Rp 100.000"
    ],
    rating: 4.8,
    reviewsCount: 78
  },
  {
    id: "prod-14",
    name: "PS5 OEM Replacement Internal Cooling Fan 23-Blade",
    category: "tools",
    categoryLabel: "Suku Cadang Konsol",
    brand: "NMB / Nidec OEM",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80",
    description: "Kipas pendingin internal original pengganti kipas PS5 yang mendengung (coil whine) atau rusak macet. Menggunakan 23 bilah aerodinamis yang sunyi dan bertekanan udara tinggi.",
    specs: [
      "Model: NMB 12047GA-12M-WB-01 (12V 2.4A DC)",
      "Jumlah Bilah: 23-Blade silent curved design",
      "Konektor: 3-Pin PS5 motherboard socket",
      "Kompatibilitas: PlayStation 5 CFI-10xx, 11xx, 12xx Series"
    ],
    isRentable: false,
    isBuyable: true,
    buyPrice: 295000,
    rentPricePerDay: 0,
    rentPricePerWeek: 0,
    securityDeposit: 0,
    stockReady: 8,
    stockRented: 0,
    nextAvailableDate: null,
    promo: {
      hasPromo: true,
      badgeText: "Original Cool",
      discountPercent: 0,
      promoType: "buy",
      promoDescription: "Solusi untuk PS5 yang mengeluarkan suara berisik atau overheat!"
    },
    rentalTerms: [],
    rating: 4.7,
    reviewsCount: 39
  },
  {
    id: "prod-15",
    name: "eXtremeRate Rise 4.0 Remap Paddle Kit (PS5 DualSense)",
    category: "tools",
    categoryLabel: "Modding Controller",
    brand: "eXtremeRate",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    description: "Kit modifikasi tombol belakang (back paddles) untuk stik PS5 DualSense. Memberikan 4 tombol tambahan ergonomis yang dapat diprogram ulang tanpa perlu solder (opsional L3/R3).",
    specs: [
      "Tombol Tambahan: 4 tombol tactile micro-switch di bagian belakang",
      "Pemrograman: Remap hingga 15 tombol fungsi secara instan",
      "Kompatibilitas: DualSense BDM-010, BDM-020, BDM-030",
      "Warna: Matte Black dengan grip karet nyaman di telapak tangan"
    ],
    isRentable: false,
    isBuyable: true,
    buyPrice: 525000,
    rentPricePerDay: 0,
    rentPricePerWeek: 0,
    securityDeposit: 0,
    stockReady: 7,
    stockRented: 0,
    nextAvailableDate: null,
    promo: {
      hasPromo: true,
      badgeText: "Mod Pro Gamer",
      discountPercent: 8,
      promoType: "buy",
      promoDescription: "Upgrade stik standar Anda menjadi layaknya stik DualSense Edge jutaan rupiah!"
    },
    rentalTerms: [],
    rating: 4.9,
    reviewsCount: 51
  },
  {
    id: "prod-16",
    name: "Sony DualSense Wireless Controller (Midnight Black)",
    category: "accessory",
    categoryLabel: "Aksesoris",
    brand: "Sony PlayStation",
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=800&q=80",
    description: "Controller resmi PlayStation 5 dengan haptic feedback dinamis, adaptive triggers, dan mikrofon internal.",
    specs: [
      "Fitur: Haptic Feedback, Adaptive Triggers L2/R2, Motion Sensor 6-axis",
      "Koneksi: Bluetooth 5.1 & USB Type-C kabel",
      "Baterai: 1560 mAh Li-ion rechargeable",
      "Kompatibel: PS5, PC Windows, Steam Deck, iPhone/Android"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 980000,
    rentPricePerDay: 25000,
    rentPricePerWeek: 120000,
    securityDeposit: 200000,
    stockReady: 14,
    stockRented: 6,
    nextAvailableDate: "2026-09-10",
    promo: {
      hasPromo: true,
      badgeText: "Ekstra Stick",
      discountPercent: 0,
      promoType: "all",
      promoDescription: "Butuh stik tambahan untuk main bareng teman saat sewa konsol? Tambahkan stik ini!"
    },
    rentalTerms: [
      "Kondisi stik 100% normal tanpa stick drift",
      "Deposit Rp 200.000"
    ],
    rating: 4.9,
    reviewsCount: 310
  },
  {
    id: "prod-17",
    name: "PlayStation VR2 Horizon Call of the Mountain Bundle",
    category: "accessory",
    categoryLabel: "Aksesoris VR",
    brand: "Sony PlayStation",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=800&q=80",
    description: "Headset Virtual Reality mutakhir untuk PS5 dengan layar 4K HDR OLED, eye tracking cerdas, dan audio 3D spasial yang imersif.",
    specs: [
      "Layar: 2000 x 2040 per mata OLED HDR 90Hz / 120Hz",
      "Sudut Pandang: Field of View 110 derajat",
      "Fitur Khusus: Headset feedback vibration, 4 kamera inside-out tracking",
      "Kelengkapan: Headset PS VR2, 2x Sense Controller L/R, Earphone stereo"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 9600000,
    rentPricePerDay: 160000,
    rentPricePerWeek: 950000,
    securityDeposit: 800000,
    stockReady: 3,
    stockRented: 2,
    nextAvailableDate: "2026-09-15",
    promo: {
      hasPromo: true,
      badgeText: "Diskon 20% Sewa",
      discountPercent: 20,
      promoType: "rental",
      promoDescription: "Coba sensasi VR premium generasi baru tanpa harus bayar jutaan rupiah!"
    },
    rentalTerms: [
      "Wajib memiliki konsol PS5 sendiri atau sewa sepaket dengan PS5",
      "Verifikasi identitas ketat (KTP + alamat tetap)",
      "Deposit jaminan Rp 800.000"
    ],
    rating: 4.8,
    reviewsCount: 47
  },
  {
    id: "prod-18",
    name: "Nintendo Switch Pro Controller Official",
    category: "accessory",
    categoryLabel: "Aksesoris",
    brand: "Nintendo",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80",
    description: "Controller genggam premium untuk Nintendo Switch dengan baterai luar biasa tahan hingga 40 jam dan pegangan bertekstur nyaman.",
    specs: [
      "Baterai: Hingga 40 jam penggunaan aktif",
      "Fitur: HD Rumble, Gyro Motion Control, NFC Reader Amiibo",
      "Koneksi: Bluetooth & USB-C wired mode"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 790000,
    rentPricePerDay: 20000,
    rentPricePerWeek: 90000,
    securityDeposit: 150000,
    stockReady: 9,
    stockRented: 4,
    nextAvailableDate: "2026-09-11",
    promo: {
      hasPromo: true,
      badgeText: "Best Comfort",
      discountPercent: 0,
      promoType: "all",
      promoDescription: "Jauh lebih nyaman dibanding Joy-Con untuk game action dan balap!"
    },
    rentalTerms: [
      "Termasuk kabel charging USB-C",
      "Deposit Rp 150.000"
    ],
    rating: 4.9,
    reviewsCount: 188
  },
  {
    id: "prod-19",
    name: "Black Myth: Wukong (PS5 Physical Disc)",
    category: "game",
    categoryLabel: "Game Fisik",
    brand: "Game Science",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    description: "Game action RPG grafis Unreal Engine 5 fenomenal berlatar mitologi Tiongkok Journey to the West. Kaset BD fisik original region 3 Asia.",
    specs: [
      "Platform: PlayStation 5 (BD-ROM)",
      "Genre: Action RPG / Souls-like",
      "Subtitle: Bahasa Inggris & Indonesia",
      "Ukuran Instalasi: ~130 GB"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 840000,
    rentPricePerDay: 20000,
    rentPricePerWeek: 95000,
    securityDeposit: 150000,
    stockReady: 10,
    stockRented: 7,
    nextAvailableDate: "2026-09-09",
    promo: {
      hasPromo: true,
      badgeText: "Hot Game",
      discountPercent: 10,
      promoType: "rental",
      promoDescription: "Game paling laris tahun ini! Tersedia paket sewa tamat 2 minggu."
    },
    rentalTerms: [
      "Kaset disc dilarang tergores/kotor",
      "Deposit Rp 150.000 refundable"
    ],
    rating: 5.0,
    reviewsCount: 420
  },
  {
    id: "prod-20",
    name: "The Legend of Zelda: Tears of the Kingdom (Switch Cartridge)",
    category: "game",
    categoryLabel: "Game Fisik",
    brand: "Nintendo",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    description: "Petualangan legendaris Link di kepulauan langit Hyrule. Karya agung open-world dengan kebebasan kreasi Ultrahand tanpa batas.",
    specs: [
      "Platform: Nintendo Switch Cartridge",
      "Genre: Action Adventure Open World",
      "Bahasa: English, Japanese, French, dsb",
      "Kondisi: Cartridge original dengan box cover rapi"
    ],
    isRentable: true,
    isBuyable: true,
    buyPrice: 690000,
    rentPricePerDay: 18000,
    rentPricePerWeek: 85000,
    securityDeposit: 150000,
    stockReady: 8,
    stockRented: 5,
    nextAvailableDate: "2026-09-11",
    promo: {
      hasPromo: true,
      badgeText: "Rental Populer",
      discountPercent: 0,
      promoType: "all",
      promoDescription: "Wajib dimainkan untuk semua pemilik Nintendo Switch!"
    },
    rentalTerms: [
      "Cartridge dan box original dikembalikan utuh",
      "Deposit Rp 150.000"
    ],
    rating: 4.9,
    reviewsCount: 390
  }
];

if (typeof window !== "undefined") {
  window.CONSOLE_PRODUCTS = products;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { products };
}

