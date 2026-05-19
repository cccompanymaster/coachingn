/* CoachingN Academy — common interactions */

// ===== Reveal on scroll =====
(function () {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();

// ===== Count-up numbers =====
(function () {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const end = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const isFloat = !Number.isInteger(end);
      const dur = 1200, start = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = end * eased;
        el.textContent = (isFloat ? val.toFixed(1) : Math.floor(val).toLocaleString()) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = (isFloat ? end.toFixed(1) : end.toLocaleString()) + suffix;
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count]').forEach((el) => obs.observe(el));
})();

// ===== Mobile menu =====
(function () {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
})();

// ===== Hero typing motion =====
(function () {
  const target = document.getElementById('typed');
  if (!target) return;
  const caret = document.getElementById('caret');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    target.textContent = 'Best Hopes';
    return;
  }
  const phrases = ['Best Hopes', 'Preferred Future', 'What Works', 'Small Next Action', 'Progress Evidence'];
  let pi = 0, ci = 0, deleting = false;
  function step() {
    const phrase = phrases[pi];
    if (!deleting) {
      ci++;
      target.textContent = phrase.slice(0, ci);
      if (ci === phrase.length) { deleting = true; return setTimeout(step, 1500); }
      return setTimeout(step, 70 + Math.random() * 50);
    } else {
      ci--;
      target.textContent = phrase.slice(0, ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; return setTimeout(step, 300); }
      return setTimeout(step, 35);
    }
  }
  setTimeout(step, 600);
})();

// ===== Hero rotating slogan (key copy) =====
(function () {
  const root = document.getElementById('rotator');
  if (!root) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const slogans = (root.dataset.slogans || '').split('|').map((s) => s.trim()).filter(Boolean);
  if (slogans.length < 2) return;
  let i = 0;
  function swap() {
    i = (i + 1) % slogans.length;
    const old = root.querySelector('span');
    const next = document.createElement('span');
    next.textContent = slogans[i];
    next.style.opacity = '0';
    next.style.transform = 'translateY(8px)';
    root.appendChild(next);
    requestAnimationFrame(() => {
      next.style.transition = 'opacity .5s, transform .5s';
      next.style.opacity = '1';
      next.style.transform = 'none';
      if (old) {
        old.style.transition = 'opacity .5s, transform .5s';
        old.style.opacity = '0';
        old.style.transform = 'translateY(-8px)';
        setTimeout(() => old.remove(), 600);
      }
    });
  }
  setInterval(swap, 4000);
})();

// ===== Contact form (no backend, friendly placeholder) =====
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('form-msg');
    if (!form.checkValidity()) {
      msg.textContent = '필수 항목을 확인해 주세요.';
      msg.className = 'text-sm text-brand-2';
      return;
    }
    msg.textContent = '문의가 접수되었습니다. 영업일 기준 24시간 내 회신드리겠습니다.';
    msg.className = 'text-sm text-brand-2';
    form.reset();
  });
})();

// ===== Newsletter footer form =====
(function () {
  document.querySelectorAll('form.newsletter').forEach((f) => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const out = f.nextElementSibling;
      f.querySelector('input').value = '';
      if (out) out.textContent = '구독 신청이 접수되었습니다.';
    });
  });
})();
