// Lee las cifras públicas de obra.art/moliflp y las guarda en streams.json.
// Lo ejecuta GitHub Actions cada día (.github/workflows/streams.yml). Sin dependencias.
import { writeFile } from "node:fs/promises";

const FUENTE = "https://obra.art/moliflp.md";
const NOMBRES = { "Manuel RIsoto": "Manuel Risoto", "VINS": "Papi Vins" };
const n = (s) => Number(String(s).replace(/[^\d]/g, ""));

const res = await fetch(FUENTE, { headers: { "Accept-Language": "es-ES,es;q=0.9", "User-Agent": "moliflp-servicios-bot" } });
if (!res.ok) throw new Error("OBRA respondió " + res.status);
const md = await res.text();

const total = n(md.match(/Verified streams[^\n]*\n+\s*([\d.,]+)/i)?.[1] ?? "");
const porDia = md.match(/\+\s*([\d.,]+\s*[KM]?)\s+a day/i)?.[1]?.replace(/\s+/g, " ").trim() || "";

const plataformas = [];
for (const [, nombre, valor] of md.matchAll(/\n(spotify|youtube|soundcloud|apple music|amazon music|deezer|tidal)\s+[^\n]*%\s*\n+\s*([\d.,]+)/gi)) {
  plataformas.push({ nombre: nombre.replace(/\b\w/g, (c) => c.toUpperCase()).replace("Youtube", "YouTube").replace("Soundcloud", "SoundCloud"), valor: n(valor) });
}

const top = [];
for (const [, titulo, artistas, streams] of md.matchAll(/\[0\d\s*\n+\s*([^\n]+)\n+\s*([^\n]+)\n+\s*([\d.,]{4,})/g)) {
  top.push({
    titulo: titulo.replace(" - Remix Mambo", " (Remix Mambo)").replace(" - Spanish Version", " (Spanish Version)"),
    con: artistas.split(",").map((a) => NOMBRES[a.trim()] || a.trim()).filter((a) => a !== "MoliFLP").join(", ").replace(/, ([^,]+)$/, " y $1"),
    streams: n(streams),
  });
}

if (!total || !plataformas.length) throw new Error("No se pudieron leer las cifras; OBRA puede haber cambiado su formato.");

const datos = { actualizado: new Date().toISOString(), total, porDia, plataformas, top: top.slice(0, 3) };
await writeFile(new URL("../streams.json", import.meta.url), JSON.stringify(datos, null, 2) + "\n");
console.log(JSON.stringify(datos, null, 2));
