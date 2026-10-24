/* Service worker mínimo: cachea lo estático para que la web abra al instante y funcione sin cobertura. */
const V = "moliflp-v1", ASSETS = ["/", "styles.css", "glass.css", "data.js", "app.js", "glass.js", "water.js", "assets/icon-192.png"];
addEventListener("install", (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(ASSETS)).then(() => skipWaiting())); });
addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== V).map((x) => caches.delete(x)))).then(() => clients.claim())); });
addEventListener("fetch", (e) => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin || u.pathname.startsWith("/_vercel")) return;
  // red primero (siempre lo último), caché si no hay conexión; streams.json igual
  e.respondWith(fetch(r).then((res) => { const cp = res.clone(); caches.open(V).then((c) => c.put(r, cp)); return res; }).catch(() => caches.match(r).then((m) => m || caches.match("/"))));
});
