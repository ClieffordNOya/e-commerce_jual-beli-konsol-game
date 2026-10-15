/**
 * CONSOLE HUB - Main Application Logic
 * Menangani Katalog, Filter Sewa/Beli, Keranjang, Kalkulasi Durasi & Deposit,
 * Sistem Kupon Promosi, Simulasi Payment Gateway, dan Invoice Generator.
 */

// Inisialisasi Data Produk dan Promosi (Mendukung file:// langsung dan HTTP)
function getStoredProductsData() {
  const master = window.CONSOLE_PRODUCTS || [];
  try {
    const saved = localStorage.getItem("CONSOLE_PRODUCTS_OVERRIDE");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Gabungkan dengan master data agar field terbaru (isOnSale, originalPrice, price) selalu ada
        const merged = master.map(m => {
          const match = parsed.find(p => p.id === m.id);
          if (!match) return m;
          const hasNewFields = match.price !== undefined && match.originalPrice !== undefined;
          if (!hasNewFields) {
            return {
              ...m,
              reviews: (match.reviews && match.reviews.length) ? match.reviews : m.reviews,
              rating: match.rating || m.rating,
              stockReady: match.stockReady !== undefined ? match.stockReady : m.stockReady,
              stockRented: match.stockRented !== undefined ? match.stockRented : m.stockRented
            };
          }
          return {
            ...m,
            ...match,
            isOnSale: match.isOnSale !== undefined ? match.isOnSale : m.isOnSale,
            originalPrice: match.originalPrice !== undefined ? match.originalPrice : m.originalPrice,
            price: match.price !== undefined ? match.price : m.price,
            originalRentPricePerDay: match.originalRentPricePerDay !== undefined ? match.originalRentPricePerDay : m.originalRentPricePerDay
          };
        });
        return merged;
      }
    }
  } catch (e) {}
  return master;
}

const productsData = getStoredProductsData();
try {
  localStorage.setItem("CONSOLE_PRODUCTS_OVERRIDE", JSON.stringify(productsData));
} catch (e) {}
const promoBannersData = window.CONSOLE_BANNERS || [];
const couponsData = window.CONSOLE_COUPONS || [];

// Master Konfigurasi Layanan Pengiriman & Estimasi Tiba (Instant, Sameday, Reguler)
const SHIPPING_DESTINATIONS = {
  jabodetabek: {
    label: "Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi)",
    services: [
      {
        id: "instant",
        name: "Instant Delivery",
        courier: "GoSend / GrabExpress",
        eta: "1 - 2 Jam (Tiba Hari Ini)",
        price: 35000,
        icon: "🚀",
        badge: "⚡ Paling Cepat",
        badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
        description: "Kurir langsung mengantar pesanan ke alamat Anda saat ini juga."
      },
      {
        id: "sameday",
        name: "Sameday Service",
        courier: "Anteraja / Paxel",
        eta: "6 - 8 Jam (Sore/Malam Ini)",
        price: 22000,
        icon: "⚡",
        badge: "✨ Populer",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
        description: "Tiba di hari yang sama untuk pemesanan sebelum jam 15.00."
      },
      {
        id: "reguler",
        name: "Reguler Delivery",
        courier: "JNE YES / SiCepat",
        eta: "1 - 2 Hari Kerja",
        price: 12000,
        icon: "📦",
        badge: "💰 Hemat",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        description: "Packing kayu & bubble wrap anti-benturan dengan garansi kurir."
      },
      {
        id: "pickup",
        name: "Ambil di Rental Station",
        courier: "Station Console Hub",
        eta: "Siap Ambil (30 Menit)",
        price: 0,
        icon: "🏪",
        badge: "GRATIS",
        badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        description: "Ambil langsung di rental hub kami tanpa antri & biaya ongkir."
      }
    ]
  },
  bandung: {
    label: "Bandung Raya & Jawa Barat",
    services: [
      {
        id: "instant",
        name: "Instant Courier Bandung",
        courier: "GoSend / GrabExpress",
        eta: "2 - 3 Jam (Tiba Hari Ini)",
        price: 40000,
        icon: "🚀",
        badge: "⚡ Instant",
        badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
        description: "Pengiriman cepat area Bandung Raya dan sekitarnya."
      },
      {
        id: "sameday",
        name: "Sameday Intercity",
        courier: "Paxel Bandung",
        eta: "Sore Ini (8 Jam)",
        price: 25000,
        icon: "⚡",
        badge: "✨ Cepat",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
        description: "Tiba di hari yang sama dengan handling aman."
      },
      {
        id: "reguler",
        name: "Reguler Delivery",
        courier: "J&T / SiCepat Express",
        eta: "1 - 2 Hari Kerja",
        price: 14000,
        icon: "📦",
        badge: "💰 Hemat",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        description: "Ekspedisi bergaransi dengan proteksi penuh."
      },
      {
        id: "pickup",
        name: "Ambil di Station Bandung",
        courier: "Mitra Hub Bandung",
        eta: "Siap Ambil (1 Jam)",
        price: 0,
        icon: "🏪",
        badge: "GRATIS",
        badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        description: "Pengambilan langsung di Station Mitra Bandung."
      }
    ]
  },
  surabaya: {
    label: "Surabaya, Sidoarjo, Malang & Jatim",
    services: [
      {
        id: "instant",
        name: "Instant Delivery Surabaya",
        courier: "GoSend / GrabExpress",
        eta: "2 - 3 Jam (Hari Ini)",
        price: 42000,
        icon: "🚀",
        badge: "⚡ Kilat",
        badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
        description: "Layanan ekspres kurir area Surabaya, Sidoarjo & Malang."
      },
      {
        id: "sameday",
        name: "Sameday Paxel Jatim",
        courier: "Paxel Surabaya",
        eta: "Sore Ini (6 - 8 Jam)",
        price: 28000,
        icon: "⚡",
        badge: "✨ Populer",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
        description: "Paxel Sameday aman berpendingin & terlindungi."
      },
      {
        id: "reguler",
        name: "Reguler Delivery",
        courier: "JNE / J&T Express",
        eta: "1 - 2 Hari Kerja",
        price: 16000,
        icon: "📦",
        badge: "💰 Hemat",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        description: "Kargo aman dengan proteksi bubble wrap berlapis."
      },
      {
        id: "pickup",
        name: "Ambil di Station Surabaya",
        courier: "Mitra Hub Surabaya",
        eta: "Siap Ambil (1 Jam)",
        price: 0,
        icon: "🏪",
        badge: "GRATIS",
        badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        description: "Ambil langsung di Hub Station Surabaya."
      }
    ]
  },
  semarang: {
    label: "Semarang, Solo, Jogja & Jateng",
    services: [
      {
        id: "instant",
        name: "Instant Kurir Jateng",
        courier: "GoSend / Grab Instant",
        eta: "2 - 3 Jam (Hari Ini)",
        price: 38000,
        icon: "🚀",
        badge: "⚡ Cepat",
        badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
        description: "Kurir langsung mengantar ke lokasi Anda."
      },
      {
        id: "sameday",
        name: "Sameday Cargo Jateng",
        courier: "Paxel Cargo",
        eta: "Tiba Hari Ini (8 Jam)",
        price: 26000,
        icon: "⚡",
        badge: "✨ Sameday",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
        description: "Tiba di hari yang sama untuk area Jawa Tengah & DIY."
      },
      {
        id: "reguler",
        name: "Reguler Delivery",
        courier: "SiCepat / JNE",
        eta: "1 - 2 Hari Kerja",
        price: 15000,
        icon: "📦",
        badge: "💰 Hemat",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        description: "Pengiriman reguler dengan tracking realtime."
      },
      {
        id: "pickup",
        name: "Hub Station Jogja / Solo",
        courier: "Console Hub Station",
        eta: "Siap Ambil (1 Jam)",
        price: 0,
        icon: "🏪",
        badge: "GRATIS",
        badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        description: "Ambil unit langsung di hub station terdekat."
      }
    ]
  },
  luar_jawa: {
    label: "Luar Pulau Jawa (Antar Pulau)",
    services: [
      {
        id: "instant",
        name: "Express Air Freight",
        courier: "Garuda Cargo / JNE YES Udara",
        eta: "1 Hari (Besok Tiba)",
        price: 65000,
        icon: "🚀",
        badge: "✈️ Udara Kilat",
        badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
        description: "Prioritas jalur udara kilat tiba esok hari."
      },
      {
        id: "sameday",
        name: "Next Day Express",
        courier: "TiKi ONS / SiCepat BEST",
        eta: "1 - 2 Hari Kerja",
        price: 45000,
        icon: "⚡",
        badge: "✨ Prioritas",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
        description: "Layanan prioritas cepat antar pulau terpercaya."
      },
      {
        id: "reguler",
        name: "Reguler Cargo Antar Pulau",
        courier: "J&T Cargo / JNE Reguler",
        eta: "2 - 4 Hari Kerja",
        price: 25000,
        icon: "📦",
        badge: "💰 Hemat",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        description: "Packing kayu solid khusus anti-benturan pengiriman antar pulau."
      },
      {
        id: "pickup",
        name: "Ambil di Drop Point",
        courier: "Kargo Station Hub",
        eta: "1 - 2 Hari",
        price: 15000,
        icon: "🏪",
        badge: "Drop Point",
        badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        description: "Ambil di counter kargo stasiun/bandara kota Anda."
      }
    ]
  }
};

// State Aplikasi
const state = {
  products: productsData,
  banners: promoBannersData,
  coupons: couponsData,
  activeCategory: "all",
  activeModeFilter: "all", // 'all' | 'rent' | 'buy'
  searchQuery: "",
  inStockOnly: false,
  promoOnly: false,
  sortBy: "popular", // 'popular' | 'price-low' | 'price-high' | 'discount'
  activeBannerIndex: 0,
  cart: [],
  appliedCoupon: null,
  selectedProductForModal: null,
  activeModalMode: "rent", // 'rent' | 'buy'
  modalRentDuration: 3,
  modalRentStartDate: new Date().toISOString().split("T")[0],
  modalQuantity: 1,
  currentTransaction: null,
  // State Pengiriman & Estimasi
  selectedDestination: "jabodetabek",
  selectedShippingServiceId: "instant",
  shippingCost: 35000,
  shippingEstimate: "1 - 2 Jam (Tiba Hari Ini)"
};


