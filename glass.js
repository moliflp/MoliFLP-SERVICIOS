/* Reflejo especular que sigue al ratón (solo escritorio; en táctil no hace falta y ahorra trabajo) */
(() => {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const SEL = ".card, .social, .panel, .lic-card, .cond, .stats div, .about-card, .faq details";
  let raf = 0, ultimo = null;
  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest && e.target.closest(SEL);
    if (!el) return;
    ultimo = [el, e.clientX, e.clientY];
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const [n, x, y] = ultimo, r = n.getBoundingClientRect();
      n.style.setProperty("--mx", ((x - r.left) / r.width * 100).toFixed(1) + "%");
      n.style.setProperty("--my", ((y - r.top) / r.height * 100).toFixed(1) + "%");
    });
  }, { passive: true });
})();
