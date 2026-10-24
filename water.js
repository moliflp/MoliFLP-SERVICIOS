/* Efectos de agua: gotas que se funden de fondo, ondas entre secciones y ondulación al tocar */
(() => {
  const NS = "http://www.w3.org/2000/svg";

  /* 1 · Fondo de gotas líquidas (metaballs) */
  const bg = document.querySelector(".bg");
  if (bg) {
    const blobs = [
      ["g1", 70, 90, 150, "#ff3d9a"], ["g2", 330, 210, 120, "#7a4dff"], ["g3", 80, 520, 130, "#19d3ff"],
      ["g4", 320, 640, 150, "#ffb347"], ["g5", 200, 340, 90, "#ff4fd8"], ["g6", 190, 760, 120, "#6a5cff"],
    ];
    bg.insertAdjacentHTML("afterbegin", `
      <svg class="goo" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><filter id="goo" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="b"/>
          <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -9"/>
        </filter></defs>
        <g class="liquid">${blobs.map(([c, x, y, r, f]) => `<circle class="${c}" cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`).join("")}</g>
      </svg>`);
  }

  /* 2 · Ondas de agua animadas entre secciones */
  const onda = (d) => `<svg viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="${d}"/></svg>`;
  const D1 = "M0 32 Q150 0 300 32 T600 32 T900 32 T1200 32 V60 H0Z";
  const D2 = "M0 24 Q150 56 300 24 T600 24 T900 24 T1200 24 V60 H0Z";
  document.querySelectorAll("main > .section:not(:first-child)").forEach((s) => {
    const w = document.createElement("div");
    w.className = "wave"; w.setAttribute("aria-hidden", "true");
    w.innerHTML = onda(D1) + onda(D2);
    s.parentNode.insertBefore(w, s);
  });

  /* 3 · Ondulación al tocar: gota + anillo desde el punto exacto */
  const SEL = ".btn, .cart-btn, .tabs button, .chips button, .pill, .social, .card, .panel, .lic-card, .cond, .faq summary, .add, .lic button, .play";
  document.addEventListener("pointerdown", (e) => {
    const el = e.target.closest && e.target.closest(SEL);
    if (!el) return;
    const host = el.matches("summary") ? el.parentElement : el;
    const r = host.getBoundingClientRect();
    if (getComputedStyle(host).position === "static") host.style.position = "relative";
    host.style.overflow = host.style.overflow || "hidden";
    ["", "ring"].forEach((c) => {
      const s = document.createElement("span");
      s.className = "ripple " + c;
      s.style.left = e.clientX - r.left + "px"; s.style.top = e.clientY - r.top + "px";
      host.appendChild(s);
      setTimeout(() => s.remove(), 1400);
    });
  }, { passive: true });
})();