// Formatter Rupiah
function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Toast Notifikasi
function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) return;

  const toast = document.createElement("div");
  const bgColors = {
    success: "bg-emerald-600 text-white",
    error: "bg-rose-600 text-white",
    info: "bg-blue-600 text-white",
    warning: "bg-amber-600 text-white"
  };

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-2 opacity-0 ${bgColors[type] || bgColors.info}`;
  toast.innerHTML = `
    <span class="text-lg">${type === "success" ? "✓" : type === "error" ? "✕" : "ℹ"}</span>
    <span class="text-sm font-medium">${message}</span>
  `;

  toastContainer.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
  });

  setTimeout(() => {
    toast.classList.add("translate-y-2", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Inisialisasi DOM & Event Listener
document.addEventListener("DOMContentLoaded", () => {
  initBanners();
  renderProducts();
  setupEventListeners();
  setupCountdownTimer();
});

// ===== FUNGSI MODE SEWA / BELI (Hero Mode Selector) =====
window.setGlobalMode = function(mode) {
  state.activeModeFilter = mode;

  // Update visual state pada hero mode cards
  const cardAll  = document.getElementById("mode-card-all");
  const cardRent = document.getElementById("mode-card-rent");
  const cardBuy  = document.getElementById("mode-card-buy");

  // Reset semua kartu ke state tidak aktif
  const inactiveClass = "mode-hero-card group relative overflow-hidden rounded-2xl p-6 border-2 border-slate-700 bg-slate-900/60 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl";
  const activeAllClass = "mode-hero-card group relative overflow-hidden rounded-2xl p-6 border-2 border-indigo-500 bg-indigo-600/20 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/20 ring-2 ring-indigo-500/50";
  const activeRentClass = "mode-hero-card group relative overflow-hidden rounded-2xl p-6 border-2 border-indigo-500 bg-indigo-600/10 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/20 ring-2 ring-indigo-500/40";
  const activeBuyClass  = "mode-hero-card group relative overflow-hidden rounded-2xl p-6 border-2 border-teal-500 bg-teal-600/10 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/20 ring-2 ring-teal-500/40";

  if (cardAll)  cardAll.className  = inactiveClass + " hover:border-indigo-500/60 hover:shadow-indigo-500/10";
  if (cardRent) cardRent.className = inactiveClass + " hover:border-indigo-500/60 hover:shadow-indigo-500/10";
  if (cardBuy)  cardBuy.className  = inactiveClass + " hover:border-teal-500/60 hover:shadow-teal-500/10";

  // Hapus badge AKTIF lama
  document.querySelectorAll(".mode-active-badge").forEach(b => b.remove());

  // Set kartu yang dipilih menjadi aktif
  const badgeHtml = (color) => `<span class="mode-active-badge absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full bg-${color}-500 text-white shadow">AKTIF</span>`;
  if (mode === "all" && cardAll) {
    cardAll.className = activeAllClass;
    cardAll.insertAdjacentHTML("beforeend", badgeHtml("indigo"));
  } else if (mode === "rent" && cardRent) {
    cardRent.className = activeRentClass;
    cardRent.insertAdjacentHTML("beforeend", badgeHtml("indigo"));
  } else if (mode === "buy" && cardBuy) {
    cardBuy.className = activeBuyClass;
    cardBuy.insertAdjacentHTML("beforeend", badgeHtml("teal"));
  }

  // Sync dengan tombol mode filter di navbar
  const modeButtons = document.querySelectorAll(".mode-filter-btn");
  modeButtons.forEach(btn => {
    if (btn.dataset.mode === mode) {
      btn.classList.add("bg-slate-800", "text-white", "border-indigo-500");
      btn.classList.remove("text-gray-400");
    } else {
      btn.classList.remove("bg-slate-800", "text-white", "border-indigo-500");
      btn.classList.add("text-gray-400");
    }
  });

  // Scroll ke katalog produk
  const catalogSection = document.getElementById("products-grid");
  if (catalogSection) {
    catalogSection.closest("main").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Re-render produk dengan filter baru
  renderProducts();

  const modeLabel = mode === "all" ? "Semua Produk" : mode === "rent" ? "Mode Sewa" : "Mode Beli";
  showToast(`Filter diubah ke: ${modeLabel}`, "info");
};

// Setup Hero Promo Banners
function initBanners() {
  const bannerContainer = document.getElementById("banner-slider");
  const bannerDots = document.getElementById("banner-dots");
  if (!bannerContainer || !state.banners.length) return;

  bannerContainer.innerHTML = state.banners.map((b, idx) => `
    <div class="banner-slide min-w-full rounded-2xl p-6 md:p-10 text-white relative overflow-hidden bg-gradient-to-r ${b.bgGradient} flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl border border-white/10" style="display: ${idx === 0 ? 'flex' : 'none'}">
      <div class="space-y-3 max-w-xl z-10">
        <span class="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider rounded-full text-amber-300">
          🔥 ${b.tag}
        </span>
        <h2 class="text-2xl md:text-4xl font-extrabold tracking-tight">${b.title}</h2>
        <p class="text-sm md:text-base text-gray-100/90 leading-relaxed">${b.description}</p>
        <div class="flex items-center gap-3 pt-2">
          <div class="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg font-mono text-sm border border-white/20 flex items-center gap-2">
            <span>Kode: <strong class="text-amber-300">${b.code}</strong></span>
            <button onclick="copyPromoCode('${b.code}')" class="text-xs bg-white/20 hover:bg-white/40 px-2 py-0.5 rounded transition">Salin</button>
          </div>
          <button onclick="applyPromoBanner('${b.code}')" class="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs md:text-sm rounded-lg shadow-lg hover:shadow-amber-400/30 transition">
            ${b.buttonText}
          </button>
        </div>
      </div>
      <div class="hidden md:flex flex-col items-end text-right z-10">
        <span class="text-5xl font-black opacity-20 text-white select-none">CONSOLE HUB</span>
        <span class="text-xs text-indigo-200 mt-2">Rental & Retail Ready</span>
      </div>
      <!-- Background pattern -->
      <div class="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  `).join("");

  if (bannerDots) {
    bannerDots.innerHTML = state.banners.map((_, idx) => `
      <button onclick="switchBanner(${idx})" class="w-3 h-3 rounded-full transition-all ${idx === 0 ? 'bg-amber-400 w-8' : 'bg-white/40'}" data-index="${idx}"></button>
    `).join("");
  }

  // Auto slide interval
  setInterval(() => {
    switchBanner((state.activeBannerIndex + 1) % state.banners.length);
  }, 6500);
}

window.switchBanner = function(index) {
  state.activeBannerIndex = index;
  const slides = document.querySelectorAll(".banner-slide");
  const dots = document.querySelectorAll("#banner-dots button");

  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "flex" : "none";
  });

  dots.forEach((dot, i) => {
    if (i === index) {
      dot.className = "w-8 h-3 rounded-full bg-amber-400 transition-all";
    } else {
      dot.className = "w-3 h-3 rounded-full bg-white/40 transition-all";
    }
  });
};

window.copyPromoCode = function(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToast(`Kode promo ${code} disalin ke clipboard!`, "success");
  }).catch(() => {
    showToast(`Kode promo: ${code}`, "info");
  });
};

window.applyPromoBanner = function(code) {
  openCartDrawer();
  const input = document.getElementById("coupon-input");
  if (input) {
    input.value = code;
    applyCouponCode(code);
  }
};

// Filter dan Render Produk
function getFilteredProducts() {
  return state.products.filter(p => {
    // 1. Kategori
    if (state.activeCategory !== "all" && p.category !== state.activeCategory) {
      return false;
    }
    // 2. Mode Filter (Sewa / Beli)
    if (state.activeModeFilter === "rent" && !p.isRentable) return false;
    if (state.activeModeFilter === "buy" && !p.isBuyable) return false;

    // 3. Stok Ready Only
    if (state.inStockOnly && p.stockReady <= 0) return false;

    // 4. Promo Only
    if (state.promoOnly && !(p.promo && p.promo.hasPromo)) return false;

    // 5. Pencarian teks
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchDesc) return false;
    }

    return true;
  }).sort((a, b) => {
    if (state.sortBy === "price-low") {
      const priceA = a.buyPrice || a.rentPricePerDay;
      const priceB = b.buyPrice || b.rentPricePerDay;
      return priceA - priceB;
    }
    if (state.sortBy === "price-high") {
      const priceA = a.buyPrice || a.rentPricePerDay;
      const priceB = b.buyPrice || b.rentPricePerDay;
      return priceB - priceA;
    }
    if (state.sortBy === "discount") {
      const promoA = (a.promo && a.promo.discountPercent) || 0;
      const promoB = (b.promo && b.promo.discountPercent) || 0;
      return promoB - promoA;
    }
    // default: rating & reviews count
    return (b.rating * b.reviewsCount) - (a.rating * a.reviewsCount);
  });
}

