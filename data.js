/* =========================================================
   MoliFLP SERVICIOS — datos del catálogo
   Edita aquí precios, contacto y servicios. No hace falta tocar app.js
   ========================================================= */

const CONFIG = {
  artista: "MoliFLP",
  moneda: "EUR",
  // Dónde llegan los pedidos. Deja "" lo que no uses.
  instagram: "MoliFLP",          // abre un DM: ig.me/m/MoliFLP
  whatsapp: "",                   // ej. "34600111222" (con prefijo, sin +)
  email: "",                      // ej. "contacto@tudominio.com"
  discord: "",                    // enlace de invitación a tu servidor, ej. "https://discord.gg/xxxx"
};

const REDES = [
  { nombre: "Instagram",    lema: "Día a día ✨",      url: "https://instagram.com/MoliFLP",                                    icono: "instagram", color: "#E1306C" },
  { nombre: "TikTok",       lema: "¡A por todo! 🔥",   url: "https://tiktok.com/@_MoliFLP_",                                     icono: "tiktok",    color: "#25F4EE" },
  { nombre: "Spotify",      lema: "Siente el ritmo 🎧", url: "https://open.spotify.com/intl-es/artist/4szvPLKIPZzeUIsnGun2G9",   icono: "spotify",   color: "#1DB954" },
  { nombre: "Apple Music",  lema: "Calidad pura 💎",   url: "https://music.apple.com/es/artist/moliflp/1712678802",              icono: "apple",     color: "#FA2D48" },
  { nombre: "Amazon Music", lema: "Sonido HD 🌊",      url: "https://music.amazon.com/artists/B0CLDWJK3Q/moliflp",               icono: "amazon",    color: "#25D1DA" },
  { nombre: "YouTube",      lema: "Videoclips 🎬",     url: "https://www.youtube.com/results?search_query=MoliFLP",              icono: "youtube",   color: "#FF0033" },
  { nombre: "Twitch",       lema: "En directo 🚀",     url: "https://twitch.tv/MoliFLP",                                         icono: "twitch",    color: "#9146FF" },
];

/* Perfil (sacado de obra.art/moliflp) */
const PERFIL = {
  roles: ["Productor", "Beatmaker", "DJ", "Artista", "Compositor"],
  origen: "Úbeda, Jaén · desde 2023",
  obra: "https://obra.art/moliflp",
};

/* Streams verificados por OBRA (24-10-2026). Actualízalos cuando quieras */
const STREAMS = {
  fecha: "octubre 2026",
  plataformas: [
    { nombre: "Spotify",    valor: 1292083, color: "#1DB954" },
    { nombre: "YouTube",    valor: 99060,   color: "#FF0033" },
    { nombre: "SoundCloud", valor: 1626,    color: "#FF7700" },
  ],
  top: [
    { titulo: "Guaya Guaya (Remix Mambo)",       con: "RmzProd",                  streams: 1228641 },
    { titulo: "Menina de Vermelho (Spanish Version)", con: "VINS, RmzProd y CocoJR", streams: 83515 },
    { titulo: "Reina de Mis Fantasías",           con: "Manuel Risoto",            streams: 80577 },
  ],
  records: [
    { cifra: "1M",  texto: "Guaya Guaya superó el millón de streams" },
    { cifra: "80K", texto: "Reina de Mis Fantasías superó los 80.000" },
    { cifra: "80K", texto: "Menina de Vermelho superó los 80.000" },
  ],
};

/* Vídeo destacado (id de YouTube) */
const VIDEO = { id: "SrxdZJuZ824", titulo: "Manuel Risoto, MoliFLP · Reina de mis Fantasías (Videoclip oficial)" };

