import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const TELEGRAM_TOKEN = "8958810598:AAFFKMhbbGago3g_t86dfaaL2TLEzTSeLpA";
const CHAT_ID = "840328285";

function formatRupiah(number) {
  return "Rp" + Number(number || 0).toLocaleString("id-ID");
}

function buildMessage({ customerName, customerFloor, cartItems, total }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let msg = `Pesanan Baru!\n\n`;
  msg += `Nama: ${customerName || "-"}\n`;
  msg += `Lantai: ${customerFloor || "-"}\n`;
  msg += `Tanggal: ${dateStr}\n\n`;
  msg += `Pesanan:\n`;

  cartItems.forEach((item) => {
    const itemTotal = item.price * item.qty;
    msg += `- ${item.name || item.id} x${item.qty} - ${formatRupiah(itemTotal)}\n`;
  });

  msg += `\nTotal: ${formatRupiah(total)}`;

  return msg;
}

app.post("/send-order", async (req, res) => {
  try {
    const { customerName, customerFloor, cartItems, total } = req.body || {};

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ ok: false, error: "Keranjang kosong" });
    }

    const text = buildMessage({
      customerName: String(customerName || "").trim(),
      customerFloor: String(customerFloor || "").trim(),
      cartItems,
      total: Number(total || 0),
    });

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });

    const data = await response.json();

    if (!data.ok) {
      console.error("Telegram API error:", data);
      return res.status(502).json({ ok: false, error: "Gagal kirim ke Telegram", details: data });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("/send-order error:", error);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Telegram order API running on http://localhost:${PORT}`);
});
