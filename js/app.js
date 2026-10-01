/**
 * CONSOLE HUB - Main Application Logic
 * Menangani Katalog, Filter Sewa/Beli, Keranjang, Kalkulasi Durasi & Deposit,
 * Sistem Kupon Promosi, Simulasi Payment Gateway, dan Invoice Generator.
 */

// Inisialisasi Data Produk dan Promosi (Mendukung file:// langsung dan HTTP)
function getStoredProductsData() {
  try {
    const saved = localStorage.getItem("CONSOLE_PRODUCTS_OVERRIDE");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return window.CONSOLE_PRODUCTS || [];
}

const productsData = getStoredProductsData();
const promoBannersData = window.CONSOLE_BANNERS || [];
const couponsData = window.CONSOLE_COUPONS || [];

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
  currentTransaction: null
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
      const orig = p.originalPrice || p.buyPrice;
      const curr = p.buyPrice || p.discountPrice;
      const pct = orig > curr ? Math.round(((orig - curr) / orig) * 100) : 0;
      promoBadge = `
        <div class="absolute top-3 left-3 z-10">
          <span class="px-2.5 py-1 bg-gradient-to-r from-rose-600 to-red-500 text-white text-[11px] font-black uppercase tracking-wider rounded-lg shadow-lg flex items-center gap-1 animate-pulse">
            🔥 SALE ${pct > 0 ? `-${pct}%` : ''}
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
            ${p.isRentable ? `
              <div class="bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-900/40 flex flex-col justify-between">
                <span class="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1">🗓️ Tarif Sewa</span>
                <div>
                  <span class="text-indigo-300 font-black text-base block">${formatRupiah(p.rentPricePerDay)}</span>
                  <span class="text-[10px] text-gray-400">/hari · Min. deposit ${formatRupiah(p.securityDeposit)}</span>
                </div>
              </div>
            ` : `
              <div class="bg-slate-800/20 p-2.5 rounded-xl border border-slate-700/20 flex items-center justify-center text-center">
                <span class="text-[11px] text-gray-500 font-medium">Tidak<br>Tersewa</span>
              </div>
            `}

            ${p.isBuyable ? `
              <div class="bg-teal-950/40 p-2.5 rounded-xl border border-teal-900/40 flex flex-col justify-between">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-semibold text-teal-400 uppercase tracking-wider flex items-center gap-1">🛍️ Harga Beli</span>
                  ${p.isOnSale && p.originalPrice && p.originalPrice > p.buyPrice ? `
                    <span class="text-[9px] px-1.5 py-0.2 bg-rose-500/20 text-rose-300 font-bold rounded">DISKON</span>
                  ` : ''}
                </div>
                <div>
                  ${p.isOnSale && p.originalPrice && p.originalPrice > p.buyPrice ? `
                    <span class="text-[10px] text-gray-500 line-through block leading-none mb-0.5">${formatRupiah(p.originalPrice)}</span>
                  ` : ''}
                  <span class="text-teal-300 font-black text-base block">${formatRupiah(p.buyPrice)}</span>
                  <span class="text-[10px] text-gray-400">unit baru · Garansi 1 Th</span>
                </div>
              </div>
            ` : `
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
            ${p.isBuyable ? `
              <button onclick="openProductDetail('${p.id}', 'buy')"
                class="group/btn py-2.5 px-3 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-0.5 transition-all duration-200
                  bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-600/25 hover:shadow-teal-500/40 hover:scale-[1.02] border border-teal-500">
                <span class="text-sm">🛍️ BELI</span>
                <span class="text-[10px] font-normal opacity-80">${formatRupiah(p.buyPrice)}</span>
              </button>
            ` : ''}
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

        <!-- Ulasan Pelanggan -->
        <div class="space-y-2 pt-2 border-t border-slate-800/80">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>⭐ Ulasan Pengguna</span>
              <span class="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">★ ${p.rating} / 5.0</span>
            </h4>
            <span class="text-[10px] text-gray-400">${p.reviews ? p.reviews.length : p.reviewsCount} review</span>
          </div>

          <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
            ${(p.reviews && p.reviews.length > 0) ? p.reviews.map(r => `
              <div class="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl space-y-1 text-xs">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 text-[10px] font-bold flex items-center justify-center border border-indigo-500/40">${r.avatar || 'CS'}</span>
                    <span class="font-bold text-gray-200 text-[11px]">${r.reviewer}</span>
                    <span class="text-[9px] px-1.5 py-0.2 rounded font-semibold ${r.type === 'rent' ? 'bg-indigo-900/40 text-indigo-300 border border-indigo-700/40' : 'bg-teal-900/40 text-teal-300 border border-teal-700/40'}">${r.type === 'rent' ? 'Sewa' : 'Beli'}</span>
                  </div>
                  <span class="text-amber-400 text-[11px]">★ ${r.rating}</span>
                </div>
                <p class="text-[11px] text-gray-300 leading-relaxed pl-8">${r.comment}</p>
                <div class="text-[9px] text-gray-500 text-right">${r.date}</div>
              </div>
            `).join("") : `
              <p class="text-xs text-gray-500 italic p-3 text-center">Belum ada ulasan tertulis.</p>
            `}
          </div>
        </div>
      </div>


      <!-- Kolom Kanan: Pilihan Mode, Kalkulator & Aksi -->
      <div class="lg:col-span-7 space-y-5 flex flex-col justify-between">
        <div class="space-y-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold px-2.5 py-0.5 bg-indigo-900/50 text-indigo-300 rounded border border-indigo-700/50">
                ${p.brand}
              </span>
              <span class="text-xs text-gray-400">• ${p.categoryLabel}</span>
            </div>
            <h2 class="text-xl md:text-2xl font-black text-gray-100 mt-1">${p.name}</h2>
            <div class="flex items-center gap-2 mt-1 text-xs text-amber-400">
              <span>★★★★★</span>
              <span class="text-gray-300 font-semibold">${p.rating} / 5.0</span>
              <span class="text-gray-500">(${p.reviewsCount} Ulasan Pelanggan)</span>
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

              <button onclick="setModalMode('buy')" ${!p.isBuyable ? 'disabled' : ''} class="py-2.5 px-4 rounded-lg font-bold text-xs md:text-sm flex flex-col items-center gap-1 transition ${!isRentActive ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30' : 'text-gray-400 hover:text-white'} ${!p.isBuyable ? 'opacity-40 cursor-not-allowed' : ''}">
                <span>🛍️ BELI UNIT (RETAIL)</span>
                <span class="text-[10px] font-normal ${!isRentActive ? 'text-teal-200' : 'text-gray-500'}">${formatRupiah(p.buyPrice)}</span>
              </button>
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
              <h4 class="text-xs font-bold text-teal-300 uppercase tracking-wider">Kuantitas & Paket Pembelian</h4>
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
    const subtotal = p.buyPrice * state.modalQuantity;
    box.innerHTML = `
      <div class="space-y-1.5 text-xs">
        <div class="flex justify-between text-gray-400">
          <span>Harga Satuan:</span>
          <span class="text-gray-200 font-semibold">${formatRupiah(p.buyPrice)}</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Jumlah Pembelian:</span>
          <span class="text-gray-200 font-semibold">${state.modalQuantity} Unit</span>
        </div>
        <div class="pt-2 border-t border-slate-800 flex justify-between items-center">
          <span class="text-xs text-gray-400">Total Harga:</span>
          <span class="text-lg font-black text-teal-400">${formatRupiah(subtotal)}</span>
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
    // Mode Buy
    const buyPrice = p.buyPrice;
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += state.modalQuantity;
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
        buyPrice: buyPrice,
        total: buyPrice * state.modalQuantity
      });
      showToast(`${p.name} (${state.modalQuantity} unit) ditambahkan ke keranjang!`, "success");
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

  state.cart.forEach(item => {
    if (item.mode === "rent") {
      rentSubtotal += (item.rentSubtotal || 0);
      securityDeposit += (item.securityDeposit || 0);
      itemDiscounts += (item.discount || 0);
    } else {
      buySubtotal += (item.buyPrice * item.quantity);
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

  const totalDiscounts = itemDiscounts + voucherDiscount;
  const finalToPay = Math.max(0, (grossTotal - voucherDiscount) + securityDeposit);

  return {
    rentSubtotal,
    buySubtotal,
    grossTotal,
    securityDeposit,
    itemDiscounts,
    voucherDiscount,
    totalDiscounts,
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

  container.innerHTML = state.cart.map(item => `
    <div class="flex items-center gap-3 p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
      <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-cover rounded-lg bg-slate-950 flex-shrink-0">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-1.5 mb-1">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.mode === 'rent' ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-700/50' : 'bg-teal-900/60 text-teal-300 border border-teal-700/50'}">
            ${item.mode === 'rent' ? `Sewa ${item.rentDays} Hari` : 'Beli Unit'}
          </span>
          ${item.mode === 'rent' ? `<span class="text-[10px] text-gray-400">Mulai: ${item.startDate}</span>` : ''}
        </div>
        <h4 class="font-bold text-gray-200 truncate">${item.name}</h4>
        <div class="flex items-center justify-between mt-1 text-[11px]">
          <span class="text-gray-400">
            ${item.mode === 'rent' ? `Sewa: ${formatRupiah(item.rentSubtotal)} + Deposit: ${formatRupiah(item.securityDeposit)}` : `${item.quantity} x ${formatRupiah(item.buyPrice)}`}
          </span>
          <span class="font-bold text-indigo-300">${formatRupiah(item.total)}</span>
        </div>
      </div>
      <button onclick="removeCartItem('${item.cartItemId}')" class="text-gray-500 hover:text-rose-400 p-1 transition" title="Hapus Item">
        ✕
      </button>
    </div>
  `).join("");

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
      <div class="pt-2 border-t border-slate-800 flex justify-between items-center">
        <div>
          <span class="text-xs text-gray-300 font-bold block">Total Akhir Bayar:</span>
          <span class="text-[10px] text-gray-500">Termasuk pajak & biaya admin</span>
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

  // Menyiapkan Payload
  const payload = {
    items: state.cart,
    customer,
    pricing: totals,
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


// Modal Invoice / Bukti Pembayaran Resmi
function openInvoiceModal(tx, items) {
  const modal = document.getElementById("invoice-modal");
  const container = document.getElementById("invoice-content");
  if (!modal || !container) return;

  const hasRent = items.some(it => it.mode === "rent");

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Header Invoice -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl font-black tracking-wider text-indigo-400">CONSOLE HUB</span>
            <span class="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">LUNAS / PAID</span>
          </div>
          <p class="text-xs text-gray-400 mt-1">E-Commerce & Rental Game Konsol Terpercaya</p>
        </div>
        <div class="text-left sm:text-right text-xs text-gray-400 space-y-1">
          <p>No. Transaksi: <strong class="text-gray-200 font-mono">${tx.orderId}</strong></p>
          <p>Waktu Bayar: <span class="text-gray-300">${tx.paidAt || new Date().toLocaleString("id-ID")}</span></p>
          <p>Metode: <span class="text-indigo-300 font-semibold">Payment Gateway (Instant Settlement)</span></p>
        </div>
      </div>

      <!-- Info Pelanggan & Alamat -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <h4 class="text-indigo-400 font-bold uppercase mb-2">Informasi Pemesan</h4>
          <p class="text-gray-200 font-bold">${tx.customer.name}</p>
          <p class="text-gray-400">WhatsApp: ${tx.customer.phone}</p>
          <p class="text-gray-400">Email: ${tx.customer.email}</p>
          ${tx.customer.idNumber && tx.customer.idNumber !== "-" ? `
            <p class="text-gray-400">No. Identitas KTP: ${tx.customer.idNumber}</p>
          ` : ''}
        </div>
        <div>
          <h4 class="text-indigo-400 font-bold uppercase mb-2">Alamat & Pengiriman</h4>
          <p class="text-gray-300">${tx.customer.address || "Ambil Langsung di Rental Station"}</p>
          <p class="text-gray-500 text-[11px] mt-1">Status: Siap dipacking / disiapkan teknisi</p>
        </div>
      </div>

      <!-- Tabel Produk -->
      <div class="space-y-2">
        <h4 class="text-xs font-bold text-gray-300 uppercase">Daftar Item Pesanan</h4>
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left">
            <thead class="text-gray-400 bg-slate-900 border-b border-slate-800">
              <tr>
                <th class="py-2.5 px-3">Produk</th>
                <th class="py-2.5 px-3">Tipe</th>
                <th class="py-2.5 px-3">Durasi / Qty</th>
                <th class="py-2.5 px-3 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              ${items.map(item => `
                <tr>
                  <td class="py-3 px-3 font-semibold text-gray-200">
                    ${item.name}
                    ${item.mode === 'rent' ? `<span class="block text-[10px] text-gray-400 font-normal">Mulai sewa: ${item.startDate}</span>` : ''}
                  </td>
                  <td class="py-3 px-3">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${item.mode === 'rent' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' : 'bg-teal-950 text-teal-300 border border-teal-800'}">
                      ${item.mode === 'rent' ? 'Sewa' : 'Beli'}
                    </span>
                  </td>
                  <td class="py-3 px-3 text-gray-300">
                    ${item.mode === 'rent' ? `${item.rentDays} Hari` : `${item.quantity} Unit`}
                  </td>
                  <td class="py-3 px-3 text-right font-bold text-gray-200">
                    ${formatRupiah(item.mode === 'rent' ? item.rentSubtotal : item.buyPrice * item.quantity)}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Ringkasan Keuangan -->
      <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
        ${tx.pricing.rentSubtotal > 0 ? `
          <div class="flex justify-between text-gray-400">
            <span>Subtotal Sewa Konsol/Tools:</span>
            <span class="text-gray-200">${formatRupiah(tx.pricing.rentSubtotal)}</span>
          </div>
        ` : ''}
        ${tx.pricing.buySubtotal > 0 ? `
          <div class="flex justify-between text-gray-400">
            <span>Subtotal Beli Unit:</span>
            <span class="text-gray-200">${formatRupiah(tx.pricing.buySubtotal)}</span>
          </div>
        ` : ''}
        ${tx.pricing.securityDeposit > 0 ? `
          <div class="flex justify-between text-amber-300">
            <span>Deposit Jaminan Sewa (Refundable):</span>
            <span class="font-bold">${formatRupiah(tx.pricing.securityDeposit)}</span>
          </div>
        ` : ''}
        ${tx.pricing.discount > 0 || (tx.pricing.voucherDiscount && tx.pricing.voucherDiscount > 0) ? `
          <div class="flex justify-between text-emerald-400">
            <span>Potongan Kupon Promo:</span>
            <span class="font-bold">- ${formatRupiah(tx.pricing.voucherDiscount || tx.pricing.discount)}</span>
          </div>
        ` : ''}
        <div class="pt-2 border-t border-slate-800 flex justify-between items-center text-sm">
          <span class="font-bold text-gray-100">Total Telah Dibayar (Lunas):</span>
          <span class="text-lg font-black text-indigo-400">${formatRupiah(tx.pricing.totalToPay)}</span>
        </div>
      </div>

      ${hasRent ? `
        <div class="p-3 bg-indigo-950/40 border border-indigo-900/60 rounded-xl text-xs text-indigo-200 space-y-1">
          <strong class="block text-amber-300">📦 Petunjuk Pengambilan / Pengembalian Sewa:</strong>
          <p>1. Petugas akan menghubungi WhatsApp Anda untuk koordinasi waktu antar/jemput unit.</p>
          <p>2. Simpan invoice ini sebagai bukti sah sewa. Deposit Rp ${formatRupiah(tx.pricing.securityDeposit)} akan ditransfer kembali ke rekening Anda setelah unit diverifikasi lengkap.</p>
        </div>
      ` : ''}
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