/* Enlaces directos por tema. Si un tema no tiene, se enlaza a la búsqueda en esa plataforma */
const ENLACES = {
  "Guaya Guaya":            { spotify: "https://open.spotify.com/track/0yIvbqlksWP3aQRPuWrn2P", youtube: "https://www.youtube.com/watch?v=HEHKotUgHEs", soundcloud: "https://soundcloud.com/rmzprod-music/guaya-guaya-remix-mambo" },
  "Reina de Mis Fantasías": { spotify: "https://open.spotify.com/track/43Du7a80fdbb7xep0kbD0S", youtube: "https://www.youtube.com/watch?v=SrxdZJuZ824", soundcloud: "https://soundcloud.com/manuelrisoto-music/reina-de-mis-fantasias" },
  "Menina de Vermelho":     { spotify: "https://open.spotify.com/track/2g6u3GapBz69dh3oToNldB", youtube: "https://www.youtube.com/watch?v=FUGiEUAiwOE", soundcloud: "https://soundcloud.com/vins43709/menina-de-vermelho-spanish" },
  "ESA MORENA":             { youtube: "https://www.youtube.com/watch?v=FUGiEUAiwOE" },
  "Fuego y Hielo":          { spotify: "https://open.spotify.com/track/7uKQWUf9DZtzVVUlz8XxMG", youtube: "https://www.youtube.com/watch?v=8flaGyOjI-c", soundcloud: "https://soundcloud.com/manuelrisoto-music/fuego-y-hielo" },
};

/* Licencias para tus beats propios (pestaña «Beats») */
const LICENCIAS = [
  { id: "mp3",   nombre: "Básica MP3",            precio: 30,  detalle: "MP3 320 kbps. Hasta 10.000 reproducciones. Ideal para maquetas y primeros temas." },
  { id: "inst",  nombre: "Premium WAV",           precio: 50,  detalle: "WAV 24 bit sin marca de agua. Hasta 100.000 reproducciones y uso en redes." },
  { id: "wav",   nombre: "WAV + pistas",          precio: 90,  detalle: "WAV + pistas separadas (stems) para mezclarlo a tu gusto. Reproducciones ilimitadas y videoclip." },
  { id: "excl",  nombre: "Exclusiva",             precio: 350, detalle: "El beat pasa a ser solo tuyo y se retira de la venta. Contrato incluido." },
];

/* Tus beats a la venta. Añade uno por línea y aparecerá la pestaña «Beats».
   Ejemplo:
   { titulo: "Noche en Madrid", genero: "Urbano", bpm: 95, tono: "La m", img: "beats/noche.jpg", preview: "beats/noche-tag.mp3" },
*/
const BEATS = [];

const caratula = (u) => u.replace("100x100bb", "600x600bb");

