/* Reflejo especular que sigue al dedo o al ratón sobre el cristal */
(() => {
  const SEL = ".card, .social, .panel, .lic-card, .cond, .stats div, .about-card, .faq details";
  let raf = 0;
  const mover = (e) => {
    const el = e.target.closest && e.target.closest(SEL);
    if (!el) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
    });
  };
  document.addEventListener("pointermove", mover, { passive: true });
  document.addEventListener("pointerdown", mover, { passive: true });
})();
