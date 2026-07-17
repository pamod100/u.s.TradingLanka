/* U.S. Trading Lanka — UI demo interactions (front-end only, no backend) */

/* =========================================================
   GLOBAL PRODUCT DATA
   Must stay OUTSIDE any function/event listener so that
   product-detail.html (which reads PRODUCTS immediately,
   not on DOMContentLoaded) can access it as soon as this
   script tag has loaded.
   Order matches the product cards on index.html / products.html
   ========================================================= */

const PRODUCT_ICONS = {
  helmet:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M4 14c0-5 3.6-9 8-9s8 4 8 9v2a2 2 0 01-2 2h-1v-3a1 1 0 00-1-1H8a1 1 0 00-1 1v3H6a2 2 0 01-2-2v-2z"/><path stroke-linecap="round" d="M4.5 13.5h15"/></svg>',
  headlight:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M5 8a7 7 0 0114 0c0 3-2 4.5-2 7v1a1 1 0 01-1 1H8a1 1 0 01-1-1v-1c0-2.5-2-4-2-7z"/><path stroke-linecap="round" d="M9.5 20h5M10.5 22h3"/></svg>',
  tyre:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.2"/><path stroke-linecap="round" d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M18 6l-1.4 1.4M7.4 16.6L6 18M18 18l-1.4-1.4M7.4 7.4L6 6"/></svg>',
  mirror:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4-3 8-6 8-11a8 8 0 10-16 0c0 5 4 8 8 11z"/><path stroke-linecap="round" d="M12 21v2M4.5 8.5L2 7M19.5 8.5L22 7"/></svg>',
  oil:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="6" y="7" width="11" height="13" rx="1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M17 10l3-1.2M20 8.8V7.2"/><path stroke-linecap="round" d="M9 12h5M9 15h5"/></svg>',
  chain:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="9" width="5" height="6" rx="2.2"/><rect x="8.5" y="6.5" width="5" height="6" rx="2.2"/><rect x="14" y="9" width="5" height="6" rx="2.2"/></svg>',
  exhaust:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9l7-2 2 2-6 2.3L3 13"/><rect x="9" y="10.5" width="12" height="6" rx="2.5"/><path stroke-linecap="round" d="M21 12v3"/></svg>',
  brake:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.4"/><path stroke-linecap="round" d="M12 4v3M12 17v3M20 12h-3M7 12H4M17.3 6.7l-2 2M8.7 15.3l-2 2M17.3 17.3l-2-2M8.7 8.7l-2-2"/></svg>',
  gloves:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 10V5a1.3 1.3 0 012.6 0v3.5M8.6 8V4.3a1.3 1.3 0 012.6 0V8M11.2 8V4.8a1.3 1.3 0 012.6 0V8.5M13.8 8.5l.2-2.3a1.3 1.3 0 012.6.2V13c0 4-2.6 7-6.6 7-3 0-5.4-1.6-6.4-4.2L3 12.5c-.4-1 .1-2 1.1-2.3.9-.3 1.8.2 2.1 1.1"/></svg>',
  jacket:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3l3 2 3-2 4 3-2 4-2-1v10a1 1 0 01-1 1H9a1 1 0 01-1-1V9l-2 1L4 6l5-3z"/><path stroke-linecap="round" d="M12 9v10"/></svg>',
  battery:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="7" width="16" height="10" rx="1.5"/><path stroke-linecap="round" d="M19 10v4M9 9v6M13 9v6"/></svg>',
  filter:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4h16l-6 8v6l-4 2v-8L4 4z"/></svg>'
};

