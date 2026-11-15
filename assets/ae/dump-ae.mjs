// One-off: dump caption pages + candle geometry (same formulas as Remotion) as ASCII-safe JSON for the AE build script.
import { random } from "remotion";
const m = await import("./src/captionData.ts");
const r = (x) => Math.round(x * 1000) / 1000;
const pages = m.buildPages(2486 / 30).map((p) => ({
  s: r(p.start),
  e: r(p.end),
  raised: p.start >= m.RAISED_FROM,
  l: p.lines.map((l) => ({ st: l.style, dx: l.dx, c: l.accent || "", w: l.words.map((w) => [w.text, r(w.at)]) })),
}));
const C = [];
for (let i = 0; i < 14; i++) {
  const prev = C.length ? C[C.length - 1].c : 100;
  const up = random(`up${i}`) > 0.3;
  const body = 6 + random(`b${i}`) * 14;
  const c = prev + (up ? body : -body * 0.7);
  C.push({ o: prev, c, h: Math.max(prev, c) + random(`h${i}`) * 8, l: Math.min(prev, c) - random(`l${i}`) * 8 });
}
const lo = Math.min(...C.map((c) => c.l));
const hi = Math.max(...C.map((c) => c.h));
const y = (v) => 980 - ((v - lo) / (hi - lo)) * 560;
const candles = C.map((c, i) => ({ x: 150 + i * 58, top: r(y(Math.max(c.o, c.c))), bot: r(y(Math.min(c.o, c.c))), hi: r(y(c.h)), lo: r(y(c.l)), up: c.c >= c.o }));
const json = JSON.stringify({ pages, candles }).replace(/[\u007f-￿]/g, (ch) => "\\u" + ch.charCodeAt(0).toString(16).padStart(4, "0"));
process.stdout.write(json);
