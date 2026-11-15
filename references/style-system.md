# Style system observed in the user's references (1080x1920, 30 fps)

## Captions (the core of the look)
- Position: block starts at y=1170 (chest area, below the face). End-card pages raised to ~1040 so a
  logo + CTA chip fit below. Lines centred with small x offsets (dx -200..+230) for a staggered stack.
- Lines overlap slightly: next line margin-top = -0.12 x its font size; line box ~1.08 x size.
- Words appear one by one at their spoken time: opacity 0->1 (5f), blur 14->0 (8f), translateY
  16/26px -> 0 and scale 1.06/1.14 -> 1 (9f), ease cubic-bezier(.16,1,.3,1). Page exits in 5f with blur.
- Each page mixes fonts per line; one emphasis word per page in big serif or heavy caps.

| code | role | font | size px | tracking |
|---|---|---|---|---|
| s | plain sans line | Helvetica | 70 | -0.045em |
| sb | bold sans | Helvetica Bold | 92 | -0.04em |
| t / ti | small serif (italic) | Times New Roman | 86 | -0.045em |
| d / db | big emphasis serif (bold) | The Seasons Regular/Bold | 158/160 | -0.035em |
| di | italic aside | The Seasons Light Italic | 100 | -0.02em |
| h | hero caps / numbers | Helvetica Now Display XBold | 132 | -0.035em |

Lines auto-shrink to fit 960px. Accent: brand colour text + glow (volt #D1F801 for HSB); red #FF5A4E
for negative words. Default text has a soft dark shadow. Hero caps without accent: chrome gradient.

## Motion graphics
- Full-screen dark cutaways (2-4 s) for key points: radial dark gradient, film grain, vignette,
  big chrome headline at top, 3D asset or simple data viz (grid + candles, donut, counter, split cards)
  in y 150-1100 so captions keep running below.
- Over-speaker stickers: 3D assets beside the head (not over the face), pop with spring overshoot + float.
- Brand mention = logo image inline in the caption line, with glow.
- Speaker punch-in zooms (1.08-1.14) at section starts, 6f ease-out, origin at the face (50% 32%).
- No light leaks / colour flashes (user adds them).