const PRODUCTS = [
  { id:1,  name:"Voss Full-Face Helmet", category:"Helmets", price:12500, oldPrice:14900, badge:"sale", sku:"SM-100234", stock:6,
    desc:"A full-face helmet built for everyday riding and long commutes. Reinforced shell construction with a quick-release visor and breathable interior padding for all-day comfort.",
    icon:"helmet" },
  { id:2,  name:"LED Headlight Assembly", category:"Lighting", price:6800, oldPrice:null, badge:"new", sku:"SM-100547", stock:11,
    desc:"Bright, low-power LED headlight assembly designed as a direct replacement for most popular commuter models. Improves night visibility while reducing battery load.",
    icon:"headlight" },
  { id:3,  name:"Michelin Sport Tyre 120/70", category:"Tyres", price:18200, oldPrice:null, badge:null, sku:"SM-100812", stock:4,
    desc:"Genuine Michelin sport tyre offering strong grip in both wet and dry conditions, with a tread pattern optimised for spirited street riding.",
    icon:"tyre" },
  { id:4,  name:"CNC Side Mirror Pair", category:"Accessories", price:3450, oldPrice:4200, badge:"sale", sku:"SM-101120", stock:9,
    desc:"Precision CNC-machined aluminium side mirrors with a wide field of view and a durable anodised finish that resists corrosion.",
    icon:"mirror" },
  { id:5,  name:"Kayoline Fully Synthetic Oil 1L", category:"Lubricants", price:2150, oldPrice:null, badge:null, sku:"SM-101305", stock:24,
    desc:"Fully synthetic engine oil formulated for high-temperature protection and smoother gear shifting across all riding conditions.",
    icon:"oil" },
  { id:6,  name:"Heavy Duty Chain & Sprocket Kit", category:"Drivetrain", price:9900, oldPrice:null, badge:"new", sku:"SM-101488", stock:7,
    desc:"Complete chain and sprocket replacement kit built for durability under heavy load, ideal for daily commuting and long-distance touring.",
    icon:"chain" },
  { id:7,  name:"Performance Slip-On Exhaust", category:"Modification", price:24500, oldPrice:28000, badge:"sale", sku:"SM-101733", stock:3,
    desc:"Free-flowing slip-on exhaust that delivers a deeper tone and improved mid-range power, finished in a heat-resistant matte coating.",
    icon:"exhaust" },
  { id:8,  name:"Ceramic Brake Pad Set", category:"Brakes", price:3100, oldPrice:null, badge:null, sku:"SM-101922", stock:14,
    desc:"Low-dust ceramic brake pads engineered for consistent stopping power and reduced brake fade in city traffic.",
    icon:"brake" },
  { id:9,  name:"Racing Gloves - Carbon Knuckle", category:"Accessories", price:4600, oldPrice:null, badge:null, sku:"SM-102150", stock:16,
    desc:"Reinforced riding gloves with a carbon-fibre knuckle guard and pre-curved fingers for a natural grip on the bars.",
    icon:"gloves" },
  { id:10, name:"Riding Jacket - All Weather", category:"Accessories", price:15900, oldPrice:18500, badge:"sale", sku:"SM-102341", stock:5,
    desc:"All-weather riding jacket with a removable thermal liner and CE-rated armour at the shoulders and elbows.",
    icon:"jacket" },
  { id:11, name:"Maintenance-Free Battery 12V", category:"Electrical", price:7200, oldPrice:null, badge:"new", sku:"SM-102567", stock:10,
    desc:"Sealed, maintenance-free 12V battery that arrives factory-charged and ready to install, with reliable cold-start performance.",
    icon:"battery" },
  { id:12, name:"Performance Air Filter", category:"Filters", price:2850, oldPrice:null, badge:null, sku:"SM-102790", stock:19,
    desc:"High-flow performance air filter that improves throttle response while maintaining excellent filtration for engine longevity.",
    icon:"filter" }
];

