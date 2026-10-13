/**
 * CONSOLE HUB — Admin Dashboard Controller
 * Mengelola autentikasi password admin, manipulasi stok, diskon produk, dan riwayat pesanan.
 */

const ADMIN_PASSWORD_DEFAULT = "admin123";

// Inisialisasi data orders dari localStorage atau admin-data.js
function getAdminOrders() {
  try {
    const saved = localStorage.getItem("CONSOLE_ORDERS_DATA");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return window.ADMIN_ORDERS || [];
}

function saveAdminOrders(orders) {
  try {
    localStorage.setItem("CONSOLE_ORDERS_DATA", JSON.stringify(orders));
  } catch (e) {}
  window.ADMIN_ORDERS = orders;
}

// Inisialisasi data produk yang tersimpan
function getAdminProducts() {
  const master = window.CONSOLE_PRODUCTS || [];
  try {
    const saved = localStorage.getItem("CONSOLE_PRODUCTS_OVERRIDE");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return master.map(m => {
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
      }
    }
  } catch (e) {}
  return master;
}

function saveAdminProducts(products) {
  try {
    localStorage.setItem("CONSOLE_PRODUCTS_OVERRIDE", JSON.stringify(products));
  } catch (e) {}
  window.CONSOLE_PRODUCTS = products;
  if (window.state && window.state.products) {
    window.state.products = products;
  }
}

// State Admin
const adminState = {
  isLoggedIn: sessionStorage.getItem("ADMIN_LOGGED_IN") === "true",
  activeTab: "stock", // 'stock' | 'discount' | 'orders'
  orderFilter: "all", // 'all' | 'completed' | 'active' | 'pending'
  searchQuery: "",
  products: getAdminProducts(),
  orders: getAdminOrders()
};

// Autentikasi
window.checkAdminAuth = function() {
  return adminState.isLoggedIn;
};

window.loginAdmin = function(password) {
  const storedPassword = localStorage.getItem("ADMIN_PASSWORD_HASH") || ADMIN_PASSWORD_DEFAULT;
  if (password === storedPassword) {
    adminState.isLoggedIn = true;
    sessionStorage.setItem("ADMIN_LOGGED_IN", "true");
    adminState.products = getAdminProducts();
    adminState.orders = getAdminOrders();
    return true;
  }
  return false;
};

window.logoutAdmin = function() {
  adminState.isLoggedIn = false;
  sessionStorage.removeItem("ADMIN_LOGGED_IN");
};

// Format Rupiah untuk Admin
function formatAdminRupiah(val) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val || 0);
}

// Switch Tab Admin
window.setAdminTab = function(tabName) {
  adminState.activeTab = tabName;
  const tabs = ["stock", "discount", "orders"];
  tabs.forEach(t => {
    const btn = document.getElementById(`admin-tab-btn-${t}`);
    const sec = document.getElementById(`admin-tab-sec-${t}`);
    if (btn) {
      if (t === tabName) {
        btn.classList.add("bg-indigo-600", "text-white", "border-indigo-500");
        btn.classList.remove("text-gray-400", "hover:text-white");
      } else {
        btn.classList.remove("bg-indigo-600", "text-white", "border-indigo-500");
        btn.classList.add("text-gray-400", "hover:text-white");
      }
    }
    if (sec) {
      if (t === tabName) sec.classList.remove("hidden");
      else sec.classList.add("hidden");
    }
  });

  if (tabName === "stock") renderAdminStockTable();
  else if (tabName === "discount") renderAdminDiscountTable();
  else if (tabName === "orders") renderAdminOrdersTable();
};

// Render KPI Summary
window.renderAdminKPI = function() {
  const prods = adminState.products;
  const orders = adminState.orders;

  const totalProds = prods.length;
  const onSaleProds = prods.filter(p => p.isOnSale).length;
  const lowStock = prods.filter(p => (p.stockReady || 0) <= 3).length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const setEl = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = val;
  };

  setEl("admin-kpi-total-prods", totalProds);
  setEl("admin-kpi-onsale", `${onSaleProds} <span class="text-xs text-rose-400 font-normal">Item</span>`);
  setEl("admin-kpi-lowstock", `${lowStock} <span class="text-xs text-amber-400 font-normal">Perlu Restock</span>`);
  setEl("admin-kpi-revenue", formatAdminRupiah(totalRevenue));
  setEl("admin-kpi-orders-count", `${orders.length} <span class="text-xs text-indigo-300 font-normal">Transaksi</span>`);
};

