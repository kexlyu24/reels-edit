import React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HEAD, SEASONS, TIMES } from "./fonts";
import { Asset, Chip, Chrome, DarkScene, Glow, Pop } from "./fx";
import { clamp, easeOut, FPS, VOLT } from "./style";

// Scenes receive their own start (sec) so word cues can be written as absolute transcript times.
type SceneProps = { start: number; dur: number };
const cue = (t: number, start: number) => Math.round((t - start) * FPS);

/* 13.00s "pastiin dulu 3 hal ini" */
export const ThreeThings: React.FC<SceneProps> = ({ dur }) => {
  const frame = useCurrentFrame();
  return (
    <DarkScene dur={dur}>
      <Glow x={540} y={560} r={420} opacity={0.8} />
      <Pop at={0} float={6} style={{ left: 0, right: 0, top: 170, display: "flex", justifyContent: "center" }}>
        <Chrome size={640} style={{ fontWeight: 900, letterSpacing: "-0.06em" }}>
          3
        </Chrome>
      </Pop>
      <div style={{ position: "absolute", top: 860, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 22 }}>
        {["STRATEGI", "RISIKO", "BROKER"].map((t, i) => (
          <div
            key={t}
            style={{
              opacity: interpolate(frame, [6 + i * 5, 10 + i * 5], [0, 1], clamp),
              translate: `0px ${interpolate(frame, [6 + i * 5, 14 + i * 5], [30, 0], { ...clamp, easing: easeOut })}px`,
            }}
          >
            <Chip size={40} volt={i === 0}>
              {`0${i + 1} ${t}`}
            </Chip>
          </div>
        ))}
      </div>
    </DarkScene>
  );
};

/* 16.06s backtest on demo — warped grid + candlesticks (reference: grid background scene) */
const CANDLES = Array.from({ length: 14 }).reduce<{ o: number; c: number; h: number; l: number }[]>((acc, _, i) => {
  const prev = acc.length ? acc[acc.length - 1].c : 100;
  const up = random(`up${i}`) > 0.3;
  const body = 6 + random(`b${i}`) * 14;
  const c = prev + (up ? body : -body * 0.7);
  acc.push({ o: prev, c, h: Math.max(prev, c) + random(`h${i}`) * 8, l: Math.min(prev, c) - random(`l${i}`) * 8 });
  return acc;
}, []);

export const Backtest: React.FC<SceneProps> = ({ dur }) => {
  const frame = useCurrentFrame();
  const lo = Math.min(...CANDLES.map((c) => c.l));
  const hi = Math.max(...CANDLES.map((c) => c.h));
  const y = (v: number) => 980 - ((v - lo) / (hi - lo)) * 560;
  const wob = (k: number) => Math.sin(frame / 18 + k) * 10;
  return (
    <DarkScene dur={dur} tint="#151515">
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <path
            key={`v${i}`}
            d={`M ${90 + i * 150} -20 Q ${90 + i * 150 + wob(i) * 3} 960 ${90 + i * 150} 1940`}
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={2.5}
            fill="none"
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <path
            key={`h${i}`}
            d={`M -20 ${80 + i * 160} Q 540 ${80 + i * 160 + wob(i + 3) * 3} 1100 ${80 + i * 160}`}
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={2.5}
            fill="none"
          />
        ))}
        {CANDLES.map((c, i) => {
          const at = 6 + i * 4;
          const g = interpolate(frame, [at, at + 6], [0, 1], { ...clamp, easing: easeOut });
          const up = c.c >= c.o;
          const x = 150 + i * 58;
          const top = y(Math.max(c.o, c.c));
          const bot = y(Math.min(c.o, c.c));
          const col = up ? VOLT : "#ff5a4e";
          return (
            <g key={i} opacity={g} style={{ filter: `drop-shadow(0 0 10px ${up ? "rgba(209,248,1,0.7)" : "rgba(255,90,78,0.6)"})` }}>
              <line x1={x} x2={x} y1={y(c.h)} y2={y(c.l)} stroke={col} strokeWidth={4} />
              <rect x={x - 17} width={34} y={bot - (bot - top) * g} height={Math.max(6, (bot - top) * g)} rx={4} fill={col} />
            </g>
          );
        })}
      </svg>
      <Pop at={2} float={4} style={{ left: 0, right: 0, top: 170, display: "flex", justifyContent: "center" }}>
        <Chip size={46} volt>
          AKUN DEMO
        </Chip>
      </Pop>
    </DarkScene>
  );
};

