import { Easing } from "remotion";

export const VOLT = "#D1F801"; // sampled from HSB volt logo
export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
