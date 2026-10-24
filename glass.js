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
      if (n.matches(".card, .lic-card, .panel")) {   // inclinación 3D suave hacia el puntero
        const px = (x - r.left) / r.width - .5, py = (y - r.top) / r.height - .5;
        n.style.setProperty("--rx", (-py * 7).toFixed(2) + "deg"); n.style.setProperty("--ry", (px * 9).toFixed(2) + "deg");
      }
    });
  }, { passive: true });
  document.addEventListener("pointerout", (e) => {
    const el = e.target.closest && e.target.closest(".card, .lic-card, .panel");
    if (el && !el.contains(e.relatedTarget)) { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); }
  }, { passive: true });
})();
