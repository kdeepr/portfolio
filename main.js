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

// ── Animated skill bars ───────────────────────────────────
(function () {
  document.querySelectorAll('.sk-fill').forEach((f) => {
    const pct = Math.max(0, Math.min(100, +f.dataset.pct || 0));
    f.style.width = pct + '%';
  });
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

// ── Data-science telemetry strip ─────────────────────────
(function () {
  const lossCv = document.getElementById('cvLoss');
  const scCv   = document.getElementById('cvScatter');
  const barsCv = document.getElementById('cvBars');
  if (!lossCv || !scCv || !barsCv) return;
  const lossEl = document.getElementById('metricLoss');
  const r2El   = document.getElementById('metricR2');
  const featEl = document.getElementById('metricFeat');

  const ACCENT = '#38bdf8';
  const DIM    = 'rgba(244,244,245,0.06)';
  const FAINT  = 'rgba(56,189,248,0.10)';

  function fit(cv) {
    const dpr = window.devicePixelRatio || 1;
    const r = cv.getBoundingClientRect();
    cv.width  = Math.round(r.width  * dpr);
    cv.height = Math.round(r.height * dpr);
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w: r.width, h: r.height };
  }

  // PANEL 1 · streaming loss curve
  const lossState = { ctx: null, w: 0, h: 0, hist: [], t: 0 };
  function initLoss() {
    const f = fit(lossCv); lossState.ctx = f.ctx; lossState.w = f.w; lossState.h = f.h;
    lossState.hist = new Array(80).fill(0).map((_, i) => 0.9 - i * 0.005);
  }
  function drawLoss() {
    const { ctx, w, h, hist } = lossState;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = DIM; ctx.lineWidth = 1;
    for (let i = 1; i < 3; i++) {
      const y = (i / 3) * h;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(56,189,248,0.22)');
    grad.addColorStop(1, 'rgba(56,189,248,0)');
    ctx.beginPath();
    hist.forEach((v, i) => {
      const x = (i / (hist.length - 1)) * w;
      const y = h - v * h * 0.92 - 4;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
    ctx.fillStyle = grad; ctx.fill();
    ctx.beginPath();
    hist.forEach((v, i) => {
      const x = (i / (hist.length - 1)) * w;
      const y = h - v * h * 0.92 - 4;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = ACCENT; ctx.lineWidth = 1.4; ctx.lineJoin = 'round'; ctx.stroke();
    const lv = hist[hist.length - 1];
    const hx = w - 1, hy = h - lv * h * 0.92 - 4;
    ctx.beginPath(); ctx.arc(hx, hy, 2.6, 0, Math.PI * 2);
    ctx.fillStyle = ACCENT; ctx.fill();
  }
  function tickLoss() {
    const prev = lossState.hist[lossState.hist.length - 1];
    lossState.t += 1;
    let next = prev * 0.985;
    if (Math.random() < 0.06) next += Math.random() * 0.08;
    if (lossState.t % 110 === 0) next = 0.85 + Math.random() * 0.1;
    next = Math.max(0.01, Math.min(0.95, next + (Math.random() - 0.5) * 0.012));
    lossState.hist.shift(); lossState.hist.push(next);
    if (lossEl) lossEl.textContent = next.toFixed(4);
    drawLoss();
  }

  // PANEL 2 · scatter + regression line
  const scState = { ctx: null, w: 0, h: 0, pts: [] };
  function initSc() { const f = fit(scCv); scState.ctx = f.ctx; scState.w = f.w; scState.h = f.h; scState.pts = []; }
  function drawSc() {
    const { ctx, w, h, pts } = scState;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = DIM; ctx.lineWidth = 1;
    for (let i = 1; i < 3; i++) {
      const y = (i / 3) * h; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    ctx.fillStyle = ACCENT;
    for (const p of pts) {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath(); ctx.arc(p.x * w, p.y * h, 2.4, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (pts.length >= 2) {
      const n = pts.length;
      const mx = pts.reduce((s, p) => s + p.x, 0) / n;
      const my = pts.reduce((s, p) => s + p.y, 0) / n;
      let num = 0, den = 0;
      for (const p of pts) { num += (p.x - mx) * (p.y - my); den += (p.x - mx) ** 2; }
      const m = den === 0 ? 0 : num / den;
      const b = my - m * mx;
      const ssRes = pts.reduce((s, p) => s + (p.y - (m * p.x + b)) ** 2, 0);
      const ssTot = pts.reduce((s, p) => s + (p.y - my) ** 2, 0);
      const r2 = ssTot === 0 ? 0 : Math.max(0, Math.min(1, 1 - ssRes / ssTot));
      ctx.beginPath();
      ctx.moveTo(0, (m * 0 + b) * h);
      ctx.lineTo(w, (m * 1 + b) * h);
      ctx.strokeStyle = ACCENT;
      ctx.globalAlpha = 0.4 + r2 * 0.5;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      if (r2El) r2El.textContent = r2.toFixed(3);
    }
  }
  function tickSc() {
    if (scState.pts.length >= 32) scState.pts = [];
    const x = 0.05 + Math.random() * 0.9;
    const y = 0.85 - x * 0.65 + (Math.random() - 0.5) * 0.18;
    scState.pts.push({ x, y: Math.max(0.05, Math.min(0.95, y)), alpha: 0 });
    for (let i = 0; i < scState.pts.length; i++) {
      scState.pts[i].alpha = Math.min(0.92, scState.pts[i].alpha + 0.12);
    }
    drawSc();
  }

  // PANEL 3 · animated feature-importance bars
  const barsState = { ctx: null, w: 0, h: 0, vals: null, targets: null, labels: null };
  function initBars() {
    const f = fit(barsCv); barsState.ctx = f.ctx; barsState.w = f.w; barsState.h = f.h;
    barsState.labels = ['f0','f1','f2','f3','f4','f5'];
    barsState.vals    = barsState.labels.map(() => 0.1 + Math.random() * 0.8);
    barsState.targets = barsState.labels.map(() => 0.1 + Math.random() * 0.8);
  }
  function drawBars() {
    const { ctx, w, h, vals, labels } = barsState;
    ctx.clearRect(0, 0, w, h);
    const n = vals.length;
    const gap = 6;
    const bw = (w - gap * (n - 1)) / n;
    for (let i = 0; i < n; i++) {
      const x = i * (bw + gap);
      const bh = vals[i] * (h - 14);
      ctx.fillStyle = FAINT;
      ctx.fillRect(x, 14, bw, h - 14);
      ctx.fillStyle = ACCENT;
      ctx.globalAlpha = 0.55 + vals[i] * 0.45;
      ctx.fillRect(x, h - bh, bw, bh);
      ctx.globalAlpha = 1;
      ctx.fillStyle = ACCENT;
      ctx.fillRect(x, h - bh, bw, 2);
      ctx.fillStyle = 'rgba(244,244,245,0.55)';
      ctx.font = '10px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], x + bw / 2, 10);
    }
  }
  function tickBars() {
    const { vals, targets } = barsState;
    for (let i = 0; i < vals.length; i++) {
      vals[i] += (targets[i] - vals[i]) * 0.08;
    }
    if (Math.random() < 0.04) {
      const i = Math.floor(Math.random() * vals.length);
      targets[i] = 0.1 + Math.random() * 0.85;
    }
    let bi = 0; for (let i = 1; i < vals.length; i++) if (vals[i] > vals[bi]) bi = i;
    if (featEl) featEl.textContent = barsState.labels[bi] + ' ' + vals[bi].toFixed(2);
    drawBars();
  }

  function boot() { initLoss(); initSc(); initBars(); drawLoss(); drawSc(); drawBars(); }
  boot();
  window.addEventListener('resize', boot);

  let lastSc = 0, lastLoss = 0;
  function frame(t) {
    if (t - lastLoss > 110) { tickLoss(); lastLoss = t; }
    if (t - lastSc   > 320) { tickSc();   lastSc   = t; }
    tickBars();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