function renderProducts() {
  const container = document.getElementById("products-grid");
  const countLabel = document.getElementById("product-count-label");
  if (!container) return;

  const filtered = getFilteredProducts();

  if (countLabel) {
    const modeText = state.activeModeFilter === "rent" ? " · Mode Sewa" : state.activeModeFilter === "buy" ? " · Mode Beli" : "";
    countLabel.innerHTML = `<span class="font-semibold text-white">${filtered.length}</span> <span class="text-gray-400">dari ${state.products.length} produk${modeText}</span>`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-gray-400 space-y-3">
        <div class="text-5xl">🔍</div>
        <h3 class="text-lg font-bold text-gray-200">Tidak ada produk yang cocok</h3>
        <p class="text-sm text-gray-400">Coba ubah kata kunci pencarian atau sesuaikan filter Anda.</p>
        <button onclick="resetFilters()" class="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition">
          Reset Semua Filter
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => {
    // Indikator Stok
    let stockBadge = "";
    if (p.stockReady > 3) {
      stockBadge = `<span class="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        Ready: ${p.stockReady} unit
      </span>`;
    } else if (p.stockReady > 0) {
      stockBadge = `<span class="px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        Sisa ${p.stockReady} unit
      </span>`;
    } else if (p.stockRented > 0) {
      stockBadge = `<span class="px-2.5 py-1 bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full flex items-center gap-1.5" title="Tersedia kembali ${p.nextAvailableDate}">
        <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
        Disewa (${p.stockRented})
      </span>`;
    } else {
      stockBadge = `<span class="px-2.5 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold rounded-full">
        Habis
      </span>`;
    }

    // Badge Promosi & On Sale
    let promoBadge = "";
    if (p.isOnSale) {
      const orig = p.originalPrice || p.buyPrice || p.price || 0;
      const curr = p.price !== undefined ? p.price : (p.discountPrice || p.buyPrice || 0);
      const pct = (orig > curr && orig > 0) ? Math.round(((orig - curr) / orig) * 100) : (p.promo?.discountPercent || 15);
      promoBadge = `
        <div class="absolute top-3 left-3 z-10">
          <span class="px-2.5 py-1 bg-gradient-to-r from-rose-600 to-red-500 text-white text-[11px] font-black uppercase tracking-wider rounded-lg shadow-lg flex items-center gap-1 animate-pulse">
            🔥 Diskon ${pct}%
          </span>
        </div>
      `;
    } else if (p.promo && p.promo.hasPromo) {
      promoBadge = `
        <div class="absolute top-3 left-3 z-10">
          <span class="px-2.5 py-1 bg-rose-600 text-white text-[11px] font-extrabold uppercase tracking-wider rounded-lg shadow-md flex items-center gap-1">
            ⚡ ${p.promo.badgeText}
          </span>
        </div>
      `;
    }

    // Badge Mode Ketersediaan
    const availabilityBadge = `
      <div class="flex items-center gap-1 text-[11px] font-medium text-gray-400">
        ${p.isRentable ? '<span class="bg-indigo-900/60 text-indigo-300 px-2 py-0.5 rounded border border-indigo-700/50">Bisa Sewa</span>' : ''}
        ${p.isBuyable ? '<span class="bg-teal-900/60 text-teal-300 px-2 py-0.5 rounded border border-teal-700/50">Bisa Beli</span>' : ''}
      </div>
    `;

    return `
      <div class="product-card group bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between">
        <div class="relative">
          ${promoBadge}
          <div class="h-48 overflow-hidden bg-slate-950 flex items-center justify-center relative">
            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80'">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
          </div>
          
          <div class="p-4 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-indigo-400 uppercase tracking-wider">${p.categoryLabel}</span>
              <div class="flex items-center gap-1 text-xs text-amber-400 font-bold">
                ★ <span>${p.rating}</span>
                <span class="text-gray-500 font-normal">(${p.reviews ? p.reviews.length : p.reviewsCount})</span>
              </div>
            </div>

            <h3 class="font-bold text-base text-gray-100 group-hover:text-indigo-300 transition-colors line-clamp-1" title="${p.name}">
              ${p.name}
            </h3>

            <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed">
              ${p.description}
            </p>

            <div class="pt-2 flex items-center justify-between">
              ${stockBadge}
              ${availabilityBadge}
            </div>
          </div>
        </div>

        <!-- Section Harga & Tombol Aksi: SEWA vs BELI -->
        <div class="p-4 pt-0 space-y-3 border-t border-slate-800/80 mt-2">

          <!-- Info Harga (Sewa & Beli berdampingan) -->
          <div class="pt-3 grid grid-cols-2 gap-2 text-xs">

            ${p.isRentable ? (() => {
              const currentRentPrice  = p.rentPricePerDay;
              const origRentPrice     = p.originalRentPricePerDay;
              const hasRentDiscount   = Boolean(origRentPrice && origRentPrice > currentRentPrice);
              const rentDiscPct       = hasRentDiscount
                ? Math.round(((origRentPrice - currentRentPrice) / origRentPrice) * 100)
                : 0;
              return `
                <div class="p-2.5 rounded-xl border flex flex-col justify-between
                  ${hasRentDiscount
                    ? 'border-rose-900/60 bg-rose-950/20'
                    : 'bg-indigo-950/40 border-indigo-900/40'}">
                  <span class="text-[10px] font-semibold uppercase tracking-wider mb-1
                    ${hasRentDiscount ? 'text-rose-400' : 'text-indigo-400'}">
                    ${hasRentDiscount ? '🔥 Promo Sewa' : '🗓️ Tarif Sewa'}
                  </span>

                  ${hasRentDiscount ? `
                    <div class="price-shopee-row" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                      <span style="color:#ff4d4f;font-weight:bold;font-size:1.1em;">${formatRupiah(currentRentPrice)}</span>
                      <span style="text-decoration:line-through;color:#8c8c8c;font-size:0.85em;">${formatRupiah(origRentPrice)}</span>
                      <span style="background:#fff1f0;color:#ff4d4f;font-size:0.75em;padding:2px 4px;border-radius:3px;font-weight:bold;">-${rentDiscPct}%</span>
                    </div>
                  ` : `
                    <span class="text-indigo-300 font-black text-base block">${formatRupiah(currentRentPrice)}</span>
                  `}
                  <span class="text-[10px] text-gray-400 mt-0.5">/hari · Deposit ${formatRupiah(p.securityDeposit)}</span>
                </div>
              `;
            })() : `
              <div class="bg-slate-800/20 p-2.5 rounded-xl border border-slate-700/20 flex items-center justify-center text-center">
                <span class="text-[11px] text-gray-500 font-medium">Tidak<br>Tersewa</span>
              </div>
            `}

            ${p.isBuyable ? (() => {
              const discPrice   = p.price !== undefined
                ? p.price
                : ((p.isOnSale && p.discountPrice) ? p.discountPrice : p.buyPrice);
              const origPrice   = p.originalPrice || p.buyPrice || discPrice;
              const hasDiscount = Boolean(p.isOnSale && origPrice > discPrice);
              const discPct     = hasDiscount
                ? Math.round(((origPrice - discPrice) / origPrice) * 100)
                : 0;
              return `
                <div class="p-2.5 rounded-xl border flex flex-col justify-between
                  ${p.isOnSale
                    ? 'border-rose-900/60 bg-rose-950/20'
                    : 'bg-teal-950/40 border-teal-900/40'}">
                  <span class="text-[10px] font-semibold uppercase tracking-wider mb-1
                    ${p.isOnSale ? 'text-rose-400' : 'text-teal-400'}">
                    ${p.isOnSale ? '🔥 Promo Beli' : '🛍️ Harga Beli'}
                  </span>

                  ${hasDiscount ? `
                    <div class="price-shopee-row" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                      <span style="color:#ff4d4f;font-weight:bold;font-size:1.1em;">${formatRupiah(discPrice)}</span>
                      <span style="text-decoration:line-through;color:#8c8c8c;font-size:0.85em;">${formatRupiah(origPrice)}</span>
                      <span style="background:#fff1f0;color:#ff4d4f;font-size:0.75em;padding:2px 4px;border-radius:3px;font-weight:bold;">-${discPct}%</span>
                    </div>
                  ` : `
                    <span class="text-teal-300 font-black text-base block">${formatRupiah(discPrice)}</span>
                  `}
                  <span class="text-[10px] text-gray-400 mt-0.5">unit baru · Garansi 1 Th</span>
                </div>
              `;
            })() : `
              <div class="bg-slate-800/20 p-2.5 rounded-xl border border-slate-700/20 flex items-center justify-center text-center">
                <span class="text-[11px] text-gray-500 font-medium">Tidak<br>Dijual</span>
              </div>
            `}
          </div>


          <!-- Tombol Aksi SEWA dan BELI yang menonjol -->
          <div class="grid ${(p.isRentable && p.isBuyable) ? 'grid-cols-2' : 'grid-cols-1'} gap-2">
            ${p.isRentable ? `
              <button onclick="openProductDetail('${p.id}', 'rent')"
                class="group/btn py-2.5 px-3 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-0.5 transition-all duration-200
                  bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 hover:scale-[1.02] border border-indigo-500">
                <span class="text-sm">🗓️ SEWA</span>
                <span class="text-[10px] font-normal opacity-80">${formatRupiah(p.rentPricePerDay)}/hari</span>
              </button>
            ` : ''}
            ${p.isBuyable ? (() => {
              const currentPrice = p.price !== undefined ? p.price : ((p.isOnSale && p.discountPrice) ? p.discountPrice : p.buyPrice);
              const isSale = Boolean(p.isOnSale);
              return `
                <button onclick="openProductDetail('${p.id}', 'buy')"
                  class="group/btn py-2.5 px-3 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-0.5 transition-all duration-200
                    ${isSale ? 'bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 border-rose-500 shadow-rose-600/30' : 'bg-teal-600 hover:bg-teal-500 border-teal-500 shadow-teal-600/25'} text-white shadow-lg hover:shadow-xl hover:scale-[1.02] border">
                  <span class="text-sm">${isSale ? '🔥 BELI SALE' : '🛍️ BELI'}</span>
                  <span class="text-[10px] font-normal opacity-90">${formatRupiah(currentPrice)}</span>
                </button>
              `;
            })() : ''}
          </div>

          <!-- Tombol Detail kecil -->
          <button onclick="openProductDetail('${p.id}', 'quick')"
            class="w-full py-2 text-center text-[11px] text-gray-400 hover:text-indigo-300 transition font-medium flex items-center justify-center gap-1">
            <span>Lihat Detail & Spesifikasi ›</span>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// Modal Detail Produk dengan Kalkulator Sewa & Beli
window.openProductDetail = function(productId, preferredMode = "rent") {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  state.selectedProductForModal = product;
  state.activeModalMode = (preferredMode === "buy" || !product.isRentable) ? "buy" : "rent";
  state.modalRentDuration = 3;
  state.modalQuantity = 1;

  const modal = document.getElementById("product-detail-modal");
  const modalContent = document.getElementById("modal-product-content");
  if (!modal || !modalContent) return;

  renderModalContent();
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
};

window.closeProductModal = function() {
  const modal = document.getElementById("product-detail-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
};

window.setModalMode = function(mode) {
  state.activeModalMode = mode;
  renderModalContent();
};

window.updateRentDuration = function(days) {
  state.modalRentDuration = Math.max(1, parseInt(days) || 1);
  renderModalPricingSummary();
};

window.updateRentStartDate = function(dateStr) {
  state.modalRentStartDate = dateStr;
  renderModalPricingSummary();
};

window.updateModalQuantity = function(change) {
  const p = state.selectedProductForModal;
  const maxStock = p.stockReady > 0 ? p.stockReady : 1;
  const newQty = state.modalQuantity + change;
  if (newQty >= 1 && newQty <= maxStock) {
    state.modalQuantity = newQty;
    renderModalPricingSummary();
  }
};

function calculateRentalCost(product, durationDays) {
  const weeks = Math.floor(durationDays / 7);
  const remDays = durationDays % 7;
  let rentSubtotal = 0;

  if (weeks > 0 && product.rentPricePerWeek) {
    rentSubtotal = (weeks * product.rentPricePerWeek) + (remDays * product.rentPricePerDay);
  } else {
    rentSubtotal = durationDays * product.rentPricePerDay;
  }

  // Cek jika produk punya promo sewa
  let discount = 0;
  if (product.promo && product.promo.hasPromo && (product.promo.promoType === "rental" || product.promo.promoType === "all")) {
    discount = (rentSubtotal * (product.promo.discountPercent || 0)) / 100;
  }

  const deposit = product.securityDeposit || 0;
  const total = (rentSubtotal - discount) + deposit;

  return {
    rentSubtotal,
    discount,
    deposit,
    total
  };
}

function renderModalContent() {
  const p = state.selectedProductForModal;
  const modalContent = document.getElementById("modal-product-content");
  if (!p || !modalContent) return;

  const isRentActive = state.activeModalMode === "rent" && p.isRentable;

  modalContent.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
      <!-- Kolom Kiri: Gambar & Info Singkat -->
      <div class="lg:col-span-5 space-y-4">
        <div class="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative aspect-video lg:aspect-square flex items-center justify-center">
          <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover">
          ${p.promo && p.promo.hasPromo ? `
            <span class="absolute top-3 left-3 px-3 py-1 bg-rose-600 text-white font-bold text-xs rounded-lg shadow">
              ⚡ ${p.promo.badgeText}
            </span>
          ` : ''}
        </div>

        <div class="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 space-y-2">
          <h4 class="text-xs font-bold text-indigo-400 uppercase tracking-wider">Status Stok & Lokasi</h4>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span class="text-gray-400 block text-[11px]">Ready di Toko:</span>
              <span class="text-emerald-400 font-bold text-sm">${p.stockReady} Unit</span>
            </div>
            <div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span class="text-gray-400 block text-[11px]">Sedang Disewa:</span>
              <span class="text-sky-400 font-bold text-sm">${p.stockRented} Unit</span>
            </div>
          </div>
          ${p.nextAvailableDate && p.stockReady <= 2 ? `
            <p class="text-[11px] text-amber-300/90 pt-1">
              ℹ️ Batch sewa berikutnya kembali pada: <strong>${p.nextAvailableDate}</strong>
            </p>
          ` : ''}
        </div>

        <!-- Spesifikasi Ringkas -->
        <div class="space-y-2">
          <h4 class="text-xs font-bold text-gray-300 uppercase tracking-wider">Spesifikasi Utama</h4>
          <ul class="text-xs text-gray-400 space-y-1 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
            ${p.specs.map(s => `<li class="flex items-start gap-2"><span class="text-indigo-400">▹</span><span>${s}</span></li>`).join("")}
          </ul>
        </div>

        <!-- Ulasan Pelanggan & Form Review -->
        <div class="space-y-3 pt-3 border-t border-slate-800/80">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>⭐ Ulasan & Rating</span>
              <span class="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">★ ${p.rating} / 5.0</span>
            </h4>
            <span class="text-[10px] text-gray-400 font-semibold">${p.reviews ? p.reviews.length : p.reviewsCount} review</span>
          </div>

          <!-- Form Input Ulasan Pembeli (Customer Review Form) -->
          <div class="bg-slate-900/90 border border-indigo-900/40 rounded-2xl p-3.5 space-y-2.5 shadow-md">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-white flex items-center gap-1">
                <span>✍️</span> Tulis Ulasan Anda
              </span>
              <!-- Rating Bintang Interaktif -->
              <div class="flex items-center gap-1" id="interactive-star-rating" title="Klik bintang untuk menilai">
                <button type="button" onclick="setModalReviewRating(1)" class="star-btn text-base text-amber-400 hover:scale-125 transition" id="star-btn-1">★</button>
                <button type="button" onclick="setModalReviewRating(2)" class="star-btn text-base text-amber-400 hover:scale-125 transition" id="star-btn-2">★</button>
                <button type="button" onclick="setModalReviewRating(3)" class="star-btn text-base text-amber-400 hover:scale-125 transition" id="star-btn-3">★</button>
                <button type="button" onclick="setModalReviewRating(4)" class="star-btn text-base text-amber-400 hover:scale-125 transition" id="star-btn-4">★</button>
                <button type="button" onclick="setModalReviewRating(5)" class="star-btn text-base text-amber-400 hover:scale-125 transition" id="star-btn-5">★</button>
                <span class="text-[11px] font-bold text-amber-300 ml-1" id="modal-rating-score">5.0</span>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <input type="text" id="review-input-name" placeholder="Nama Anda (contoh: Kevin S.)" required
                class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500">
              <select id="review-input-type" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-indigo-500">
                <option value="buy">🛍️ Pengalaman Beli Unit</option>
                <option value="rent">🗓️ Pengalaman Sewa</option>
              </select>
            </div>

            <textarea id="review-input-comment" rows="2" placeholder="Bagikan ulasan Anda mengenai kondisi barang, respon toko, dan kepuasan..." required
              class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"></textarea>

            <button type="button" onclick="submitProductReview('${p.id}')"
              class="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-xs transition shadow-md flex items-center justify-center gap-1.5">
              <span>Kirim Ulasan Pembeli</span> ➔
            </button>
          </div>

          <!-- Daftar Ulasan Pelanggan -->
          <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
            ${(p.reviews && p.reviews.length > 0) ? p.reviews.map(r => `
              <div class="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl space-y-1 text-xs">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 text-[10px] font-bold flex items-center justify-center border border-indigo-500/40">${r.avatar || 'CS'}</span>
                    <span class="font-bold text-gray-200 text-[11px]">${r.reviewer}</span>
                    <span class="text-[9px] px-1.5 py-0.2 rounded font-semibold ${r.type === 'rent' ? 'bg-indigo-900/40 text-indigo-300 border border-indigo-700/40' : 'bg-teal-900/40 text-teal-300 border border-teal-700/40'}">${r.type === 'rent' ? 'Sewa' : 'Beli'}</span>
                  </div>
                  <span class="text-amber-400 text-[11px] font-bold">★ ${r.rating}</span>
                </div>
                <p class="text-[11px] text-gray-300 leading-relaxed pl-8">${r.comment}</p>
                <div class="text-[9px] text-gray-500 text-right">${r.date}</div>
              </div>
            `).join("") : `
              <p class="text-xs text-gray-500 italic p-3 text-center bg-slate-900/40 rounded-xl border border-slate-800">Belum ada ulasan tertulis. Jadilah pengulas pertama!</p>
            `}
          </div>
        </div>
      </div>


      <!-- Kolom Kanan: Pilihan Mode, Kalkulator & Aksi -->
      <div class="lg:col-span-7 space-y-5 flex flex-col justify-between">
        <div class="space-y-4">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-semibold px-2.5 py-0.5 bg-indigo-900/50 text-indigo-300 rounded border border-indigo-700/50">
                ${p.brand}
              </span>
              <span class="text-xs text-gray-400">• ${p.categoryLabel}</span>
              ${(() => {
                const effectiveBuyPrice = p.price !== undefined ? p.price : ((p.isOnSale && p.discountPrice) ? p.discountPrice : p.buyPrice);
                const origPrice = p.originalPrice || p.buyPrice || effectiveBuyPrice;
                const hasDiscount = Boolean(p.isOnSale && origPrice > effectiveBuyPrice);
                const pct = hasDiscount ? Math.round(((origPrice - effectiveBuyPrice) / origPrice) * 100) : (p.promo?.discountPercent || 0);
                return hasDiscount ? `
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-sm flex items-center gap-1">
                    🔥 SALE -${pct}%
                  </span>
                ` : '';
              })()}
            </div>
            <h2 class="text-xl md:text-2xl font-black text-gray-100 mt-1">${p.name}</h2>
            <div class="flex items-center gap-2 mt-1 text-xs text-amber-400">
              <span>★★★★★</span>
              <span class="text-gray-300 font-semibold">${p.rating} / 5.0</span>
              <span class="text-gray-500">(${p.reviews ? p.reviews.length : p.reviewsCount} Ulasan Pelanggan)</span>
            </div>
          </div>

          <p class="text-sm text-gray-300 leading-relaxed">${p.description}</p>

          <!-- Switcher Mode Sewa vs Beli -->
          <div class="space-y-2 pt-2">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider block">Pilih Tipe Transaksi:</span>
            <div class="grid grid-cols-2 gap-3 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button onclick="setModalMode('rent')" ${!p.isRentable ? 'disabled' : ''} class="py-2.5 px-4 rounded-lg font-bold text-xs md:text-sm flex flex-col items-center gap-1 transition ${isRentActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-gray-400 hover:text-white'} ${!p.isRentable ? 'opacity-40 cursor-not-allowed' : ''}">
                <span>🗓️ SEWA (RENTAL)</span>
                <span class="text-[10px] font-normal ${isRentActive ? 'text-indigo-200' : 'text-gray-500'}">Mulai ${formatRupiah(p.rentPricePerDay)}/hari</span>
              </button>

              ${(() => {
                const effectiveBuyPrice = p.price !== undefined ? p.price : ((p.isOnSale && p.discountPrice) ? p.discountPrice : p.buyPrice);
                const origPrice = p.originalPrice || p.buyPrice || effectiveBuyPrice;
                const hasDiscount = Boolean(p.isOnSale && origPrice > effectiveBuyPrice);
                return `
                  <button onclick="setModalMode('buy')" ${!p.isBuyable ? 'disabled' : ''} class="py-2.5 px-4 rounded-lg font-bold text-xs md:text-sm flex flex-col items-center gap-1 transition ${!isRentActive ? (hasDiscount ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-600/30' : 'bg-teal-600 text-white shadow-lg shadow-teal-600/30') : 'text-gray-400 hover:text-white'} ${!p.isBuyable ? 'opacity-40 cursor-not-allowed' : ''}">
                    <span class="flex items-center gap-1">
                      <span>🛍️ BELI UNIT</span>
                      ${hasDiscount ? `<span class="text-[9px] bg-white text-rose-600 px-1.5 py-0.2 rounded font-black">DISKON</span>` : ''}
                    </span>
                    <span class="text-[10px] font-normal ${!isRentActive ? 'text-white' : 'text-gray-500'}">
                      ${hasDiscount ? `<span style="text-decoration: line-through; opacity: 0.6; font-size: 0.85em;" class="mr-1">${formatRupiah(origPrice)}</span>` : ''}
                      <strong>${formatRupiah(effectiveBuyPrice)}</strong>
                    </span>
                  </button>
                `;
              })()}
            </div>
          </div>

          <!-- Bagian Kontrol Mode Sewa -->
          ${isRentActive ? `
            <div class="bg-indigo-950/30 border border-indigo-800/40 p-4 rounded-2xl space-y-4">
              <h4 class="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                <span>⚙️ Kalkulator Sewa</span>
                <span class="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">Fleksibel</span>
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <label class="block text-gray-400 mb-1">Tanggal Mulai Sewa:</label>
                  <input type="date" id="modal-start-date" value="${state.modalRentStartDate}" min="${new Date().toISOString().split("T")[0]}" onchange="updateRentStartDate(this.value)" class="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none">
                </div>
                <div>
                  <label class="block text-gray-400 mb-1">Pilih Durasi Cepat:</label>
                  <div class="flex gap-1.5 flex-wrap">
                    <button onclick="updateRentDuration(1)" class="px-2.5 py-1.5 rounded-lg border text-xs font-semibold ${state.modalRentDuration === 1 ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 text-gray-300 border-slate-700'}">1 Hari</button>
                    <button onclick="updateRentDuration(3)" class="px-2.5 py-1.5 rounded-lg border text-xs font-semibold ${state.modalRentDuration === 3 ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 text-gray-300 border-slate-700'}">3 Hari (Weekend)</button>
                    <button onclick="updateRentDuration(7)" class="px-2.5 py-1.5 rounded-lg border text-xs font-semibold ${state.modalRentDuration === 7 ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 text-gray-300 border-slate-700'}">7 Hari (Hemat)</button>
                    <button onclick="updateRentDuration(14)" class="px-2.5 py-1.5 rounded-lg border text-xs font-semibold ${state.modalRentDuration === 14 ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 text-gray-300 border-slate-700'}">14 Hari</button>
                  </div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center text-xs text-gray-400 mb-1">
                  <span>Kustom Durasi:</span>
                  <span class="text-white font-bold"><span id="duration-display">${state.modalRentDuration}</span> Hari</span>
                </div>
                <input type="range" min="1" max="30" value="${state.modalRentDuration}" oninput="updateRentDuration(this.value)" class="w-full accent-indigo-500">
              </div>

              ${p.rentalTerms && p.rentalTerms.length ? `
                <div class="text-[11px] bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-gray-400 space-y-1">
                  <span class="font-bold text-amber-300 block">Syarat & Ketentuan Sewa:</span>
                  ${p.rentalTerms.map(t => `<p class="flex items-start gap-1.5"><span class="text-indigo-400">•</span><span>${t}</span></p>`).join("")}
                </div>
              ` : ''}
            </div>
          ` : `
            <!-- Bagian Kontrol Mode Beli -->
            <div class="bg-teal-950/30 border border-teal-800/40 p-4 rounded-2xl space-y-4">
              <h4 class="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center justify-between">
                <span>Kuantitas & Paket Pembelian</span>
                ${(p.isOnSale && (p.originalPrice || p.buyPrice) > ((p.isOnSale && p.discountPrice) ? p.discountPrice : p.buyPrice)) ? `
                  <span class="text-[10px] text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded-lg border border-rose-800/50 font-bold">
                    Potongan Diskon Aktif
                  </span>
                ` : ''}
              </h4>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-xs text-gray-300 block font-medium">Jumlah Unit:</span>
                  <span class="text-[11px] text-gray-500">Maksimal ${p.stockReady} unit ready</span>
                </div>
                <div class="flex items-center gap-3 bg-slate-900 p-1 rounded-xl border border-slate-700">
                  <button onclick="updateModalQuantity(-1)" class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center transition">-</button>
                  <span class="font-bold text-sm w-6 text-center text-white" id="modal-qty-display">${state.modalQuantity}</span>
                  <button onclick="updateModalQuantity(1)" class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center transition">+</button>
                </div>
              </div>

              <div class="text-xs text-gray-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                <div class="flex items-center gap-2 text-teal-300 font-semibold">
                  <span>🛡️ Garansi Resmi & Toko</span>
                </div>
                <p class="text-[11px] text-gray-400">Setiap pembelian unit mendapatkan garansi tukar unit baru 7 hari dan garansi servis resmi hingga 1 tahun.</p>
              </div>
            </div>
          `}

          <!-- Box Rincian Biaya -->
          <div id="modal-pricing-box" class="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <!-- Di-update dinamis oleh renderModalPricingSummary -->
          </div>
        </div>

        <!-- Tombol Aksi -->
        <div class="pt-2 flex gap-3">
          <button onclick="closeProductModal()" class="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs md:text-sm font-semibold transition">
            Tutup
          </button>
          <button onclick="addModalItemToCart()" class="flex-1 py-3 px-5 rounded-xl font-bold text-xs md:text-sm shadow-xl transition flex items-center justify-center gap-2 ${isRentActive ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30' : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/30'}">
            <span>🛒 Masukkan ke Keranjang</span>
          </button>
        </div>
      </div>
    </div>
  `;

  renderModalPricingSummary();
}

function renderModalPricingSummary() {
  const p = state.selectedProductForModal;
  const box = document.getElementById("modal-pricing-box");
  const durationDisplay = document.getElementById("duration-display");
  const qtyDisplay = document.getElementById("modal-qty-display");

  if (durationDisplay) durationDisplay.innerText = state.modalRentDuration;
  if (qtyDisplay) qtyDisplay.innerText = state.modalQuantity;
  if (!p || !box) return;

  if (state.activeModalMode === "rent" && p.isRentable) {
    const calc = calculateRentalCost(p, state.modalRentDuration);
    box.innerHTML = `
      <div class="space-y-1.5 text-xs">
        <div class="flex justify-between text-gray-400">
          <span>Biaya Sewa (${state.modalRentDuration} Hari):</span>
          <span class="text-gray-200 font-semibold">${formatRupiah(calc.rentSubtotal)}</span>
        </div>
        ${calc.discount > 0 ? `
          <div class="flex justify-between text-emerald-400">
            <span>Diskon Promo (${p.promo.discountPercent}%):</span>
            <span>- ${formatRupiah(calc.discount)}</span>
          </div>
        ` : ''}
        <div class="flex justify-between text-gray-400">
          <span class="flex items-center gap-1">Deposit Jaminan (Refundable): <span class="text-amber-400" title="Dikembalikan utuh saat unit selesai diperiksa">ℹ️</span></span>
          <span class="text-amber-300 font-semibold">${formatRupiah(calc.deposit)}</span>
        </div>
        <div class="pt-2 border-t border-slate-800 flex justify-between items-center">
          <div>
            <span class="text-xs text-gray-400 block">Total Pembayaran Awal:</span>
            <span class="text-[10px] text-gray-500">Termasuk uang deposit sewa</span>
          </div>
          <span class="text-lg font-black text-indigo-400">${formatRupiah(calc.total)}</span>
        </div>
      </div>
    `;
  } else {
    // Mode Beli: gunakan effectiveBuyPrice (harga diskon otomatis jika isOnSale)
    const effectivePrice = p.price !== undefined ? p.price : ((p.isOnSale && p.discountPrice) ? p.discountPrice : p.buyPrice);
    const origPrice = p.originalPrice || p.buyPrice || effectivePrice;
    const hasDiscount = Boolean(p.isOnSale && origPrice > effectivePrice);
    const totalOriginal = origPrice * state.modalQuantity;
    const totalPay = effectivePrice * state.modalQuantity;
    const totalSavings = totalOriginal - totalPay;

    box.innerHTML = `
      <div class="space-y-1.5 text-xs">
        <div class="flex justify-between text-gray-400">
          <span>Harga Satuan:</span>
          <div>
            ${hasDiscount ? `<span style="text-decoration: line-through; opacity: 0.6; font-size: 0.85em;" class="text-gray-500 mr-1.5">${formatRupiah(origPrice)}</span>` : ''}
            <span class="${hasDiscount ? 'text-rose-400 font-black' : 'text-gray-200 font-semibold'}">${formatRupiah(effectivePrice)}</span>
          </div>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Jumlah Pembelian:</span>
          <span class="text-gray-200 font-semibold">${state.modalQuantity} Unit</span>
        </div>
        ${hasDiscount ? `
          <div class="flex justify-between text-emerald-400 bg-emerald-950/30 p-2 rounded-lg border border-emerald-900/40">
            <span>🎉 Hemat Diskon (${Math.round((totalSavings / totalOriginal) * 100)}%):</span>
            <span class="font-bold">- ${formatRupiah(totalSavings)}</span>
          </div>
        ` : ''}
        <div class="pt-2 border-t border-slate-800 flex justify-between items-center">
          <div>
            <span class="text-xs text-gray-400 block">Total Harga Pembelian:</span>
            ${hasDiscount ? `<span class="text-[10px] text-emerald-400">Hemat ${formatRupiah(totalSavings)}</span>` : ''}
          </div>
          <span class="text-lg font-black ${hasDiscount ? 'text-rose-400' : 'text-teal-400'}">${formatRupiah(totalPay)}</span>
        </div>
      </div>
    `;
  }
}

// Keranjang Belanja (Cart)
window.addModalItemToCart = function() {
  const p = state.selectedProductForModal;
  if (!p) return;

  const mode = state.activeModalMode;
  const cartItemId = `${p.id}-${mode}-${mode === 'rent' ? state.modalRentDuration : 'qty'}`;

  const existingIndex = state.cart.findIndex(item => item.cartItemId === cartItemId);

  if (mode === "rent") {
    const calc = calculateRentalCost(p, state.modalRentDuration);
    const cartItem = {
      cartItemId,
      productId: p.id,
      name: p.name,
      image: p.image,
      category: p.category,
      mode: "rent",
      rentDays: state.modalRentDuration,
      startDate: state.modalRentStartDate,
      quantity: 1,
      rentPricePerDay: p.rentPricePerDay,
      rentSubtotal: calc.rentSubtotal,
      discount: calc.discount,
      securityDeposit: calc.deposit,
      total: calc.total
    };

    if (existingIndex > -1) {
      state.cart[existingIndex] = cartItem;
      showToast(`Durasi sewa ${p.name} diperbarui!`, "info");
    } else {
      state.cart.push(cartItem);
      showToast(`${p.name} (Sewa ${state.modalRentDuration} Hari) ditambahkan ke keranjang!`, "success");
    }
  } else {
    // Mode Buy — Otomatis menggunakan harga diskon jika isOnSale
    const effectivePrice = p.price !== undefined ? p.price : ((p.isOnSale && p.discountPrice) ? p.discountPrice : p.buyPrice);
    const origPrice = p.originalPrice || p.buyPrice || effectivePrice;
    const isSale = Boolean(p.isOnSale && origPrice > effectivePrice);

    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += state.modalQuantity;
      state.cart[existingIndex].buyPrice = effectivePrice;
      state.cart[existingIndex].total = effectivePrice * state.cart[existingIndex].quantity;
      showToast(`Jumlah beli ${p.name} ditambah!`, "info");
    } else {
      state.cart.push({
        cartItemId,
        productId: p.id,
        name: p.name,
        image: p.image,
        category: p.category,
        mode: "buy",
        quantity: state.modalQuantity,
        buyPrice: effectivePrice,
        originalPrice: origPrice,
        isOnSale: isSale,
        savingsPerUnit: isSale ? (origPrice - effectivePrice) : 0,
        total: effectivePrice * state.modalQuantity
      });
      showToast(`${p.name} (${state.modalQuantity} unit${isSale ? ' - Diskon' : ''}) ditambahkan ke keranjang!`, "success");
    }
  }

  updateCartBadge();
  closeProductModal();
  openCartDrawer();
};


window.removeCartItem = function(cartItemId) {
  state.cart = state.cart.filter(item => item.cartItemId !== cartItemId);
  updateCartBadge();
  renderCartDrawer();
  showToast("Item dihapus dari keranjang.", "info");
};

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  const count = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  if (badge) {
    badge.innerText = count;
    badge.style.display = count > 0 ? "inline-flex" : "none";
  }
}

