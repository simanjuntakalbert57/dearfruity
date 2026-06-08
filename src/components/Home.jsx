import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <p className="home-eyebrow">100% ALAMI • INDONESIA</p>
        <h1>
          <span className="home-fresh">FRESH</span>
          <span className="home-juice">JUICE</span>
        </h1>
        <p className="home-subtitle">
          Jus buah segar dipetik langsung dari kebun terbaik Indonesia
        </p>
        <div className="home-actions">
          <Link to="/" className="btn btn-primary">BELANJA SEKARANG →</Link>
          <Link to="/" className="btn btn-outline">LIHAT MENU</Link>
        </div>
      </section>

      <footer className="site-footer">
        <p className="footer-brand">DEAR FRUITY</p>
        <div className="footer-social">
          <a href="https://instagram.com/dearfruity.id">Instagram</a>
          <a href="https://tiktok.com/@dearfruity.id">TikTok</a>
          <a href="https://wa.me/6281234567890">WhatsApp</a>
        </div>
      </footer>
    </div>
  );
}