/* 25.50s risk 1–5% per trade — donut */
export const Risk: React.FC<SceneProps> = ({ dur }) => {
  const frame = useCurrentFrame();
  const r = 250;
  const circ = 2 * Math.PI * r;
  const pct = interpolate(frame, [8, 30], [0, 0.05], { ...clamp, easing: easeOut });
  return (
    <DarkScene dur={dur}>
      <Glow x={540} y={640} r={360} opacity={0.5} />
      <Pop at={0} float={0} style={{ left: 0, right: 0, top: 160, display: "flex", justifyContent: "center" }}>
        <Chrome size={96}>RISIKO / TRADE</Chrome>
      </Pop>
      <svg width={1080} height={1920} style={{ position: "absolute", rotate: "-90deg", transformOrigin: "540px 650px" }}>
        <circle cx={540} cy={650} r={r} stroke="rgba(255,255,255,0.14)" strokeWidth={70} fill="none" />
        <circle
          cx={540}
          cy={650}
          r={r}
          stroke={VOLT}
          strokeWidth={70}
          fill="none"
          strokeDasharray={`${circ * pct} ${circ}`}
          style={{ filter: "drop-shadow(0 0 18px rgba(209,248,1,0.8))" }}
        />
      </svg>
      <div style={{ position: "absolute", top: 530, left: 0, right: 0, textAlign: "center" }}>
        <Chrome size={190} volt>{`${Math.max(1, Math.round(pct * 100))}%`}</Chrome>
        <div style={{ fontFamily: SEASONS, fontStyle: "italic", fontWeight: 300, fontSize: 64, color: "#fff", marginTop: 4 }}>
          maksimal
        </div>
      </div>
    </DarkScene>
  );
};

/* 34.28s legalitas · keamanan dana · fasilitas */
export const Pillars: React.FC<SceneProps> = ({ start, dur }) => {
  const items = [
    { at: 34.62, img: "legalitas.png", w: 290, label: "LEGALITAS" },
    { at: 35.42, img: "insurance.png", w: 330, label: "KEAMANAN DANA" },
    { at: 36.92, img: "instrumen.png", w: 280, label: "FASILITAS" },
  ];
  return (
    <DarkScene dur={dur}>
      {items.map((it, i) => (
        <React.Fragment key={it.img}>
          <Glow x={190 + i * 350} y={650} r={200} opacity={0.6} />
          <Pop at={cue(it.at, start)} float={10} style={{ left: 190 + i * 350 - 170, width: 340, top: 400, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
            <div style={{ height: 420, display: "flex", alignItems: "center" }}>
              <Asset name={it.img} width={it.w} />
            </div>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 34, letterSpacing: "-0.01em", color: i === 1 ? VOLT : "#fff" }}>
              {it.label}
            </div>
          </Pop>
        </React.Fragment>
      ))}
    </DarkScene>
  );
};