function calculateCartTotals() {
  let rentSubtotal = 0;
  let buySubtotal = 0;
  let securityDeposit = 0;
  let itemDiscounts = 0;
  let totalSaleSavings = 0;

  state.cart.forEach(item => {
    if (item.mode === "rent") {
      rentSubtotal += (item.rentSubtotal || 0);
      securityDeposit += (item.securityDeposit || 0);
      itemDiscounts += (item.discount || 0);
    } else {
      buySubtotal += (item.buyPrice * item.quantity);
      if (item.isOnSale && item.originalPrice && item.originalPrice > item.buyPrice) {
        totalSaleSavings += (item.originalPrice - item.buyPrice) * item.quantity;
      }
    }
  });

  const grossTotal = rentSubtotal + buySubtotal;
  let voucherDiscount = 0;

  if (state.appliedCoupon) {
    const coupon = state.appliedCoupon;
    if (grossTotal >= coupon.minOrder) {
      if (coupon.type === "fixed") {
        voucherDiscount = coupon.value;
      } else if (coupon.type === "percent") {
        let baseAmount = grossTotal;
        if (coupon.applicableTo === "rental") baseAmount = rentSubtotal;
        if (coupon.applicableTo === "tools") {
          baseAmount = state.cart
            .filter(it => it.category === "tools")
            .reduce((acc, it) => acc + (it.mode === "rent" ? it.rentSubtotal : it.buyPrice * it.quantity), 0);
        }
        voucherDiscount = Math.min((baseAmount * coupon.value) / 100, coupon.maxDiscount || Infinity);
      }
    } else {
      // Syarat minimum tidak terpenuhi lagi
      state.appliedCoupon = null;
      showToast(`Kupon dibatalkan karena minimal order Rp ${formatRupiah(coupon.minOrder)} tidak terpenuhi`, "warning");
    }
  }

  const totalDiscounts = itemDiscounts + voucherDiscount + totalSaleSavings;
  const shippingCost = state.cart.length > 0 ? (state.shippingCost !== undefined ? state.shippingCost : 35000) : 0;
  const finalToPay = Math.max(0, (grossTotal - voucherDiscount) + securityDeposit + shippingCost);

  return {
    rentSubtotal,
    buySubtotal,
    grossTotal,
    securityDeposit,
    itemDiscounts,
    voucherDiscount,
    totalSaleSavings,
    totalDiscounts,
    shippingCost,
    totalToPay: finalToPay
  };
}

