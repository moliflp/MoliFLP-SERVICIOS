/* Aparición progresiva al hacer scroll: los elementos entran uno a uno (cascada), los títulos palabra a palabra
   y una barra de progreso marca cuánto llevas. Solo transform/opacity; cada elemento se anima una vez. */
(() => {
  const root = document.documentElement;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  root.classList.add("rvjs");

  /* 1 · Títulos: cada palabra sube desde una máscara */
  const partir = (el) => {
    let n = 0;
    const rec = (nodo) => [...nodo.childNodes].forEach((c) => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach((w) => {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.append(w); return; }
          const o = document.createElement("span"); o.className = "w";
          const i = document.createElement("span"); i.style.setProperty("--n", n++); i.textContent = w;
          o.append(i); frag.append(o);
        });
        c.replaceWith(frag);
      } else if (c.nodeType === 1) rec(c);
    });
    el.setAttribute("aria-label", el.textContent.trim());
    rec(el); el.classList.add("wsplit");
  };
  document.querySelectorAll(".section h2").forEach(partir);

  /* 2 · Elementos que entran en cascada */
  const GRUPOS = [
    [".about-text", "> .kicker, > p, > .stats"],
    [".about-card", "> .tags, > .timeline"],
    [".timeline", "> li"], [".stats", "> div"],
    ["#numeros", "> .kicker, > .sub, .nums > .panel, > .video"],
    ["#catalogo", "> .kicker, > .sub, .toolbar, .chips"],
    ["#servicios", "> .kicker, > .sub, > .h3"],
    ["#faq", "> .kicker, .faq-tools, .faq-ask"],
    [".faq", "> details"],
    [".contact", "> .sub, > .btn"],
  ];
  const items = new Set();
  GRUPOS.forEach(([host, sel]) => document.querySelectorAll(host).forEach((h) => {
    let i = 0;
    sel.split(",").forEach((s) => {
      s = s.trim();
      (s.startsWith("> ") ? [...h.children].filter((c) => c.matches(s.slice(2))) : [...h.querySelectorAll(s)]).forEach((el) => {
        if (items.has(el) || el.closest(".wsplit")) return;
        el.classList.add("rv"); el.style.setProperty("--i", Math.min(i++, 8)); items.add(el);
      });
    });
  }));

  /* Rejillas dinámicas / carruseles horizontales: se revela el contenedor entero con cascada interna */
  ["#socials", "#servicesList", "#condiciones", "#licencias", "#roles"].forEach((s) => {
    const c = document.querySelector(s); if (!c) return;
    c.classList.add("rv-grid"); [...c.children].forEach((ch, i) => ch.style.setProperty("--i", Math.min(i, 8)));
    items.add(c);
  });

  const io = new IntersectionObserver((es) => es.forEach((e) => {
    const r = e.boundingClientRect;
    if (e.isIntersecting || r.top < 0) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0, rootMargin: "0px 0px -6% 0px" });
  items.forEach((el) => io.observe(el));
  document.querySelectorAll(".section h2.wsplit").forEach((h) => io.observe(h));

  /* 3 · Barra de progreso de lectura */
  const bar = document.createElement("i"); bar.className = "prog"; bar.setAttribute("aria-hidden", "true"); document.body.appendChild(bar);
  let raf = 0;
  const pinta = () => { raf = 0; const m = root.scrollHeight - innerHeight; bar.style.transform = "scaleX(" + (m > 0 ? Math.min(scrollY / m, 1) : 0).toFixed(4) + ")"; };
  addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(pinta); }, { passive: true });
  /* al llegar al final, lo que quede por revelar entra ya (los últimos elementos no llegan a cruzar el margen) */
  const resto = () => { if (root.scrollHeight - innerHeight - scrollY < 80) document.querySelectorAll(".rv:not(.in),.rv-grid:not(.in),.wsplit:not(.in)").forEach((e) => e.classList.add("in")); };
  addEventListener("scroll", resto, { passive: true });
  pinta();
})();
