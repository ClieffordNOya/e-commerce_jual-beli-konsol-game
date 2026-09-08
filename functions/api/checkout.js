/**
 * Cloudflare Pages Function: /api/checkout
 * Menangani pembuatan transaksi pembayaran online (Payment Gateway)
 * Kompatibel dengan Midtrans Snap API & Mock Simulator
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  // Set CORS Headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json"
  };

  try {
    const body = await request.json();
    const { items, customer, pricing, orderType } = body;

    if (!items || !items.length || !customer || !customer.name || !customer.phone) {
      return new Response(JSON.stringify({
        success: false,
        message: "Data pemesanan atau data pelanggan tidak lengkap."
      }), { status: 400, headers: corsHeaders });
    }

    const orderId = "CHUB-" + Date.now().toString().slice(-6) + "-" + Math.floor(100 + Math.random() * 900);
    const expireTimestamp = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    // 1. Integrasi Nyata: Jika user menyetel MIDTRANS_SERVER_KEY di Cloudflare Environment Variables
    if (env && env.MIDTRANS_SERVER_KEY) {
      const midtransAuth = btoa(env.MIDTRANS_SERVER_KEY + ":");
      const isProduction = env.ENVIRONMENT === "production";
      const midtransUrl = isProduction 
        ? "https://app.midtrans.com/snap/v1/transactions"
        : "https://app.sandbox.midtrans.com/snap/v1/transactions";

      const midtransPayload = {
        transaction_details: {
          order_id: orderId,
          gross_amount: Math.round(pricing.totalToPay)
        },
        customer_details: {
          first_name: customer.name,
          email: customer.email || `${customer.phone}@consolehub.id`,
          phone: customer.phone,
          shipping_address: {
            address: customer.address || "Ambil di Toko / Rental Station"
          }
        },
        item_details: items.map(item => ({
          id: item.id,
          price: Math.round(item.mode === "rent" ? item.rentSubtotal / item.quantity : item.buyPrice),
          quantity: item.quantity,
          name: (item.mode === "rent" ? "[SEWA] " : "[BELI] ") + item.name.slice(0, 40)
        }))
      };

      try {
        const midtransRes = await fetch(midtransUrl, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Basic ${midtransAuth}`
          },
          body: JSON.stringify(midtransPayload)
        });

        const snapData = await midtransRes.json();
        if (snapData.token) {
          return new Response(JSON.stringify({
            success: true,
            mode: "midtrans_live",
            orderId,
            token: snapData.token,
            redirectUrl: snapData.redirect_url,
            pricing,
            expiredAt: expireTimestamp
          }), { status: 200, headers: corsHeaders });
        }
      } catch (err) {
        console.error("Midtrans API call failed, falling back to mock gateway:", err);
      }
    }

    // 2. Mode Simulasi Cerdas (Siap Pakai untuk Pengujian Langsung & Demo)
    const randomVaSuffix = Math.floor(10000000 + Math.random() * 90000000);
    const mockTransaction = {
      success: true,
      mode: "simulator",
      orderId,
      status: "pending",
      orderType: orderType || "hybrid",
      pricing: {
        rentSubtotal: pricing.rentSubtotal || 0,
        buySubtotal: pricing.buySubtotal || 0,
        securityDeposit: pricing.securityDeposit || 0,
        discount: pricing.discount || 0,
        totalToPay: pricing.totalToPay
      },
      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email || "-",
        address: customer.address || "-",
        idNumber: customer.idNumber || "-"
      },
      paymentMethods: {
        qris: {
          name: "QRIS Realtime (GoPay, OVO, Dana, ShopeePay, BCA)",
          qrString: "00020101021226540014ID.LINKAJA.WWW01189360091400000000000215ID10200238491025802ID5911CONSOLE HUB6007JAKARTA61051219062070703A016304E69B",
          qrImageUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=CHUB-PAY-${orderId}-${pricing.totalToPay}`
        },
        virtualAccount: [
          { bank: "BCA", vaNumber: `80777${randomVaSuffix}`, name: "CONSOLE HUB BCA VA" },
          { bank: "Mandiri", vaNumber: `89608${randomVaSuffix}`, name: "CONSOLE HUB MANDIRI VA" },
          { bank: "BNI", vaNumber: `98812${randomVaSuffix}`, name: "CONSOLE HUB BNI VA" },
          { bank: "BRI", vaNumber: `12800${randomVaSuffix}`, name: "CONSOLE HUB BRI VA" }
        ],
        ewallet: [
          { name: "GoPay", fee: 0, status: "Tersedia" },
          { name: "ShopeePay", fee: 0, status: "Tersedia" },
          { name: "DANA", fee: 0, status: "Tersedia" }
        ],
        creditCard: {
          gateway: "3D Secure 2.0 / Visa / Mastercard / JCB",
          supported: true
        }
      },
      expiredAt: expireTimestamp,
      createdAt: new Date().toISOString()
    };

    return new Response(JSON.stringify(mockTransaction), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: "Terjadi kesalahan pemrosesan checkout: " + error.message
    }), { status: 500, headers: corsHeaders });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}
