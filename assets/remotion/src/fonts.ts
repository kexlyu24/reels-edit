import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Font system matched to the reference edits (all files live in public/fonts)
export const SANS = "Helvetica Ref"; // tight-tracked Helvetica for plain caption lines
export const HEAD = "Helvetica Now Display"; // heavy caps for hero numbers / headlines
export const SEASONS = "The Seasons"; // big high-contrast serif for emphasis words
export const TIMES = "Times Ref"; // small condensed-looking serif lines

const fonts: { family: string; file: string; weight: string; style?: string }[] = [
  { family: SANS, file: "helvetica.ttf", weight: "400" },
  { family: SANS, file: "helvetica-bold.ttf", weight: "700" },
  { family: HEAD, file: "HelveticaNowDisplayMedium.otf", weight: "500" },
  { family: HEAD, file: "HelveticaNowDisplayBold.otf", weight: "700" },
  { family: HEAD, file: "HelveticaNowDisplayXBd.otf", weight: "800" },
  { family: HEAD, file: "HelveticaNowDisplayBlack.otf", weight: "900" },
  { family: SEASONS, file: "seasons-light.ttf", weight: "300" },
  { family: SEASONS, file: "seasons-regular.ttf", weight: "400" },
  { family: SEASONS, file: "seasons-bold.ttf", weight: "700" },
  { family: SEASONS, file: "seasons-light-italic.ttf", weight: "300", style: "italic" },
  { family: SEASONS, file: "seasons-italic.ttf", weight: "400", style: "italic" },
  { family: TIMES, file: "times.ttf", weight: "400" },
  { family: TIMES, file: "times-italic.ttf", weight: "400", style: "italic" },
];

fonts.forEach((f) =>
  loadFont({
    family: f.family,
    url: staticFile(`fonts/${f.file}`),
    weight: f.weight,
    style: f.style ?? "normal",
  }),
);
