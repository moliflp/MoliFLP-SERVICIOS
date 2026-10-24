/* Efectos de agua + gestor de rendimiento.
   · Ondas entre secciones (se animan solo cuando se ven).
   · Ondulación al tocar.
   · Modo «lite» automático en móviles flojos o con ahorro de datos.
   · Pausa de animaciones ambientales mientras se hace scroll. */
(() => {
  const root = document.documentElement;

  /* 1 · Modo lite: poca CPU/RAM, ahorro de datos o movimiento reducido */
  const nav = navigator;
  const flojo = (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) || (nav.deviceMemory && nav.deviceMemory <= 3) ||
    (nav.connection && (nav.connection.saveData || /(^|-)2g$/.test(nav.connection.effectiveType || "")));
  if (flojo) root.classList.add("lite");

  /* 2 · Ondas de agua entre secciones */
  const onda = (d) => `<svg viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true"><path d="${d}"/></svg>`;
  const D1 = "M0 32 Q150 0 300 32 T600 32 T900 32 T1200 32 V60 H0Z";
  const D2 = "M0 24 Q150 56 300 24 T600 24 T900 24 T1200 24 V60 H0Z";
  const ondas = [];
  document.querySelectorAll("main > .section:not(:first-child)").forEach((s) => {
    const w = document.createElement("div");
    w.className = "wave"; w.setAttribute("aria-hidden", "true");
    w.innerHTML = onda(D1) + onda(D2);
    s.parentNode.insertBefore(w, s);
    ondas.push(w);
  });

  /* 3 · Animar solo lo que está en pantalla */
  const hero = document.querySelector(".hero");
  const visibles = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("on", e.isIntersecting)), { rootMargin: "80px" });
  ondas.forEach((w) => visibles.observe(w));
  if (hero) visibles.observe(hero);

  /* 4 · Pausar lo ambiental mientras se hace scroll (scroll a 60 fps) */
  let t = 0, scrolling = false;
  addEventListener("scroll", () => {
    if (!scrolling) { scrolling = true; root.classList.add("is-scrolling"); }
    clearTimeout(t);
    t = setTimeout(() => { scrolling = false; root.classList.remove("is-scrolling"); }, 140);
  }, { passive: true });

  /* 5 · Ondulación al tocar: gota + anillo desde el punto exacto */
  const SEL = ".btn, .cart-btn, .tabs button, .chips button, .pill, .social, .card, .panel, .lic-card, .cond, .faq summary, .add, .lic button, .play";
  document.addEventListener("pointerdown", (e) => {
    const el = e.target.closest && e.target.closest(SEL);
    if (!el) return;
    const host = el.matches("summary") ? el.parentElement : el;
    const r = host.getBoundingClientRect();
    const cs = getComputedStyle(host);
    if (cs.position === "static") host.style.position = "relative";
    if (cs.overflow === "visible") host.style.overflow = "hidden";
    ["", "ring"].forEach((c) => {
      const s = document.createElement("span");
      s.className = "ripple " + c;
      s.style.left = e.clientX - r.left + "px"; s.style.top = e.clientY - r.top + "px";
      host.appendChild(s);
      setTimeout(() => s.remove(), 1300);
    });
  }, { passive: true });
})();
