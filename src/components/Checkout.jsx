import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { formatRupiah } from "../data/products";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby.../exec";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ nama: "", lantai: "" });
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [tanggal, setTanggal] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = "ORD-" + Date.now().toString(36).toUpperCase();
    const tgl = new Date().toLocaleString("id-ID");
    setOrderId(id);
    setTanggal(tgl);

    const rows = items.map((item) => ({
      "Order ID": id,
      Nama: form.nama,
      Lantai: form.lantai,
      Produk: item.name,
      Ukuran: item.size,
      "Harga Satuan": item.price,
      Jumlah: item.quantity,
      Total: +(item.price * item.quantity).toFixed(0),
      Tanggal: tgl,
    }));

    // Kirim ke Google Sheets (best effort)
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: rows, orderId: id, total: totalPrice, tanggal: tgl }),
      });
    } catch (err) {
      console.warn("Gagal kirim ke Google Sheets:", err);
    }

    clearCart();
    setDone(true);
  };

  if (done) {
    return (
      <div className="checkout-page">
        <div className="success-card">
          <span className="success-icon">✅</span>
          <h1>Pesanan Berhasil!</h1>
          <p className="success-id">Order ID: {orderId}</p>
          <p className="success-date">📅 {tanggal}</p>
          <p>Terima kasih, { form.nama }! Pesananmu sedang diproses.</p>
          <Link to="/" className="btn-back">Pesan Lagi</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <h1>Keranjang Kosong</h1>
        <Link to="/" className="btn-back">Lihat Menu</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label>Nama</label>
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Lantai</label>
          <input
            name="lantai"
            value={form.lantai}
            onChange={handleChange}
            required
          />
        </div>

        <div className="checkout-summary">
          <h3>Ringkasan Pesanan</h3>
          {items.map((item) => (
            <div key={item.cartId} className="summary-row">
              <span>
                {item.name} ({item.size}) x{item.quantity}
              </span>
              <span>{formatRupiah(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="summary-row total">
            <span>Total</span>
            <span>{formatRupiah(totalPrice)}</span>
          </div>
        </div>

        <button type="submit" className="btn-submit">
          Konfirmasi Pesanan
        </button>
      </form>
    </div>
  );
}
