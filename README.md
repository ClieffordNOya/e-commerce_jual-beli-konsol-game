# 🎮 CONSOLE HUB - E-Commerce Sewa & Jual Konsol Game & Tools

Platform web modern untuk rental (sewa) dan jual-beli (retail) konsol game, suku cadang/alat reparasi (*tools* konsol), aksesoris, serta game fisik original. Dilengkapi dengan status ketersediaan stok *realtime*, sistem promosi & kupon voucher diskon, kalkulator durasi dan deposit jaminan sewa, simulasi *payment gateway* terpadu (QRIS, VA Bank, E-Wallet), serta arsitektur serverless yang **siap di-deploy langsung ke Cloudflare Pages**.

---

## 🌟 Fitur Utama

1. **Dual-Mode System (Sewa & Beli):**
   - Pelanggan dapat memilih opsi **Sewa** (dengan kalkulator durasi harian/mingguan/bulanan + deposit garansi yang dapat dikembalikan) atau **Beli Unit Baru/Bekas**.
   - Keranjang belanja mendukung transaksi *hybrid* (sewa dan beli sekaligus) dengan rincian biaya yang transparan.
2. **Informasi Stok Realtime:**
   - Indikator badge visual interaktif:
     - 🟢 **Ready Stock:** Jumlah unit yang siap diambil atau dikirim hari ini.
     - 🟡 **Stok Menipis:** Peringatan ketika sisa unit $\le 3$.
     - 🔵 **Sedang Disewa:** Menampilkan jumlah unit yang aktif disewa pelanggan lain serta estimasi tanggal unit kembali (*next available date*).
     - 🔴 **Habis (Out of Stock).**
3. **Pusat Promosi & Kupon Diskon:**
   - Banner *carousel* interaktif di beranda untuk promosi aktif.
   - Badge promosi pada kartu produk (misal: *Diskon 15% Sewa Weekend*, *Free 1 Game Rental*, *Wajib Repaste PS5*).
   - Fitur klaim & penukaran kode kupon di keranjang belanja:
     - `GAMERBARU` : Potongan Rp 50.000 untuk transaksi pertama.
     - `WEEKENDGAS` : Diskon 15% khusus biaya rental weekend.
     - `SEWAHEMAT` : Diskon 20% untuk rental durasi 7 hari ke atas.
     - `SERVISPRO` : Potongan Rp 25.000 untuk kategori alat reparasi (*tools*).
4. **Online Payment Gateway:**
   - Alur checkout ala **Midtrans Snap / Xendit**:
     - **QRIS Dinamis:** Kode QR otomatis yang dapat di-*scan* melalui GoPay, OVO, DANA, ShopeePay, BCA, Livin Mandiri, dsb.
     - **Virtual Account (VA):** Nomor VA unik untuk BCA, Mandiri, BNI, dan BRI dengan tombol salin instan.
     - **Simulasi Callback Interaktif:** Tombol uji bayar untuk memvalidasi pembayaran dan mencetak invoice resmi.
   - Cloudflare Pages Functions di folder `/functions/api/checkout.js` yang siap dihubungkan ke Server Key Midtrans/Xendit Anda.
5. **Syarat Sewa & Verifikasi Identitas:**
   - Form checkout otomatis menampilkan kolom NIK (e-KTP/SIM) dan syarat jaminan khusus jika terdapat barang sewa di keranjang belanja.

---

## 📁 Struktur Direktori

```text
console-hub/
├── index.html                   # Halaman utama aplikasi SPA responsif (Tailwind CSS)
├── data/
│   ├── products.js              # Master data 20 dummy produk komprehensif
│   └── promotions.js            # Master data banner dan kupon promosi
├── js/
│   └── app.js                   # Logika frontend, state cart, kalkulator deposit & gateway
├── functions/                   # Cloudflare Pages Functions (Serverless Backend)
│   └── api/
│       ├── checkout.js          # API endpoint pembuatan transaksi pembayaran (Midtrans/Mock)
│       └── webhook.js           # API webhook penerima callback status pembayaran
├── wrangler.toml                # File konfigurasi resmi Cloudflare Pages
├── _headers                     # Konfigurasi keamanan & CORS Cloudflare
├── _routes.json                 # Routing rules Cloudflare Functions
└── README.md                    # Dokumentasi lengkap & panduan deploy
```

