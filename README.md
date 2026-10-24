# الكيف — Al-Kayf Specialty Coffee & Tea

Static HTML/CSS/JS shop for specialty coffee, tea, and brew tools. Built for the UAE (prices in **AED / د.إ**).

## Features
- Arabic ↔ English language toggle (persisted in `localStorage`)
- RTL for Arabic, LTR for English
- Browse and add to cart without an account
- Checkout requires sign-in / sign-up (demo via `localStorage`)
- Checkout saves the order (number like `AK-YYMMDD-xxxx`) and clears the cart; optionally sends it to the owner on WhatsApp
- Offers can be added to the cart as bundles at the offer price
- Offers shown on the homepage (no pop-ups)
- Product photos in `images/`

## Run locally
From the repository root (the folder that contains `index.html`):
```bash
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

## Receiving orders on WhatsApp / استلام الطلبات عبر واتساب
Set the owner's number at the top of `app.js` (international format, digits only):
```js
const ORDER_WHATSAPP = "971501234567";
```
When set, after checkout the customer's browser opens WhatsApp with the order summary addressed to that number; the customer taps Send. Leave it `""` to only save orders in the browser.

ضع رقم واتساب صاحب المتجر في أعلى `app.js` (بالصيغة الدولية، أرقام فقط). عند تعبئته، يفتح واتساب بعد إتمام الطلب برسالة فيها تفاصيل الطلب، ويضغط العميل «إرسال». اتركه فارغاً لحفظ الطلبات في المتصفح فقط.

## البيانات والحدود / Data & limits
- **No server.** Accounts, cart, language and orders are stored only in the visitor's own browser (`localStorage`). They do not sync across devices or browsers, and clearing site data removes them.
- **لا يوجد خادم.** الحسابات والسلة واللغة والطلبات محفوظة في متصفح الزائر فقط، ولا تنتقل بين الأجهزة أو المتصفحات، ومسح بيانات الموقع يحذفها.
- **Orders** are saved locally under `alkayf_orders`. The shop owner does **not** see them unless `ORDER_WHATSAPP` is set and the customer sends the WhatsApp message.
- **الطلبات** تُحفظ محلياً في `alkayf_orders`، ولا تصل لصاحب المتجر إلا إذا ضُبط `ORDER_WHATSAPP` وأرسل العميل رسالة واتساب.
- Passwords are stored as salted PBKDF2-SHA256 hashes (needs https or localhost). This is still a demo account system, not real security.
- كلمات المرور تُحفظ مشفّرة (PBKDF2)، لكن نظام الحسابات يبقى تجريبياً.
- **Do not rename** the storage keys (`alkayf_cart`, `alkayf_session`, `alkayf_users`, `alkayf_lang`, `alkayf_orders`) and **do not change the site address** (domain / GitHub Pages URL). Browser storage is tied to both, so changing either makes saved accounts, carts and orders appear lost.
- **لا تغيّر** أسماء مفاتيح التخزين (`alkayf_*`) ولا **عنوان الموقع**؛ وإلا ستبدو البيانات المحفوظة وكأنها ضاعت.
