import React from "react";
import { Video } from "@remotion/media";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Captions } from "./Captions";
import { AssetPop, Backtest, Insurance, Instruments, LogoPop, Pillars, ProfitLine, Regulators, Risk, Segregated, ThreeThings } from "./scenes";
import { easeOut, sec } from "./style";

// Punch-in zoom keyframes [sec, scale] on the talking head (jump-zoom feel from the references)
const ZOOMS: [number, number][] = [
  [0, 1.0], [1.7, 1.12], [4.62, 1.0], [7.2, 1.08], [9.62, 1.0], [14.36, 1.1], [19.6, 1.0], [23.7, 1.1],
  [27.78, 1.0], [29.98, 1.12], [31.26, 1.0], [38.44, 1.08], [42.2, 1.0], [44.8, 1.1], [50.38, 1.0],
  [54.94, 1.1], [60.34, 1.14], [62.26, 1.0], [65.38, 1.08], [70.96, 1.0], [72.98, 1.1], [74.86, 1.0],
  [76.5, 1.08], [78.58, 1.0], [80.8, 1.1],
];

const zoomAt = (frame: number) => {
  let k = 0;
  while (k + 1 < ZOOMS.length && sec(ZOOMS[k + 1][0]) <= frame) k++;
  const [t, s] = ZOOMS[k];
  const prev = k > 0 ? ZOOMS[k - 1][1] : s;
  const f0 = sec(t);
  const settle = interpolate(frame, [f0, f0 + 6], [prev, s], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
  return settle + (frame - f0) * 0.0002; // slow creep keeps static shots alive
};

// [start sec, end sec, component]
const SCENES: [number, number, React.FC<{ start: number; dur: number }>][] = [
  [13.0, 14.36, ThreeThings],
  [16.06, 19.5, Backtest],
  [25.5, 27.7, Risk],
  [34.28, 38.3, Pillars],
  [47.9, 50.38, Regulators],
  [52.76, 54.86, Segregated],
  [56.5, 59.9, Insurance],
  [67.58, 70.4, Instruments],
];

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <AbsoluteFill name="Speaker" style={{ scale: `${zoomAt(frame)}`, transformOrigin: "50% 32%" }}>
        <Video src={staticFile("raw.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>

      <Sequence name="Profit line" from={sec(1.78)} durationInFrames={sec(1.6)}>
        <ProfitLine dur={sec(1.6)} />
      </Sequence>
      <Sequence name="Partnership" from={sec(76.5)} durationInFrames={sec(78.58) - sec(76.5)}>
        <AssetPop dur={sec(78.58) - sec(76.5)} name="partnership.png" width={400} top={560} left={680} />
      </Sequence>
      {/* End card starts after the "dengan [logo]" caption page so the logo never shows twice at once */}
      <Sequence name="CTA" from={sec(80.8)}>
        <LogoPop dur={sec(82.87) - sec(80.8) + 10} width={460} top={1390} chip={{ at: sec(81.48) - sec(80.8), text: "LINK DI BIO ↗" }} />
      </Sequence>

      {SCENES.map(([s, e, C]) => (
        <Sequence key={s} name={C.displayName ?? C.name} from={sec(s)} durationInFrames={sec(e) - sec(s)}>
          <C start={s} dur={sec(e) - sec(s)} />
        </Sequence>
      ))}

      <Captions />
    </AbsoluteFill>
  );
};