---

## 🎮 20 Data Dummy Produk Lengkap

| No | Nama Produk | Kategori | Opsi | Harga Beli | Harga Sewa/Hari | Stok Ready | Stok Sewa | Promo Badge |
|---|---|---|---|---|---|---|---|---|
| 1 | **PlayStation 5 Slim Disc Edition** | Konsol | Sewa & Beli | Rp 8.900.000 | Rp 120.000 | 8 | 5 | Diskon 15% Sewa Weekend |
| 2 | **PlayStation 5 Digital Edition** | Konsol | Sewa & Beli | Rp 7.600.000 | Rp 100.000 | 4 | 6 | Best Value |
| 3 | **Nintendo Switch OLED Zelda Tears Edition** | Konsol | Sewa & Beli | Rp 4.650.000 | Rp 70.000 | 6 | 4 | Free 1 Game Rental |
| 4 | **Xbox Series X 1TB Console** | Konsol | Sewa & Beli | Rp 8.350.000 | Rp 110.000 | 3 | 3 | Cashback 10% |
| 5 | **Valve Steam Deck OLED 512GB** | Konsol Handheld | Sewa & Beli | Rp 9.400.000 | Rp 95.000 | 5 | 2 | Promo Liburan |
| 6 | **ASUS ROG Ally Z1 Extreme 512GB** | Konsol Handheld | Sewa & Beli | Rp 9.100.000 | Rp 90.000 | 4 | 3 | Diskon Beli 5% |
| 7 | **PlayStation 4 Pro 1TB Refurbished** | Konsol | Sewa & Beli | Rp 3.750.000 | Rp 45.000 | 10 | 8 | Rental Hemat |
| 8 | **iFixit Pro Tech Toolkit Precision 64-Bit** | Tools Konsol | Sewa & Beli | Rp 380.000 | Rp 25.000 | 15 | 2 | Terlaris Teknisi |
| 9 | **Thermal Grizzly Conductonaut Liquid Metal 1g** | Tools/Pasta | Hanya Jual | Rp 175.000 | - | 25 | 0 | Wajib Repaste PS5 |
| 10 | **Kaisi Mini Hot Air & Soldering Station 2-in-1** | Tools Servis | Sewa & Beli | Rp 680.000 | Rp 45.000 | 5 | 1 | Sewa Alat Pro |
| 11 | **RCM Jig & Auto-Payload Injector Switch V1** | Tools Modding | Hanya Jual | Rp 115.000 | - | 30 | 0 | Siap Pakai |
| 12 | **Hall Effect 3D Joystick Kit (Anti-Drift PS5/Xbox)**| Suku Cadang | Hanya Jual | Rp 145.000 | - | 40 | 0 | Solusi Drift |
| 13 | **Console Deep Cleaning Kit & Electric Blower** | Perawatan | Sewa & Beli | Rp 240.000 | Rp 20.000 | 12 | 3 | Bundle Bersih |
| 14 | **PS5 OEM Replacement Cooling Fan 23-Blade** | Suku Cadang | Hanya Jual | Rp 295.000 | - | 8 | 0 | Original Cool |
| 15 | **eXtremeRate Rise 4.0 Remap Paddle Kit (PS5)** | Modding Tools | Hanya Jual | Rp 525.000 | - | 7 | 0 | Mod Pro Gamer |
| 16 | **Sony DualSense Wireless Controller (Midnight Black)**| Aksesoris | Sewa & Beli | Rp 980.000 | Rp 25.000 | 14 | 6 | Ekstra Stick |
| 17 | **PlayStation VR2 Horizon Call of the Mountain** | Aksesoris VR | Sewa & Beli | Rp 9.600.000 | Rp 160.000 | 3 | 2 | Diskon 20% Sewa |
| 18 | **Nintendo Switch Pro Controller Official** | Aksesoris | Sewa & Beli | Rp 790.000 | Rp 20.000 | 9 | 4 | Best Comfort |
| 19 | **Black Myth: Wukong (PS5 Physical Disc)** | Game Fisik | Sewa & Beli | Rp 840.000 | Rp 20.000 | 10 | 7 | Hot Game |
| 20 | **The Legend of Zelda: Tears of the Kingdom (Cartridge)**| Game Fisik | Sewa & Beli | Rp 690.000 | Rp 18.000 | 8 | 5 | Rental Populer |