/* =========================================================
   PAGE INTERACTIONS
   Everything below waits for the DOM to be ready.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile drawer ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  if (menuToggle && drawer) {
    const closeBtn = drawer.querySelector('.close-drawer');
    const backdrop = drawer.querySelector('.backdrop');
    const open = () => drawer.classList.add('open');
    const close = () => drawer.classList.remove('open');
    menuToggle.addEventListener('click', open);
    closeBtn && closeBtn.addEventListener('click', close);
    backdrop && backdrop.addEventListener('click', close);
  }

  /* ---------- Hero slider dots (visual only) ---------- */
  const dots = document.querySelectorAll('.hero-dots span');
  if (dots.length) {
    let i = 0;
    setInterval(() => {
      dots[i].classList.remove('active');
      i = (i + 1) % dots.length;
      dots[i].classList.add('active');
    }, 3500);
  }

  /* ---------- Cart count (persisted via localStorage, demo only) ---------- */
  const CART_KEY = 'ustl_demo_cart_count';
  const getCount = () => parseInt(localStorage.getItem(CART_KEY) || '3', 10);
  const setCount = (n) => {
    localStorage.setItem(CART_KEY, n);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = n);
  };
  setCount(getCount());

  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setCount(getCount() + 1);
      showToast('Added to cart');
      btn.style.transform = 'scale(1.2)';
      setTimeout(() => btn.style.transform = '', 180);
    });
  });

  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  /* ---------- Toast ---------- */
  function showToast(msg) {
    let toast = document.querySelector('.ustl-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'ustl-toast';
      toast.style.cssText = `
        position:fixed; left:50%; bottom:34px; transform:translateX(-50%) translateY(20px);
        background:#0B0C0F; color:#F1CB5C; font-family:'Rajdhani',sans-serif; font-weight:700;
        letter-spacing:.4px; padding:13px 24px; border-radius:999px; z-index:1000;
        box-shadow:0 14px 30px -10px rgba(0,0,0,.45); opacity:0; transition:opacity .25s, transform .25s;
        border:1px solid rgba(212,166,43,.4); font-size:13.5px;`;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    clearTimeout(window._ustlToastTimer);
    window._ustlToastTimer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 1800);
  }

  /* ---------- Cart page quantity steppers + totals ---------- */
  const cartRows = document.querySelectorAll('.cart-table tbody tr');
  if (cartRows.length) {
    const deliveryFee = 950;
    const recalc = () => {
      let subtotal = 0;
      cartRows.forEach(row => {
        if (row.style.display === 'none') return;
        const price = parseFloat(row.dataset.price);
        const qtyEl = row.querySelector('.qty-val');
        const qty = parseInt(qtyEl.textContent, 10);
        const lineTotal = price * qty;
        row.querySelector('.line-total').textContent = 'Rs. ' + lineTotal.toLocaleString();
        subtotal += lineTotal;
      });
      const subEl = document.querySelector('#cart-subtotal');
      const totEl = document.querySelector('#cart-total');
      const delEl = document.querySelector('#cart-delivery');
      if (subEl) subEl.textContent = 'Rs. ' + subtotal.toLocaleString();
      if (delEl) delEl.textContent = subtotal > 0 ? 'Rs. ' + deliveryFee.toLocaleString() : 'Rs. 0';
      if (totEl) totEl.textContent = 'Rs. ' + (subtotal + (subtotal > 0 ? deliveryFee : 0)).toLocaleString();

      const visibleRows = [...cartRows].filter(r => r.style.display !== 'none');
      const emptyEl = document.querySelector('.cart-empty-msg');
      const cartLayout = document.querySelector('.cart-layout');
      if (emptyEl && cartLayout) {
        emptyEl.style.display = visibleRows.length ? 'none' : 'block';
        cartLayout.style.display = visibleRows.length ? 'grid' : 'none';
      }
    };

    document.querySelectorAll('.qty-stepper').forEach(stepper => {
      const valEl = stepper.querySelector('.qty-val');
      stepper.querySelector('.qty-minus').addEventListener('click', () => {
        let v = parseInt(valEl.textContent, 10);
        if (v > 1) { valEl.textContent = v - 1; recalc(); }
      });
      stepper.querySelector('.qty-plus').addEventListener('click', () => {
        let v = parseInt(valEl.textContent, 10);
        valEl.textContent = v + 1; recalc();
      });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const row = btn.closest('tr');
        row.style.display = 'none';
        setCount(Math.max(getCount() - 1, 0));
        recalc();
      });
    });

    recalc();
  }

  /* ---------- Checkout: file upload label + fake submit ---------- */
  const slipInput = document.querySelector('#slip-upload');
  if (slipInput) {
    slipInput.addEventListener('change', () => {
      const label = document.querySelector('.upload-slip .file-name');
      if (label) label.textContent = slipInput.files[0] ? slipInput.files[0].name : 'No file chosen';
    });
  }

  const checkoutForm = document.querySelector('#checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const box = document.querySelector('.checkout-success');
      if (box) {
        box.style.display = 'flex';
        box.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* ---------- Contact form fake submit ---------- */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent — we will reply soon');
      contactForm.reset();
    });
  }

  /* ---------- Mobile filter toggle (products page) ---------- */
  const filterToggle = document.querySelector('.filter-toggle');
  const filterSidebar = document.querySelector('.filter-sidebar');
  if (filterToggle && filterSidebar) {
    filterToggle.addEventListener('click', () => filterSidebar.classList.add('open'));
    filterSidebar.addEventListener('click', (e) => {
      if (e.target === filterSidebar) filterSidebar.classList.remove('open');
    });
    const closeFilter = document.querySelector('.close-filter');
    closeFilter && closeFilter.addEventListener('click', () => filterSidebar.classList.remove('open'));
    const applyBtn = document.querySelector('.apply-filters-btn');
    applyBtn && applyBtn.addEventListener('click', () => filterSidebar.classList.remove('open'));
  }

  /* ---------- Newsletter / generic forms prevent default ---------- */
  document.querySelectorAll('form[data-demo]').forEach(f => {
    f.addEventListener('submit', (e) => { e.preventDefault(); showToast('Done'); });
  });

  /* ---------- Product card navigation ---------- */
  document.querySelectorAll('.product-grid .product-card').forEach((card, index) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('.wishlist-btn') || e.target.closest('.add-cart-btn')) {
        return;
      }
      window.location.href = 'product-detail.html?id=' + (index + 1);
    });
  });

});