/* 47.90s regulator: BAPPEBTI, OJK, BI — rings pulse on each coin when it is named */
export const Regulators: React.FC<SceneProps> = ({ start, dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const coins = [
    { at: 48.1, x: 274, y: 401 },
    { at: 48.98, x: 429, y: 284 },
    { at: 50.04, x: 289, y: 146 },
  ];
  return (
    <DarkScene dur={dur}>
      <Glow x={540} y={560} r={420} opacity={0.55} />
      <Pop at={0} float={8} style={{ left: 260, top: 210, width: 560 }}>
        <Asset name="legalitas.png" width={560} />
        {coins.map((c, i) => {
          const s = spring({ frame: frame - cue(c.at, start), fps, config: { damping: 14 } });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: c.x - 82,
                top: c.y - 82,
                width: 164,
                height: 164,
                borderRadius: "50%",
                border: `6px solid ${VOLT}`,
                boxShadow: `0 0 30px ${VOLT}, inset 0 0 20px rgba(209,248,1,0.5)`,
                opacity: s,
                scale: `${interpolate(s, [0, 1], [1.6, 1])}`,
              }}
            />
          );
        })}
      </Pop>
      <Pop at={4} float={0} style={{ left: 0, right: 0, top: 120, display: "flex", justifyContent: "center" }}>
        <Chrome size={84}>BERIZIN & DIAWASI</Chrome>
      </Pop>
    </DarkScene>
  );
};

/* 52.76s segregated account — two cards split apart */
export const Segregated: React.FC<SceneProps> = ({ dur }) => {
  const frame = useCurrentFrame();
  const split = interpolate(frame, [8, 24], [0, 1], { ...clamp, easing: easeOut });
  const card = (label: React.ReactNode, sub: string, volt: boolean, dir: number) => (
    <div
      style={{
        position: "absolute",
        top: 560,
        left: 540 - 210 + dir * split * 235,
        width: 420,
        height: 330,
        borderRadius: 40,
        background: volt ? "linear-gradient(160deg, rgba(209,248,1,0.22), rgba(209,248,1,0.05))" : "rgba(255,255,255,0.06)",
        border: `3px solid ${volt ? VOLT : "rgba(255,255,255,0.35)"}`,
        boxShadow: volt ? "0 0 50px rgba(209,248,1,0.35)" : "0 20px 50px rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        rotate: `${dir * split * 4}deg`,
      }}
    >
      <div style={{ fontFamily: TIMES, fontSize: 46, color: "#ddd", letterSpacing: "-0.03em" }}>{sub}</div>
      <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 54, color: volt ? VOLT : "#fff", letterSpacing: "-0.03em", textAlign: "center", lineHeight: 1 }}>
        {label}
      </div>
    </div>
  );
  return (
    <DarkScene dur={dur}>
      <Pop at={0} float={0} style={{ left: 0, right: 0, top: 230, display: "flex", justifyContent: "center" }}>
        <Chrome size={92}>SEGREGATED ACCOUNT</Chrome>
      </Pop>
      {card(<>DANA<br />PERUSAHAAN</>, "rekening", false, 1)}
      {card(<>DANA<br />NASABAH</>, "rekening", true, -1)}
      <div
        style={{
          position: "absolute",
          left: 538,
          top: 520,
          width: 4,
          height: 410 * split,
          background: "repeating-linear-gradient(180deg, #fff 0 18px, transparent 18px 32px)",
          opacity: split,
        }}
      />
    </DarkScene>
  );
};

