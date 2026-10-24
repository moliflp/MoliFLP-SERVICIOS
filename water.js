/* Ambiente + rendimiento.
   · Luz de fondo que cambia de color con cada sección (estilo Tecunelo), sin separadores.
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

  /* 2 · Fondo: dos capas de luz que se funden + aurora, rejilla y haces */
  const bg = document.querySelector(".bg");
  const capas = [];
  if (bg) {
    bg.insertAdjacentHTML("afterbegin",
      '<div class="aur"></div><div class="fgrid"><i></i></div><i class="beam"></i><i class="beam"></i>' +
      '<div class="lights"><div class="L on" data-l="0"></div><div class="L" data-l="0"></div></div>');
    capas.push(...bg.querySelectorAll(".L"));
  }
  let actual = 0, capa = 0;
  const luz = (n) => {
    if (n === actual || !capas.length) return;
    actual = n;
    dispatchEvent(new CustomEvent("moliflp:luz", { detail: n }));
    const entra = capas[1 - capa], sale = capas[capa];
    entra.dataset.l = n;
    // un fotograma para que el navegador registre la capa nueva antes del fundido
    requestAnimationFrame(() => { entra.classList.add("on"); sale.classList.remove("on"); });
    capa = 1 - capa;
  };

  /* La sección que cruza el centro de la pantalla decide el color de la luz */
  const SECCIONES = [".hero", "#sobre-mi", "#numeros", "#catalogo", "#servicios", "#faq", ".contact"];
  const centro = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) luz(SECCIONES.findIndex((s) => e.target.matches(s)));
  }), { rootMargin: "-50% 0px -50% 0px" });
  SECCIONES.forEach((s) => { const el = document.querySelector(s); if (el) centro.observe(el); });

  /* 2b · Escena 3D (vinilo + partículas): se carga tras pintar la página, nunca en modo lite */
  if (!flojo && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const cargar = () => { const sc = document.createElement("script"); sc.src = "scene3d.js"; sc.async = true; document.body.appendChild(sc); };
    ("requestIdleCallback" in window) ? requestIdleCallback(cargar, { timeout: 2500 }) : setTimeout(cargar, 1200);
  }

  /* 3 · Animar solo lo que está en pantalla */
  const hero = document.querySelector(".hero");
  if (hero) new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("on", e.isIntersecting)), { rootMargin: "80px" }).observe(hero);

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