// ─── TAB 1: MANAJEMEN STOK ────────────────────────────────────
window.renderAdminStockTable = function() {
  const tbody = document.getElementById("admin-stock-tbody");
  if (!tbody) return;

  const query = (adminState.searchQuery || "").toLowerCase();
  const prods = adminState.products.filter(p => {
    if (!query) return true;
    return p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query);
  });

  tbody.innerHTML = prods.map(p => {
    let statusBadge = "";
    if (p.stockReady === 0) {
      statusBadge = `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">Habis</span>`;
    } else if (p.stockReady <= 3) {
      statusBadge = `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Menipis (${p.stockReady})</span>`;
    } else {
      statusBadge = `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Tersedia (${p.stockReady})</span>`;
    }

    return `
      <tr class="border-b border-slate-800/80 hover:bg-slate-900/40 transition text-xs">
        <td class="py-3 px-3">
          <div class="flex items-center gap-3">
            <img src="${p.image}" alt="${p.name}" class="w-10 h-10 rounded-lg object-cover bg-slate-950 border border-slate-800 flex-shrink-0" onerror="this.src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=100&q=80'">
            <div>
              <p class="font-bold text-gray-200 line-clamp-1">${p.name}</p>
              <p class="text-[10px] text-gray-500">${p.brand} • <span class="text-indigo-400">${p.categoryLabel}</span></p>
            </div>
          </div>
        </td>
        <td class="py-3 px-3 text-center">
          <div class="inline-flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button onclick="changeProductStock('${p.id}', 'ready', -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center">-</button>
            <input type="number" min="0" value="${p.stockReady}" onchange="setProductStock('${p.id}', 'ready', this.value)" class="w-12 bg-transparent text-center font-bold text-emerald-400 focus:outline-none">
            <button onclick="changeProductStock('${p.id}', 'ready', 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center">+</button>
          </div>
        </td>
        <td class="py-3 px-3 text-center">
          <div class="inline-flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button onclick="changeProductStock('${p.id}', 'rented', -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center">-</button>
            <input type="number" min="0" value="${p.stockRented || 0}" onchange="setProductStock('${p.id}', 'rented', this.value)" class="w-12 bg-transparent text-center font-bold text-sky-400 focus:outline-none">
            <button onclick="changeProductStock('${p.id}', 'rented', 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center">+</button>
          </div>
        </td>
        <td class="py-3 px-3 text-center">
          ${statusBadge}
        </td>
        <td class="py-3 px-3 text-right">
          <button onclick="saveSingleStock('${p.id}')" class="px-3 py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-white font-semibold rounded-lg text-[11px] shadow transition">
            Simpan
          </button>
        </td>
      </tr>
    `;
  }).join("");
};

window.changeProductStock = function(prodId, type, delta) {
  const p = adminState.products.find(item => item.id === prodId);
  if (!p) return;
  if (type === "ready") {
    p.stockReady = Math.max(0, (p.stockReady || 0) + delta);
  } else if (type === "rented") {
    p.stockRented = Math.max(0, (p.stockRented || 0) + delta);
  }
  saveAdminProducts(adminState.products);
  renderAdminStockTable();
  renderAdminKPI();
  if (typeof renderProducts === "function") renderProducts();
};

window.setProductStock = function(prodId, type, val) {
  const num = Math.max(0, parseInt(val) || 0);
  const p = adminState.products.find(item => item.id === prodId);
  if (!p) return;
  if (type === "ready") p.stockReady = num;
  else if (type === "rented") p.stockRented = num;
  saveAdminProducts(adminState.products);
  renderAdminStockTable();
  renderAdminKPI();
  if (typeof renderProducts === "function") renderProducts();
};

window.saveSingleStock = function(prodId) {
  saveAdminProducts(adminState.products);
  if (typeof showToast === "function") showToast("Stok produk berhasil diperbarui!", "success");
  else alert("Stok produk berhasil diperbarui!");
  renderAdminKPI();
};

