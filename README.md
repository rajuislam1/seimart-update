# Sei Mart — E-Commerce Website

Static multi-page e-commerce frontend (HTML, CSS, JavaScript).  
Data is stored in the browser (`localStorage`) — no backend required for demo.

## Live structure

```
seimart/
├── index.html              # Homepage
├── products.html
├── product-details.html
├── cart.html
├── checkout.html
├── wishlist.html
├── account.html
├── login.html
├── order-tracking.html
├── order-success.html
├── sell-with-seimart.html
├── affiliate.html
├── contact.html
├── help.html
├── privacy-policy.html
├── return-policy.html
├── terms.html
├── bkash-payment.html
├── admin.html              # Admin dashboard
├── style.css
├── script.js
├── manifest.json
├── image/
│   ├── logo-seimart.png
│   ├── banners/
│   └── products/
└── admin/
    ├── login.html
    ├── staff-rules.html
    ├── seller-requests.html
    ├── affiliates-manage.html
    ├── account.html
    ├── css/
    ├── js/
    └── products/
```

## How to open locally

1. Unzip this folder
2. Open `index.html` in a browser  
   (or use Live Server / any static host)

## Admin login (demo)

- **URL:** `admin/login.html` or footer → Staff / Admin Login  
- **Super admin:** `admin@seimart.com` / `123456`  
- Staff accounts: create from **Staff Rules**

## GitHub upload

```bash
cd seimart
git init
git add .
git commit -m "Initial commit — Sei Mart"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### GitHub Pages

Repo → Settings → Pages → Branch: `main` / root → Save  
Site: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Features (overview)

- Storefront: products, cart, wishlist, checkout, COD (Steadfast), bKash flow
- Order tracking + status timeline
- Admin: orders, products, customers, coupons, inventory, reports, support
- Staff roles & permissions
- Seller requests & affiliates
- Courier + tracking ID (Steadfast)

## Notes

- This is a **frontend demo**. Passwords and data are client-side only.
- For production: use a real backend, secure auth, and payment/courier APIs.
- Replace images in `image/products/` with your own photos.

## Version

Sei Mart — GitHub-ready package  
© 2026 Sei Mart
