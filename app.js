/* الكيف — Al-Kayf shared app logic */
(function () {
  "use strict";

  const CART_KEY = "alkayf_cart";
  const SESSION_KEY = "alkayf_session";
  const USERS_KEY = "alkayf_users";

  const PRODUCTS = [
    {
      id: "c1",
      name: "إثيوبيا يرقاشف",
      category: "coffee",
      filter: "غسيل",
      desc: "نكهة زهرية خفيفة مع حموضة نظيفة. ٢٥٠ غ.",
      price: 68,
      image: "images/coffee-ethiopia.jpg",
    },
    {
      id: "c2",
      name: "يمني حراز",
      category: "coffee",
      filter: "طبيعي",
      desc: "قوام ثقيل ونوتات شوكولاتة وتوابل. ٢٥٠ غ.",
      price: 95,
      image: "images/coffee-yemen.jpg",
    },
    {
      id: "c3",
      name: "كولومبيا هويلا",
      category: "coffee",
      filter: "غسيل",
      desc: "متوازنة، كراميل وفواكه حمراء. ٢٥٠ غ.",
      price: 72,
      image: "images/coffee-colombia.jpg",
    },
    {
      id: "c4",
      name: "خليط البيت",
      category: "coffee",
      filter: "خليط",
      desc: "للتقطير اليومي — دافئ وسلس. ٢٥٠ غ.",
      price: 55,
      image: "images/coffee-blend.jpg",
    },
    {
      id: "t1",
      name: "إيرل غراي",
      category: "tea",
      filter: "أسود",
      desc: "شاي أسود ببرغموت ناعم. ١٠٠ غ.",
      price: 42,
      image: "images/tea-earl-grey.jpg",
    },
    {
      id: "t2",
      name: "أخضر ياباني",
      category: "tea",
      filter: "أخضر",
      desc: "طعم عشبي منعش، مناسب بعد الظهيرة. ٨٠ غ.",
      price: 48,
      image: "images/tea-green.jpg",
    },
    {
      id: "t3",
      name: "بابونج",
      category: "tea",
      filter: "عشبي",
      desc: "هدوء المساء في فنجان. ٥٠ غ.",
      price: 35,
      image: "images/tea-chamomile.jpg",
    },
    {
      id: "t4",
      name: "كركديه",
      category: "tea",
      filter: "عشبي",
      desc: "حامض منعش، بارد أو ساخن. ١٠٠ غ.",
      price: 38,
      image: "images/tea-hibiscus.jpg",
    },
    {
      id: "o1",
      name: "V60 سيراميك",
      category: "tools",
      filter: "تقطير",
      desc: "قمع تقطير كلاسيكي لقهوة نظيفة.",
      price: 85,
      image: "images/tool-v60.jpg",
    },
    {
      id: "o2",
      name: "مطحنة يدوية",
      category: "tools",
      filter: "طحن",
      desc: "طحن متناسق لحصص صغيرة.",
      price: 189,
      image: "images/tool-grinder.jpg",
    },
    {
      id: "o3",
      name: "غلاية عنق الإوزة",
      category: "tools",
      filter: "تقطير",
      desc: "تحكم دقيق بصب الماء.",
      price: 165,
      image: "images/tool-kettle.jpg",
    },
    {
      id: "o4",
      name: "فرنش برس",
      category: "tools",
      filter: "نقع",
      desc: "قوام غني بخطوات بسيطة. ٦٠٠ مل.",
      price: 79,
      image: "images/tool-french-press.jpg",
    },
  ];

  const OFFERS = [
    {
      id: "off1",
      title: "عرض بداية الأسبوع",
      before: 140,
      after: 110,
      href: "coffee.html",
      note: "إثيوبيا + كولومبيا معاً",
    },
    {
      id: "off2",
      title: "طقم التقطير",
      before: 250,
      after: 199,
      href: "tools.html",
      note: "V60 + غلاية عنق الإوزة",
    },
    {
      id: "off3",
      title: "مساء هادئ",
      before: 73,
      after: 58,
      href: "tea.html",
      note: "بابونج + كركديه",
    },
  ];

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
    showToast("تمت الإضافة إلى السلة");
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
    return `
      <article class="product-card" data-id="${p.id}" data-filter="${p.filter}">
        <div class="product-visual">
          <img src="${p.image}" alt="${p.name}" loading="lazy" width="600" height="400">
        </div>
        <div class="product-body">
          <h3>${p.name}</h3>
          <p class="product-meta">${p.desc}</p>
          <p class="product-price">${p.price} <span class="price-unit">ر.س</span></p>
          <div class="product-actions">
            <button type="button" class="btn btn-primary btn-sm" data-add="${p.id}">أضف للسلة</button>
          </div>
        </div>
      </article>`;
  }

  function renderProducts(container, filterCategory, filterValue) {
    if (!container) return;
    let list = PRODUCTS.filter((p) => p.category === filterCategory);
    if (filterValue && filterValue !== "الكل") {
      list = list.filter((p) => p.filter === filterValue);
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
        <h3>${o.title}</h3>
        <p class="text-muted">${o.note}</p>
        <div class="offer-prices">
          <span class="price-before">${o.before} ر.س</span>
          <span class="price-after">${o.after} <span class="price-unit">ر.س</span></span>
        </div>
        <a class="btn btn-primary btn-sm" href="${o.href}">تصفّح العرض</a>
      </article>`
    ).join("");
  }

  function renderCart() {
    const wrap = document.querySelector("[data-cart-root]");
    if (!wrap) return;
    const cart = getCart();
    if (!cart.length) {
      wrap.innerHTML = `
        <div class="empty-cart">
          <p>سلتك فاضية الحين.</p>
          <a class="btn btn-primary" href="coffee.html">تصفّح القهوة</a>
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
            <strong>${p.name}</strong>
            <div class="product-meta">${p.desc}</div>
          </td>
          <td>${p.price} ر.س</td>
          <td>
            <div class="qty-controls">
              <button type="button" data-qty-dec="${p.id}" aria-label="إنقاص">−</button>
              <span>${i.qty}</span>
              <button type="button" data-qty-inc="${p.id}" aria-label="زيادة">+</button>
            </div>
          </td>
          <td>${p.price * i.qty} ر.س</td>
          <td><button type="button" class="btn btn-ghost btn-sm" data-remove="${p.id}">حذف</button></td>
        </tr>`;
      })
      .join("");

    wrap.innerHTML = `
      <table class="cart-table">
        <thead>
          <tr>
            <th>المنتج</th>
            <th>السعر</th>
            <th>الكمية</th>
            <th>المجموع</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="cart-summary">
        <p class="cart-total">الإجمالي: <strong>${cartTotal()} ر.س</strong></p>
        <button type="button" class="btn btn-primary" data-checkout>إتمام الطلب</button>
      </div>`;
  }

  function requireAuthForCheckout() {
    const session = getSession();
    if (session) {
      showToast("طلبك جاهز — شكراً لك يا " + (session.name || "ضيفنا"));
      return;
    }
    const returnTo = "cart.html";
    location.href = "login.html?next=" + encodeURIComponent(returnTo);
  }

  function initFilters(category) {
    const bar = document.querySelector("[data-filters]");
    const grid = document.querySelector("[data-product-grid]");
    if (!bar || !grid) return;
    const values = ["الكل", ...new Set(PRODUCTS.filter((p) => p.category === category).map((p) => p.filter))];
    bar.innerHTML = values
      .map(
        (v, i) =>
          `<button type="button" class="filter-btn${i === 0 ? " active" : ""}" data-filter-value="${v}">${v}</button>`
      )
      .join("");
    renderProducts(grid, category, "الكل");
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
        const err = loginForm.querySelector(".form-error");
        const users = getUsers();
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) {
          err.textContent = "البريد أو كلمة المرور غير صحيحة.";
          err.classList.add("show");
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
        const err = signupForm.querySelector(".form-error");
        if (password.length < 4) {
          err.textContent = "كلمة المرور قصيرة جداً (٤ أحرف على الأقل).";
          err.classList.add("show");
          return;
        }
        const users = getUsers();
        if (users.some((u) => u.email === email)) {
          err.textContent = "هذا البريد مسجّل مسبقاً. جرّب تسجيل الدخول.";
          err.classList.add("show");
          return;
        }
        users.push({ name, email, password });
        saveUsers(users);
        setSession({ name, email });
        location.href = next;
      });
    }

    // link next param across login/signup
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
      link.textContent = session.name || "حسابي";
      link.href = "#";
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("تسجيل الخروج؟")) {
          setSession(null);
          location.reload();
        }
      });
    }
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
    markActiveNav();
    updateCartBadge();
    updateAccountLink();
    renderOffers(document.querySelector("[data-offers]"));
    renderFeatured(document.querySelector("[data-featured]"));
    const cat = document.body.getAttribute("data-category");
    if (cat) initFilters(cat);
    renderCart();
    initAuthForms();
  });

  window.AlKayf = { PRODUCTS, OFFERS, addToCart, getCart, getSession };
})();
