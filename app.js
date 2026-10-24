/* MoliFLP SERVICIOS — lógica del catálogo interactivo */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const eur = (n) => n.toLocaleString("es-ES", { style: "currency", currency: CONFIG.moneda });
  const año = (f) => f.slice(0, 4);
  const esNuevo = (f) => (Date.now() - new Date(f)) / 864e5 < 180;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Iconos ---------- */
  const ICONOS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z"/></svg>',
    spotify: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M7 9.5c3.5-1 7-.6 10 1M7.5 12.8c3-.8 5.8-.4 8.3.9M8 15.8c2.3-.5 4.4-.3 6.3.7"/></svg>',
    apple: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.4 2-3.5 2-3.6a4.3 4.3 0 0 0-3.4-1.8c-1.4-.2-2.8.8-3.5.8s-1.8-.8-3-.8a4.4 4.4 0 0 0-3.7 2.3c-1.6 2.8-.4 6.9 1.1 9.1.8 1.1 1.7 2.3 2.8 2.3s1.6-.7 3-.7 1.8.7 3 .7 2-1.1 2.7-2.2a9.6 9.6 0 0 0 1.3-2.6 3.9 3.9 0 0 1-2.3-3.5zM14.1 5.5A3.9 3.9 0 0 0 15 2.6a4 4 0 0 0-2.6 1.3 3.7 3.7 0 0 0-.9 2.8 3.3 3.3 0 0 0 2.6-1.2z"/></svg>',
    amazon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 3v10.5a2.5 2.5 0 1 1-2.5-2.5H9M9 3l9-1.5V12a2.5 2.5 0 1 1-2.5-2.5H18"/><path d="M3 19c5 3 13 3 18 0M18.5 17.5 21 19l-1 2.5"/></svg>',
    twitch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 3h16v11l-4 4h-4l-3 3v-3H5V6z"/><path d="M11 8v4M15 8v4"/></svg>',
  };
  ICONOS.youtube = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15.1V8.9L15.2 12z"/></svg>';
  ICONOS.soundcloud = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 7.5v10h8.2a3.3 3.3 0 0 0 .4-6.6A5.5 5.5 0 0 0 11 7.5zM9 9h1v8.5H9zM7 10.5h1v7H7zM5 11.5h1v6H5zM3 13h1v4.5H3zM1 14h1v3H1z"/></svg>';
  const PLATAFORMAS = [
    ["spotify", "Spotify", "#1DB954"], ["youtube", "YouTube", "#FF0033"], ["apple", "Apple Music", "#FA2D48"],
    ["amazon", "Amazon Music", "#25D1DA"], ["soundcloud", "SoundCloud", "#FF7700"],
  ];
  const num = (n) => n.toLocaleString("es-ES", { useGrouping: "always" });

  /* ---------- Perfil, cifras y vídeo ---------- */
  $("#roles").innerHTML = PERFIL.roles.map((r) => `<li>${r}</li>`).join("");
  $("#origin").textContent = "📍 " + PERFIL.origen;
  document.querySelectorAll(".pill[data-ico]").forEach((a) => a.insertAdjacentHTML("afterbegin", ICONOS[a.dataset.ico]));

  /* Cifras: se pintan con data.js y se sustituyen por streams.json, que GitHub Actions actualiza cada día desde OBRA */
  const COLORES = { Spotify: "#1DB954", YouTube: "#FF0033", SoundCloud: "#FF7700", "Apple Music": "#FA2D48", "Amazon Music": "#25D1DA" };
  function hace(iso) {
    const d = Math.floor((Date.now() - new Date(iso)) / 864e5);
    return d <= 0 ? "hoy" : d === 1 ? "ayer" : `hace ${d} días`;
  }
  function pintarStreams(S, enVivo) {
    const plats = S.plataformas.map((p) => ({ ...p, color: p.color || COLORES[p.nombre] || "#9b5cff" }));
    const total = S.total || plats.reduce((s, p) => s + p.valor, 0);
    const cuando = enVivo ? `actualizado ${hace(S.actualizado)}` : S.fecha;
    $("#streamsSub").innerHTML = `Streams de mis producciones verificados por <a href="${PERFIL.obra}" target="_blank" rel="noopener">OBRA</a>. Sumando remixes y sesiones, paso de los 4 millones.`;
    $("#streamsWhen").innerHTML = `<i class="dot"></i>${enVivo ? "Se actualiza solo cada día" : "Datos"} · ${cuando}${S.porDia ? ` · +${esc(S.porDia)} al día` : ""}`;
    const el = $("#streamsTotal");
    if (el.dataset.count && el.textContent !== "0") el.textContent = num(total);
    el.dataset.count = total;
    $("#split").innerHTML = plats.map((p) => `<i style="--w:${Math.max(p.valor / total * 100, 1.5)}%;--c:${p.color}"></i>`).join("");
    $("#legend").innerHTML = plats.map((p) => `<li style="--c:${p.color}"><span>${esc(p.nombre)}</span><b>${num(p.valor)}</b><small>${Math.round(p.valor / total * 100) || "<1"} %</small></li>`).join("");
    const maxTop = S.top[0]?.streams || 1;
    $("#topList").innerHTML = S.top.map((t, i) => `<li><span class="n">0${i + 1}</span><div><b>${esc(t.titulo)}</b><small>con ${esc(t.con)}</small><i style="--w:${t.streams / maxTop * 100}%"></i></div><span class="s">${num(t.streams)}</span></li>`).join("");
  }
  pintarStreams(STREAMS, false);
  fetch("streams.json", { cache: "no-store" }).then((r) => r.ok ? r.json() : null)
    .then((S) => { if (S && S.total) pintarStreams(S, true); }).catch(() => {});
  $("#records").innerHTML = STREAMS.records.map((r) => `<li><b>${r.cifra}</b><span>${r.texto}</span></li>`).join("");
  $("#video").innerHTML = `<button class="yt-lite" aria-label="Reproducir vídeo: ${esc(VIDEO.titulo)}" style="background-image:url(https://i.ytimg.com/vi/${VIDEO.id}/sddefault.jpg)">
      <span class="yt-play">${ICONOS.youtube}</span><span class="yt-title">${esc(VIDEO.titulo)}</span></button>`;
  $("#video").addEventListener("click", () => {
    audio.pause();
    $("#video").innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${VIDEO.id}?autoplay=1&rel=0" title="${esc(VIDEO.titulo)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  }, { once: true });

  const PLAY ='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
  const PAUSE = '<svg viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';

  /* ---------- Redes ---------- */
  $("#socials").innerHTML = REDES.map((r) => `
    <li><a class="social" style="--c:${r.color}" href="${r.url}" target="_blank" rel="noopener">
      <span class="ic">${ICONOS[r.icono]}</span>
      <div><b>${r.nombre}</b><small>${r.lema}</small></div><em>SEGUIR</em>
    </a></li>`).join("");

  /* ---------- Beats propios: ids y pestaña solo si hay alguno ---------- */
  BEATS.forEach((b, i) => { b.id = "b" + i; });
  if (BEATS.length) {
    const b = document.createElement("button");
    b.setAttribute("role", "tab"); b.dataset.tab = "beats"; b.textContent = "Beats";
    $("#tabs").insertBefore(b, $("#tabs").children[1]);
  }

  /* ---------- Estado ---------- */
  const state = { tab: "musica", genero: "Todos", q: "", sort: "new", lic: {}, playing: null };
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem("moliflp-cart")) || []; } catch { cart = []; }
  const saveCart = () => { try { localStorage.setItem("moliflp-cart", JSON.stringify(cart)); } catch {} };

  /* ---------- Catálogo ---------- */
  const generos = ["Todos", ...new Set(TEMAS.map((t) => t.genero))];
  const chips = $("#chips");
  const renderChips = () => {
    chips.hidden = state.tab !== "musica";
    $("#filters").style.display = state.tab === "musica" ? "" : "none";
    chips.innerHTML = generos.map((g) => `<button class="${g === state.genero ? "active" : ""}" data-g="${g}">${g}</button>`).join("");
  };
  chips.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    state.genero = b.dataset.g; renderChips(); render();
  });

  // Licencia elegida para una tarjeta y bloque «trabajo + licencia»
  const licDe = (id) => LICENCIAS.find((l) => l.id === (state.lic[id] || LICENCIAS[0].id));
  const licBlock = (id, trabajo, etiqueta, antes) => {
    const lic = licDe(id);
    return `
        <div class="breakdown">
          <div class="row"><span>${etiqueta}</span><b>${antes ? `<s class="was">${eur(antes)}</s> ` : ""}${eur(trabajo)}</b></div>
          <div class="row"><span>Licencia del beat <em>(aparte)</em></span><b data-licprice>${eur(lic.precio)}</b></div>
          <div class="lic" role="radiogroup" aria-label="Licencia del beat" data-trabajo="${trabajo}">
            ${LICENCIAS.map((l) => `<button role="radio" aria-checked="${l.id === lic.id}" class="${l.id === lic.id ? "on" : ""}" data-lic="${l.id}" title="${esc(l.detalle)}">${l.nombre}</button>`).join("")}
          </div>
        </div>`;
  };

  const portada = (t, badge) => `
      <div class="cover">
        <img src="${esc(t.img)}" alt="Portada de ${esc(t.titulo)}" loading="lazy" width="600" height="600">
        ${badge}
        <button class="play" data-play="${t.id}" aria-label="Escuchar ${esc(t.titulo)}">${state.playing === t.id ? PAUSE : PLAY}</button>
      </div>`;

  // Producción publicada: portafolio + «Quiero un tema así»
  const cardTema = (t, i) => `
    <article class="card ${state.playing === t.id ? "playing" : ""}" data-id="${t.id}" style="animation-delay:${Math.min(i, 12) * 40}ms">
      ${portada(t, esNuevo(t.fecha) ? '<span class="badge new">Nuevo</span>' : `<span class="badge">${año(t.fecha)}</span>`)}
      <div class="body">
        <h3>${esc(t.titulo)}</h3>
        <div class="meta"><span>${t.genero}</span><span>· ${Math.floor(t.dur / 6e4)}:${String(Math.round(t.dur / 1e3) % 60).padStart(2, "0")}</span></div>
        ${t.feat ? `<p class="with">Con <b>${esc(t.feat)}</b></p>` : ""}
        ${licBlock(t.id, PRECIO_ESTILO, "Beat desde cero en este estilo")}
        <p class="aparte">Arreglo de voces, mezcla y máster: <a href="#servicios">aparte</a></p>
        <div class="buy">
          <span class="price" data-total>${eur(PRECIO_ESTILO + licDe(t.id).precio)}</span>
          <button class="add" data-estilo="${t.id}">Quiero uno así</button>
        </div>
        <div class="listen"><span>Escuchar en</span>
          ${PLATAFORMAS.filter(([k]) => t.enlaces[k]).map(([k, n, c]) => `<a href="${esc(t.enlaces[k])}" target="_blank" rel="noopener" style="--c:${c}" title="${n}" aria-label="Escuchar ${esc(t.titulo)} en ${n}">${ICONOS[k]}</a>`).join("")}
        </div>
      </div>
    </article>`;

  // Beat propio a la venta, con selector de licencia
  const cardBeat = (t, i) => {
    const lic = LICENCIAS.find((l) => l.id === (state.lic[t.id] || LICENCIAS[0].id));
    return `
    <article class="card ${state.playing === t.id ? "playing" : ""}" data-id="${t.id}" style="animation-delay:${Math.min(i, 12) * 40}ms">
      ${portada(t, `<span class="badge">${t.bpm ? t.bpm + " BPM" : "Beat"}</span>`)}
      <div class="body">
        <h3>${esc(t.titulo)}</h3>
        <div class="meta"><span>${esc(t.genero || "")}</span>${t.tono ? `<span>· ${esc(t.tono)}</span>` : ""}</div>
        <div class="lic" role="radiogroup" aria-label="Licencia">
          ${LICENCIAS.map((l) => `<button role="radio" aria-checked="${l.id === lic.id}" class="${l.id === lic.id ? "on" : ""}" data-lic="${l.id}" title="${esc(l.detalle)}">${l.nombre}</button>`).join("")}
        </div>
        <div class="buy">
          <span class="price">${eur(lic.precio)}</span>
          <button class="add" data-add="${t.id}">Añadir</button>
        </div>
      </div>
    </article>`;
  };

  const cardServicio = (s, i) => `
    <article class="card svc-card ${s.destacado ? "featured" : ""}" data-id="${s.id}" style="animation-delay:${i * 50}ms">
      <div class="body">
        <span class="ico">${s.icono}</span>
        <h3>${s.nombre}</h3>
        <p>${s.texto}</p>
        ${s.incluye ? `<ul class="inc">${s.incluye.map((x) => `<li>${x}</li>`).join("")}</ul>` : ""}
        ${s.entrega ? `<span class="when">Entrega: ${s.entrega}</span>` : ""}
        ${s.beat ? licBlock(s.id, s.precio, "Trabajo", s.antes) : ""}
        <div class="buy">
          <span class="price" data-total>${eur(s.precio + (s.beat ? licDe(s.id).precio : 0))}${s.unidad && !s.beat ? ` <small>${s.unidad}</small>` : ""}${s.antes && !s.beat ? `<s>${eur(s.antes)}</s>` : ""}</span>
          <button class="add" data-svc="${s.id}">Añadir</button>
        </div>
      </div>
    </article>`;

  const grid = $("#grid");
  function render() {
    let html = "", n = 0;
    if (state.tab === "musica") {
      let lista = TEMAS.filter((t) =>
        (state.genero === "Todos" || t.genero === state.genero) &&
        (t.titulo + " " + t.feat).toLowerCase().includes(state.q.toLowerCase()));
      lista.sort((a, b) => state.sort === "az" ? a.titulo.localeCompare(b.titulo, "es")
        : state.sort === "old" ? a.fecha.localeCompare(b.fecha) : b.fecha.localeCompare(a.fecha));
      html = lista.map(cardTema).join(""); n = lista.length;
    } else if (state.tab === "beats") {
      html = BEATS.map(cardBeat).join(""); n = BEATS.length;
    } else {
      const lista = state.tab === "servicios" ? SERVICIOS : PACKS;
      html = lista.map(cardServicio).join(""); n = lista.length;
    }
    grid.innerHTML = html;
    $("#empty").hidden = n > 0;
  }

  $("#tabs").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    state.tab = b.dataset.tab;
    $("#tabs").querySelectorAll("button").forEach((x) => { x.classList.toggle("active", x === b); x.setAttribute("aria-selected", x === b); });
    renderChips(); render();
  });
  $("#search").addEventListener("input", (e) => { state.q = e.target.value; render(); });
  $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });

  // Cambiar licencia en cualquier tarjeta (catálogo o sección de precios)
  function elegirLicencia(licB) {
    const card = licB.closest(".card"), id = card.dataset.id, grupo = licB.closest(".lic");
    state.lic[id] = licB.dataset.lic;
    const l = licDe(id), trabajo = +(grupo.dataset.trabajo || 0);
    // misma tarjeta puede estar en el catálogo y en precios: actualiza ambas
    document.querySelectorAll(`.card[data-id="${id}"]`).forEach((c) => {
      c.querySelectorAll("[data-lic]").forEach((x) => { const on = x.dataset.lic === l.id; x.classList.toggle("on", on); x.setAttribute("aria-checked", on); });
      const lp = c.querySelector("[data-licprice]"); if (lp) lp.textContent = eur(l.precio);
      const tot = c.querySelector("[data-total]") || c.querySelector(".price");
      tot.firstChild.textContent = eur(trabajo + l.precio);
    });
  }
  // Añade trabajo y licencia como dos líneas separadas del pedido
  function addConLicencia(id, trabajo, img, icono, btn) {
    const l = licDe(id);
    addItem(trabajo, btn, true);
    addItem({ key: id + ":lic:" + l.id, nombre: "Licencia " + l.nombre, det: "Para: " + trabajo.nombre + (trabajo.det.startsWith("Estilo") ? " · " + trabajo.det.replace(" · trabajo", "") : ""), precio: l.precio, img, icono: "🧾" }, null, true);
    toast(`${trabajo.nombre} + licencia ${l.nombre} añadidos`);
  }

  grid.addEventListener("click", (e) => {
    const licB = e.target.closest("[data-lic]"); if (licB) return elegirLicencia(licB);
    const p = e.target.closest("[data-play]"); if (p) return toggle(p.dataset.play);
    const a = e.target.closest("[data-add]");
    if (a) {
      const t = BEATS.find((x) => x.id === a.dataset.add), l = LICENCIAS.find((x) => x.id === (state.lic[t.id] || LICENCIAS[0].id));
      return addItem({ key: t.id + ":" + l.id, nombre: "Beat «" + t.titulo + "»", det: "Licencia " + l.nombre, precio: l.precio, img: t.img }, a);
    }
    const st = e.target.closest("[data-estilo]");
    if (st) {
      const t = TEMAS.find((x) => x.id === st.dataset.estilo);
      return addConLicencia(t.id, { key: "estilo:" + t.id, nombre: "Beat a medida", det: "Estilo «" + t.titulo + "» · trabajo", precio: PRECIO_ESTILO, img: t.img }, t.img, null, st);
    }
    const s = e.target.closest("[data-svc]"); if (s) addServicio(s);
  });
  function addServicio(btn) {
    const it = [...SERVICIOS, ...PACKS].find((x) => x.id === btn.dataset.svc);
    const item = { key: it.id, nombre: it.nombre, det: it.beat ? "Trabajo de estudio" : it.unidad ? "Precio " + it.unidad.replace("/ ", "por ") : "Servicio", precio: it.precio, icono: it.icono };
    if (it.beat) addConLicencia(it.id, item, null, it.icono, btn); else addItem(item, btn);
  }

  /* ---------- Licencias y servicios (sección precios) ---------- */
  $("#licencias").innerHTML = LICENCIAS.map((l) => `
    <div class="lic-card"><h3>${l.nombre}</h3><span class="price">${eur(l.precio)}</span><p>${l.detalle}</p></div>`).join("");
  $("#servicesList").innerHTML = [...SERVICIOS, ...PACKS].map(cardServicio).join("");
  $("#servicesList").addEventListener("click", (e) => {
    const licB = e.target.closest("[data-lic]"); if (licB) return elegirLicencia(licB);
    const s = e.target.closest("[data-svc]"); if (s) addServicio(s);
  });
  $("#condiciones").innerHTML = CONDICIONES.map((c) => `<div class="cond"><span>${c.icono}</span><div><b>${c.titulo}</b><p>${c.texto}</p></div></div>`).join("");

  /* ---------- FAQ ---------- */
  // Preguntas por grupos, con filtro, buscador y una abierta a la vez
  const faqState = { grupo: "Todas", q: "" };
  const sinAcentos = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  $("#faqChips").innerHTML = ["Todas", ...FAQ.map((g) => g.grupo)].map((g, i) => `<button class="${i ? "" : "active"}" data-fg="${g}">${g}</button>`).join("");
  function pintarFaq() {
    const q = sinAcentos(faqState.q);
    let n = 0;
    $("#faqList").innerHTML = FAQ.filter((g) => faqState.grupo === "Todas" || g.grupo === faqState.grupo).map((g) => {
      const items = g.items.filter((f) => !q || sinAcentos(f.p + " " + f.r.replace(/<[^>]+>/g, "")).includes(q));
      n += items.length;
      return items.length ? `<h3 class="faq-g">${g.grupo}</h3>${items.map((f) => `<details><summary>${f.p}</summary><p>${f.r}</p></details>`).join("")}` : "";
    }).join("");
    $("#faqEmpty").hidden = n > 0;
  }
  $("#faqChips").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    faqState.grupo = b.dataset.fg;
    $("#faqChips").querySelectorAll("button").forEach((x) => x.classList.toggle("active", x === b));
    pintarFaq();
  });
  $("#faqSearch").addEventListener("input", (e) => { faqState.q = e.target.value; pintarFaq(); });
  $("#faqList").addEventListener("toggle", (e) => {
    if (e.target.open) $("#faqList").querySelectorAll("details[open]").forEach((d) => { if (d !== e.target) d.open = false; });
  }, true);
  pintarFaq();
  if (CONFIG.discord) {
    $("#faqAsk").insertAdjacentHTML("beforeend", `<a class="btn ghost" href="${esc(CONFIG.discord)}" target="_blank" rel="noopener">Pregúntame por Discord</a>`);
  }

  /* ---------- Reproductor ---------- */
  const audio = $("#audio"), player = $("#player");
  function toggle(id) {
    if (state.playing === id && !audio.paused) { audio.pause(); return; }
    const t = [...TEMAS, ...BEATS].find((x) => x.id === id);
    if (state.playing !== id) {
      audio.src = t.preview;
      $("#plImg").src = t.img; $("#plTitle").textContent = t.titulo; $("#plSub").textContent = "Preescucha · 30 s";
    }
    state.playing = id; player.hidden = false;
    audio.play().catch(() => toast("No se pudo reproducir la preescucha"));
  }
  const syncPlay = () => {
    const on = !audio.paused;
    $("#plToggle").textContent = on ? "❚❚" : "▶";
    $("#plToggle").setAttribute("aria-label", on ? "Pausa" : "Reproducir");
    document.querySelectorAll(".card[data-id]").forEach((c) => {
      if (!c.querySelector(".play")) return;
      const me = c.dataset.id === state.playing && on;
      c.classList.toggle("playing", me);
      c.querySelector(".play").innerHTML = me ? PAUSE : PLAY;
    });
  };
  audio.addEventListener("play", syncPlay);
  audio.addEventListener("pause", syncPlay);
  audio.addEventListener("ended", () => {
    // pasa al siguiente tema visible
    const ids = [...document.querySelectorAll("#grid [data-play]")].map((b) => b.dataset.play);
    const next = ids[ids.indexOf(state.playing) + 1];
    if (next) toggle(next); else syncPlay();
  });
  audio.addEventListener("timeupdate", () => { $("#plProg").style.width = (audio.currentTime / (audio.duration || 30)) * 100 + "%"; });
  $("#plToggle").addEventListener("click", () => audio.paused ? audio.play() : audio.pause());
  $("#plClose").addEventListener("click", () => { audio.pause(); player.hidden = true; state.playing = null; syncPlay(); });

  /* ---------- Pedido ---------- */
  const drawer = $("#drawer"), scrim = $("#scrim");
  const openCart = (o) => {
    drawer.classList.toggle("open", o); drawer.setAttribute("aria-hidden", !o); scrim.hidden = !o;
    document.body.style.overflow = o ? "hidden" : "";
  };
  $("#cartBtn").addEventListener("click", () => openCart(true));
  $("#drClose").addEventListener("click", () => openCart(false));
  scrim.addEventListener("click", () => openCart(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") openCart(false); });

  function addItem(item, btn, silencio) {
    const ex = cart.find((c) => c.key === item.key);
    if (ex) ex.qty++; else cart.push({ ...item, qty: 1 });
    saveCart(); renderCart();
    const b = $("#cartBtn"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
    if (btn) { const t = btn.textContent; btn.textContent = "✓ Añadido"; btn.classList.add("done"); setTimeout(() => { btn.textContent = t; btn.classList.remove("done"); }, 1200); }
    if (!silencio) toast(`${item.nombre} añadido al pedido`);
  }

  function resumen() {
    const nom = $("#drName").value.trim();
    const lineas = cart.map((c) => `• ${c.nombre} — ${c.det}${c.qty > 1 ? " x" + c.qty : ""}: ${eur(c.precio * c.qty)}`);
    return `¡Hola ${CONFIG.artista}! Quiero hacer este pedido${nom ? " (" + nom + ")" : ""}:\n${lineas.join("\n")}\nTotal: ${eur(total())}\n\nAcepto las condiciones: MoliFLP como artista principal en todas las plataformas y mención @MoliFLP en redes.`;
  }
  const total = () => cart.reduce((s, c) => s + c.precio * c.qty, 0);

  function renderCart() {
    const n = cart.reduce((s, c) => s + c.qty, 0);
    $("#cartCount").textContent = n;
    $("#drEmpty").hidden = cart.length > 0;
    $("#drList").innerHTML = cart.map((c, i) => `
      <li>${c.img ? `<img src="${c.img}" alt="">` : `<span class="mini">${c.icono || "🎵"}</span>`}
        <div class="it"><b>${esc(c.nombre)}${c.qty > 1 ? " ×" + c.qty : ""}</b><span>${esc(c.det)}</span></div>
        <span class="p">${eur(c.precio * c.qty)}</span>
        <button class="rm" data-rm="${i}" aria-label="Quitar ${esc(c.nombre)}">✕</button></li>`).join("");
    $("#drTotal").textContent = eur(total());
    const dis = cart.length ? "" : "disabled";
    const acc = [];
    if (CONFIG.instagram) acc.push(`<button class="btn primary" data-send="ig" ${dis}>Enviar por Instagram</button>`);
    if (CONFIG.whatsapp) acc.push(`<button class="btn ghost" data-send="wa" ${dis}>Enviar por WhatsApp</button>`);
    if (CONFIG.discord) acc.push(`<button class="btn ghost" data-send="dc" ${dis}>Enviar por Discord</button>`);
    if (CONFIG.email) acc.push(`<button class="btn ghost" data-send="mail" ${dis}>Enviar por email</button>`);
    if (cart.length) acc.push(`<button class="btn ghost" data-send="clear">Vaciar pedido</button>`);
    $("#drActions").innerHTML = acc.join("");
  }
  $("#drList").addEventListener("click", (e) => {
    const b = e.target.closest("[data-rm]"); if (!b) return;
    cart.splice(+b.dataset.rm, 1); saveCart(); renderCart();
  });
  $("#drActions").addEventListener("click", async (e) => {
    const b = e.target.closest("[data-send]"); if (!b) return;
    const tipo = b.dataset.send;
    if (tipo === "clear") { cart = []; saveCart(); renderCart(); return; }
    const txt = resumen();
    try { await navigator.clipboard.writeText(txt); } catch {}
    if (tipo === "ig") { toast("Pedido copiado: pégalo en el chat de Instagram"); window.open("https://ig.me/m/" + CONFIG.instagram, "_blank", "noopener"); }
    if (tipo === "dc") { toast("Pedido copiado: pégalo en Discord"); window.open(CONFIG.discord, "_blank", "noopener"); }
    if (tipo === "wa") window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(txt)}`, "_blank", "noopener");
    if (tipo === "mail") location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Pedido MoliFLP")}&body=${encodeURIComponent(txt)}`;
  });

  /* ---------- Varios ---------- */
  let tt;
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2200); }

  const io = new IntersectionObserver((es) => es.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in");
    en.target.querySelectorAll("[data-count]").forEach(contar);
    io.unobserve(en.target);
  }), { threshold: 0, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  function contar(el) {
    const fin = +el.dataset.count, t0 = performance.now();
    const pre = el.dataset.pre || "", suf = el.dataset.suf || "";
    const step = (t) => { const k = Math.min((t - t0) / 1400, 1); el.textContent = pre + num(Math.round(fin * (1 - Math.pow(1 - k, 3)))) + suf; if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  if (CONFIG.whatsapp) $("#contactBtn").href = "https://wa.me/" + CONFIG.whatsapp;
  $("#year").textContent = new Date().getFullYear();
  renderChips(); render(); renderCart();
})();