/* Producciones publicadas (datos públicos de Apple Music). «feat» = artistas con los que lo hice */
const TEMAS = [
  { titulo: "Fuego y Hielo",              feat: "Manuel Risoto",              genero: "Flamenco",      fecha: "2026-08-07", dur: 152582, img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/73/bc/86/73bc86f6-912e-7410-cf7e-98297afd2d79/0.jpg/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c1/3d/1d/c13d1dbd-8a24-d1c2-9cb2-53bcf6bda23b/mzaf_5996981235141665060.plus.aac.p.m4a", url: "https://music.apple.com/es/album/fuego-y-hielo/6794244088?i=6794244090" },
  { titulo: "El Alma",                    feat: "Manuel Risoto",              genero: "Flamenco",      fecha: "2026-05-08", dur: 178560, img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/6a/67/d0/6a67d034-ed0d-d8d2-aa8f-9e5736a9735a/0.jpg/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/81/21/6a/81216a3c-a1c8-3395-d33c-f347fa13d82b/mzaf_1531868066938631370.plus.aac.p.m4a", url: "https://music.apple.com/es/album/el-alma/1893447442?i=1893447443" },
  { titulo: "Entre Notas",                feat: "Manuel Risoto",              genero: "Pop",           fecha: "2026-07-03", dur: 136398, img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/46/42/a7/4642a7b9-6652-4ad2-b8c1-770a3211d6ba/0.jpg/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/86/cf/9f/86cf9f55-e646-8bbe-99d8-4c19fff8ced5/mzaf_12072880126018624676.plus.aac.p.m4a", url: "https://music.apple.com/es/album/entre-notas/6781452248?i=6781452249" },
  { titulo: "Reina de Mis Fantasías",     feat: "Manuel Risoto",              genero: "Flamenco",      fecha: "2026-02-05", dur: 189750, img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/65/f8/74/65f8745c-ae5a-bafc-1c87-13ff3a17dcdb/0.jpg/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5a/26/fe/5a26fe7a-a33c-8326-b664-fc5e927168d2/mzaf_9406851544883169093.plus.aac.p.m4a", url: "https://music.apple.com/es/album/reina-de-mis-fantas%C3%ADas/1871601216?i=1871601217" },
  { titulo: "Tu Juventud",                feat: "Manuel Risoto",              genero: "Flamenco",      fecha: "2025-11-07", dur: 188293, img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/7a/5b/1f/7a5b1f57-6d42-2fff-6a6f-f33d5053a17c/0.jpg/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ad/96/32/ad96322a-b266-f49b-cfea-b1a439d98a4c/mzaf_934624872320849997.plus.aac.p.m4a", url: "https://music.apple.com/es/album/tu-juventud/1847907860?i=1847907861" },
  { titulo: "MALACOSTUMBRÁ",              feat: "Deco Mdz",   genero: "Rap",           fecha: "2025-05-02", dur: 132203, img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/72/dc/df/72dcdf30-9cc6-c16e-9c03-881622cfda50/artwork.jpg/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ed/5f/da/ed5fda3d-9d88-2841-6296-5bcd41b56f73/mzaf_12196593360614367020.plus.aac.p.m4a", url: "https://music.apple.com/es/album/malacostumbr%C3%A1-feat-moliflp/1810364862?i=1810364863" },
  { titulo: "Entre mucho y demasiao",     feat: "Papi Vins · Bolt Sessions #25", genero: "Rap",       fecha: "2025-03-21", dur: 138240, img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/a4/b7/88/a4b78852-5af7-a73f-fec3-93cb01b91633/199066791325.jpg/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f1/ef/ec/f1efecd8-c7be-e8cf-027e-dccf771785d7/mzaf_16539342649307902255.plus.aac.p.m4a", url: "https://music.apple.com/es/album/entre-mucho-y-demasiao-bolt-sessions-25/1794410092?i=1794410097" },
  { titulo: "Dime Si Te Prestas",         feat: "Salobbyy · EP Kalopsia",      genero: "Urbano",        fecha: "2025-02-14", dur: 190000, img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/98/0d/2d/980d2d31-89ae-85c3-2404-05fa5cf106fe/5063654558834_cover.jpg/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0c/5f/27/0c5f27f9-cb62-44db-023b-4a20f3031ca9/mzaf_16409098650711992452.plus.aac.p.m4a", url: "https://music.apple.com/es/album/dime-si-te-prestas/1794559149?i=1794559477" },
  { titulo: "Bipolar",                    feat: "Salobbyy · EP Kalopsia",      genero: "Urbano",        fecha: "2025-02-14", dur: 192558, img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/98/0d/2d/980d2d31-89ae-85c3-2404-05fa5cf106fe/5063654558834_cover.jpg/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f7/ab/8a/f7ab8a24-a977-db44-7bcc-e7ee4607263e/mzaf_15144208772369033027.plus.aac.p.m4a", url: "https://music.apple.com/es/album/bipolar/1794559149?i=1794559470" },
  { titulo: "Menina de Vermelho",         feat: "Papi Vins, RmzProd y CocoJR",  genero: "Latino",        fecha: "2024-11-22", dur: 161861, img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/37/02/2e/37022ec3-d050-9eb4-df44-c935080572af/199066094884.jpg/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/11/ea/4f/11ea4ffa-234b-ea03-5932-b6720b5a2e22/mzaf_5260506310167222163.plus.aac.p.m4a", url: "https://music.apple.com/es/album/menina-de-vermelho-feat-cocojr-spanish-version/1781700130?i=1781700135" },
  { titulo: "ESA MORENA",                 feat: "Papi Vins, RmzProd y CocoJR",  genero: "Latino",        fecha: "2024-11-22", dur: 163385, img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d3/81/40/d381407c-6b01-8d59-acb8-fad14a6a5926/198846882871.jpg/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/2b/61/6e/2b616e79-f8fc-dd58-ca61-b3b589dd4840/mzaf_16799371984603964464.plus.aac.p.m4a", url: "https://music.apple.com/es/album/esa-morena-feat-cocojr/1778446265?i=1778446492" },
  { titulo: "Casi Algo",                  feat: "Salobbyy",              genero: "Urbano",        fecha: "2024-07-05", dur: 187567, img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d2/1d/8b/d21d8b1f-199c-846e-a79c-bc180d48fb88/5063549039332_cover.jpg/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/45/33/72/45337251-6f3d-a169-cd11-2311634a4535/mzaf_15876206767648753313.plus.aac.p.m4a", url: "https://music.apple.com/es/album/casi-algo/1755078618?i=1755078807" },
  { titulo: "Reyna",                      feat: "Pablo Cuesta, Mvros y RmzProd",   genero: "Latino",        fecha: "2024-04-19", dur: 216000, img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/3c/60/13/3c60132f-ccb7-2fe2-53f6-672384f76362/198391774928.jpg/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/09/44/b1/0944b1b9-3365-61ba-1851-bf3791f4783d/mzaf_6207877338051044936.plus.aac.p.m4a", url: "https://music.apple.com/es/album/reyna-feat-moliflp/1740506089?i=1740506113" },
  { titulo: "Detrás de Ti",               feat: "Salobbyy",              genero: "Urbano",        fecha: "2024-03-29", dur: 197340, img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/a4/87/e1/a487e1f0-f727-e9bf-2be5-a9d8514c9932/5063483176094_cover.jpg/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/75/b6/7e/75b67ecd-3a78-f80b-8988-3d181c27dfc5/mzaf_13813420182631708350.plus.aac.p.m4a", url: "https://music.apple.com/es/album/detr%C3%A1s-de-ti/1737333657?i=1737333918" },
  { titulo: "Otro Cumpleaños Sin Ti",     feat: "Salobbyy",              genero: "Urbano",        fecha: "2024-02-09", dur: 157500, img: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/bd/43/6a/bd436aea-c30f-60be-a4b0-2abc3d368ab6/5063413743150_cover.jpg/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/79/50/78/79507819-9620-f2a6-66f7-a61261da2959/mzaf_2336659846940938545.plus.aac.p.m4a", url: "https://music.apple.com/es/album/otro-cumplea%C3%B1os-sin-ti/1728314917?i=1728315207" },
  { titulo: "Columbia",                   feat: "Budha y RmzProd",              genero: "Mambo",         fecha: "2023-07-28", dur: 148174, img: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/ed/26/a6/ed26a686-0f1b-04df-f348-1213d6054874/844577573853.png/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/e6/a8/15/e6a815af-3a05-249b-7e90-a54d73a1cf3f/mzaf_2347942577344205489.plus.aac.p.m4a", url: "https://music.apple.com/es/album/columbia/1698376886?i=1698376887" },
  { titulo: "Guaya Guaya",                feat: "RmzProd · Remix Mambo",   genero: "Mambo",         fecha: "2023-01-06", dur: 159107, img: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/a1/d2/20/a1d220c4-cda1-5aa0-a526-e336db5cf182/844577540084.png/100x100bb.jpg", preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/fc/6f/bb/fc6fbb50-a48b-d17e-a9d6-c0b34621174c/mzaf_16216544712129169710.plus.aac.p.m4a", url: "https://music.apple.com/es/album/guaya-guaya-remix-mambo/1661943609?i=1661943610" },
].map((t, i) => {
  const q = encodeURIComponent(t.titulo + " " + (t.feat.split(" · ")[0] || "") + " MoliFLP");
  const e = ENLACES[t.titulo] || {};
  return {
    ...t, id: "t" + i, img: caratula(t.img),
    enlaces: {
      spotify: e.spotify || "https://open.spotify.com/search/" + q,
      youtube: e.youtube || "https://www.youtube.com/results?search_query=" + q,
      apple: t.url,
      amazon: "https://music.amazon.es/search/" + q,
      soundcloud: e.soundcloud || "",
    },
  };
});

/* Precio del TRABAJO del botón «Quiero uno así» (la licencia del beat se suma aparte) */
const PRECIO_ESTILO = 150;

/* Condiciones que se aplican a todo trabajo y licencia */
const CONDICIONES = [
  { icono: "⭐", titulo: "MoliFLP, artista principal", texto: "Siempre debo aparecer como artista principal (no solo como «prod.») en Spotify, Apple Music, YouTube, Amazon, TikTok y cualquier otra plataforma." },
  { icono: "📣", titulo: "Mención en redes", texto: "En cada publicación del tema en redes sociales (posts, reels, stories, TikTok) hay que mencionarme y etiquetarme: @MoliFLP." },
  { icono: "🧾", titulo: "Licencia aparte del trabajo", texto: "El precio de un servicio es el trabajo de estudio. La licencia del beat se paga aparte, según el uso que le vayas a dar." },
  { icono: "📅", titulo: "Subida a plataformas", texto: "La subida a Spotify y demás plataformas la hace el propio artista, con un mínimo de 4 semanas de antelación al lanzamiento. Yo me encargo del pitch y la presentación del tema." },
  { icono: "🎧", titulo: "A distancia por Discord", texto: "Trabajo sobre todo a distancia: sesiones en directo por Discord para escuchar y ajustar juntos, estés donde estés." },
  { icono: "💳", titulo: "Reserva y entrega", texto: "Se paga el 50 % para reservar fecha y el 50 % al entregar. Los archivos finales se envían tras el pago completo." },
];

/* Servicios de estudio: el precio es solo el TRABAJO. «beat: true» = necesita además una licencia de beat */
const SERVICIOS = [
  { id: "s-beat",    nombre: "Beat a medida",          precio: 150, unidad: "trabajo", icono: "🥁", texto: "Instrumental creado desde cero para tu tema, en el estilo que me pidas.", incluye: ["Desde cero, con tus referencias", "2 revisiones", "WAV + pistas"], entrega: "5-7 días", beat: true },
  { id: "s-arreglo", nombre: "Arreglo de voces",       precio: 40,  unidad: "/ tema",  icono: "🎙️", texto: "Estructura, coros, dobles y ad-libs para que tu voz encaje con el beat.", incluye: ["Dirección de voz por Discord", "Coros y dobles", "Guía de grabación"], entrega: "2-3 días" },
  { id: "s-mezcla",  nombre: "Mezcla de voces",        precio: 50,  unidad: "/ tema",  icono: "🎛️", texto: "Voces limpias y delante: edición, afinación natural, efectos y balance con el beat.", incluye: ["Hasta 30 pistas", "Afinación y edición", "3 revisiones"], entrega: "3-5 días" },
  { id: "s-master",  nombre: "Máster",                 precio: 30,  unidad: "/ tema",  icono: "🎚️", texto: "Volumen y brillo de lanzamiento, listo para todas las plataformas.", incluye: ["Máster para streaming", "1 revisión", "WAV + MP3"], entrega: "48 h" },
  { id: "s-mixmaster", nombre: "Mezcla de voces + máster", precio: 70, antes: 80, unidad: "/ tema", icono: "💿", texto: "Las dos cosas juntas y más baratas: tu tema mezclado y masterizado.", incluye: ["Mezcla de voces", "Máster", "3 revisiones"], entrega: "4-6 días", destacado: true },
  { id: "s-pitch",   nombre: "Pitch y presentación",   precio: 35,  unidad: "/ tema",  icono: "📣", texto: "Preparo el pitch para las listas editoriales de Spotify y la presentación del tema. La subida la haces tú, con 4 semanas de antelación.", incluye: ["Pitch para listas editoriales", "Texto de presentación y bio", "Calendario de lanzamiento"], entrega: "2-3 días" },
  { id: "s-clase",   nombre: "Clase de FL Studio",     precio: 25,  unidad: "/ hora",  icono: "🎓", texto: "Clase 1 a 1 por Discord: producción, mezcla o el flujo que uso en mis temas.", incluye: ["En directo por Discord", "Proyecto de ejemplo"], entrega: "Discord" },
];

const PACKS = [
  { id: "p-tema",    nombre: "Tema completo",     precio: 249, antes: 270, icono: "👑", texto: "Beat a medida + arreglo de voces + mezcla de voces + máster.", incluye: ["Beat desde cero", "Arreglo y mezcla de voces", "Máster"], beat: true },
  { id: "p-lanza",   nombre: "Tema + lanzamiento", precio: 279, antes: 305, icono: "🚀", texto: "El Tema completo más el pitch y la presentación para el lanzamiento.", incluye: ["Todo el Tema completo", "Pitch y presentación"], beat: true },
  { id: "p-ep",      nombre: "Pack EP (3 temas)", precio: 189, antes: 210, icono: "📀", texto: "3 × mezcla de voces + máster con la misma coherencia sonora.", incluye: ["3 × Mezcla de voces + máster", "Sonido unificado"] },
];

/* Preguntas frecuentes, agrupadas por tema */
const FAQ = [
  { grupo: "Cómo trabajamos", items: [
    { p: "¿Trabajas a distancia?", r: "Sí, la mayoría de mis trabajos son a distancia por <b>Discord</b>. Hacemos las sesiones en directo: compartes pantalla o yo comparto la mía, escuchas los cambios en tiempo real y me dices qué quieres. Las pistas me las pasas por WeTransfer o Google Drive." },
    { p: "¿Qué necesito para empezar?", r: "Un mensaje con lo que buscas: 2 o 3 temas de referencia, el estilo y la fecha en la que quieres lanzarlo. Si ya tienes letra o maqueta, mándamela también. Con eso te digo plazo y precio cerrado." },
    { p: "¿Cuánto tardas?", r: "Un beat a medida, 5-7 días. La mezcla de voces, 3-5 días. El máster, 48 h. Cada servicio indica su plazo de entrega, que empieza a contar cuando recibo todo el material y la reserva." },
    { p: "¿Cómo te paso las voces para la mezcla?", r: "Cada pista en WAV por separado (24 bit, 44,1 o 48 kHz), sin efectos y empezando todas en el mismo punto. Añade también el beat en WAV. Si tienes dudas, lo vemos por Discord antes de exportar." },
  ]},
  { grupo: "Precios y pago", items: [
    { p: "¿Cuánto cuesta un beat a medida?", r: "<b>150 €</b> el trabajo del beat desde cero, más la licencia que elijas. El arreglo de voces (40 €), la mezcla de voces (50 €) y el máster (30 €) se piden aparte, o juntos y más baratos en el pack <b>Tema completo</b>." },
    { p: "¿Por qué la licencia se paga aparte?", r: "Porque son dos cosas distintas: el servicio es mi trabajo de estudio y la licencia es el permiso para usar el beat. Así pagas solo la licencia que necesitas: no cuesta lo mismo una maqueta que un tema con videoclip." },
    { p: "¿Cómo pago?", r: "Envías el pedido desde la web y te respondo con el enlace de pago (Bizum, PayPal o tarjeta). Se paga el 50 % para reservar fecha y el 50 % restante al entregar. Los archivos finales se envían tras el pago completo." },
    { p: "¿Cuántos cambios puedo pedir?", r: "El beat a medida incluye 2 rondas de cambios, la mezcla de voces 3 y el máster 1. Cada ronda extra cuesta 10 €." },
  ]},
  { grupo: "Beats y licencias", items: [
    { p: "¿Qué licencia necesito?", r: "<b>Básica MP3</b> para maquetas y primeros temas (hasta 10.000 reproducciones). <b>Premium WAV</b> si vas a publicar en serio (hasta 100.000). <b>WAV + pistas</b> si quieres mezclarlo a tu gusto y hacer videoclip (ilimitada). <b>Exclusiva</b> si quieres que el beat sea solo tuyo." },
    { p: "¿Qué recibo con la licencia?", r: "Un enlace de descarga con los archivos y un PDF con las condiciones de la licencia a tu nombre." },
    { p: "¿Puedo comprar el instrumental de un tema ya publicado?", r: "No: esos temas son colaboraciones y también pertenecen a los otros artistas. Pero pulsa «Quiero uno así» y te hago uno nuevo, solo para ti, en ese estilo." },
  ]},
  { grupo: "Créditos y lanzamiento", items: [
    { p: "¿Cómo tengo que acreditarte?", r: "MoliFLP tiene que aparecer siempre como <b>artista principal</b> (no solo como «prod.») en Spotify, Apple Music, YouTube, Amazon, TikTok y cualquier otra plataforma. Y en cada publicación del tema en redes tienes que mencionarme y etiquetarme: <b>@MoliFLP</b>." },
    { p: "¿Subes tú el tema a Spotify?", r: "No: lo sube el propio artista con su distribuidora (DistroKid, ONErpm, etc.), con un <b>mínimo de 4 semanas de antelación</b> al lanzamiento. Ese margen es lo que necesita Spotify para que el tema pueda entrar en listas editoriales." },
    { p: "¿Qué incluye el pitch y presentación?", r: "Redacto el pitch para las listas editoriales de Spotify, el texto de presentación del tema y la bio, y te preparo un calendario de lanzamiento. Tú solo lo pegas en tu distribuidora y en Spotify for Artists." },
  ]},
];
