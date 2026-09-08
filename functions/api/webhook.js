/**
 * Cloudflare Pages Function: /api/webhook
 * Menerima callback / webhook status pembayaran dari Payment Gateway (Midtrans/Xendit)
 */

export async function onRequestPost(context) {
  const { request } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  try {
    const payload = await request.json();
    console.log("Payment Gateway Webhook Received:", payload);

    // Format Midtrans: transaction_status = "capture" | "settlement" | "pending" | "deny" | "expire" | "cancel"
    const orderId = payload.order_id || payload.external_id || "UNKNOWN";
    const status = payload.transaction_status || payload.status || "settlement";

    let paymentStatus = "pending";
    if (status === "settlement" || status === "capture" || status === "PAID") {
      paymentStatus = "paid";
    } else if (status === "expire" || status === "EXPIRED") {
      paymentStatus = "expired";
    } else if (status === "cancel" || status === "deny") {
      paymentStatus = "failed";
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Status order ${orderId} diperbarui menjadi: ${paymentStatus}`,
      orderId,
      status: paymentStatus,
      receivedAt: new Date().toISOString()
    }), { status: 200, headers: corsHeaders });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: "Gagal memproses webhook: " + error.message
    }), { status: 400, headers: corsHeaders });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