/* 56.50s asuransi dana nasabah hingga 1 juta USD */
export const Insurance: React.FC<SceneProps> = ({ start, dur }) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [cue(57.8, start), cue(59.3, start)], [0, 1_000_000], { ...clamp, easing: easeOut });
  return (
    <DarkScene dur={dur}>
      <Glow x={540} y={520} r={430} opacity={0.65} />
      <Pop at={0} float={10} style={{ left: 200, top: 150, width: 680 }}>
        <Asset name="insurance.png" width={680} />
      </Pop>
      <div style={{ position: "absolute", top: 860, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Chrome size={150} volt style={{ opacity: interpolate(frame, [cue(57.6, start), cue(57.9, start)], [0, 1], clamp) }}>
          {`$${Math.round(v).toLocaleString("de-DE")}`}
        </Chrome>
      </div>
    </DarkScene>
  );
};

/* 67.58s forex, emas, komoditas */
export const Instruments: React.FC<SceneProps> = ({ start, dur }) => {
  const frame = useCurrentFrame();
  const chips = [
    { at: 67.98, t: "FOREX" },
    { at: 68.78, t: "EMAS" },
    { at: 69.62, t: "KOMODITAS" },
  ];
  return (
    <DarkScene dur={dur}>
      <Glow x={540} y={560} r={420} opacity={0.6} />
      <Pop at={0} float={10} style={{ left: 280, top: 170, width: 520 }}>
        <div style={{ rotate: `${Math.sin(frame / 20) * 4}deg` }}>
          <Asset name="instrumen.png" width={520} />
        </div>
      </Pop>
      <div style={{ position: "absolute", top: 960, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 20 }}>
        {chips.map((c, i) => {
          const lf = frame - cue(c.at, start);
          return (
            <div
              key={c.t}
              style={{
                opacity: interpolate(lf, [0, 4], [0, 1], clamp),
                scale: `${interpolate(lf, [0, 8], [0.6, 1], { ...clamp, easing: easeOut })}`,
                filter: `blur(${interpolate(lf, [0, 6], [8, 0], clamp)}px)`,
              }}
            >
              <Chip size={46} volt={i === 1}>
                {c.t}
              </Chip>
            </div>
          );
        })}
      </div>
    </DarkScene>
  );
};

/* Over-speaker sticker: HSB logo lockup with volt glow (reference: brand logo pop "TRING!") */
export const LogoPop: React.FC<{ dur: number; top?: number; width?: number; chip?: { at: number; text: string } }> = ({
  dur,
  top = 760,
  width = 640,
  chip,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Glow x={540} y={top + width * 0.17} r={width * 0.55} opacity={interpolate(frame, [0, 6, dur - 5, dur], [0, 0.8, 0.8, 0], clamp)} />
      <Pop at={0} dur={dur} float={6} style={{ left: 540 - width / 2, top, width }}>
        <Asset name="logo-volt-crop.png" width={width} style={{ filter: "drop-shadow(0 0 22px rgba(209,248,1,0.55))" }} />
      </Pop>
      {chip && (
        <Pop at={chip.at} dur={dur} float={4} style={{ left: 0, right: 0, top: top + width * 0.36 + 14, display: "flex", justifyContent: "center" }}>
          <Chip size={50} volt>
            {chip.text}
          </Chip>
        </Pop>
      )}
    </AbsoluteFill>
  );
};

/* Over-speaker sticker: any 3D asset */
export const AssetPop: React.FC<{ dur: number; name: string; width: number; top: number; left?: number }> = ({ dur, name, width, top, left }) => (
  <AbsoluteFill>
    <Glow x={(left ?? 540 - width / 2) + width / 2} y={top + width / 2} r={width * 0.6} opacity={0.55} />
    <Pop at={0} dur={dur} style={{ left: left ?? 540 - width / 2, top, width, filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}>
      <Asset name={name} width={width} />
    </Pop>
  </AbsoluteFill>
);

/* 1.70s "profit" — rising volt trend line across the frame (reference: green line at hook) */
export const ProfitLine: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const d = "M -40 760 L 180 620 L 300 690 L 470 470 L 600 540 L 790 300 L 900 360 L 1120 120";
  const len = 1900;
  const draw = interpolate(frame, [0, 18], [len, 0], { ...clamp, easing: easeOut });
  return (
    <AbsoluteFill style={{ opacity: interpolate(frame, [dur - 6, dur], [1, 0], clamp) }}>
      <svg width={1080} height={1920}>
        <path d={d} stroke={VOLT} strokeWidth={14} fill="none" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={draw} style={{ filter: "drop-shadow(0 0 16px rgba(209,248,1,0.9)) drop-shadow(0 0 40px rgba(209,248,1,0.5))" }} />
      </svg>
    </AbsoluteFill>
  );
};
