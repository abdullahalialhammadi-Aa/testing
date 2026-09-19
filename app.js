/* الكيف — Al-Kayf shared app logic (AED, AR/EN, images) */
(function () {
  "use strict";

  const CART_KEY = "alkayf_cart";
  const SESSION_KEY = "alkayf_session";
  const USERS_KEY = "alkayf_users";
  const LANG_KEY = "alkayf_lang";

  const PRODUCTS = [
    {
      id: "c1",
      name: { ar: "إثيوبيا يرقاشف", en: "Ethiopia Yirgacheffe" },
      category: "coffee",
      filter: { ar: "غسيل", en: "Washed" },
      desc: {
        ar: "نكهة زهرية خفيفة مع حموضة نظيفة. ٢٥٠ غ.",
        en: "Light floral notes with clean acidity. 250 g.",
      },
      price: 68,
      image: "images/coffee-ethiopia.jpg",
    },
    {
      id: "c2",
      name: { ar: "يمني حراز", en: "Yemen Haraz" },
      category: "coffee",
      filter: { ar: "طبيعي", en: "Natural" },
      desc: {
        ar: "قوام ثقيل ونوتات شوكولاتة وتوابل. ٢٥٠ غ.",
        en: "Heavy body with chocolate and spice notes. 250 g.",
      },
      price: 95,
      image: "images/coffee-yemen.jpg",
    },
    {
      id: "c3",
      name: { ar: "كولومبيا هويلا", en: "Colombia Huila" },
      category: "coffee",
      filter: { ar: "غسيل", en: "Washed" },
      desc: {
        ar: "متوازنة، كراميل وفواكه حمراء. ٢٥٠ غ.",
        en: "Balanced — caramel and red fruit. 250 g.",
      },
      price: 72,
      image: "images/coffee-colombia.jpg",
    },
    {
      id: "c4",
      name: { ar: "خليط البيت", en: "House Blend" },
      category: "coffee",
      filter: { ar: "خليط", en: "Blend" },
      desc: {
        ar: "للتقطير اليومي — دافئ وسلس. ٢٥٠ غ.",
        en: "For everyday brew — warm and smooth. 250 g.",
      },
      price: 55,
      image: "images/coffee-blend.jpg",
    },
    {
      id: "t1",
      name: { ar: "إيرل غراي", en: "Earl Grey" },
      category: "tea",
      filter: { ar: "أسود", en: "Black" },
      desc: {
        ar: "شاي أسود ببرغموت ناعم. ١٠٠ غ.",
        en: "Black tea with soft bergamot. 100 g.",
      },
      price: 42,
      image: "images/tea-earl-grey.jpg",
    },
    {
      id: "t2",
      name: { ar: "أخضر ياباني", en: "Japanese Green" },
      category: "tea",
      filter: { ar: "أخضر", en: "Green" },
      desc: {
        ar: "طعم عشبي منعش، مناسب بعد الظهيرة. ٨٠ غ.",
        en: "Fresh grassy taste — perfect for the afternoon. 80 g.",
      },
      price: 48,
      image: "images/tea-green.jpg",
    },
    {
      id: "t3",
      name: { ar: "بابونج", en: "Chamomile" },
      category: "tea",
      filter: { ar: "عشبي", en: "Herbal" },
      desc: {
        ar: "هدوء المساء في فنجان. ٥٠ غ.",
        en: "Evening calm in a cup. 50 g.",
      },
      price: 35,
      image: "images/tea-chamomile.jpg",
    },
    {
      id: "t4",
      name: { ar: "كركديه", en: "Hibiscus" },
      category: "tea",
      filter: { ar: "عشبي", en: "Herbal" },
      desc: {
        ar: "حامض منعش، بارد أو ساخن. ١٠٠ غ.",
        en: "Bright and tart — iced or hot. 100 g.",
      },
      price: 38,
      image: "images/tea-hibiscus.jpg",
    },
    {
      id: "o1",
      name: { ar: "V60 سيراميك", en: "Ceramic V60" },
      category: "tools",
      filter: { ar: "تقطير", en: "Pour-over" },
      desc: {
        ar: "قمع تقطير كلاسيكي لقهوة نظيفة.",
        en: "Classic dripper for a clean cup.",
      },
      price: 85,
      image: "images/tool-v60.jpg",
    },
    {
      id: "o2",
      name: { ar: "مطحنة يدوية", en: "Hand Grinder" },
      category: "tools",
      filter: { ar: "طحن", en: "Grind" },
      desc: {
        ar: "طحن متناسق لحصص صغيرة.",
        en: "Consistent grind for small batches.",
      },
      price: 189,
      image: "images/tool-grinder.jpg",
    },
    {
      id: "o3",
      name: { ar: "غلاية عنق الإوزة", en: "Gooseneck Kettle" },
      category: "tools",
      filter: { ar: "تقطير", en: "Pour-over" },
      desc: {
        ar: "تحكم دقيق بصب الماء.",
        en: "Precise pour control.",
      },
      price: 165,
      image: "images/tool-kettle.jpg",
    },
    {
      id: "o4",
      name: { ar: "فرنش برس", en: "French Press" },
      category: "tools",
      filter: { ar: "نقع", en: "Immersion" },
      desc: {
        ar: "قوام غني بخطوات بسيطة. ٦٠٠ مل.",
        en: "Rich body, simple steps. 600 ml.",
      },
      price: 79,
      image: "images/tool-french-press.jpg",
    },
  ];

  const OFFERS = [
    {
      id: "off1",
      title: { ar: "عرض بداية الأسبوع", en: "Start-of-week deal" },
      before: 140,
      after: 110,
      href: "coffee.html",
      note: { ar: "إثيوبيا + كولومبيا معاً", en: "Ethiopia + Colombia together" },
      image: "images/coffee-ethiopia.jpg",
    },
    {
      id: "off2",
      title: { ar: "طقم التقطير", en: "Pour-over kit" },
      before: 250,
      after: 199,
      href: "tools.html",
      note: { ar: "V60 + غلاية عنق الإوزة", en: "V60 + gooseneck kettle" },
      image: "images/tool-v60.jpg",
    },
    {
      id: "off3",
      title: { ar: "مساء هادئ", en: "Quiet evening" },
      before: 73,
      after: 58,
      href: "tea.html",
      note: { ar: "بابونج + كركديه", en: "Chamomile + hibiscus" },
      image: "images/tea-chamomile.jpg",
    },
  ];

  const I18N = {
    ar: {
      brand_tag: "قهوة وشاي مختص",
      nav_home: "الرئيسية",
      nav_coffee: "قهوة",
      nav_tea: "شاي",
      nav_tools: "أدوات",
      nav_offers: "عروض",
      nav_cart: "سلة",
      nav_account: "حساب",
      nav_my_account: "حسابي",
      lang_btn: "English",
      hero_title: "خذ وقتك. الكيف جاهز لما تبي.",
      hero_lead: "قهوة وشاي وأدوات تحضير — من الإمارات، بأسعار بالدرهم.",
      offers_today: "عروض اليوم",
      offers_lead: "عروض واضحة أعلى الصفحة — بدون نوافذ منبثقة.",
      featured: "مختارات من المتجر",
      about_title: "عن الكيف",
      about_p1: "الكيف متجر عربي لقهوة وشاي مختصين، مع أدوات تحضير عملية — نخدم الإمارات والمنطقة.",
      about_p2: "تصفّح بحرية، أضف للسلة كضيف. عند إتمام الطلب فقط نطلب منك تسجيل الدخول أو إنشاء حساب.",
      about_p3: "مرحباً بك — على مهل.",
      footer: "© ٢٠٢٦ الكيف — قهوة وشاي مختص · الإمارات",
      add_cart: "أضف للسلة",
      browse_offer: "تصفّح العرض",
      currency: "د.إ",
      currency_long: "درهم",
      toast_added: "تمت الإضافة إلى السلة",
      filter_all: "الكل",
      coffee_title: "القهوة",
      coffee_lead: "حبوب محمّصة بعناية. اختر ما يناسب ذوقك.",
      tea_title: "الشاي",
      tea_lead: "أسود، أخضر، وعشبي — لفنجان هادئ.",
      tools_title: "أدوات التحضير",
      tools_lead: "معدّات بسيطة ترفع جودة فنجانك.",
      offers_title: "العروض",
      offers_page_lead: "أسعار أوضح قبل وبعد بالدرهم — اختر العرض وانتقل للتصفح.",
      cart_title: "سلة التسوق",
      cart_lead: "يمكنك تعديل الكميات كضيف. إتمام الطلب يحتاج حساباً.",
      cart_empty: "سلتك فاضية الحين.",
      browse_coffee: "تصفّح القهوة",
      product: "المنتج",
      price: "السعر",
      qty: "الكمية",
      total: "المجموع",
      remove: "حذف",
      grand_total: "الإجمالي",
      checkout: "إتمام الطلب",
      dec: "إنقاص",
      inc: "زيادة",
      login_title: "تسجيل الدخول",
      login_lead: "بعد الدخول نرجّعك لإكمال طلبك إن جئت من السلة.",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      login_btn: "دخول",
      no_account: "ما عندك حساب؟",
      create_account: "إنشاء حساب",
      signup_title: "إنشاء حساب",
      signup_lead: "حساب بسيط على جهازك فقط (تجريبي) — ثم نكمّل الطلب.",
      name: "الاسم",
      signup_btn: "إنشاء الحساب",
      have_account: "عندك حساب؟",
      login_link: "تسجيل الدخول",
      err_login: "البريد أو كلمة المرور غير صحيحة.",
      err_pass_short: "كلمة المرور قصيرة جداً (٤ أحرف على الأقل).",
      err_email_exists: "هذا البريد مسجّل مسبقاً. جرّب تسجيل الدخول.",
      logout_confirm: "تسجيل الخروج؟",
      order_thanks: "طلبك جاهز — شكراً لك يا ",
      guest: "ضيفنا",
      page_title_home: "الكيف — قهوة وشاي مختص",
      page_title_coffee: "قهوة — الكيف",
      page_title_tea: "شاي — الكيف",
      page_title_tools: "أدوات — الكيف",
      page_title_offers: "عروض — الكيف",
      page_title_cart: "السلة — الكيف",
      page_title_login: "تسجيل الدخول — الكيف",
      page_title_signup: "إنشاء حساب — الكيف",
    },
    en: {
      brand_tag: "Specialty coffee & tea",
      nav_home: "Home",
      nav_coffee: "Coffee",
      nav_tea: "Tea",
      nav_tools: "Tools",
      nav_offers: "Offers",
      nav_cart: "Cart",
      nav_account: "Account",
      nav_my_account: "My account",
      lang_btn: "العربية",
      hero_title: "Take your time. Al-Kayf is ready when you are.",
      hero_lead: "Coffee, tea, and brew gear — from the UAE, priced in Dirhams.",
      offers_today: "Today's offers",
      offers_lead: "Clear deals at the top — no pop-ups.",
      featured: "Store picks",
      about_title: "About Al-Kayf",
      about_p1: "Al-Kayf is an Arabic specialty coffee & tea shop with practical brew tools — serving the UAE and the region.",
      about_p2: "Browse freely and add to cart as a guest. We only ask you to sign in or create an account at checkout.",
      about_p3: "Welcome — no rush.",
      footer: "© 2026 Al-Kayf — Specialty coffee & tea · UAE",
      add_cart: "Add to cart",
      browse_offer: "Browse offer",
      currency: "AED",
      currency_long: "AED",
      toast_added: "Added to cart",
      filter_all: "All",
      coffee_title: "Coffee",
      coffee_lead: "Carefully roasted beans. Pick what suits your taste.",
      tea_title: "Tea",
      tea_lead: "Black, green, and herbal — for a calm cup.",
      tools_title: "Brew tools",
      tools_lead: "Simple gear that elevates your cup.",
      offers_title: "Offers",
      offers_page_lead: "Clear before/after prices in AED — pick an offer and browse.",
      cart_title: "Shopping cart",
      cart_lead: "Adjust quantities as a guest. Checkout needs an account.",
      cart_empty: "Your cart is empty right now.",
      browse_coffee: "Browse coffee",
      product: "Product",
      price: "Price",
      qty: "Qty",
      total: "Subtotal",
      remove: "Remove",
      grand_total: "Total",
      checkout: "Checkout",
      dec: "Decrease",
      inc: "Increase",
      login_title: "Sign in",
      login_lead: "After signing in we bring you back to finish your order if you came from the cart.",
      email: "Email",
      password: "Password",
      login_btn: "Sign in",
      no_account: "No account?",
      create_account: "Create account",
      signup_title: "Create account",
      signup_lead: "A simple account on this device only (demo) — then we finish the order.",
      name: "Name",
      signup_btn: "Create account",
      have_account: "Already have an account?",
      login_link: "Sign in",
      err_login: "Email or password is incorrect.",
      err_pass_short: "Password is too short (at least 4 characters).",
      err_email_exists: "This email is already registered. Try signing in.",
      logout_confirm: "Sign out?",
      order_thanks: "Your order is ready — thank you, ",
      guest: "friend",
      page_title_home: "Al-Kayf — Specialty coffee & tea",
      page_title_coffee: "Coffee — Al-Kayf",
      page_title_tea: "Tea — Al-Kayf",
      page_title_tools: "Tools — Al-Kayf",
      page_title_offers: "Offers — Al-Kayf",
      page_title_cart: "Cart — Al-Kayf",
      page_title_login: "Sign in — Al-Kayf",
      page_title_signup: "Create account — Al-Kayf",
    },
  };

  function getLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "ar") return saved;
    return "ar";
  }

  function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
  }

  function t(key) {
    const lang = getLang();
    return (I18N[lang] && I18N[lang][key]) || I18N.ar[key] || key;
  }

  function loc(obj) {
    if (!obj || typeof obj === "string") return obj;
    return obj[getLang()] || obj.ar || obj.en || "";
  }

  function formatPrice(n) {
    return n + " " + t("currency");
  }

  function applyDocumentLang() {
    const lang = getLang();
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("lang-en", lang === "en");
    document.body.classList.toggle("lang-ar", lang === "ar");
  }

  function applyStaticI18n() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && I18N.ar[key] !== undefined) {
        el.textContent = t(key);
      }
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (key) el.innerHTML = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key) el.placeholder = t(key);
    });
    const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    const titleMap = {
      "index.html": "page_title_home",
      "": "page_title_home",
      "coffee.html": "page_title_coffee",
      "tea.html": "page_title_tea",
      "tools.html": "page_title_tools",
      "offers.html": "page_title_offers",
      "cart.html": "page_title_cart",
      "login.html": "page_title_login",
      "signup.html": "page_title_signup",
    };
    if (titleMap[page]) document.title = t(titleMap[page]);

    const langBtn = document.querySelector("[data-lang-toggle]");
    if (langBtn) langBtn.textContent = t("lang_btn");
  }

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch {
      return null;
    }
  }

  function setSession(user) {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getProduct(id) {
    return PRODUCTS.find((p) => p.id === id);
  }

  function cartCount() {
    return getCart().reduce((n, i) => n + i.qty, 0);
  }

  function updateCartBadge() {
    const badge = document.querySelector("[data-cart-badge]");
    if (!badge) return;
    const n = cartCount();
    badge.textContent = n > 0 ? String(n) : "";
    badge.style.display = n > 0 ? "inline-flex" : "none";
  }

  function showToast(msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function addToCart(productId, qty) {
    qty = qty || 1;
    const product = getProduct(productId);
    if (!product) return;
    const cart = getCart();
    const existing = cart.find((i) => i.id === productId);
    if (existing) existing.qty += qty;
    else cart.push({ id: productId, qty });
    saveCart(cart);
    showToast(t("toast_added"));
  }

  function setQty(productId, qty) {
    let cart = getCart();
    if (qty <= 0) cart = cart.filter((i) => i.id !== productId);
    else {
      const item = cart.find((i) => i.id === productId);
      if (item) item.qty = qty;
    }
    saveCart(cart);
  }

  function removeFromCart(productId) {
    saveCart(getCart().filter((i) => i.id !== productId));
  }

  function cartTotal() {
    return getCart().reduce((sum, i) => {
      const p = getProduct(i.id);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
  }

  function markActiveNav() {
    const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".nav a[data-nav]").forEach((a) => {
      a.classList.remove("active");
      const key = a.getAttribute("data-nav");
      const map = {
        home: ["index.html", ""],
        coffee: ["coffee.html"],
        tea: ["tea.html"],
        tools: ["tools.html"],
        offers: ["offers.html"],
        cart: ["cart.html"],
        account: ["login.html", "signup.html"],
      };
      if ((map[key] || []).includes(page)) a.classList.add("active");
    });
  }

  function renderProductCard(p) {
    const name = loc(p.name);
    const desc = loc(p.desc);
    return `
      <article class="product-card" data-id="${p.id}" data-filter="${loc(p.filter)}">
        <div class="product-visual">
          <img src="${p.image}" alt="${name}" loading="lazy" width="800" height="600" decoding="async">
        </div>
        <div class="product-body">
          <span class="product-chip">${loc(p.filter)}</span>
          <h3>${name}</h3>
          <p class="product-meta">${desc}</p>
          <p class="product-price">${formatPrice(p.price)}</p>
          <div class="product-actions">
            <button type="button" class="btn btn-primary btn-sm" data-add="${p.id}">${t("add_cart")}</button>
          </div>
        </div>
      </article>`;
  }

  function renderProducts(container, filterCategory, filterValue) {
    if (!container) return;
    let list = PRODUCTS.filter((p) => p.category === filterCategory);
    const allLabel = t("filter_all");
    if (filterValue && filterValue !== allLabel && filterValue !== "الكل" && filterValue !== "All") {
      list = list.filter((p) => loc(p.filter) === filterValue);
    }
    container.innerHTML = list.map(renderProductCard).join("");
  }

  function renderFeatured(container) {
    if (!container) return;
    const featured = [PRODUCTS[0], PRODUCTS[4], PRODUCTS[8], PRODUCTS[1]];
    container.innerHTML = featured.map(renderProductCard).join("");
  }

  function renderOffers(container) {
    if (!container) return;
    container.innerHTML = OFFERS.map(
      (o) => `
      <article class="offer-card">
        <div class="offer-media">
          <img src="${o.image}" alt="${loc(o.title)}" loading="lazy" width="600" height="360" decoding="async">
        </div>
        <div class="offer-body">
          <h3>${loc(o.title)}</h3>
          <p class="text-muted">${loc(o.note)}</p>
          <div class="offer-prices">
            <span class="price-before">${formatPrice(o.before)}</span>
            <span class="price-after">${formatPrice(o.after)}</span>
          </div>
          <a class="btn btn-primary btn-sm" href="${o.href}">${t("browse_offer")}</a>
        </div>
      </article>`
    ).join("");
  }

  function renderHeroStrip() {
    const strip = document.querySelector("[data-hero-strip]");
    if (!strip) return;
    const imgs = [
      PRODUCTS[0].image,
      PRODUCTS[4].image,
      PRODUCTS[8].image,
      PRODUCTS[1].image,
      PRODUCTS[5].image,
      PRODUCTS[9].image,
    ];
    strip.innerHTML = imgs
      .map((src) => `<div class="hero-strip-item"><img src="${src}" alt="" loading="eager" decoding="async"></div>`)
      .join("");
  }

  function renderCart() {
    const wrap = document.querySelector("[data-cart-root]");
    if (!wrap) return;
    const cart = getCart();
    if (!cart.length) {
      wrap.innerHTML = `
        <div class="empty-cart">
          <p>${t("cart_empty")}</p>
          <a class="btn btn-primary" href="coffee.html">${t("browse_coffee")}</a>
        </div>`;
      return;
    }
    const rows = cart
      .map((i) => {
        const p = getProduct(i.id);
        if (!p) return "";
        return `
        <tr data-cart-id="${p.id}">
          <td>
            <div class="cart-item-cell">
              <img class="cart-thumb" src="${p.image}" alt="" width="72" height="72">
              <div>
                <strong>${loc(p.name)}</strong>
                <div class="product-meta">${loc(p.desc)}</div>
              </div>
            </div>
          </td>
          <td>${formatPrice(p.price)}</td>
          <td>
            <div class="qty-controls">
              <button type="button" data-qty-dec="${p.id}" aria-label="${t("dec")}">−</button>
              <span>${i.qty}</span>
              <button type="button" data-qty-inc="${p.id}" aria-label="${t("inc")}">+</button>
            </div>
          </td>
          <td>${formatPrice(p.price * i.qty)}</td>
          <td><button type="button" class="btn btn-ghost btn-sm" data-remove="${p.id}">${t("remove")}</button></td>
        </tr>`;
      })
      .join("");

    wrap.innerHTML = `
      <table class="cart-table">
        <thead>
          <tr>
            <th>${t("product")}</th>
            <th>${t("price")}</th>
            <th>${t("qty")}</th>
            <th>${t("total")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="cart-summary">
        <p class="cart-total">${t("grand_total")}: <strong>${formatPrice(cartTotal())}</strong></p>
        <button type="button" class="btn btn-primary" data-checkout>${t("checkout")}</button>
      </div>`;
  }

  function requireAuthForCheckout() {
    const session = getSession();
    if (session) {
      showToast(t("order_thanks") + (session.name || t("guest")));
      return;
    }
    const returnTo = "cart.html";
    location.href = "login.html?next=" + encodeURIComponent(returnTo);
  }

  function initFilters(category) {
    const bar = document.querySelector("[data-filters]");
    const grid = document.querySelector("[data-product-grid]");
    if (!bar || !grid) return;
    const allLabel = t("filter_all");
    const values = [
      allLabel,
      ...new Set(PRODUCTS.filter((p) => p.category === category).map((p) => loc(p.filter))),
    ];
    bar.innerHTML = values
      .map(
        (v, i) =>
          `<button type="button" class="filter-btn${i === 0 ? " active" : ""}" data-filter-value="${v}">${v}</button>`
      )
      .join("");
    renderProducts(grid, category, allLabel);
    bar.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter-value]");
      if (!btn) return;
      bar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(grid, category, btn.getAttribute("data-filter-value"));
    });
  }

  function getQueryParam(name) {
    return new URLSearchParams(location.search).get(name);
  }

  function initAuthForms() {
    const loginForm = document.querySelector("[data-login-form]");
    const signupForm = document.querySelector("[data-signup-form]");
    const next = getQueryParam("next") || "index.html";

    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = loginForm.email.value.trim();
        const password = loginForm.password.value;
        const err = loginForm.querySelector(".form-error") || document.querySelector(".form-error");
        const users = getUsers();
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) {
          if (err) {
            err.textContent = t("err_login");
            err.classList.add("show");
          }
          return;
        }
        setSession({ name: user.name, email: user.email });
        location.href = next;
      });
    }

    if (signupForm) {
      signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = signupForm.name.value.trim();
        const email = signupForm.email.value.trim();
        const password = signupForm.password.value;
        const err = signupForm.querySelector(".form-error") || document.querySelector(".form-error");
        if (password.length < 4) {
          if (err) {
            err.textContent = t("err_pass_short");
            err.classList.add("show");
          }
          return;
        }
        const users = getUsers();
        if (users.some((u) => u.email === email)) {
          if (err) {
            err.textContent = t("err_email_exists");
            err.classList.add("show");
          }
          return;
        }
        users.push({ name, email, password });
        saveUsers(users);
        setSession({ name, email });
        location.href = next;
      });
    }

    document.querySelectorAll("a[data-auth-link]").forEach((a) => {
      const base = a.getAttribute("href").split("?")[0];
      a.href = base + "?next=" + encodeURIComponent(next);
    });
  }

  function updateAccountLink() {
    const link = document.querySelector("[data-nav='account']");
    if (!link) return;
    const session = getSession();
    if (session) {
      link.textContent = session.name || t("nav_my_account");
      link.href = "#";
      link.onclick = (e) => {
        e.preventDefault();
        if (confirm(t("logout_confirm"))) {
          setSession(null);
          location.reload();
        }
      };
    } else {
      link.textContent = t("nav_account");
      link.href = "login.html";
      link.onclick = null;
    }
  }

  function initLangToggle() {
    document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = getLang() === "ar" ? "en" : "ar";
        setLang(next);
        location.reload();
      });
    });
  }

  function refreshDynamic() {
    renderOffers(document.querySelector("[data-offers]"));
    renderFeatured(document.querySelector("[data-featured]"));
    renderHeroStrip();
    const cat = document.body.getAttribute("data-category");
    if (cat) initFilters(cat);
    renderCart();
  }

  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) {
      addToCart(add.getAttribute("data-add"));
      return;
    }
    const inc = e.target.closest("[data-qty-inc]");
    if (inc) {
      const id = inc.getAttribute("data-qty-inc");
      const item = getCart().find((i) => i.id === id);
      if (item) setQty(id, item.qty + 1);
      renderCart();
      return;
    }
    const dec = e.target.closest("[data-qty-dec]");
    if (dec) {
      const id = dec.getAttribute("data-qty-dec");
      const item = getCart().find((i) => i.id === id);
      if (item) setQty(id, item.qty - 1);
      renderCart();
      return;
    }
    const rem = e.target.closest("[data-remove]");
    if (rem) {
      removeFromCart(rem.getAttribute("data-remove"));
      renderCart();
      return;
    }
    if (e.target.closest("[data-checkout]")) {
      requireAuthForCheckout();
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    applyDocumentLang();
    applyStaticI18n();
    initLangToggle();
    markActiveNav();
    updateCartBadge();
    updateAccountLink();
    refreshDynamic();
    initAuthForms();
  });

  window.AlKayf = { PRODUCTS, OFFERS, addToCart, getCart, getSession, getLang, t };
})();