// Render Keranjang Belanja Drawer
window.openCartDrawer = function() {
  const drawer = document.getElementById("cart-drawer");
  if (!drawer) return;
  renderCartDrawer();
  drawer.classList.remove("hidden");
  drawer.classList.add("flex");
  document.body.style.overflow = "hidden";
};

window.closeCartDrawer = function() {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) {
    drawer.classList.add("hidden");
    drawer.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
};

function renderCartDrawer() {
  const container = document.getElementById("cart-items-container");
  const summaryContainer = document.getElementById("cart-summary-container");
  if (!container || !summaryContainer) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center text-gray-400 space-y-3">
        <div class="text-4xl">🛒</div>
        <p class="text-sm font-semibold text-gray-300">Keranjang Belanja Masih Kosong</p>
        <p class="text-xs text-gray-500">Pilih konsol, aksesoris, atau tools untuk mulai sewa atau beli.</p>
        <button onclick="closeCartDrawer()" class="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition">
          Mulai Eksplorasi
        </button>
      </div>
    `;
    summaryContainer.innerHTML = "";
    return;
  }

  container.innerHTML = state.cart.map(item => {
    const isBuyOnSale = item.mode === 'buy' && item.isOnSale && item.originalPrice && item.originalPrice > item.buyPrice;
    const discountPct = isBuyOnSale ? Math.round(((item.originalPrice - item.buyPrice) / item.originalPrice) * 100) : 0;

    return `
      <div class="flex items-center gap-3 p-3 bg-slate-900/90 rounded-xl border ${isBuyOnSale ? 'border-rose-900/50' : 'border-slate-800'} text-xs">
        <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-cover rounded-lg bg-slate-950 flex-shrink-0">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5 mb-1">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.mode === 'rent' ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-700/50' : 'bg-teal-900/60 text-teal-300 border border-teal-700/50'}">
              ${item.mode === 'rent' ? `Sewa ${item.rentDays} Hari` : 'Beli Unit'}
            </span>
            ${item.mode === 'rent' ? `<span class="text-[10px] text-gray-400">Mulai: ${item.startDate}</span>` : ''}
            ${isBuyOnSale ? `<span class="px-1.5 py-0.2 rounded text-[9px] font-black bg-rose-600/30 text-rose-300 border border-rose-500/40">DISKON -${discountPct}%</span>` : ''}
          </div>
          <h4 class="font-bold text-gray-200 truncate">${item.name}</h4>
          <div class="flex items-center justify-between mt-1 text-[11px]">
            <div class="text-gray-400">
              ${item.mode === 'rent'
                ? `Sewa: ${formatRupiah(item.rentSubtotal)} + Dep: ${formatRupiah(item.securityDeposit)}`
                : (isBuyOnSale
                  ? `<span style="text-decoration: line-through; opacity: 0.6; font-size: 0.85em;" class="mr-1 text-gray-500">${formatRupiah(item.originalPrice)}</span><span class="text-rose-400 font-bold">${formatRupiah(item.buyPrice)}</span> <span class="text-gray-400 font-medium">x ${item.quantity}</span>`
                  : `${item.quantity} x ${formatRupiah(item.buyPrice)}`
                )
              }
            </div>
            <span class="font-bold ${isBuyOnSale ? 'text-rose-400' : 'text-indigo-300'}">${formatRupiah(item.total)}</span>
          </div>
        </div>
        <button onclick="removeCartItem('${item.cartItemId}')" class="text-gray-500 hover:text-rose-400 p-1 transition" title="Hapus Item">
          ✕
        </button>
      </div>
    `;
  }).join("");

  // Rincian & Kupon
  const totals = calculateCartTotals();
  summaryContainer.innerHTML = `
    <!-- Voucher Input -->
    <div class="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2">
      <div class="flex gap-2">
        <input type="text" id="coupon-input" placeholder="Masukkan kode promo (misal: GAMERBARU)" value="${state.appliedCoupon ? state.appliedCoupon.code : ''}" class="flex-1 bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs uppercase font-mono focus:border-indigo-500 focus:outline-none">
        <button onclick="applyCouponInput()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition">
          Terapkan
        </button>
      </div>
      ${state.appliedCoupon ? `
        <div class="flex items-center justify-between text-xs text-emerald-400 bg-emerald-950/40 p-2 rounded-lg border border-emerald-900/50">
          <span>✓ Kupon <strong>${state.appliedCoupon.code}</strong> aktif (-${formatRupiah(totals.voucherDiscount)})</span>
          <button onclick="removeCoupon()" class="text-gray-400 hover:text-white">✕</button>
        </div>
      ` : ''}
    </div>

    <!-- Ringkasan Biaya -->
    <div class="space-y-1.5 text-xs bg-slate-900 p-4 rounded-xl border border-slate-800">
      ${totals.rentSubtotal > 0 ? `
        <div class="flex justify-between text-gray-400">
          <span>Subtotal Sewa:</span>
          <span class="text-gray-200 font-semibold">${formatRupiah(totals.rentSubtotal)}</span>
        </div>
      ` : ''}
      ${totals.buySubtotal > 0 ? `
        <div class="flex justify-between text-gray-400">
          <span>Subtotal Pembelian:</span>
          <span class="text-gray-200 font-semibold">${formatRupiah(totals.buySubtotal)}</span>
        </div>
      ` : ''}
      ${totals.totalSaleSavings > 0 ? `
        <div class="flex justify-between text-rose-400 bg-rose-950/30 p-2 rounded-lg border border-rose-900/40 font-semibold">
          <span>🎉 Hemat Promo Diskon Produk:</span>
          <span>- ${formatRupiah(totals.totalSaleSavings)}</span>
        </div>
      ` : ''}
      ${totals.securityDeposit > 0 ? `
        <div class="flex justify-between text-amber-300">
          <span>Total Deposit Sewa (Refundable):</span>
          <span class="font-semibold">${formatRupiah(totals.securityDeposit)}</span>
        </div>
      ` : ''}
      ${totals.voucherDiscount > 0 ? `
        <div class="flex justify-between text-emerald-400">
          <span>Diskon Kupon Promo:</span>
          <span class="font-semibold">- ${formatRupiah(totals.voucherDiscount)}</span>
        </div>
      ` : ''}
      <div class="flex justify-between text-gray-400">
        <span>Estimasi Ongkos Kirim:</span>
        <span class="${totals.shippingCost === 0 ? 'text-teal-400 font-bold' : 'text-gray-200 font-semibold'}">
          ${totals.shippingCost === 0 ? 'GRATIS' : formatRupiah(totals.shippingCost)}
        </span>
      </div>
      <div class="pt-2 border-t border-slate-800 flex justify-between items-center">
        <div>
          <span class="text-xs text-gray-300 font-bold block">Total Akhir Bayar:</span>
          <span class="text-[10px] text-gray-500">Termasuk estimasi ongkir & jaminan</span>
        </div>
        <span class="text-lg font-black text-indigo-400">${formatRupiah(totals.totalToPay)}</span>
      </div>
    </div>


    <button onclick="openCheckoutModal()" class="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-indigo-600/30 transition flex items-center justify-center gap-2">
      <span>🔒 Lanjut ke Pembayaran Online</span>
    </button>
  `;
}

// Penanganan Kupon Promo
window.applyCouponInput = function() {
  const input = document.getElementById("coupon-input");
  if (!input) return;
  applyCouponCode(input.value.trim().toUpperCase());
};

window.applyCouponCode = function(code) {
  if (!code) {
    showToast("Silakan ketikkan kode kupon.", "warning");
    return;
  }
  const coupon = state.coupons.find(c => c.code === code);
  if (!coupon) {
    showToast(`Kode kupon "${code}" tidak ditemukan atau sudah kadaluarsa.`, "error");
    return;
  }

  const totals = calculateCartTotals();
  if (totals.grossTotal < coupon.minOrder) {
    showToast(`Minimal transaksi untuk kupon ini adalah ${formatRupiah(coupon.minOrder)}`, "warning");
    return;
  }

  state.appliedCoupon = coupon;
  renderCartDrawer();
  showToast(`Kupon ${coupon.code} berhasil diterapkan!`, "success");
};

window.removeCoupon = function() {
  state.appliedCoupon = null;
  renderCartDrawer();
  showToast("Kupon promosi dilepas.", "info");
};

// Shipping Calculator & Service Helper Functions
window.getAvailableShippingServices = function(destId) {
  const dest = SHIPPING_DESTINATIONS[destId] || SHIPPING_DESTINATIONS.jabodetabek;
  return dest.services;
};

window.getSelectedShippingService = function() {
  const destId = state.selectedDestination || "jabodetabek";
  const services = window.getAvailableShippingServices(destId);
  return services.find(s => s.id === state.selectedShippingServiceId) || services[0];
};

window.onShippingDestinationChange = function(destId) {
  state.selectedDestination = destId;
  const services = window.getAvailableShippingServices(destId);
  const match = services.find(s => s.id === state.selectedShippingServiceId);
  state.selectedShippingServiceId = match ? match.id : services[0].id;

  const current = window.getSelectedShippingService();
  state.shippingCost = current.price;
  state.shippingEstimate = current.eta;

  window.renderShippingServices();
  window.updateCheckoutSummaryUI();
};

window.selectShippingService = function(serviceId) {
  state.selectedShippingServiceId = serviceId;
  const current = window.getSelectedShippingService();
  state.shippingCost = current.price;
  state.shippingEstimate = current.eta;

  window.renderShippingServices();
  window.updateCheckoutSummaryUI();
};

window.renderShippingServices = function() {
  const container = document.getElementById("shipping-services-list");
  if (!container) return;

  const destId = state.selectedDestination || "jabodetabek";
  const services = window.getAvailableShippingServices(destId);

  container.innerHTML = services.map(srv => {
    const isSelected = srv.id === state.selectedShippingServiceId;
    return `
      <div onclick="selectShippingService('${srv.id}')"
        class="p-3 sm:p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
          isSelected
            ? 'bg-indigo-950/70 border-indigo-500 shadow-md shadow-indigo-600/20 ring-1 ring-indigo-500'
            : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
        }">
        <div class="mt-0.5 text-xl flex-shrink-0">${srv.icon}</div>
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2 justify-between">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-xs sm:text-sm font-bold text-gray-100">${srv.name}</span>
              <span class="text-[10px] px-2 py-0.5 rounded-full border font-semibold ${srv.badgeColor}">
                ${srv.badge}
              </span>
            </div>
            <span class="text-xs sm:text-sm font-black ${srv.price === 0 ? 'text-teal-400' : 'text-indigo-300'}">
              ${srv.price === 0 ? 'GRATIS' : formatRupiah(srv.price)}
            </span>
          </div>
          <div class="text-[11px] text-gray-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Kurir: <strong class="text-gray-300">${srv.courier}</strong></span>
            <span>•</span>
            <span class="text-amber-300 font-medium">⏱️ Estimasi: ${srv.eta}</span>
          </div>
          <p class="text-[10px] text-gray-500 mt-0.5">${srv.description}</p>
        </div>
        <div class="flex items-center self-center pl-1">
          <span class="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
            isSelected ? 'border-indigo-400 bg-indigo-600 text-white font-bold' : 'border-slate-700 bg-slate-950 text-transparent'
          }">✓</span>
        </div>
      </div>
    `;
  }).join("");

  const badgeElem = document.getElementById("shipping-selected-badge");
  const summaryBox = document.getElementById("shipping-summary-box");
  const current = window.getSelectedShippingService();

  if (badgeElem && current) {
    badgeElem.innerHTML = `${current.icon} ${current.name} (${current.eta})`;
  }

  if (summaryBox && current) {
    summaryBox.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 w-full text-xs">
        <div>
          <span class="text-gray-400">Layanan Dipilih: </span>
          <strong class="text-indigo-300">${current.name} (${current.courier})</strong>
        </div>
        <div class="text-gray-400">
          Estimasi Tiba: <strong class="text-amber-300 font-bold">${current.eta}</strong>
          <span class="mx-1">•</span>
          Ongkir: <strong class="${current.price === 0 ? 'text-teal-400' : 'text-indigo-400'}">${current.price === 0 ? 'GRATIS' : formatRupiah(current.price)}</strong>
        </div>
      </div>
    `;
  }
};

