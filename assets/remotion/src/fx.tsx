import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { HEAD } from "./fonts";
import { clamp, easeOut, VOLT } from "./style";

// Animated film grain via SVG turbulence (seed changes every frame)
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.12 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <filter id={`g${frame}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 60} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#g${frame})`} />
      </svg>
    </AbsoluteFill>
  );
};

// Full-screen dark cut-away (reference: black/vignette backgrounds with grain behind 3D assets)
export const DarkScene: React.FC<{ dur: number; children: React.ReactNode; tint?: string }> = ({ dur, children, tint = "#1d1f1a" }) => {
  const frame = useCurrentFrame();
  const inOut = interpolate(frame, [0, 4, dur - 4, dur], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill
      style={{
        opacity: inOut,
        filter: `blur(${interpolate(inOut, [0, 1], [18, 0])}px)`,
        background: `radial-gradient(70% 55% at 50% 38%, ${tint} 0%, #0b0b0b 60%, #000 100%)`,
      }}
    >
      <AbsoluteFill style={{ scale: interpolate(frame, [0, dur], [1.04, 1]) }}>{children}</AbsoluteFill>
      <Grain opacity={0.16} />
      <AbsoluteFill style={{ background: "radial-gradient(90% 70% at 50% 45%, transparent 55%, rgba(0,0,0,0.75) 100%)" }} />
    </AbsoluteFill>
  );
};

// Heavy caps headline with chrome gradient + glow (reference: "SIMULASIKAN DETAIL", "BANYAK CARA")
export const Chrome: React.FC<{ children: React.ReactNode; size: number; volt?: boolean; style?: React.CSSProperties }> = ({
  children,
  size,
  volt,
  style,
}) => (
  <div
    style={{
      fontFamily: HEAD,
      fontWeight: 800,
      fontSize: size,
      letterSpacing: "-0.04em",
      lineHeight: 0.95,
      textAlign: "center",
      whiteSpace: "nowrap",
      backgroundImage: volt
        ? `linear-gradient(180deg, #F4FFB0 0%, ${VOLT} 65%, #9DBB00 100%)`
        : "linear-gradient(180deg, #FFFFFF 20%, #BDBDBD 70%, #7E7E7E 100%)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      filter: volt
        ? "drop-shadow(0 0 18px rgba(209,248,1,0.65)) drop-shadow(0 0 50px rgba(209,248,1,0.3))"
        : "drop-shadow(0 0 16px rgba(255,255,255,0.3))",
      ...style,
    }}
  >
    {children}
  </div>
);

// Spring pop-in + gentle float, used for 3D assets / logo stickers
export const Pop: React.FC<{
  at?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  float?: number;
  dur?: number;
}> = ({ at = 0, children, style, float = 12, dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 12, stiffness: 140, mass: 0.8 } });
  const out = dur ? interpolate(frame, [dur - 5, dur], [1, 0], clamp) : 1;
  return (
    <div
      style={{
        position: "absolute",
        ...style,
        opacity: Math.min(interpolate(frame - at, [0, 4], [0, 1], clamp), out),
        scale: `${s * (dur ? interpolate(out, [0, 1], [0.85, 1]) : 1)}`,
        translate: `0px ${Math.sin((frame - at) / 14) * float}px`,
        filter: `blur(${interpolate(frame - at, [0, 6], [10, 0], { ...clamp, easing: easeOut }) + (1 - out) * 10}px)`,
      }}
    >
      {children}
    </div>
  );
};

export const Glow: React.FC<{ x: number; y: number; r: number; color?: string; opacity?: number }> = ({
  x,
  y,
  r,
  color = "rgba(209,248,1,0.55)",
  opacity = 1,
}) => (
  <div
    style={{
      position: "absolute",
      left: x - r,
      top: y - r,
      width: r * 2,
      height: r * 2,
      borderRadius: "50%",
      opacity,
      background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
      filter: "blur(30px)",
    }}
  />
);

export const Asset: React.FC<{ name: string; width: number; style?: React.CSSProperties }> = ({ name, width, style }) => (
  <Img src={staticFile(`assets/${name}`)} style={{ width, display: "block", ...style }} />
);

// Small pill chip label (regulator names, instrument names)
export const Chip: React.FC<{ children: React.ReactNode; volt?: boolean; size?: number }> = ({ children, volt, size = 44 }) => (
  <div
    style={{
      fontFamily: HEAD,
      fontWeight: 700,
      fontSize: size,
      letterSpacing: "-0.02em",
      padding: `${size * 0.32}px ${size * 0.62}px`,
      borderRadius: 999,
      color: volt ? "#0b0b0b" : "#fff",
      background: volt ? VOLT : "rgba(255,255,255,0.08)",
      border: volt ? "none" : "2px solid rgba(255,255,255,0.35)",
      boxShadow: volt ? "0 0 30px rgba(209,248,1,0.55)" : "0 8px 30px rgba(0,0,0,0.5)",
      backdropFilter: "blur(8px)",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);
