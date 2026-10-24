/* Scroll suave (inercia) solo con rueda de ratón en escritorio. En táctil se deja el scroll nativo del móvil, que ya es el más fluido.
   Los enlaces #ancla se deslizan con curva suave. */
(() => {
  const root = document.documentElement;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ease = (t) => 1 - Math.pow(1 - t, 4);
  let anim = 0;
  const scrollTo2 = (y, ms = 1100) => {
    cancelAnimationFrame(anim);
    const y0 = scrollY, d = y - y0, t0 = performance.now();
    root.style.scrollBehavior = "auto";
    const f = (n) => { const k = Math.min((n - t0) / ms, 1); scrollTo(0, y0 + d * ease(k)); if (k < 1) anim = requestAnimationFrame(f); else root.style.scrollBehavior = ""; };
    anim = requestAnimationFrame(f);
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute("href").slice(1), el = id ? document.getElementById(id) : document.body; if (!el) return;
    e.preventDefault();
    const off = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
    scrollTo2(id ? el.getBoundingClientRect().top + scrollY - off : 0);
    history.pushState(null, "", id ? "#" + id : location.pathname);
  });
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  /* inercia de rueda */
  let target = scrollY, cur = scrollY, raf = 0;
  const max = () => root.scrollHeight - innerHeight;
  const tick = () => {
    cur += (target - cur) * .11;
    if (Math.abs(target - cur) < .4) { cur = target; raf = 0; } else raf = requestAnimationFrame(tick);
    scrollTo({ top: cur, behavior: "instant" });
  };
  addEventListener("wheel", (e) => {
    if (e.ctrlKey || e.defaultPrevented) return;
    // respeta zonas con su propio scroll (carrito, carruseles) y gestos horizontales
    if (e.target.closest && e.target.closest(".drawer, .svc-grid, .conds, textarea, select")) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    cancelAnimationFrame(anim);
    if (!raf) { cur = scrollY; target = scrollY; }
    const dy = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaMode === 2 ? e.deltaY * innerHeight : e.deltaY;
    target = Math.max(0, Math.min(max(), target + dy));
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: false });
  // si se mueve por teclado, barra o ancla, resincroniza
  addEventListener("scroll", () => { if (!raf) { cur = target = scrollY; } }, { passive: true });
})();
