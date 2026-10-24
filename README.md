# MoliFLP SERVICIOS

Web-catálogo de **MoliFLP**, productor musical: quién soy, producciones con preescucha, beats con licencias, servicios de estudio con precios y pedido por Instagram/WhatsApp/email.

HTML + CSS + JavaScript puro, sin dependencias. Se publica gratis con GitHub Pages o Vercel.

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | Estructura y textos (Quién soy, cronología, preguntas) |
| `styles.css` | Diseño |
| `data.js` | **Lo que editarás**: contacto, precios, servicios, packs, beats, preguntas frecuentes |
| `app.js` | Lógica del catálogo, reproductor y pedido |

## Cambios rápidos (en `data.js`)

- **Contacto**: rellena `whatsapp` y/o `email` en `CONFIG` y aparecerán sus botones en el pedido.
- **Precios**: cambia `precio` en `LICENCIAS`, `SERVICIOS`, `PACKS` y `PRECIO_ESTILO`.
- **Vender beats propios**: sube la portada y una preescucha (MP3 con tu firma de voz) a una carpeta `beats/` y añade una línea a `BEATS`. Se crea sola la pestaña «Beats».
- **Nuevo tema publicado**: añádelo arriba del todo en `TEMAS` (portada, preescucha y enlace salen de Apple Music).

## Reproducciones que se actualizan solas

`.github/workflows/streams.yml` se ejecuta cada día a las 06:00 UTC: lee tus cifras públicas de [obra.art/moliflp](https://obra.art/moliflp) con `tools/update-streams.mjs`, guarda `streams.json` y GitHub Pages republica la web. Para forzarlo: pestaña **Actions** → «Actualizar reproducciones» → **Run workflow**. Si falla, la web sigue mostrando los últimos datos guardados.

## Precios: trabajo + licencia

Cada servicio cobra el **trabajo de estudio**; cuando hay un beat, la **licencia se cobra aparte** y el cliente la elige en la propia tarjeta. Las condiciones (MoliFLP como artista principal y mención @MoliFLP en redes) están en `CONDICIONES` y viajan en el mensaje del pedido.

## Pagos

La web no cobra: el cliente arma el pedido y te lo manda por mensaje, y tú respondes con el enlace de pago (Bizum, PayPal o Stripe). Si más adelante quieres cobro automático, se pueden poner enlaces de pago de Stripe o PayPal en cada producto.

## Verla en local

Abre `index.html` con doble clic en el navegador.
