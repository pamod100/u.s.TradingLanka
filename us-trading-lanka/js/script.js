/* U.S. Trading Lanka — UI demo interactions (front-end only, no backend) */

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
      setCount(getCount() + 1);
      showToast('Added to cart');
      btn.style.transform = 'scale(1.2)';
      setTimeout(() => btn.style.transform = '', 180);
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

});