window.updateCheckoutSummaryUI = function() {
  const totals = calculateCartTotals();
  const summaryBox = document.getElementById("checkout-order-summary-box");
  const payBtnAmount = document.getElementById("checkout-btn-pay-amount");
  const current = window.getSelectedShippingService();

  if (summaryBox) {
    const rentItemsCount = state.cart.filter(i => i.mode === "rent").length;
    const buyItemsCount = state.cart.filter(i => i.mode === "buy").length;

    summaryBox.innerHTML = `
      <div class="space-y-1.5 text-xs">
        ${totals.rentSubtotal > 0 ? `
          <div class="flex justify-between text-gray-400">
            <span>Subtotal Sewa (${rentItemsCount} item):</span>
            <span class="text-gray-200 font-semibold">${formatRupiah(totals.rentSubtotal)}</span>
          </div>
        ` : ''}
        ${totals.buySubtotal > 0 ? `
          <div class="flex justify-between text-gray-400">
            <span>Subtotal Beli (${buyItemsCount} item):</span>
            <span class="text-gray-200 font-semibold">${formatRupiah(totals.buySubtotal)}</span>
          </div>
        ` : ''}
        ${totals.voucherDiscount > 0 ? `
          <div class="flex justify-between text-emerald-400">
            <span>Potongan Kupon Promo:</span>
            <span class="font-bold">- ${formatRupiah(totals.voucherDiscount)}</span>
          </div>
        ` : ''}
        ${totals.securityDeposit > 0 ? `
          <div class="flex justify-between text-amber-300">
            <span>Deposit Jaminan Sewa (100% Refundable):</span>
            <span class="font-bold">${formatRupiah(totals.securityDeposit)}</span>
          </div>
        ` : ''}
        <div class="flex justify-between text-gray-400">
          <span>Ongkos Kirim (${current ? current.name : 'Standar'}):</span>
          <span class="${totals.shippingCost === 0 ? 'text-teal-400 font-bold' : 'text-gray-200 font-semibold'}">
            ${totals.shippingCost === 0 ? 'GRATIS' : formatRupiah(totals.shippingCost)}
          </span>
        </div>
        <div class="pt-2 border-t border-slate-800 flex justify-between items-center text-sm">
          <span class="font-bold text-gray-100">Total Akhir Pembayaran:</span>
          <span class="font-black text-indigo-400 text-base">${formatRupiah(totals.totalToPay)}</span>
        </div>
      </div>
    `;
  }

  if (payBtnAmount) {
    payBtnAmount.innerText = formatRupiah(totals.totalToPay);
  }
};

// Checkout & Payment Gateway Flow
window.openCheckoutModal = function() {
  if (state.cart.length === 0) {
    showToast("Keranjang belanja masih kosong.", "warning");
    return;
  }
  closeCartDrawer();

  const modal = document.getElementById("checkout-modal");
  const stepCustomer = document.getElementById("checkout-step-customer");
  const stepGateway = document.getElementById("checkout-step-gateway");
  if (!modal) return;

  // Reset tampilan step
  if (stepCustomer) stepCustomer.classList.remove("hidden");
  if (stepGateway) stepGateway.classList.add("hidden");

  // Inisialisasi Pilihan Destinasi & Layanan Ongkir
  state.selectedDestination = state.selectedDestination || "jabodetabek";
  const destSelect = document.getElementById("shipping-destination");
  if (destSelect) {
    destSelect.value = state.selectedDestination;
  }
  const currentSrv = window.getSelectedShippingService();
  state.shippingCost = currentSrv ? currentSrv.price : 35000;
  state.shippingEstimate = currentSrv ? currentSrv.eta : "1 - 2 Jam (Tiba Hari Ini)";

  window.renderShippingServices();
  window.updateCheckoutSummaryUI();

  // Cek apakah ada barang sewa di keranjang (memerlukan syarat KTP)
  const hasRentItem = state.cart.some(it => it.mode === "rent");
  const ktpGroup = document.getElementById("ktp-field-group");
  if (ktpGroup) {
    ktpGroup.style.display = hasRentItem ? "block" : "none";
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
};

window.closeCheckoutModal = function() {
  const modal = document.getElementById("checkout-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
};

// Proses Submit Form Checkout -> Buka Payment Gateway
window.proceedToPaymentGateway = async function(event) {
  if (event) event.preventDefault();

  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const email = document.getElementById("customer-email").value.trim();
  const address = document.getElementById("customer-address").value.trim();
  const idNumber = document.getElementById("customer-id-number") ? document.getElementById("customer-id-number").value.trim() : "";

  const hasRentItem = state.cart.some(it => it.mode === "rent");
  if (hasRentItem && !idNumber) {
    showToast("Untuk transaksi Sewa, wajib mengisi Nomor KTP/SIM untuk jaminan unit.", "warning");
    return;
  }

  const totals = calculateCartTotals();
  const customer = { name, phone, email, address, idNumber };

  // Data Pengiriman & Nomor Resi AWB Pelacakan
  const selectedShipping = window.getSelectedShippingService();
  const awbPrefix = selectedShipping.id === 'instant' ? 'INST' : (selectedShipping.id === 'sameday' ? 'SMDY' : (selectedShipping.id === 'pickup' ? 'PCKP' : 'REGL'));
  const trackingNumber = `${awbPrefix}-${Math.floor(100000000 + Math.random() * 900000000)}`;

  const shippingInfo = {
    destinationId: state.selectedDestination,
    destinationLabel: (SHIPPING_DESTINATIONS[state.selectedDestination] || {}).label || "Jabodetabek",
    serviceId: selectedShipping.id,
    serviceName: selectedShipping.name,
    courier: selectedShipping.courier,
    eta: selectedShipping.eta,
    cost: selectedShipping.price,
    trackingNumber: trackingNumber,
    statusText: selectedShipping.id === 'pickup' ? "Menunggu Verifikasi & Pengambilan di Station" : "Sedang Dipersiapkan & Quality Check",
    currentStep: 2,
    orderDate: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
    orderTime: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB"
  };

  // Menyiapkan Payload
  const payload = {
    items: state.cart,
    customer,
    pricing: totals,
    shipping: shippingInfo,
    orderType: hasRentItem ? "rental_hybrid" : "retail"
  };

  // Panggil endpoint /api/checkout (atau fallback simulator jika lokal tanpa server HTTP)
  let transactionResult = null;
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      transactionResult = await res.json();
    }
  } catch (e) {
    console.log("Local browser mode, simulating gateway locally...");
  }

  // Fallback simulator jika endpoint backend offline / static file://
  if (!transactionResult || !transactionResult.success) {
    const orderId = "CHUB-" + Date.now().toString().slice(-6) + "-" + Math.floor(100 + Math.random() * 900);
    const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);
    transactionResult = {
      success: true,
      mode: "simulator",
      orderId,
      status: "pending",
      pricing: totals,
      customer,
      shipping: shippingInfo,
      paymentMethods: {
        qris: {
          name: "QRIS Realtime",
          qrImageUrl: `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=CHUB-PAY-${orderId}-${totals.totalToPay}`
        },
        virtualAccount: [
          { bank: "BCA", vaNumber: `80777${randomSuffix}`, name: "CONSOLE HUB BCA VA" },
          { bank: "Mandiri", vaNumber: `89608${randomSuffix}`, name: "CONSOLE HUB MANDIRI VA" },
          { bank: "BNI", vaNumber: `98812${randomSuffix}`, name: "CONSOLE HUB BNI VA" },
          { bank: "BRI", vaNumber: `12800${randomSuffix}`, name: "CONSOLE HUB BRI VA" }
        ]
      },
      expiredAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
    };
  }

  // Pastikan shipping tersimpan pada transactionResult
  if (!transactionResult.shipping) {
    transactionResult.shipping = shippingInfo;
  }

  state.currentTransaction = transactionResult;
  renderPaymentGatewayUI(transactionResult);
};

