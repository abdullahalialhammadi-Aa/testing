# الكيف — Al-Kayf Specialty Coffee & Tea

Static HTML/CSS/JS shop for specialty coffee, tea, and brew tools. Built for the UAE (prices in **AED / د.إ**).

## Features
- Arabic ↔ English language toggle (persisted in `localStorage`)
- RTL for Arabic, LTR for English
- Browse and add to cart without an account
- Checkout requires sign-in / sign-up (demo via `localStorage`)
- Offers shown on the homepage (no pop-ups)
- Product photos in `images/`

## Run locally
```bash
cd alkayf   # or repo root if files are at root
python3 -m http.server 8765
```
Open: `http://localhost:8765`

## GitHub Pages
1. Repo **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main`, folder: `/ (root)`
4. Save and wait a minute for the site URL

## Files
- `index.html` — home
- `coffee.html` / `tea.html` / `tools.html` — categories
- `offers.html` — offers
- `cart.html` — cart
- `login.html` / `signup.html` — account
- `styles.css` / `app.js` — styles & logic
- `images/` — product photos
