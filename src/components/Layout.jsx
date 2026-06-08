import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