// ─── TAB 2: PENGATURAN DISKON ─────────────────────────────────
window.renderAdminDiscountTable = function() {
  const tbody = document.getElementById("admin-discount-tbody");
  if (!tbody) return;

  const query = (adminState.searchQuery || "").toLowerCase();
  const prods = adminState.products.filter(p => {
    if (!query) return true;
    return p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query);
  });

  tbody.innerHTML = prods.map(p => {
    const isSale = !!p.isOnSale;
    const origPrice = p.originalPrice || p.buyPrice || 0;
    const discPrice = p.discountPrice || p.buyPrice || 0;
    const percent = origPrice > 0 && origPrice > discPrice ? Math.round(((origPrice - discPrice) / origPrice) * 100) : 0;

    return `
      <tr class="border-b border-slate-800/80 hover:bg-slate-900/40 transition text-xs">
        <td class="py-3 px-3">
          <div class="flex items-center gap-3">
            <img src="${p.image}" alt="${p.name}" class="w-10 h-10 rounded-lg object-cover bg-slate-950 border border-slate-800 flex-shrink-0">
            <div>
              <p class="font-bold text-gray-200 line-clamp-1">${p.name}</p>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-[10px] text-gray-500">${p.brand}</span>
                <span class="text-[10px] text-amber-400 font-bold">★ ${p.rating} (${p.reviewsCount || 0})</span>
              </div>
            </div>
          </div>
        </td>
        <td class="py-3 px-3 text-center">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" ${isSale ? 'checked' : ''} onchange="toggleProductSale('${p.id}', this.checked)" class="sr-only peer">
            <div class="w-9 h-5 bg-slate-700 rounded-full peer peer-checked:bg-rose-600 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-4"></div>
          </label>
        </td>
        <td class="py-3 px-3">
          <div class="space-y-1">
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] text-gray-400 w-16">Harga Normal:</span>
              <input type="number" value="${origPrice}" onchange="updateProductPricing('${p.id}', 'originalPrice', this.value)" class="w-28 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white text-xs">
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] text-rose-400 w-16">Harga Diskon:</span>
              <input type="number" value="${discPrice}" onchange="updateProductPricing('${p.id}', 'discountPrice', this.value)" class="w-28 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-rose-300 font-bold text-xs">
            </div>
          </div>
        </td>
        <td class="py-3 px-3 text-center">
          ${isSale && percent > 0 ? `
            <span class="px-2.5 py-1 bg-rose-600/20 text-rose-400 border border-rose-500/30 rounded-full font-black text-xs">
              -${percent}%
            </span>
          ` : `
            <span class="text-gray-500 text-[11px]">-</span>
          `}
        </td>
        <td class="py-3 px-3 text-right">
          <button onclick="saveSingleDiscount('${p.id}')" class="px-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-600 text-white font-semibold rounded-lg text-[11px] shadow transition">
            Simpan Diskon
          </button>
        </td>
      </tr>
    `;
  }).join("");
};

window.toggleProductSale = function(prodId, isSale) {
  const p = adminState.products.find(item => item.id === prodId);
  if (!p) return;
  p.isOnSale = isSale;
  if (!p.originalPrice) p.originalPrice = p.buyPrice || 0;
  if (isSale && (!p.discountPrice || p.discountPrice === p.originalPrice)) {
    p.discountPrice = Math.round(p.originalPrice * 0.9); // default 10% diskon
  }
  p.buyPrice = isSale ? p.discountPrice : p.originalPrice;
  p.price = p.buyPrice;

  // Sesuaikan promo badge
  if (isSale) {
    const pct = Math.round(((p.originalPrice - p.discountPrice) / p.originalPrice) * 100);
    p.promo = {
      hasPromo: true,
      badgeText: `🔥 Diskon ${pct}%`,
      discountPercent: pct,
      promoType: "buy",
      promoDescription: `Promo Diskon ${pct}% untuk pembelian unit!`
    };
  }

  saveAdminProducts(adminState.products);
  renderAdminDiscountTable();
  renderAdminKPI();
  if (typeof renderProducts === "function") renderProducts();
};

