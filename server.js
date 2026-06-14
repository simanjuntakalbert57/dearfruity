import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

if (!TELEGRAM_TOKEN) {
  console.warn("TELEGRAM_TOKEN is not set. /send-order will fail until configured.");
}

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

  const headerLines = [
    "🍹 Pesanan Dear Fruity",
    "",
    `🧾 ${dateStr}`,
  ];
  const metaLines = [
    "",
    "Pemesan",
    ...(customerName ? [`• ${customerName}`] : []),
    ...(customerFloor ? [`• Lantai ${customerFloor}`] : []),
  ];

  const lines = cartItems.map((item, idx) => {
    const optionParts = [
      item.size && `Size: ${item.size}`,
      item.variant,
      item.sugar && `Sugar: ${item.sugar}`,
      item.addOnName,
    ].filter(Boolean);
    const note = optionParts.length ? `         ${optionParts.join(" | ")}` : "";
    const nameWithNote = [item.name || `Item #${idx + 1}`, note].filter(Boolean).join(" | ");
    const qty = Math.max(1, Number(item.qty) || 1);
    const subtotal = Number(item.price || 0) * qty;
    return [
      "",
      nameWithNote,
      `    x${qty}     ${formatRupiah(subtotal)}`,
    ];
  });

  const summaryLines = [
    "",
    "",
    `Total    ${formatRupiah(total)}`,
  ];

  const body = [
    "```text",
    ...headerLines,
    ...metaLines,
    "------------------------------",
    ...lines.flat(),
    "------------------------------",
    ...summaryLines,
    "```",
  ]
    .filter((line) => line !== null)
    .join("\n");

  return body;
}

app.post("/send-order", async (req, res) => {
  try {
    const { customerName, customerFloor, cartItems, total } = req.body || {};

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ ok: false, error: "Keranjang kosong" });
    }

    const cleanName = String(customerName || "").trim();
    const cleanFloor = String(customerFloor || "").trim();

    const sanitizedItems = cartItems
      .filter((item) => item && item.name && Number.isFinite(Number(item.qty)))
      .map((item) => ({
        name: String(item.name),
        size: item.size ? String(item.size) : null,
        sugar: item.sugar ? String(item.sugar) : null,
        qty: Math.max(1, Number(item.qty)),
        price: Number.isFinite(Number(item.price)) ? Number(item.price) : 0,
      }));

    const text = buildMessage({
      customerName: cleanName,
      customerFloor: cleanFloor,
      cartItems: sanitizedItems,
      total: Number(total || 0),
    });

    if (!TELEGRAM_TOKEN) {
      return res.status(500).json({ ok: false, error: "Konfigurasi bot belum diatur" });
    }

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });

    const data = await response.json();

    if (!data.ok) {
      console.error("Telegram API error:", data);
      return res.status(502).json({ ok: false, error: "Gagal kirim ke Telegram" });
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
