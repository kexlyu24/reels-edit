import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { buildPages, CapLine, CapPage, LineStyle, RAISED_FROM } from "./captionData";
import { HEAD, SANS, SEASONS, TIMES } from "./fonts";
import { VOLT } from "./style";

const STYLES: Record<LineStyle, { font: string; size: number; weight: number; italic?: boolean; ls: string; em: number }> = {
  s: { font: SANS, size: 70, weight: 400, ls: "-0.045em", em: 0.47 },
  sb: { font: SANS, size: 92, weight: 700, ls: "-0.04em", em: 0.52 },
  t: { font: TIMES, size: 86, weight: 400, ls: "-0.045em", em: 0.4 },
  ti: { font: TIMES, size: 86, weight: 400, italic: true, ls: "-0.04em", em: 0.4 },
  d: { font: SEASONS, size: 158, weight: 400, ls: "-0.035em", em: 0.44 },
  db: { font: SEASONS, size: 160, weight: 700, ls: "-0.03em", em: 0.47 },
  di: { font: SEASONS, size: 100, weight: 300, italic: true, ls: "-0.02em", em: 0.42 },
  h: { font: HEAD, size: 132, weight: 800, ls: "-0.035em", em: 0.64 },
};

const MAX_W = 960;
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const accentStyle = (line: CapLine): React.CSSProperties => {
  if (line.accent === "volt") {
    return line.style === "h"
      ? {
          backgroundImage: `linear-gradient(180deg, #F4FFB0 0%, ${VOLT} 70%, #A8C800 100%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          filter: `drop-shadow(0 0 16px rgba(209,248,1,0.7)) drop-shadow(0 0 40px rgba(209,248,1,0.35))`,
        }
      : { color: "#E6FF5E", textShadow: "0 0 18px rgba(209,248,1,0.75), 0 0 44px rgba(209,248,1,0.4)" };
  }
  if (line.accent === "red") {
    return { color: "#FF5A4E", textShadow: "0 0 18px rgba(255,60,40,0.7), 0 0 44px rgba(255,40,20,0.35)" };
  }
  if (line.style === "h") {
    return {
      backgroundImage: "linear-gradient(180deg, #FFFFFF 25%, #B9B9B9 75%, #8C8C8C 100%)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      filter: "drop-shadow(0 0 14px rgba(255,255,255,0.35)) drop-shadow(0 4px 14px rgba(0,0,0,0.45))",
    };
  }
  return { color: "#FFFFFF", textShadow: "0 3px 18px rgba(0,0,0,0.45), 0 0 2px rgba(0,0,0,0.25)" };
};

const Line: React.FC<{ line: CapLine; pageStart: number; first: boolean }> = ({ line, pageStart, first }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const st = STYLES[line.style];
  const chars = line.words.map((w) => w.text).join(" ").length;
  const size = Math.min(st.size, MAX_W / (chars * st.em));
  const accent = accentStyle(line);
  const big = line.style === "d" || line.style === "db" || line.style === "h";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "0.24em",
        whiteSpace: "nowrap",
        fontFamily: st.font,
        fontWeight: st.weight,
        fontStyle: st.italic ? "italic" : "normal",
        fontSize: size,
        letterSpacing: st.ls,
        lineHeight: 1,
        translate: `${line.dx}px 0px`,
        marginTop: first ? 0 : -size * 0.12,
      }}
    >
      {line.words.map((w, i) => {
        const lf = frame - (w.at - pageStart) * fps;
        // Brand mentions show the HSB logo asset instead of the word
        const logo = w.text === "HSB";
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              paddingBottom: "0.08em",
              ...(logo ? {} : accent),
              opacity: interpolate(lf, [0, 5], [0, 1], clamp),
              translate: `0px ${interpolate(lf, [0, 9], [big ? 26 : 16, 0], { ...clamp, easing: ease })}px`,
              scale: interpolate(lf, [0, 9], [big ? 1.14 : 1.06, 1], { ...clamp, easing: ease }),
              filter: [
                `blur(${interpolate(lf, [0, 8], [14, 0], { ...clamp, easing: ease })}px)`,
                logo ? "drop-shadow(0 0 16px rgba(209,248,1,0.6)) drop-shadow(0 0 40px rgba(209,248,1,0.3))" : accent.filter,
              ]
                .filter(Boolean)
                .join(" "),
            }}
          >
            {logo ? <Img src={staticFile("assets/logo-volt-crop.png")} style={{ height: Math.max(size * 0.8, 76), display: "block" }} /> : w.text}
          </span>
        );
      })}
    </div>
  );
};

const Page: React.FC<{ page: CapPage; dur: number }> = ({ page, dur }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: page.start >= RAISED_FROM ? 1040 : 1170,
        opacity: interpolate(frame, [dur - 5, dur], [1, 0], clamp),
        filter: `blur(${interpolate(frame, [dur - 5, dur], [0, 12], clamp)}px)`,
      }}
    >
      {page.lines.map((l, i) => (
        <Line key={i} line={l} pageStart={page.start} first={i === 0} />
      ))}
    </AbsoluteFill>
  );
};

export const Captions: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const pages = React.useMemo(() => buildPages(durationInFrames / fps), [fps, durationInFrames]);
  return (
    <AbsoluteFill name="Captions">
      {pages.map((p, i) => {
        const from = Math.round(p.start * fps);
        const dur = Math.round(p.end * fps) - from;
        return (
          <Sequence key={i} name={`cap ${p.lines.map((l) => l.words.map((w) => w.text).join(" ")).join(" ")}`} from={from} durationInFrames={dur}>
            <Page page={p} dur={dur} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
