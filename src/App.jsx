import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { products, categories } from "./data/products";
import Cart from "./components/Cart";

function HomePage() {
  return null;
}

function MenuPage({ navigate, cartItems, favorites, toggleFavorite, addToCart, formatPrice, showMenu, setShowMenu, search, setSearch, activeCategory, setActiveCategory, heroSlide, setHeroSlide, menuSectionRef, scrollToMenu, clearCart, customFruits, setCustomFruits, menuOptions, setMenuOptions }) {
  const activeCategoryObj = categories.find((c) => c.key === activeCategory);
  const activeCategoryLabel = useMemo(
    () => (activeCategoryObj?.label || "Semua"),
    [activeCategory, activeCategoryObj]
  );

  const filteredProducts = products
    .filter((p) => p.category === activeCategory)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const visibleProducts = filteredProducts.slice(0, showMenu);

  return (
    <div className="main-layout">
      <main className="content">
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-text">
              <h1 className="hero-title">Kesegaran Alami</h1>
              <p className="hero-medium">Setiap Tegukan</p>
              <p className="hero-subtitle">Terbuat dari buah segar pilihan tanpa bahan pengawet. Sehat, segar, dan lezat setiap hari.</p>
              <button className="btn-primary hero-cta-btn" onClick={scrollToMenu}>
                Pesan Sekarang
              </button>
            </div>
          </div>
        </section>

        <section className="featured-section">
          <div className="menu-grid-inner">
            <div className="menu-grid-header">
              <h2 className="menu-grid-title">New Product</h2>
            </div>
            <div className="menu-grid">
              <div className="featured-card">
                <div className="featured-image">
                  <img src="/images/fruit-sando.jpg" alt="Fruit Sando By Dear Fruity" />
                </div>
                <div className="featured-body">
                  <h3>Fruit Sando By Dear Fruity</h3>
                  <p className="featured-natural">🌿 100% Natural</p>
                  <p className="featured-desc">Sandwich lembut dengan krim segar dan potongan buah-buahan pilihan.</p>
                  <div className="featured-action">
                    <div className="menu-price">Rp 13.000</div>
                    <button
                      className="menu-add-btn"
                      onClick={() =>
                        addToCart({
                          id: 'fruit-sando',
                          name: 'Fruit Sando By Dear Fruity',
                          image: '/images/fruit-sando.jpg',
                          price: 13000,
                          priceOnly: true,
                        })
                      }
                    >
                      <span className="btn-icon">🛒</span>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="categories">
          <div className="categories-inner">
            <div className="categories-list">
              {categories.map((c) => (
                <Link
                  key={c.key}
                  to={`/?category=${c.key}#menu`}
                  className={`category-card ${activeCategory === c.key ? "active" : ""}`}
                >
                  <span className="category-icon">{c.icon}</span>
                  <span className="category-label">{c.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="menu-grid-section" ref={menuSectionRef}>
          <div className="menu-grid-inner">
            <div className="menu-grid-header" style={{ marginTop: 28 }}>
              <h2 className="menu-grid-title">{activeCategoryLabel}</h2>
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Cari jus..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🍹</div>
                <p>Tidak ada produk yang ditemukan.</p>
              </div>
            ) : (
              <div className="menu-grid">
                {visibleProducts.map((p) => {
                  const host = (
                    <article key={p.id} className="menu-card">
                      <div className="menu-card-image">
                        <img src={p.image} alt={p.name} />
                        <button
                          className={`menu-card-heart ${favorites.includes(p.id) ? "favorited" : ""}`}
                          aria-label="Favorit"
                          onClick={() => toggleFavorite(p.id)}
                        >
                          <span className="heart-icon">
                            {favorites.includes(p.id) ? "♥" : "♡"}
                          </span>
                        </button>
                      </div>

                      <div className="menu-card-body">
                        <h2 className="menu-card-title">{p.name}</h2>
                        <p className="menu-card-natural">🌿 100% Natural</p>
                        <p className="menu-card-desc">
                          Terbuat dari buah segar pilihan, tanpa gula tambahan.
                        </p>
                      </div>

                      <div className="menu-card-menu">
                        {p.isCustom && (
                          <div className="menu-custom-row">
                            <input
                              type="text"
                              placeholder="Contoh: Stroberi, Melon, Alpukat"
                              value={customFruits[p.id] || ""}
                              onChange={(e) =>
                                setCustomFruits((prev) => ({
                                  ...prev,
                                  [p.id]: e.target.value,
                                }))
                              }
                            />
                          </div>
                        )}
                        {p.hasSize ? (
                          <div className="menu-options-row">
                            <div className="menu-option-group">
                              <span className="option-label">Ukuran</span>
                              <div className="option-chips">
                                <button
                                  type="button"
                                  className={`option-chip ${
                                    (menuOptions[`${p.id}-size`] || "R") === "R"
                                      ? "selected"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    setMenuOptions((prev) => ({
                                      ...prev,
                                      [`${p.id}-size`]: "R",
                                    }))
                                  }
                                >
                                  350 ml
                                </button>
                                <button
                                  type="button"
                                  className={`option-chip ${
                                    (menuOptions[`${p.id}-size`] || "R") === "L"
                                      ? "selected"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    setMenuOptions((prev) => ({
                                      ...prev,
                                      [`${p.id}-size`]: "L",
                                    }))
                                  }
                                >
                                  500 ml
                                </button>
                              </div>
                            </div>
                            {p.hasVariant && (
                              <div className="menu-option-group">
                                <span className="option-label">Varian</span>
                                <div className="option-chips">
                                  {(p.variantOptions || []).map((opt) => (
                                    <button
                                      key={opt}
                                      type="button"
                                      className={`option-chip variant ${
                                        menuOptions[`${p.id}-variant`] === opt
                                          ? "selected"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        setMenuOptions((prev) => ({
                                          ...prev,
                                          [`${p.id}-variant`]: opt,
                                        }))
                                      }
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                            {p.addOnOptions && p.addOnOptions.length > 0 ? (
                              <div className="menu-option-group">
                                <span className="option-label">Add Ons (+Rp{formatPrice(p.addOnPrice)})</span>
                                <div className="option-chips">
                                  {(p.addOnOptions || []).map((opt) => (
                                    <button
                                      key={opt}
                                      type="button"
                                      className={`option-chip addon ${
                                        menuOptions[`${p.id}-addOns`] === opt
                                          ? "selected"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        setMenuOptions((prev) => {
                                          const current = prev[`${p.id}-addOns`];
                                          return {
                                            ...prev,
                                            [`${p.id}-addOns`]: current === opt
                                              ? undefined
                                              : opt,
                                          };
                                        })
                                      }
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                            <div className="menu-row menu-row-single">
                              <div className="menu-price">
                                Rp {formatPrice(menuOptions[`${p.id}-size`] === "L" ? p.priceL : p.priceR)}
                              </div>
                              <button
                                className="menu-add-btn"
                                onClick={() => {
                                  const sel = menuOptions[`${p.id}-size`] || "R";
                                  addToCart(p, sel === "L" ? "500 ml" : "350 ml");
                                }}
                              >
                                <span className="btn-icon">🛒</span>
                                <span>Add to Cart</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {!p.hasSize && !p.hasVariant && !p.addOnOptions && !p.priceOnly && !p.isCustom ? (
                              <div className="menu-option-group sugar-options">
                                <span className="option-label"></span>
                                <div className="option-chips">
                                  {(p.sugarOptions || ["Normal Sugar", "Less Sugar"]).map((opt) => (
                                    <button
                                      key={opt}
                                      type="button"
                                      className={`option-chip sugar-chip ${menuOptions[`${p.id}-sugar`] === opt ? "selected" : ""}`}
                                      onClick={() =>
                                        setMenuOptions((prev) => ({
                                          ...prev,
                                          [`${p.id}-sugar`]: opt,
                                        }))
                                      }
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                            {p.priceOnly ? (
                              <div className="menu-row">
                                <div className="menu-price">Rp {formatPrice(p.price)}</div>
                                <button
                                  className="menu-add-btn btn-natural"
                                  onClick={() => addToCart(p, "Regular")}
                                >
                                  <span className="btn-icon">🛒</span>
                                  <span>Add to Cart</span>
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="menu-row">
                                  <div className="menu-size-chips">
                                    <span className="chip chip-r">R</span>
                                    <span className="chip-text">Regular</span>
                                  </div>
                                  <div className="menu-price">Rp {formatPrice(p.priceR)}</div>
                                  <button
                                    className="menu-add-btn btn-natural"
                                    onClick={() => addToCart(p, "Regular")}
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
                                  <div className="menu-price">Rp {formatPrice(p.priceL)}</div>
                                  <button
                                    className="menu-add-btn btn-large"
                                    onClick={() => addToCart(p, "Large")}
                                  >
                                    <span className="btn-icon">🛒</span>
                                    <span>Add to Cart</span>
                                  </button>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>

                      <div className="menu-card-footer">
                        🌿 Segar setiap hari • Tanpa pengawet • Higienis
                      </div>
                    </article>
                  );

                  return host;
                })}
              </div>
            )}

            {filteredProducts.length > showMenu && (
              <div className="load-more-wrap">
                <button
                  className="load-more"
                  onClick={() => setShowMenu((prev) => prev + 8)}
                >
                  Muat lebih banyak
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function CartPage({ navigate, cartItems, updateQty, removeFromCart, formatPrice, checkoutStep, setCheckoutStep, startCheckout, customerName, setCustomerName, customerFloor, setCustomerFloor, submitOrder, clearCart, subtotal, ongkir, total, submittingOrder }) {
  if (checkoutStep === 3) {
    return (
      <div className="success-page-wrap">
        <div className="success-page-center">
          <div className="checkout-panel success-centered">
            <div className="success-icon">✅</div>
            <h4>Pesanan Diterima!</h4>
            <p>Terima kasih {customerName || 'kamu'} atas pesanannya, nanti kami akan langsung antar ke lantai {customerFloor || '-'}.</p>
            <button className="btn-primary" onClick={() => { navigate('/'); }}>Pesan Lagi</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="cart-page-layout">
      <div className="cart-list-column">
        <div className="cart-header">
          <h3>Keranjang Belanja</h3>
          <button className="cart-close" onClick={() => navigate("/")}>✕</button>
        </div>

        {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p>Keranjang kamu masih kosong.</p>
              <button className="btn-primary" onClick={() => navigate("/")}>Mulai Belanja</button>
            </div>
          ) : (
            <div className="cart-list-column">
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item.uniqueKey} className="cart-item-card">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-notes">
                        Catatan: {[item.size, item.sugar].filter(Boolean).join(" | ") || "-"}
                      </div>
                      <div className="cart-item-controls">
                        <button className="qty-btn" onClick={() => updateQty(item.uniqueKey, -1)}>-</button>
                        <span className="qty-value">{item.qty}</span>
                        <button className="qty-btn" onClick={() => updateQty(item.uniqueKey, 1)}>+</button>
                      </div>
                    </div>
                    <div className="cart-item-right">
                      <div className="cart-item-price">Rp{formatPrice(item.price * item.qty)}</div>
                      <button className="cart-item-remove" onClick={() => removeFromCart(item.uniqueKey)}>Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        )}
      </div>

      <div className="cart-checkout-column">
        <div className="checkout-panel">
          <h3>Checkout</h3>

          {checkoutStep === null && cartItems.length > 0 ? (
            <div className="checkout-summary-block">
              <div className="summary-row">
                <span>Total Item ({cartItems.length} produk)</span>
                <span>Rp{formatPrice(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Ongkos Kirim</span>
                <span>Rp{formatPrice(Math.max(0, ongkir))}</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row">
                <span>Subtotal</span>
                <span>Rp{formatPrice(subtotal + Math.max(0, ongkir))}</span>
              </div>
              {ongkir > 0 ? (
                <>
                  <div className="summary-row discount">
                    <span>Diskon Ongkir</span>
                    <span>-Rp{formatPrice(ongkir)}</span>
                  </div>
                  <div className="summary-divider" />
                </>
              ) : null}
              <div className="summary-row total">
                <span>Total Pembayaran</span>
                <span>Rp{formatPrice(total)}</span>
              </div>
              <button className="btn-primary btn-full" onClick={startCheckout}>
                Lanjut ke Checkout
              </button>
            </div>
          ) : checkoutStep === 1 ? (
            <div className="checkout-step">
              <h4>Data Diri</h4>
              <input
                type="text"
                placeholder="Masukkan nama sesuai Lark"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Masukkan lantai"
                value={customerFloor}
                onChange={(e) => setCustomerFloor(e.target.value)}
              />
              <button className="btn-primary btn-full" onClick={() => {
                if (!customerName.trim() || !customerFloor.trim()) return;
                setCheckoutStep(2);
              }}>Lanjut</button>
              <button className="btn-secondary" onClick={() => setCheckoutStep(null)}>Batal</button>
            </div>
          ) : checkoutStep === 2 ? (
            <div className="checkout-step">
              <h4>Konfirmasi & Bayar</h4>
              <div className="order-summary">
                {cartItems.map((item) => (
                  <div key={item.uniqueKey} className="order-item">
                    <div className="order-item-main">
                      <span className="order-item-name">{item.name}</span>
                      <span className="order-item-qty">x{item.qty}</span>
                      <span className="order-item-price">Rp{formatPrice(item.price * item.qty)}</span>
                    </div>
                    <div className="order-item-note">
                      Catatan: {[item.size, item.sugar].filter(Boolean).join(" | ") || "-"}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="btn-primary"
                onClick={submitOrder}
                disabled={submittingOrder}
              >
                {submittingOrder ? "Mengirim Pesanan..." : "Pesan Sekarang"}
              </button>
              <button className="btn-secondary" onClick={() => setCheckoutStep(1)}>Kembali</button>
            </div>
          ) : null}

          {checkoutStep !== 3 && cartItems.length > 0 && (
            <div className="trust-badges">
              <div className="badge">🔒 Pembayaran Aman</div>
              <div className="badge">🟢 Bahan Segar Berkualitas</div>
              <div className="badge">🚀 Pengiriman Cepat</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("single-jus");
  const [cartItems, setCartItems] = useState([]);
  const [checkoutStep, setCheckoutStep] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerFloor, setCustomerFloor] = useState("");
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [customFruits, setCustomFruits] = useState({});
  const [menuOptions, setMenuOptions] = useState({});
  const [toast, setToast] = useState(null);
  const [showMenu, setShowMenu] = useState(8);
  const [heroSlide, setHeroSlide] = useState(0);
  const [search, setSearch] = useState("");
  const menuSectionRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) setActiveCategory(cat);
  }, [location.search]);

  const heroSlides = [
    {
      title: "Kesegaran Alami\nSetiap Tegukan",
      desc: "Diproduksi dari buah segar pilihan, sehat, lezat, dan menyegarkan setiap hari.",
    },
    {
      title: "Promo Spesial\nHemat 20%",
      desc: "Dapatkan diskon untuk pembelian pertama kamu. Berlaku sampai akhir bulan.",
    },
  ];

  const scrollToMenu = () => {
    menuSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("freshy-cart");
      if (saved) setCartItems(JSON.parse(saved));
      const fav = localStorage.getItem("freshy-favorites");
      if (fav) setFavorites(JSON.parse(fav));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("freshy-cart", JSON.stringify(cartItems));
      localStorage.setItem("freshy-favorites", JSON.stringify(favorites));
    } catch {}
  }, [cartItems, favorites]);

  useEffect(() => {
    if (location.pathname !== "/cart") {
      setCheckoutStep(null);
    }
  }, [location.pathname]);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const formatPrice = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const addToCart = (product, size = "Regular") => {
    const price = product.priceOnly
      ? product.price
      : size === "Regular"
        ? product.priceR
        : product.priceL;
    const customLabel =
      product.isCustom && customFruits[product.id]
        ? customFruits[product.id].trim()
        : "";
    const selectedSize = product.hasSize
      ? menuOptions[`${product.id}-size`] || "R"
      : null;
    const selectedVariant = product.hasVariant
      ? menuOptions[`${product.id}-variant`]
      : null;
    const selectedAddOns = product.addOnPrice
      ? menuOptions[`${product.id}-addOns`]
      : null;
    const selectedSugar = menuOptions[`${product.id}-sugar`] || null;

    let displaySize = size;
    if (product.hasSize) {
      displaySize = selectedSize === "L" ? "500 ml" : "350 ml";
    } else {
      displaySize = size;
    }

    let displayName = product.name;

    const addOns = selectedAddOns ? product.addOnPrice : 0;
    const finalPrice = price + addOns;

    const uniqueKey = [
      product.id,
      displaySize,
      selectedVariant,
      selectedAddOns,
      selectedSugar,
      customLabel,
    ].join("||");

    setCartItems((prev) => {
      const existing = prev.find((i) => i.uniqueKey === uniqueKey);
      if (existing) {
        return prev.map((i) =>
          i.uniqueKey === uniqueKey ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          uniqueKey,
          name: displayName,
          size: displaySize,
          variant: selectedVariant,
          price: finalPrice,
          qty: 1,
          image: product.image,
          customLabel,
          addOns: !!selectedAddOns,
          addOnName: selectedAddOns,
          sugar: selectedSugar,
        },
      ];
    });
    showToast(`${displayName} ditambahkan ke keranjang`);
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const updateQty = (uniqueKey, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.uniqueKey === uniqueKey
            ? { ...item, qty: Math.max(1, item.qty + delta) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (uniqueKey) => {
    setCartItems((prev) => prev.filter((item) => item.uniqueKey !== uniqueKey));
  };

  const clearCart = () => {
    setCartItems([]);
    setCheckoutStep(null);
    navigate("/");
  };

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const ongkir = cartItems.length > 0 ? 5000 : 0;
  const total = subtotal;

  const startCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutStep(1);
  };

  const submitOrder = async () => {
    if (!customerName.trim() || !customerFloor.trim()) return;
    if (submittingOrder) return;

    setSubmittingOrder(true);
    try {
      await fetch(`${import.meta.env.VITE_ORDER_API_URL || "http://localhost:3001"}/send-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerFloor,
          cartItems,
          total,
        }),
      });
    } catch (e) {
      console.error("Gagal kirim pesanan:", e);
    }

    setCartItems([]);
    setCheckoutStep(3);
    setSubmittingOrder(false);
  };

  return (
    <div className="page">
      <header className={`header ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="header-inner">
          <div className="logo">
            <img src="/images/logo.jpg" alt="Dear Fruity" className="logo-img" />
            <span>Dear Fruity</span>
          </div>

          <nav className="nav">
            <Link className="nav-link active" to="/">
              Beranda
            </Link>
          </nav>

          <div className="header-actions">
            <button
              className="mobile-menu-btn"
              aria-label="Menu"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>

            <Link
              to="/cart"
              className="cart-btn"
            >
              🛒 <span>Cart ({cartItems.length})</span>
            </Link>
          </div>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <MenuPage
              navigate={navigate}
              cartItems={cartItems}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              addToCart={addToCart}
              formatPrice={formatPrice}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              search={search}
              setSearch={setSearch}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              heroSlide={heroSlide}
              setHeroSlide={setHeroSlide}
              menuSectionRef={menuSectionRef}
              scrollToMenu={scrollToMenu}
              clearCart={clearCart}
              customFruits={customFruits}
              setCustomFruits={setCustomFruits}
              menuOptions={menuOptions}
              setMenuOptions={setMenuOptions}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              navigate={navigate}
              cartItems={cartItems}
              updateQty={updateQty}
              removeFromCart={removeFromCart}
              formatPrice={formatPrice}
              checkoutStep={checkoutStep}
              setCheckoutStep={setCheckoutStep}
              startCheckout={startCheckout}
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerFloor={customerFloor}
              setCustomerFloor={setCustomerFloor}
              submitOrder={submitOrder}
              clearCart={clearCart}
              subtotal={subtotal}
              ongkir={ongkir}
              total={total}
              submittingOrder={submittingOrder}
            />
          }
        />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>

      <footer className="modern-footer">
        <div className="modern-footer-top">
          <div className="modern-footer-brand">
            <div className="modern-footer-logo">
              <img src="/images/logo.jpg" alt="Dear Fruity" className="logo-img" />
              <span>Dear Fruity</span>
            </div>
            <p>Jus buah segar pilihan, dibuat dengan bahan premium untukinovasi rasa yang tetap memikat di setiap tegukan.</p>
            <div className="modern-footer-socials">
              <a className="modern-social-btn" href="https://instagram.com/dearfruity.id" aria-label="Instagram">
                <span className="social-icon">📸</span>
                <span className="social-label">Instagram</span>
              </a>
              <a className="modern-social-btn" href="https://tiktok.com/@dearfruity.id" aria-label="TikTok">
                <span className="social-icon">🎵</span>
                <span className="social-label">TikTok</span>
              </a>
              <a className="modern-social-btn" href="https://wa.me/6281234567890" aria-label="WhatsApp">
                <span className="social-icon">💬</span>
                <span className="social-label">WhatsApp</span>
              </a>
            </div>
          </div>
          <div className="modern-footer-grid">
            <div>
              <h4 className="modern-footer-title">Kategori Favorit</h4>
              <ul className="modern-footer-links">
                <li><Link to="/?category=single-jus#menu">Single Jus</Link></li>
                <li><Link to="/?category=mix-jus#menu">Mix Jus</Link></li>
                <li><Link to="/?category=sop-buah#menu">Sop Buah</Link></li>
                <li><Link to="/?category=buah-potong#menu">Buah Potong</Link></li>
              </ul>
              <h4 className="modern-footer-title">Bantuan</h4>
              <ul className="modern-footer-links">
                <li><a href="#">Cara Pesan</a></li>
                <li><a href="#">Pengiriman</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="modern-footer-bottom">
          <span>© 2026 Dear Fruity. All rights reserved.</span>
          <span className="modern-footer-credit">Dibuat dengan 🍹</span>
        </div>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
