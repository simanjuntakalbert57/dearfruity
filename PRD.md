# Dear Fruity — PRD (Revised)

## 1. Project Overview
Dear Fruity adalah e-commerce jus buah segar untuk pasar lokal (Indonesia). Target user: karyawan/mahasiswa yang ingin pesan jus di kantor/lantai tanpa ribet.

**Tagline:** Jus buah segar, tanpa pengawet.

---

## 2. User Flow

```
HOME (Menu) → pilih produk + ukuran → tambah ke keranjang
    ↓
KERANJANG → review pesanan → Checkout
    ↓
CHECKOUT → isi nama + lantai → Konfirmasi
    ↓
SUKSES → Order ID + tanggal → keranjang kosong
    ↓
[Background] Data pesanan dikirim ke Google Sheets + Excel
```

---

## 3. Pages

### 3.1 Home (`/`)
- **Header:** Logo 🌿 Dear Fruity + link Menu + Keranjang (dengan badge jumlah item)
- **Hero:** Judul "Menu Jus Buah", subteks "100% buah segar, tanpa pengawet & tanpa gula tambahan"
- **Kategori:** Filter/tab: Semua | Single Jus | Mix Jus
- **Product List:** Grid kartu produk dengan tombol Regular / Large
- **Sticky Cart Bar:** Muncul jika ada item di keranjang (di bawah layar)
- **Footer:** © Dear Fruity

### 3.2 Keranjang (`/cart`)
- Daftar item yang dibeli (nama, ukuran R/L, qty, harga satuan, subtotal)
- Tombol + / - ubah qty
- Tombol hapus item
- Ringkasan: subtotal, total
- Tombol "Lanjut ke Checkout"

### 3.3 Checkout (`/checkout`)
- **Form:** Nama (text), Lantai (text)
- **Ringkasan pesanan:** daftar item + total
- **Tombol:** Konfirmasi Pesanan
- **Setelah submit:**
  - Muncul halaman sukses (Order ID + tanggal + pesan terima kasih)
  - Keranjang di-clear
  - Data dikirim ke Google Sheets (melalui Apps Script endpoint)
  - Excel file ter-download otomatis

---

## 4. Functional Requirements

### 4.1 Cart
- Tambah item (Regular / Large +Rp3.000)
- Satu produk + ukuran = 1 baris keranjang (qty bisa >1)
- Ubah qty (+/-)
- Hapus item
- Hitung total otomatis

### 4.2 Checkout
- Validasi: nama dan lantai wajib diisi
- Generate Order ID format: `ORD-{timestamp_base36}`
- Tanggal pemesanan: `new Date().toLocaleString("id-ID")`
- Export Excel dengan kolom: Order ID, Nama, Lantai, Produk, Ukuran, Harga Satuan, Jumlah, Total, Tanggal
- Kirim data pesanan ke Google Sheets endpoint
- Setelah sukses: keranjang di-clear, tampilkan sukses page

### 4.3 Categories
- Filter produk berdasarkan kategori: Single Jus, Mix Jus
- Product card menampilkan: emoji, nama, deskripsi, harga, pilihan Regular/Large, tombol Tambah

---

## 5. Data

### 5.1 Product Schema
```js
{
  id: string,
  name: string,
  category: "Single Jus" | "Mix Jus",
  emoji: string,
  price: number,
  desc: string
}
```

### 5.2 Cart Item Schema
```js
{
  cartId: string,
  id: string,
  name: string,
  category: string,
  emoji: string,
  size: "R" | "L",
  price: number,
  quantity: number,
  desc: string
}
```

### 5.3 Order Schema (untuk Excel / Sheets)
```js
{
  orderId: string,
  nama: string,
  lantai: string,
  items: CartItem[],
  total: number,
  tanggal: string  // "4/6/2026, 23.30" format id-ID
}
```

---

## 6. Tech Stack
- React + Vite
- React Router (HashRouter)
- xlsx (SheetJS) — export Excel client-side
- fetch POST — kirim data ke Google Apps Script (placeholder untuk Sheets)
- Vanilla CSS, Inter font

---

## 7. Google Sheets Integration
- Data pesanan dikirim via `fetch POST` ke Google Apps Script Web App URL
- URL placeholder: `GOOGLE_SCRIPT_URL` (akan diisi nanti)
- Format payload JSON: `{ items, nama, lantai, orderId, total, tanggal }`
- Fallback: jika endpoint gagal, tetap lanjut (Excel tetap ter-download)

---

## 8. Out of Scope (v1)
- Login / akun user
- Payment gateway
- Backend / database
- Multi-kabupaten/kota shipping
- Upload foto produk

---

## 9. Success Metrics
- User bisa browse menu, tambah ke keranjang, checkout dalam < 3 menit
- Excel ter-download otomatis setelah checkout
- Data siap masuk Google Sheets saat endpoint aktif
- Tidak ada error di console saat navigasi