---

## 🚀 Cara Menjalankan Secara Lokal

Aplikasi dirancang bebas konfigurasi rumit:

### Opsi 1: Buka Langsung di Browser (Paling Cepat)
1. Buka folder `C:\Users\clief\.gemini\antigravity\scratch\console-hub` di File Explorer.
2. Klik ganda pada file `index.html`.
3. Aplikasi akan langsung terbuka di browser default (Google Chrome, Microsoft Edge, Firefox) dan seluruh fitur katalog, filter, keranjang, kalkulator deposit, dan simulasi payment gateway siap digunakan secara *offline*!

### Opsi 2: Menggunakan Local Server (VS Code / Python / Node)
Jika Anda menggunakan ekstensi **Live Server** di VS Code atau Python:
```bash
# Menggunakan Python
python -m http.server 3000
# Buka http://localhost:3000 di browser
```

---

## ☁️ Panduan Deploy Sendiri ke Cloudflare Pages

Anda dapat men-deploy proyek ini ke Cloudflare dengan 3 metode mudah:

### Metode 1: Direct Upload via Cloudflare Dashboard (Rekomendasi / Tanpa CLI)
1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/) dan login ke akun Anda.
2. Pada menu kiri, pilih **Workers & Pages** > klik **Create Application**.
3. Pilih tab **Pages**, lalu pilih **Upload assets**.
4. Beri nama proyek Anda, misalnya `console-hub`.
5. Seret (*drag and drop*) seluruh isi folder `console-hub` (termasuk `index.html`, folder `data`, `js`, `functions`, dll).
6. Klik **Deploy site**. Dalam hitungan detik, situs Anda sudah aktif di domain gratis `https://console-hub.pages.dev`!

### Metode 2: Hubungkan ke GitHub (CI/CD Otomatis)
1. Buat repository baru di akun GitHub Anda dan unggah (*push*) kode folder `console-hub`.
2. Di Cloudflare Dashboard > **Workers & Pages** > **Create Application** > **Pages** > **Connect to Git**.
3. Pilih repository Anda.
4. Pada **Build settings**:
   - **Framework preset:** `None`
   - **Build command:** (kosongkan)
   - **Build output directory:** `.`
5. Klik **Save and Deploy**. Setiap kali Anda melakukan perubahan atau *commit*, Cloudflare akan otomatis mengompilasi dan men-deploy situs Anda secara gratis!

### Metode 3: Menggunakan Cloudflare Wrangler CLI
Jika Anda sudah memiliki Node.js di terminal:
```bash
# Login ke akun Cloudflare Anda
npx wrangler login

# Deploy langsung dari direktori proyek
npx wrangler pages deploy . --project-name=console-hub
```

---

## 💳 Konfigurasi Payment Gateway Nyata (Midtrans)

Ketika Anda siap menerima pembayaran uang asli di produksi:
1. Daftar akun di [Midtrans](https://midtrans.com/) dan dapatkan **Server Key** & **Client Key** dari menu *Settings > Access Keys*.
2. Buka Cloudflare Dashboard > Proyek Pages Anda > **Settings** > **Environment variables**.
3. Tambahkan variabel rahasia berikut:
   - `MIDTRANS_SERVER_KEY` = `SB-Mid-server-xxxx` (untuk Sandbox) atau `Mid-server-xxxx` (untuk Produksi)
   - `ENVIRONMENT` = `production` (atau `development`)
4. Simpan konfigurasi. Cloudflare Pages Function di `/functions/api/checkout.js` akan otomatis memproses transaksi nyata secara aman di level serverless edge Cloudflare!