function renderPaymentGatewayUI(tx) {
  const stepCustomer = document.getElementById("checkout-step-customer");
  const stepGateway = document.getElementById("checkout-step-gateway");
  if (stepCustomer) stepCustomer.classList.add("hidden");
  if (stepGateway) stepGateway.classList.remove("hidden");

  const orderIdLabel = document.getElementById("gateway-order-id");
  const amountLabel = document.getElementById("gateway-amount");
  const qrisImg = document.getElementById("gateway-qris-image");
  const vaList = document.getElementById("gateway-va-list");

  if (orderIdLabel) orderIdLabel.innerText = tx.orderId;
  if (amountLabel) amountLabel.innerText = formatRupiah(tx.pricing.totalToPay);
  if (qrisImg) qrisImg.src = tx.paymentMethods.qris.qrImageUrl;

  if (vaList) {
    vaList.innerHTML = tx.paymentMethods.virtualAccount.map(va => `
      <div class="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
        <div>
          <span class="font-bold text-indigo-400 block">${va.bank} Virtual Account</span>
          <span class="font-mono text-sm text-gray-200">${va.vaNumber}</span>
        </div>
        <button onclick="copyToClipboard('${va.vaNumber}', 'Nomor VA ${va.bank}')" class="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg border border-slate-700 transition">
          Salin
        </button>
      </div>
    `).join("");
  }
}

