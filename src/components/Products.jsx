import { useState } from "react"
import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"
import products from "../data/products"

const categories = [
  { key: "Semua", label: "Semua" },
  { key: "Single Jus", label: "Single Jus" },
  { key: "Mix Jus", label: "Mix Jus" },
]

const pilihanItems = [
  { id: 'p1', emoji: '🥭', name: 'Mix Jeruk + Wortel', desc: 'Mata Tajam & Kulit Glowing', price: 18000 },
  { id: 'p2', emoji: '🥑', name: 'Alpukat Madu', desc: 'Lemak Baik & Tenang', price: 18000 },
  { id: 'p3', emoji: '🍉', name: 'Jus Semangka', desc: 'Detoks & Kulit Sehat', price: 15000 },
]

export default function Products({ activeCategory, setActiveCategory }) {
  const { addToCart } = useCart()
  const filtered =
    activeCategory === "Semua"
      ? products
      : products.filter((p) => p.category === activeCategory)
  const pilihan = products.slice(0, 3)

  return (
    <div className="products-page">
      <header className="products-header">
        <Link to="/" className="brand">
          <span className="brand-icon">🌿</span>
          <span>Dear Fruity</span>
        </Link>
        <nav className="products-nav">
          {categories.map((c) => (
            <button
              key={c.key}
              className={`cat-btn ${activeCategory === c.key ? "active" : ""}`}
              onClick={() => setActiveCategory(c.key)}
            >
              {c.label}
            </button>
          ))}
        </nav>
        <Link to="/cart" className="cart-link">
          Keranjang
        </Link>
      </header>

      <section className="products-hero">
        <h1>Menu Jus Buah</h1>
        <p>100% buah segar, tanpa pengawet & tanpa gula tambahan</p>
      </section>

      <section className="pilihan-section">
        <div className="pilihan-head">
          <h2>PILIHAN</h2>
          <div className="pilihan-line" />
        </div>
        <div className="pilihan-list">
          {pilihan.map((p) => (
            <Link to={`/cart?add=${p.id}`} key={p.id} className="pilihan-card">
              <span className="pilihan-emoji">{p.emoji}</span>
              <div className="pilihan-body">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <span className="pilihan-price">
                  Rp {p.price.toLocaleString("id-ID")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <main className="products-list">
        {filtered.map((item) => (
          <article key={item.id} className="menu-card">
            <div className="menu-card-image">
              <img src={item.image} alt={item.name} />
              <button className="menu-card-heart" aria-label="Favorit">
                <span className="heart-icon">♡</span>
              </button>
            </div>

            <div className="menu-card-body">
              <h2 className="menu-card-title">{item.name}</h2>
              <p className="menu-card-natural">🌿 100% Natural</p>
              <p className="menu-card-desc">
                {item.desc || `Terbuat dari buah segar pilihan, tanpa gula tambahan.`}
              </p>
            </div>

            <div className="menu-card-menu">
              <div className="menu-row">
                <div className="menu-size-chips">
                  <span className="chip chip-r">R</span>
                  <span className="chip-text">Regular</span>
                </div>
                <div className="menu-price">Rp {item.priceR.toLocaleString("id-ID")}</div>
                <button
                  className="menu-add-btn btn-natural"
                  onClick={() =>
                    addToCart({
                      productId: item.id,
                      name: item.name,
                      image: item.image,
                      price: item.priceR,
                      size: "R",
                      category: item.category,
                      desc: item.desc,
                      cartId: `${item.id}-R`,
                    })
                  }
                >
                  <span className="btn-icon">🛒</span>
                  <span>Add to Cart</span>
                </button>
              </div>

              <div className="menu-row menu-row-alt">
                <div className="menu-size-chips">
                  <span className="chip chip-l">L</span>
                  <span className="chip-text">Large</span>
                </div>
                <div className="menu-price">Rp {item.priceL.toLocaleString("id-ID")}</div>
                <button
                  className="menu-add-btn btn-large"
                  onClick={() =>
                    addToCart({
                      productId: item.id,
                      name: item.name,
                      image: item.image,
                      price: item.priceL,
                      size: "L",
                      category: item.category,
                      desc: item.desc,
                      cartId: `${item.id}-L`,
                    })
                  }
                >
                  <span className="btn-icon">🛒</span>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

            <div className="menu-card-footer">
              🌿 Segar setiap hari • Tanpa pengawet • Higienis
            </div>
          </article>
        ))}
      </main>

      <footer className="products-footer">
        <p>© 2026 Dear Fruity — Fresh Juice</p>
      </footer>
    </div>
  )
}
