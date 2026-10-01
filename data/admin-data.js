/**
 * CONSOLE HUB — Admin Dashboard Data & Logic
 * admin.js — berisi state pesanan dummy dan logika admin panel
 */

// ===== DATA PESANAN DUMMY =====
window.ADMIN_ORDERS = [
  {
    id: "ORD-2026-001",
    date: "2026-09-08T10:23:00",
    customer: { name: "Andi Prasetyo", phone: "081234567890", email: "andi@example.com" },
    items: [{ productId: "prod-01", productName: "PlayStation 5 Slim Disc Edition", type: "rent", qty: 1, duration: 3, price: 360000 }],
    subtotal: 360000,
    discount: 0,
    total: 360000,
    paymentMethod: "QRIS",
    status: "completed",
    statusLabel: "Selesai"
  },
  {
    id: "ORD-2026-002",
    date: "2026-09-10T14:05:00",
    customer: { name: "Reni Susanti", phone: "082345678901", email: "reni@example.com" },
    items: [{ productId: "prod-03", productName: "Nintendo Switch OLED - Zelda Edition", type: "buy", qty: 1, duration: null, price: 4600000 }],
    subtotal: 4600000,
    discount: 50000,
    total: 4550000,
    paymentMethod: "Virtual Account BCA",
    status: "completed",
    statusLabel: "Selesai"
  },
  {
    id: "ORD-2026-003",
    date: "2026-09-12T09:30:00",
    customer: { name: "Budi Santoso", phone: "083456789012", email: "budi@example.com" },
    items: [
      { productId: "prod-08", productName: "iFixit Pro Tech Toolkit", type: "rent", qty: 1, duration: 5, price: 90000 },
      { productId: "prod-09", productName: "Thermal Grizzly Kryonaut Extreme", type: "buy", qty: 2, duration: null, price: 390000 }
    ],
    subtotal: 480000,
    discount: 25000,
    total: 455000,
    paymentMethod: "QRIS",
    status: "completed",
    statusLabel: "Selesai"
  },
  {
    id: "ORD-2026-004",
    date: "2026-09-15T16:45:00",
    customer: { name: "Nadia Putri", phone: "084567890123", email: "nadia@example.com" },
    items: [{ productId: "prod-05", productName: "Steam Deck OLED 512GB", type: "rent", qty: 1, duration: 7, price: 665000 }],
    subtotal: 665000,
    discount: 0,
    total: 665000,
    paymentMethod: "Virtual Account Mandiri",
    status: "active",
    statusLabel: "Aktif Sewa"
  },
  {
    id: "ORD-2026-005",
    date: "2026-09-18T11:15:00",
    customer: { name: "Kevin Lie", phone: "085678901234", email: "kevin@example.com" },
    items: [{ productId: "prod-16", productName: "DualSense Midnight Black", type: "buy", qty: 2, duration: null, price: 2100000 }],
    subtotal: 2100000,
    discount: 0,
    total: 2100000,
    paymentMethod: "QRIS",
    status: "completed",
    statusLabel: "Selesai"
  },
  {
    id: "ORD-2026-006",
    date: "2026-09-20T08:00:00",
    customer: { name: "Galih Permana", phone: "086789012345", email: "galih@example.com" },
    items: [{ productId: "prod-04", productName: "Xbox Series X 1TB", type: "rent", qty: 1, duration: 3, price: 300000 }],
    subtotal: 300000,
    discount: 0,
    total: 300000,
    paymentMethod: "Virtual Account BNI",
    status: "pending",
    statusLabel: "Menunggu Konfirmasi"
  },
  {
    id: "ORD-2026-007",
    date: "2026-09-22T13:20:00",
    customer: { name: "Tiara Wulandari", phone: "087890123456", email: "tiara@example.com" },
    items: [
      { productId: "prod-19", productName: "Black Myth: Wukong PS5", type: "buy", qty: 1, duration: null, price: 850000 },
      { productId: "prod-20", productName: "Zelda: Tears of the Kingdom", type: "buy", qty: 1, duration: null, price: 780000 }
    ],
    subtotal: 1630000,
    discount: 50000,
    total: 1580000,
    paymentMethod: "QRIS",
    status: "completed",
    statusLabel: "Selesai"
  },
  {
    id: "ORD-2026-008",
    date: "2026-09-25T10:00:00",
    customer: { name: "Hendri Kurnia", phone: "088901234567", email: "hendri@example.com" },
    items: [{ productId: "prod-17", productName: "PlayStation VR2 + Horizon Bundle", type: "rent", qty: 1, duration: 2, price: 190000 }],
    subtotal: 190000,
    discount: 0,
    total: 190000,
    paymentMethod: "Virtual Account BRI",
    status: "active",
    statusLabel: "Aktif Sewa"
  },
  {
    id: "ORD-2026-009",
    date: "2026-09-28T15:30:00",
    customer: { name: "Fitri Anggraini", phone: "089012345678", email: "fitri@example.com" },
    items: [
      { productId: "prod-12", productName: "GuliKit Hall Effect Joystick Kit", type: "buy", qty: 3, duration: null, price: 795000 },
      { productId: "prod-15", productName: "eXtremeRate RISE Remap Kit", type: "buy", qty: 1, duration: null, price: 425000 }
    ],
    subtotal: 1220000,
    discount: 0,
    total: 1220000,
    paymentMethod: "QRIS",
    status: "completed",
    statusLabel: "Selesai"
  },
  {
    id: "ORD-2026-010",
    date: "2026-10-01T09:45:00",
    customer: { name: "Rizky Maulana", phone: "081123456789", email: "rizky@example.com" },
    items: [{ productId: "prod-06", productName: "ASUS ROG Ally X", type: "rent", qty: 1, duration: 5, price: 650000 }],
    subtotal: 650000,
    discount: 0,
    total: 650000,
    paymentMethod: "QRIS",
    status: "pending",
    statusLabel: "Menunggu Konfirmasi"
  }
];
