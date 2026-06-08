import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function StickyCartBar() {
  const { items, totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="sticky-cart-bar">
      <Link to="/cart" className="sticky-cart-inner">
        <div className="sticky-cart-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span className="sticky-cart-badge">{totalItems}</span>
        </div>
        <div className="sticky-cart-info">
          <span className="sticky-cart-price">{formatRupiah(totalPrice)}</span>
          <span className="sticky-cart-text">
            {items.length} jenis item
          </span>
        </div>
        <span className="sticky-cart-cta">Lihat Keranjang →</span>
      </Link>
    </div>
  );
}
