/* ════════════════════════════════════════════════
   main.js — Kuladeep Roy Ganugapenta Portfolio
   ════════════════════════════════════════════════ */

// ── Section tracker (scrollspy) ───────────────────────────
(function () {
  const items = Array.from(document.querySelectorAll('.track-item'));
  if (!items.length) return;
  const targets = items.map((a) => document.getElementById(a.dataset.target)).filter(Boolean);
  const setActive = (id) => items.forEach((a) => a.classList.toggle('is-active', a.dataset.target === id));
  const io = new IntersectionObserver((entries) => {
    let best = null, bestTop = Infinity;
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const t = e.target.getBoundingClientRect().top;
      if (t >= -80 && t < bestTop) { bestTop = t; best = e.target.id; }
    });
    if (best) setActive(best);
  }, { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.2, 0.5, 1] });
  targets.forEach((t) => io.observe(t));
  setActive('about');
})();

// ── Reveal on scroll ──────────────────────────────────────
(function () {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { rootMargin: '-6% 0px -6% 0px', threshold: 0.05 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();

// ── Toggle .is-scrolled on body ───────────────────────────
(function () {
  const onScroll = () => {
    document.body.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── Cursor glow trail ─────────────────────────────────────
(function () {
  const el = document.getElementById('cursorGlow');
  if (!el || window.matchMedia('(hover: none)').matches) return;
  let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty;
  addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; });
  const tick = () => {
    cx += (tx - cx) * 0.16;
    cy += (ty - cy) * 0.16;
    el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };
  tick();
})();

// ── Self-drawing experience timeline ─────────────────────
(function () {
  const tl   = document.getElementById('timeline');
  const fill = document.getElementById('timelineFill');
  if (!tl || !fill) return;
  const items = Array.from(tl.querySelectorAll('.timeline-item'));
  let raf = 0;

  const lightNodes = () => {
    items.forEach((it) => {
      if (it.classList.contains('lit')) return;
      const r = it.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.65) it.classList.add('lit');
    });
  };

  const update = () => {
    const r = tl.getBoundingClientRect();
    const total = r.height;
    const seen = Math.max(0, Math.min(total, (window.innerHeight * 0.5) - r.top));
    const pct = total === 0 ? 0 : Math.max(0, Math.min(1, seen / total));
    fill.style.height = (pct * 100) + '%';
    lightNodes();
    raf = 0;
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();

// ── Project card touch-flip (mobile) ─────────────────────
(function () {
  if (!window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.flip').forEach((c) => {
    c.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      c.classList.toggle('is-flipped');
    });
  });
})();

/*
  CHANGE 6 — Live telemetry strip (the animated canvas panels
  at the bottom of the Contact section) has been removed.
  The three canvas IDs (cvLoss, cvScatter, cvBars) and their
  corresponding JS animation loop have been deleted from both
  index.html and this file.
*/