window.copyToClipboard = function(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} berhasil disalin!`, "success");
  }).catch(() => {
    showToast(`${label}: ${text}`, "info");
  });
};

// Simulasi Bayar Berhasil (Instant Callback)
window.simulatePaymentSuccess = function() {
  const tx = state.currentTransaction;
  if (!tx) return;

  tx.status = "paid";
  tx.paidAt = new Date().toLocaleString("id-ID");

  // Simpan transaksi ke Admin Orders
  const purchasedItems = [...state.cart];
  if (typeof window.addOrderFromCheckout === "function") {
    window.addOrderFromCheckout(tx, purchasedItems);
  }

  // Kosongkan keranjang
  state.cart = [];
  state.appliedCoupon = null;
  updateCartBadge();

  closeCheckoutModal();
  openInvoiceModal(tx, purchasedItems);
  showToast("Pembayaran Berhasil Diverifikasi!", "success");
};


// Modal Post-Purchase Experience: Invoice Digital + Tracking Pesanan + Garansi Sewa
function openInvoiceModal(tx, items) {
  const modal = document.getElementById("invoice-modal");
  const container = document.getElementById("invoice-content");
  if (!modal || !container) return;

  const hasRent = items.some(it => it.mode === "rent");
  const hasBuy = items.some(it => it.mode === "buy");
  const shipping = tx.shipping || {
    serviceName: "Instant Delivery",
    courier: "GoSend Express",
    eta: "1 - 2 Jam (Tiba Hari Ini)",
    cost: 35000,
    trackingNumber: "INST-" + Math.floor(100000000 + Math.random() * 900000000),
    statusText: "Sedang Dipersiapkan & Quality Check",
    currentStep: 2
  };

  const invoiceDate = tx.paidAt || new Date().toLocaleString("id-ID");

  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- 1. POST-PURCHASE HERO BANNER -->
      <div class="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 p-5 sm:p-6 rounded-2xl border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl text-emerald-400 flex-shrink-0 shadow-lg shadow-emerald-500/10">
            ✓
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="brand-font text-lg sm:text-xl font-black text-white">Pembayaran Lunas & Terverifikasi</h3>
              <span class="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black rounded-full uppercase tracking-wider">
                PAID INSTANT
              </span>
            </div>
            <p class="text-xs text-gray-300 mt-1">
              Terima kasih, pesanan Anda <strong class="text-indigo-400 font-mono">#${tx.orderId}</strong> sudah masuk ke antrean teknisi kami.
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2 self-stretch sm:self-auto no-print">
          <button onclick="printInvoice()" class="flex-1 sm:flex-none py-2 px-3.5 bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow">
            🖨️ Cetak / PDF
          </button>
        </div>
      </div>

      <!-- 2. WIDGET PELACAKAN STATUS PESANAN (ORDER TRACKING WIDGET) -->
      <div class="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-lg">📦</span>
              <h4 class="font-bold text-gray-100 text-sm">Pelacakan Pesanan & Status Pengiriman</h4>
            </div>
            <p class="text-[11px] text-gray-400 mt-0.5">Pantau perjalanan paket unit konsol Anda secara realtime</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-400">No. Resi / AWB:</span>
            <div class="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700">
              <span class="font-mono text-xs font-bold text-indigo-300 tracking-wider">${shipping.trackingNumber}</span>
              <button onclick="copyToClipboard('${shipping.trackingNumber}', 'Nomor Resi AWB')" class="text-gray-400 hover:text-white text-xs pl-1 no-print" title="Salin Nomor Resi">
                📋
              </button>
            </div>
          </div>
        </div>

        <!-- Detail Kurir & Estimasi -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div class="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
            <span class="text-gray-500 block text-[10px] uppercase font-bold">Layanan Kurir</span>
            <span class="font-bold text-gray-200 mt-0.5 block">${shipping.serviceName}</span>
            <span class="text-[11px] text-gray-400">${shipping.courier}</span>
          </div>
          <div class="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
            <span class="text-gray-500 block text-[10px] uppercase font-bold">Estimasi Tiba</span>
            <span class="font-bold text-amber-300 mt-0.5 block flex items-center gap-1">
              ⏱️ ${shipping.eta}
            </span>
            <span class="text-[10px] text-gray-400">Pengiriman Prioritas Terlindungi</span>
          </div>
          <div class="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
            <span class="text-gray-500 block text-[10px] uppercase font-bold">Status Saat Ini</span>
            <span class="font-bold text-emerald-400 mt-0.5 block flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              ${shipping.statusText}
            </span>
            <span class="text-[10px] text-gray-400">Diperbarui: ${new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB</span>
          </div>
        </div>

        <!-- Visual Step Timeline Tracker -->
        <div class="pt-2">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            
            <!-- Step 1 -->
            <div class="p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/40 relative">
              <div class="flex items-center justify-between mb-1">
                <span class="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 text-xs font-black flex items-center justify-center">✓</span>
                <span class="text-[10px] text-emerald-300 font-mono font-bold">SELESAI</span>
              </div>
              <h5 class="text-xs font-bold text-gray-100">1. Pembayaran</h5>
              <p class="text-[10px] text-gray-400 mt-0.5">Lunas via Instant Payment Gateway</p>
            </div>

            <!-- Step 2 -->
            <div class="p-3 bg-indigo-950/40 rounded-xl border border-indigo-500 relative ring-1 ring-indigo-500/50">
              <div class="flex items-center justify-between mb-1">
                <span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center animate-pulse">2</span>
                <span class="text-[10px] text-indigo-300 font-bold flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span> AKTIF
                </span>
              </div>
              <h5 class="text-xs font-bold text-indigo-200">2. QC & Packing</h5>
              <p class="text-[10px] text-gray-300 mt-0.5">Uji 15-Point Diagnostik & Segel Garansi</p>
            </div>

            <!-- Step 3 -->
            <div class="p-3 bg-slate-950/40 rounded-xl border border-slate-800 opacity-60">
              <div class="flex items-center justify-between mb-1">
                <span class="w-6 h-6 rounded-full bg-slate-800 text-gray-400 text-xs font-bold flex items-center justify-center">3</span>
                <span class="text-[10px] text-gray-500 font-medium">Antrean</span>
              </div>
              <h5 class="text-xs font-bold text-gray-300">3. Penjemputan Kurir</h5>
              <p class="text-[10px] text-gray-500 mt-0.5">Serah terima ke ${shipping.courier}</p>
            </div>

            <!-- Step 4 -->
            <div class="p-3 bg-slate-950/40 rounded-xl border border-slate-800 opacity-60">
              <div class="flex items-center justify-between mb-1">
                <span class="w-6 h-6 rounded-full bg-slate-800 text-gray-400 text-xs font-bold flex items-center justify-center">4</span>
                <span class="text-[10px] text-gray-500 font-medium">Tujuan</span>
              </div>
              <h5 class="text-xs font-bold text-gray-300">4. Tiba di Alamat</h5>
              <p class="text-[10px] text-gray-500 mt-0.5">Konfirmasi unboxing & play</p>
            </div>
          </div>
        </div>

        <!-- Live Status Log -->
        <div class="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-[11px] space-y-1.5 text-gray-400">
          <div class="flex items-start gap-2">
            <span class="text-emerald-400">●</span>
            <div><strong class="text-gray-200">${invoiceDate}:</strong> Pembayaran terverifikasi lunas. Sistem otomatis menerbitkan faktur digital dan proteksi garansi.</div>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-indigo-400">●</span>
            <div><strong class="text-gray-200">Proses Berjalan:</strong> Teknisi Console Hub menyiapkan unit, memasang segel garansi resmi, dan mengemas dengan bubble wrap tebal + hard-box anti-benturan.</div>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-amber-400">●</span>
            <div><strong class="text-gray-200">Instruksi Kurir:</strong> Kurir <span class="text-amber-300 font-semibold">${shipping.courier}</span> dijadwalkan pickup menuju alamat penerima.</div>
          </div>
        </div>
      </div>

      <!-- 3. WIDGET GARANSI & PROTEKSI SEWA / PEMBELIAN -->
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="text-lg">🛡️</span>
          <h4 class="font-bold text-gray-100 text-sm">Status Garansi & Proteksi Konsol Anda</h4>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          ${hasRent ? `
            <!-- Kartu Proteksi Sewa -->
            <div class="p-4 bg-gradient-to-br from-indigo-950/50 to-slate-900 rounded-2xl border border-indigo-500/30 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-bold text-indigo-300 flex items-center gap-1.5">
                  🔐 Escrow Deposit Terlindungi
                </span>
                <span class="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded font-bold text-[10px]">
                  100% REFUNDABLE
                </span>
              </div>
              <p class="text-gray-300 text-[11px] leading-relaxed">
                Deposit jaminan sebesar <strong class="text-amber-300 font-bold">${formatRupiah(tx.pricing.securityDeposit)}</strong> tersimpan aman di akun Escrow Console Hub. Dana akan ditransfer kembali secara otomatis 1x24 jam setelah unit dikembalikan utuh.
              </p>
              <div class="pt-2 border-t border-indigo-900/50 flex items-center justify-between text-[10px] text-gray-400">
                <span>Status Deposit: <strong class="text-emerald-400">Aktif & Terjamin</strong></span>
                <span>ID Deposit: <code class="text-gray-300">DEP-${tx.orderId.slice(-6)}</code></span>
              </div>
            </div>

            <div class="p-4 bg-gradient-to-br from-amber-950/30 to-slate-900 rounded-2xl border border-amber-500/30 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-bold text-amber-300 flex items-center gap-1.5">
                  ⚡ Garansi Tukar Unit 1x24 Jam
                </span>
                <span class="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded font-bold text-[10px]">
                  FREE SWAP
                </span>
              </div>
              <p class="text-gray-300 text-[11px] leading-relaxed">
                Jika terdapat kendala analog drift pada stik controller, overheating, atau error sistem selama masa sewa, teknisi kami siap mengantar unit pengganti kilat tanpa biaya sewa tambahan.
              </p>
              <div class="pt-2 border-t border-amber-900/50 flex items-center justify-between text-[10px] text-gray-400">
                <span>Layanan Bantuan: <strong class="text-amber-300">WhatsApp Hotline 24/7</strong></span>
                <span>Respon: &lt; 15 Menit</span>
              </div>
            </div>
          ` : ''}

          ${hasBuy ? `
            <!-- Kartu Garansi Beli Unit -->
            <div class="p-4 bg-gradient-to-br from-teal-950/40 to-slate-900 rounded-2xl border border-teal-500/30 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-bold text-teal-300 flex items-center gap-1.5">
                  🏅 Garansi Resmi 1 Tahun Console Hub
                </span>
                <span class="px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded font-bold text-[10px]">
                  FULL COVERAGE
                </span>
              </div>
              <p class="text-gray-300 text-[11px] leading-relaxed">
                Unit konsol yang Anda beli dilindungi sertifikat garansi resmi mencakup sparepart mesin, perbaikan motherboard, servis port HDMI, dan gratis konsultasi teknisi.
              </p>
              <div class="pt-2 border-t border-teal-900/50 flex items-center justify-between text-[10px] text-gray-400">
                <span>No. Polis: <code class="text-teal-300">WAR-${tx.orderId.slice(-6)}</code></span>
                <span>Masa Berlaku: 365 Hari</span>
              </div>
            </div>

            <div class="p-4 bg-gradient-to-br from-slate-900 to-indigo-950/40 rounded-2xl border border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-bold text-gray-200 flex items-center gap-1.5">
                  🔄 Garansi Ganti Baru 14 Hari
                </span>
                <span class="px-2 py-0.5 bg-slate-800 text-gray-300 rounded font-bold text-[10px]">
                  REPLACEMENT
                </span>
              </div>
              <p class="text-gray-300 text-[11px] leading-relaxed">
                Garansi unboxing 14 hari: Jika terjadi cacat produksi dari pabrikan, kami langsung mengganti dengan unit konsol baru 100% tanpa proses klaim berbelit.
              </p>
              <div class="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-gray-400">
                <span>Syarat: Video unboxing saat paket diterima</span>
              </div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- 4. DOKUMEN INVOICE DIGITAL RESMI (DIGITAL INVOICE) -->
      <div class="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-5">
        <!-- Header Invoice Baris -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-black tracking-wider text-indigo-400">CONSOLE HUB</span>
              <span class="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                FAKTUR RESMI LUNAS
              </span>
            </div>
            <p class="text-xs text-gray-400 mt-1">Platform Resmi Jual-Beli & Rental Game Console Indonesia</p>
          </div>
          <div class="text-left sm:text-right text-xs text-gray-400 space-y-0.5">
            <p>No. Invoice: <strong class="text-gray-100 font-mono text-sm">${tx.orderId}</strong></p>
            <p>Tanggal Transaksi: <span class="text-gray-300">${invoiceDate}</span></p>
            <p>Metode Pembayaran: <span class="text-emerald-400 font-bold">Payment Gateway (Instant Verified)</span></p>
          </div>
        </div>

        <!-- Info Pemesan & Alamat -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div>
            <h4 class="text-indigo-400 font-bold uppercase mb-2 flex items-center gap-1.5">
              👤 Data Pemesan
            </h4>
            <p class="text-gray-100 font-bold text-sm">${tx.customer.name}</p>
            <p class="text-gray-300 mt-0.5">WhatsApp: <span class="font-mono text-gray-200">${tx.customer.phone}</span></p>
            <p class="text-gray-400">Email: ${tx.customer.email}</p>
            ${tx.customer.idNumber && tx.customer.idNumber !== "-" ? `
              <p class="text-amber-300/90 mt-1 font-mono">No. KTP/SIM: ${tx.customer.idNumber}</p>
            ` : ''}
          </div>
          <div>
            <h4 class="text-indigo-400 font-bold uppercase mb-2 flex items-center gap-1.5">
              📍 Alamat Pengiriman & Kurir
            </h4>
            <p class="text-gray-200 font-medium leading-relaxed">${tx.customer.address || "Ambil Langsung di Hub Rental Station"}</p>
            <div class="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-1 text-[11px]">
              <span class="text-gray-400">Kurir: <strong class="text-gray-200">${shipping.courier}</strong></span>
              <span class="text-amber-300 font-bold">⏱️ Tiba: ${shipping.eta}</span>
            </div>
          </div>
        </div>

        <!-- Tabel Item Pesanan -->
        <div class="space-y-2">
          <h4 class="text-xs font-bold text-gray-300 uppercase tracking-wider">Rincian Barang Yang Dipesan</h4>
          <div class="overflow-x-auto rounded-xl border border-slate-800">
            <table class="w-full text-xs text-left">
              <thead class="text-gray-400 bg-slate-950 border-b border-slate-800">
                <tr>
                  <th class="py-2.5 px-3">Produk</th>
                  <th class="py-2.5 px-3">Tipe Transaksi</th>
                  <th class="py-2.5 px-3">Durasi / Qty</th>
                  <th class="py-2.5 px-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800 bg-slate-900/50">
                ${items.map(item => `
                  <tr>
                    <td class="py-3 px-3">
                      <div class="font-bold text-gray-100">${item.name}</div>
                      ${item.mode === 'rent' ? `
                        <div class="text-[10px] text-indigo-300 mt-0.5">
                          📅 Tanggal Mulai: ${item.startDate} (${item.rentDays} Hari)
                        </div>
                      ` : `
                        <div class="text-[10px] text-gray-400 mt-0.5">
                          📦 Unit Ritel Bersegel Resmi
                        </div>
                      `}
                    </td>
                    <td class="py-3 px-3">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${item.mode === 'rent' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' : 'bg-teal-950 text-teal-300 border border-teal-800'}">
                        ${item.mode === 'rent' ? 'SEWA' : 'BELI'}
                      </span>
                    </td>
                    <td class="py-3 px-3 text-gray-300 font-mono">
                      ${item.mode === 'rent' ? `${item.rentDays} Hari` : `${item.quantity} Unit`}
                    </td>
                    <td class="py-3 px-3 text-right font-bold text-gray-100">
                      ${formatRupiah(item.mode === 'rent' ? item.rentSubtotal : item.buyPrice * item.quantity)}
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Rincian Biaya & Total Pelunasan -->
        <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
          ${tx.pricing.rentSubtotal > 0 ? `
            <div class="flex justify-between text-gray-400">
              <span>Subtotal Biaya Sewa:</span>
              <span class="text-gray-200 font-semibold">${formatRupiah(tx.pricing.rentSubtotal)}</span>
            </div>
          ` : ''}
          ${tx.pricing.buySubtotal > 0 ? `
            <div class="flex justify-between text-gray-400">
              <span>Subtotal Pembelian Unit:</span>
              <span class="text-gray-200 font-semibold">${formatRupiah(tx.pricing.buySubtotal)}</span>
            </div>
          ` : ''}
          <div class="flex justify-between text-gray-400">
            <span>Ongkos Kirim (${shipping.serviceName} - ${shipping.courier}):</span>
            <span class="${shipping.cost === 0 ? 'text-teal-400 font-bold' : 'text-gray-200 font-semibold'}">
              ${shipping.cost === 0 ? 'GRATIS' : formatRupiah(shipping.cost)}
            </span>
          </div>
          ${tx.pricing.securityDeposit > 0 ? `
            <div class="flex justify-between text-amber-300">
              <span>Deposit Jaminan Sewa (100% Refundable):</span>
              <span class="font-bold">${formatRupiah(tx.pricing.securityDeposit)}</span>
            </div>
          ` : ''}
          ${tx.pricing.discount > 0 || (tx.pricing.voucherDiscount && tx.pricing.voucherDiscount > 0) ? `
            <div class="flex justify-between text-emerald-400">
              <span>Potongan Diskon Kupon:</span>
              <span class="font-bold">- ${formatRupiah(tx.pricing.voucherDiscount || tx.pricing.discount)}</span>
            </div>
          ` : ''}
          <div class="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
            <div>
              <span class="font-bold text-gray-100 block">Total Pembayaran Lunas:</span>
              <span class="text-[10px] text-gray-400 font-normal">Semua biaya telah diselesaikan via Payment Gateway</span>
            </div>
            <span class="text-xl font-black text-indigo-400">${formatRupiah(tx.pricing.totalToPay)}</span>
          </div>
        </div>

        <!-- Footer Invoice Legal & Verifikasi Stempel -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-800 text-[11px] text-gray-500">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-white rounded-lg inline-block shadow">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=CHUB-VERIFIED-${tx.orderId}" alt="QR Verifikasi" class="w-12 h-12">
            </div>
            <div>
              <strong class="text-gray-300 block">Console Hub Digital Signature</strong>
              <p>Faktur ini sah diterbitkan otomatis & dilindungi garansi resmi.</p>
              <p class="font-mono text-[10px] text-indigo-400">SHA-256: ${tx.orderId}-VERIFIED-LUNAS</p>
            </div>
          </div>
          <div class="text-center sm:text-right">
            <span class="px-3 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 rounded-full font-bold text-[10px] uppercase">
              🛡️ VERIFIED & PROTECTED
            </span>
            <p class="text-[10px] text-gray-400 mt-1">CS Hotline: 0812-3456-7890 (WA)</p>
          </div>
        </div>
      </div>

    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

window.closeInvoiceModal = function() {
  const modal = document.getElementById("invoice-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
};

window.printInvoice = function() {
  window.print();
};

// Filter Toolbar Setup
function setupEventListeners() {
  // Category Filter
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => {
        b.className = "category-btn px-4 py-2 rounded-xl text-xs md:text-sm font-semibold bg-slate-900 text-gray-400 hover:text-white border border-slate-800 transition";
      });
      btn.className = "category-btn px-4 py-2 rounded-xl text-xs md:text-sm font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500 transition";
      state.activeCategory = btn.dataset.category;
      renderProducts();
    });
  });

  // Mode Filter Switcher (Semua / Mode Sewa / Mode Beli)
  const modeButtons = document.querySelectorAll(".mode-filter-btn");
  modeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      modeButtons.forEach(b => {
        b.classList.remove("bg-slate-800", "text-white", "border-indigo-500");
        b.classList.add("text-gray-400");
      });
      btn.classList.add("bg-slate-800", "text-white", "border-indigo-500");
      btn.classList.remove("text-gray-400");
      state.activeModeFilter = btn.dataset.mode;
      renderProducts();
    });
  });

  // Search Input
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Stock Only Checkbox
  const stockCheckbox = document.getElementById("stock-only-checkbox");
  if (stockCheckbox) {
    stockCheckbox.addEventListener("change", (e) => {
      state.inStockOnly = e.target.checked;
      renderProducts();
    });
  }

  // Sort Select
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }
}

window.resetFilters = function() {
  state.activeCategory = "all";
  state.activeModeFilter = "all";
  state.searchQuery = "";
  state.inStockOnly = false;
  state.sortBy = "popular";

  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";

  const stockCheckbox = document.getElementById("stock-only-checkbox");
  if (stockCheckbox) stockCheckbox.checked = false;

  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) sortSelect.value = "popular";

  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach((btn, idx) => {
    if (idx === 0) {
      btn.className = "category-btn px-4 py-2 rounded-xl text-xs md:text-sm font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500 transition";
    } else {
      btn.className = "category-btn px-4 py-2 rounded-xl text-xs md:text-sm font-semibold bg-slate-900 text-gray-400 hover:text-white border border-slate-800 transition";
    }
  });

  renderProducts();
  showToast("Filter berhasil di-reset.", "info");
};

// Hitung mundur pembayaran simulasi
function setupCountdownTimer() {
  let timeLeft = 15 * 60; // 15 menit
  const timerDisplay = document.getElementById("gateway-timer");
  if (!timerDisplay) return;

  setInterval(() => {
    if (timeLeft <= 0) {
      timerDisplay.innerText = "00:00 (Kadaluarsa)";
      return;
    }
    timeLeft--;
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerDisplay.innerText = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, 1000);
}

// ===== CUSTOMER REVIEW & RATING CONTROLLER =====
let selectedReviewRating = 5;

window.setModalReviewRating = function(rating) {
  selectedReviewRating = rating;
  const scoreDisplay = document.getElementById("modal-rating-score");
  if (scoreDisplay) scoreDisplay.innerText = rating.toFixed(1);

  for (let i = 1; i <= 5; i++) {
    const starBtn = document.getElementById(`star-btn-${i}`);
    if (starBtn) {
      if (i <= rating) {
        starBtn.className = "star-btn text-base text-amber-400 hover:scale-125 transition";
      } else {
        starBtn.className = "star-btn text-base text-gray-600 hover:scale-125 transition";
      }
    }
  }
};

window.submitProductReview = function(productId) {
  const nameInput = document.getElementById("review-input-name");
  const commentInput = document.getElementById("review-input-comment");
  const typeSelect = document.getElementById("review-input-type");

  const name = nameInput ? nameInput.value.trim() : "";
  const comment = commentInput ? commentInput.value.trim() : "";
  const type = typeSelect ? typeSelect.value : "buy";

  if (!name) {
    showToast("Silakan masukkan nama Anda!", "warning");
    if (nameInput) nameInput.focus();
    return;
  }

  if (!comment) {
    showToast("Silakan tulis ulasan atau komentar Anda!", "warning");
    if (commentInput) commentInput.focus();
    return;
  }

  const p = state.products.find(item => item.id === productId);
  if (!p) return;

  if (!Array.isArray(p.reviews)) {
    p.reviews = [];
  }

  // Buat avatar inisial
  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "U";

  const newReview = {
    id: "rv-" + Date.now().toString().slice(-6),
    reviewer: name,
    avatar: initials,
    rating: selectedReviewRating,
    date: new Date().toISOString().split("T")[0],
    comment: comment,
    type: type
  };

  // Masukkan review baru di posisi paling atas
  p.reviews.unshift(newReview);
  p.reviewsCount = p.reviews.length;

  // Hitung ulang rata-rata bintang rating
  const totalStars = p.reviews.reduce((sum, r) => sum + r.rating, 0);
  p.rating = Math.round((totalStars / p.reviews.length) * 10) / 10;

  // Simpan ke localStorage agar permanen
  try {
    localStorage.setItem("CONSOLE_PRODUCTS_OVERRIDE", JSON.stringify(state.products));
  } catch (e) {}
  window.CONSOLE_PRODUCTS = state.products;

  showToast("Ulasan Anda berhasil dikirim! Terima kasih atas feedback-nya.", "success");

  // Re-render konten modal & katalog produk langsung
  renderModalContent();
  renderProducts();
};

