from hermes_tools import read_file, write_file, patch
from pathlib import Path

app_jsx = Path('/Users/albertsimanjuntak/Documents/dear-fruity-new/src/App.jsx')
app_css = Path('/Users/albertsimanjuntak/Documents/dear-fruity-new/src/App.css')

app_jsx_text = app_jsx.read_text()
app_css_text = app_css.read_text()

# 1) Clear cart automatically in submitOrder()
old_submit = """  const submitOrder = () => {
    if (!customerName.trim() || !customerFloor.trim()) return;
    setCheckoutStep(3);
  };"""

new_submit = """  const submitOrder = () => {
    if (!customerName.trim() || !customerFloor.trim()) return;
    setCheckoutStep(3);
    setCartItems([]);
  };"""

if old_submit not in app_jsx_text:
    print('submitOrder block not found')
else:
    app_jsx_text = app_jsx_text.replace(old_submit, new_submit)
    print('updated submitOrder')

# 2) Replace the early-return success block to be page-centered
old_success = """  if (checkoutStep === 3) {
    return (
      <div className="cart-page-layout">
        <div className="cart-checkout-column">
          <div className="checkout-panel">
            <div className="checkout-success-panel success-centered">
              <div className="success-icon">✅</div>
              <h4>Pesanan Diterima!</h4>
              <p>Terima kasih {customerName || 'kamu'} atas pesanannya, nanti kami akan langsung antar ke lantai {customerFloor || '-'}.</p>
              <button className="btn-primary full" onClick={clearCart}>Pesan Lagi</button>
            </div>
          </div>
        </div>
      </div>
    );
  }"""

new_success = """  if (checkoutStep === 3) {
    return (
      <div className="success-page-wrap">
        <div className="success-page-center">
          <div className="checkout-panel success-centered">
            <div className="success-icon">✅</div>
            <h4>Pesanan Diterima!</h4>
            <p>Terima kasih {customerName || 'kamu'} atas pesanannya, nanti kami akan langsung antar ke lantai {customerFloor || '-'}.</p>
            <button className="btn-primary full" onClick={() => { setCartItems([]); setCheckoutStep(null); navigate('/'); }}>Pesan Lagi</button>
          </div>
        </div>
      </div>
    );
  }"""

if old_success not in app_jsx_text:
    print('success block not found')
else:
    app_jsx_text = app_jsx_text.replace(old_success, new_success)
    print('updated success block')

# 3) Fix duplicate/leftover block after return — switch to page success render
old_continue = """  ) : null}

          {checkoutStep !== 3 && cartItems.length > 0 && (
            <div className="trust-badges">
              <div className="badge">🔒 Pembayaran Aman</div>
              <div className="badge">🟢 Bahan Segar Berkualitas</div>
              <div className="badge">🚀 Pengiriman Cepat</div>
            </div>
          )}
        </div>
      </div>
    )}"""

new_continue = """  ) : null}

          {cartItems.length > 0 && (
            <div className="trust-badges">
              <div className="badge">🔒 Pembayaran Aman</div>
              <div className="badge">🟢 Bahan Segar Berkualitas</div>
              <div className="badge">🚀 Pengiriman Cepat</div>
            </div>
          )}
        </div>
      </div>
    )}"""

if old_continue not in app_jsx_text:
    print('trust badges block exact snippet not found, skipping condition tweak')
else:
    app_jsx_text = app_jsx_text.replace(old_continue, new_continue)
    print('updated trust badges condition')

app_jsx.write_text(app_jsx_text)

old_css = """.cart-page-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 24px;
  align-items: start;
  padding: 24px 32px;
  max-width: 1400px;
  margin: 0 auto;
}

.cart-list-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-checkout-column {
  position: sticky;
  top: 96px;
}"""

new_css = old_css + """

.success-page-wrap {
  min-height: calc(100vh - 72px);
  display: flex;
  width: 100%;
  background: #ffffff;
}

.success-page-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.success-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
  width: 100%;
  max-width: 520px;
}

.success-icon {
  font-size: 48px;
}

.success-centered h4 {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.success-centered p {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.65;
}"""

if old_css not in app_css_text:
    print('CSS layout block not found')
else:
    app_css_text = app_css_text.replace(old_css, new_css)
    print('updated CSS layout block')

app_css.write_text(app_css_text)
print('done')