window.updateProductPricing = function(prodId, field, val) {
  const p = adminState.products.find(item => item.id === prodId);
  if (!p) return;
  const num = Math.max(0, parseInt(val) || 0);
  p[field] = num;
  if (p.isOnSale && field === "discountPrice") {
    p.buyPrice = num;
    p.price = num;
  } else if (!p.isOnSale && field === "originalPrice") {
    p.buyPrice = num;
    p.price = num;
  } else if (field === "price") {
    p.price = num;
  }
  saveAdminProducts(adminState.products);
  renderAdminDiscountTable();
  renderAdminKPI();
};

window.saveSingleDiscount = function(prodId) {
  saveAdminProducts(adminState.products);
  if (typeof renderProducts === "function") renderProducts();
  if (typeof showToast === "function") showToast("Pengaturan diskon berhasil disimpan!", "success");
  else alert("Pengaturan diskon berhasil disimpan!");
  renderAdminKPI();
};

// ─── TAB 3: DAFTAR PESANAN ─────────────────────────────────────
window.filterAdminOrders = function(status) {
  adminState.orderFilter = status;
  const buttons = document.querySelectorAll(".admin-order-filter-btn");
  buttons.forEach(b => {
    if (b.dataset.filter === status) {
      b.classList.add("bg-indigo-600", "text-white");
      b.classList.remove("bg-slate-900", "text-gray-400");
    } else {
      b.classList.remove("bg-indigo-600", "text-white");
      b.classList.add("bg-slate-900", "text-gray-400");
    }
  });
  renderAdminOrdersTable();
};

window.renderAdminOrdersTable = function() {
  const tbody = document.getElementById("admin-orders-tbody");
  if (!tbody) return;

  let orders = adminState.orders;
  if (adminState.orderFilter !== "all") {
    orders = orders.filter(o => o.status === adminState.orderFilter);
  }

  if (orders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="py-10 text-center text-gray-500 text-xs">
          Belum ada pesanan dengan filter status ini.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = orders.map(ord => {
    let statusClass = "bg-slate-800 text-gray-300 border-slate-700";
    if (ord.status === "completed") statusClass = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    else if (ord.status === "active") statusClass = "bg-sky-500/20 text-sky-400 border-sky-500/30";
    else if (ord.status === "pending") statusClass = "bg-amber-500/20 text-amber-400 border-amber-500/30";

    const dateFormatted = new Date(ord.date).toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
    });

    const itemsSummary = (ord.items || []).map(it => {
      const modeBadge = it.type === "rent" ? `<span class="text-indigo-400 font-semibold">[Sewa ${it.duration || 1}hr]</span>` : `<span class="text-teal-400 font-semibold">[Beli]</span>`;
      return `${modeBadge} ${it.productName || it.name} (${it.qty || 1}x)`;
    }).join("<br>");

    return `
      <tr class="border-b border-slate-800/80 hover:bg-slate-900/40 transition text-xs">
        <td class="py-3 px-3 font-mono font-bold text-indigo-400">
          ${ord.id}
          <div class="text-[10px] text-gray-500 font-normal">${dateFormatted}</div>
        </td>
        <td class="py-3 px-3">
          <div class="font-bold text-gray-200">${ord.customer ? ord.customer.name : "Pelanggan"}</div>
          <div class="text-[10px] text-gray-400">${ord.customer ? ord.customer.phone : "-"}</div>
        </td>
        <td class="py-3 px-3 leading-relaxed">
          ${itemsSummary}
        </td>
        <td class="py-3 px-3 font-bold text-white">
          ${formatAdminRupiah(ord.total)}
          <div class="text-[10px] text-gray-400 font-normal">${ord.paymentMethod || "QRIS"}</div>
        </td>
        <td class="py-3 px-3 text-center">
          <select onchange="updateOrderStatus('${ord.id}', this.value)" class="bg-slate-950 border text-[11px] font-semibold rounded-lg px-2 py-1 ${statusClass} focus:outline-none">
            <option value="pending" ${ord.status === 'pending' ? 'selected' : ''}>Menunggu Konfirmasi</option>
            <option value="active" ${ord.status === 'active' ? 'selected' : ''}>Aktif Sewa</option>
            <option value="completed" ${ord.status === 'completed' ? 'selected' : ''}>Selesai / Lunas</option>
          </select>
        </td>
        <td class="py-3 px-3 text-right">
          <button onclick="viewOrderDetail('${ord.id}')" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-gray-300 font-semibold rounded-lg text-[11px] transition">
            Detail
          </button>
        </td>
      </tr>
    `;
  }).join("");
};

