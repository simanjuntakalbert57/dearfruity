# Dear Fruity — Design Spec

## 1. Design Philosophy
- **Bright, fresh, light** — tidak dark
- **Elegant, premium** — clean, breathable
- **Tidak gelap hijau** — gunakan aksen hijau tua untuk primary action
- **Font:** Inter / Helvetica (sans-serif bersih)

---

## 2. Color Palette

| Role | Color | Usage |
|------|-------|-------|
| Background | `#fafaf8` | Page background, cream-off-white |
| Card | `#ffffff` | Product cards, forms |
| Primary | `#1a4d2e` | Forest green — buttons active, links |
| Primary hover | `#2d6a4f` | Lighter green untuk hover |
| Accent | `#c4755e` | Warm terracotta — eyebrow text, highlights |
| Text | `#2d2d2d` | Dark gray — body, headings |
| Muted | `#6b6b6b` | Gray — descriptions, helper text |
| Border | `rgba(0,0,0,0.06)` | Soft borders, dividers |
| White | `#ffffff` | Text on green buttons |

**Dilarang:** Hitam solid `#000`, dark green `#14532d`.

---

## 3. Typography

- **Font family:** Inter (Google Fonts) fallback -apple-system, Helvetica, Arial
- **Scale:**
  - Hero H1: 52px / weight 800 / tracking -1px
  - Page title: 30px / weight 700
  - Product name: 15px / weight 600
  - Body: 14px / weight 400
  - Small: 12px / weight 500 (badge, label)
- **Line height:** 1.5 untuk body, 0.95 untuk hero display

---

## 4. Layout

### 4.1 Grid
- **Max container:** 1100px / 1200px, centered
- **Product grid:** auto-fill, minmax 220px, gap 22px
- **Card padding:** 18-24px
- **Border radius:** 12-18px untuk cards, 999px untuk buttons

### 4.2 Spacing
- **Page padding (mobile):** 18px
- **Page padding (desktop):** 28px
- **Section gap:** 40-56px
- **Card gap:** 22px

### 4.3 Header
- Sticky top, 60px-ish height
- Background: `rgba(250,250,248,0.92)` + backdrop blur
- Border-bottom: subtle `rgba(0,0,0,0.04)`
- Left: logo 🌿 + brand name
- Right: Menu (link) + Keranjang (link + badge hijau)

### 4.4 Hero (Home)
- Min-height: 60vh
- Gradient: `linear-gradient(135deg, #f7f5f0, #f0ece3)`
- Center-aligned, large typography
- Eyebrow text: small uppercase, warna accent
- CTA button: Hijau rounded pill

---

## 5. Components

### 5.1 Product Card
```
┌──────────────────────┐
│   [Emoji besar]      │  ← centered, 44-64px
│                      │
│   Nama Produk        │  ← 15px, center, bold
│   Deskripsi singkat  │  ← 12px, center, muted
│   Rp 15.000          │  ← 14px, center, hijau
│                      │
│  [Regular] [Large]   │  ← outline pills
│                      │
└──────────────────────┘
```
- Background: white
- Shadow: `0 2px 12px rgba(0,0,0,0.05)`
- Border: `1px solid rgba(0,0,0,0.03)` (atau tanpa border jika disetujui)
- Border-radius: 16-18px

### 5.2 Buttons
**Primary (filled hijau):**
- Background `#1a4d2e`, text putih
- Rounded pill, hover `#2d6a4f`
- Padding: 12-14px vertical, 24px horizontal

**Outline (secondary):**
- Border `rgba(0,0,0,0.08)`, background putih
- Hover: border jadi hijau, text hijau

### 5.3 Cart Badge
- Lingkaran hijau `#1a4d2e`
- Teks putih, 10px bold
- Posisi: absolute di kanan atas cart icon/link

---

## 6. Pages Detail

### 6.1 Home Page (`/`)
Layout:
```
[HEADER sticky]
[HERO section — gradient cream]
    FRESH JUICE
    100% buah segar...
    [Lihat Menu]
[PRODUCT GRID]
    [Card] [Card] [Card]
[FOOTER — © Dear Fruity]
```

### 6.2 Checkout Page (`/checkout`)
Layout desktop:
```
[HEADER]
[H1 Checkout]
[FORM (kiri)]         [RINGKASAN (kanan)]
  Nama: [______]        Daftar item...
  Lantai: [____]       Subtotal: RpXX
                        Total: RpXX
  [Konfirmasi Pesanan]
```

Layout mobile: stack vertikal (form di atas, ringkasan di bawah)

---

## 7. Excel Export Format

File: `dear-fruity-{ORDER_ID}.xlsx`

Kolom:
- Order ID
- Nama
- Lantai
- Produk
- Ukuran (R/L)
- Harga Satuan
- Jumlah
- Total
- Tanggal

---

## 8. Zustand / State Shape

```js
cart = {
  items: [
    {
      cartId, id, name, emoji, size, price, quantity, desc
    }
  ],
  totalItems, totalPrice
}

actions: addToCart, removeFromCart, updateQuantity, clearCart
```

---

## 9. Copy Guidelines

- Bahasa Indonesia
- Nada: ramah, segar, simple
- Hindari kata "beli" — pakai "Tambah" / "Pesan"
- Button teks: "Lihat Menu", "Konfirmasi Pesanan", "Pesan Lagi"
- Tidak ada emoji berlebihan di UI, hanya di product cards

---

## 10. Responsive Breakpoints

- **Desktop:** > 720px → grid multi-kolom
- **Mobile:** <= 720px → grid 1 kolom, padding reduced

---

## 11. Do / Don't

✅ DO:
- Gunakan hijau tua untuk tombol utama
- Gunakan cream/off-white untuk background
- Spacing lega, tidak sempit
- Mobile-first design

❌ DON'T:
- Jangan pakai hitam solid untuk teks/button
- Jangan pakai dark green
- Jangan buat sidebar rumit — cukup header + grid
- Jangan ada payment gateway / credit card form
