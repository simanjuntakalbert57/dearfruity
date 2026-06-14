import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const [removingId, setRemovingId] = useState(null);

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <span className="empty-icon">🛒</span>
          <h2>Keranjang Kosong</h2>
          <p>Yuk pilih menu favoritmu dulu!</p>
          <Link to="/" className="btn-primary">Lihat Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="page-title">Keranjang Kamu</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.cartId} className="cart-card">
              <div className="cart-card__media">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="cart-card__body">
                <h3 className="cart-card__name">{item.name}</h3>
                <div className="cart-card__meta">
                  <span className="cart-card__size">{item.size === "L" ? "Large" : "Regular"}</span>
                  <span className="cart-card__price">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="cart-card__actions">
                  <div className="qty-control">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => {
                      setRemovingId(item.cartId);
                      setTimeout(() => {
                        removeFromCart(item.cartId);
                        setRemovingId(null);
                      }, 150);
                    }}
                    disabled={removingId === item.cartId}
                  >
                    {removingId === item.cartId ? "..." : "✕"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-sidebar">
          <div className="cart-summary">
            <h3>Ringkasan Pesanan</h3>
            {items.map((item) => (
              <div key={item.cartId} className="summary-line">
                <span>
                  {item.name} ({item.size}) x{item.quantity}
                </span>
                <span>Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
              </div>
            ))}

            <div className="summary-divider" />

            <div className="summary-line total">
              <span>Total</span>
              <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
            </div>

            <Link to="/checkout" className="checkout-btn">
              Lanjut ke Checkout
            </Link>
            <Link to="/" className="continue-btn">
              ← Lanjut Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