window.updateOrderStatus = function(orderId, newStatus) {
  const ord = adminState.orders.find(o => o.id === orderId);
  if (!ord) return;
  ord.status = newStatus;
  const labels = { pending: "Menunggu Konfirmasi", active: "Aktif Sewa", completed: "Selesai" };
  ord.statusLabel = labels[newStatus] || newStatus;
  saveAdminOrders(adminState.orders);
  renderAdminOrdersTable();
  if (typeof showToast === "function") showToast(`Status pesanan ${orderId} diubah ke ${ord.statusLabel}`, "success");
};

window.viewOrderDetail = function(orderId) {
  const ord = adminState.orders.find(o => o.id === orderId);
  if (!ord) return;

  const itemsHtml = (ord.items || []).map(it => `
    <div class="flex justify-between items-center py-1.5 border-b border-slate-800 text-xs">
      <div>
        <p class="font-bold text-gray-200">${it.productName || it.name}</p>
        <p class="text-[10px] text-gray-400">${it.type === 'rent' ? `Sewa (${it.duration || 1} Hari)` : 'Beli Unit'} • Qty: ${it.qty || 1}</p>
      </div>
      <span class="font-bold text-gray-100">${formatAdminRupiah(it.price)}</span>
    </div>
  `).join("");

  const modalHtml = `
    <div id="admin-order-modal" class="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
        <div class="flex justify-between items-center border-b border-slate-800 pb-3">
          <div>
            <span class="text-xs font-mono font-bold text-indigo-400">${ord.id}</span>
            <h3 class="text-lg font-black text-white">Rincian Pesanan</h3>
          </div>
          <button onclick="document.getElementById('admin-order-modal').remove()" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center">✕</button>
        </div>
        <div class="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <p class="text-gray-400">Nama Pelanggan: <strong class="text-white">${ord.customer ? ord.customer.name : "-"}</strong></p>
          <p class="text-gray-400">WhatsApp: <strong class="text-white">${ord.customer ? ord.customer.phone : "-"}</strong></p>
          <p class="text-gray-400">Email: <strong class="text-white">${ord.customer ? ord.customer.email : "-"}</strong></p>
          <p class="text-gray-400">Metode Bayar: <strong class="text-indigo-400">${ord.paymentMethod || "QRIS"}</strong></p>
        </div>
        <div class="space-y-1">
          <p class="font-bold text-gray-300">Item Pesanan:</p>
          ${itemsHtml}
        </div>
        <div class="pt-2 flex justify-between items-center text-sm font-black border-t border-slate-800">
          <span class="text-gray-300">Total Pembayaran:</span>
          <span class="text-emerald-400">${formatAdminRupiah(ord.total)}</span>
        </div>
        <button onclick="document.getElementById('admin-order-modal').remove()" class="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition">
          Tutup
        </button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHtml);
};

// Fungsi pembantu untuk menambahkan order baru saat checkout selesai
window.addOrderFromCheckout = function(tx, items) {
  const orders = getAdminOrders();
  const newOrder = {
    id: tx.orderId || ("ORD-" + Date.now().toString().slice(-6)),
    date: new Date().toISOString(),
    customer: tx.customer || { name: "Pelanggan Online", phone: "-", email: "-" },
    items: items.map(it => ({
      productId: it.id,
      productName: it.name,
      type: it.mode,
      qty: it.quantity || 1,
      duration: it.duration || null,
      price: it.itemTotal || it.subtotal || 0
    })),
    subtotal: tx.pricing ? tx.pricing.itemsSubtotal : 0,
    discount: tx.pricing ? tx.pricing.couponDiscount : 0,
    total: tx.pricing ? tx.pricing.totalToPay : 0,
    paymentMethod: "Payment Gateway Instant",
    status: items.some(it => it.mode === "rent") ? "active" : "completed",
    statusLabel: items.some(it => it.mode === "rent") ? "Aktif Sewa" : "Selesai"
  };
  orders.unshift(newOrder);
  saveAdminOrders(orders);
};
