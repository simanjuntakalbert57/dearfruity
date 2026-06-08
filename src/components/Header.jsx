import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header({ activeCategory, setActiveCategory }) {
  const { items } = useCart();
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="brand-icon">🌿</span>
        <span>Dear Fruity</span>
      </Link>
      <nav className="nav-links">
        <button onClick={() => setActiveCategory("Semua")} className="nav-link">
          Menu
        </button>
        <Link to="/cart" className="cart-link">
          Keranjang
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
      </nav>
    </header>
  );
}
