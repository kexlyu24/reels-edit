---
name: reels-edit
description: Finish a rough-cut vertical talking-head video (Reels/TikTok/Shorts) in the style of the user's reference edits - kinetic-typography subtitles with mixed fonts, motion-graphic cutaways, brand logo moments - built in Remotion for a localhost preview, exported to an editable After Effects project via an ExtendScript build script. Use this whenever the user has a Raw/rough-cut video plus a Reference folder and asks to add text, subtitles/captions, motion graphics, "style harus sama seperti reference", or convert the edit to After Effects - even if they only say "edit video ini".
---

# Reels edit pipeline

A short-form edit in four stages (sound design is out of scope - the user does it). The user is a video editor: they cut the raw themselves, they want
the *look* of their references, and they want to stay in control (preview first, they render).

## Ground rules (learned from the user, keep them)

- **Never change the raw's duration or cuts.** The raw is already rough-cut. Composition length =
  raw frame count exactly; the raw plays untouched underneath everything.
- **Don't render unless asked.** Preview in Remotion Studio on localhost. If a render was started,
  make sure no orphan `remotion render` / Chrome processes keep running after it is cancelled.
- **Style must match the references** - fonts, sizes, placement, motion. Identify fonts from the
  user's installed fonts before reaching for Google Fonts.
- **Brand mentions use the logo asset, not the word** (and never show the logo twice at once).
- **Don't add light leaks / colour flashes** - the user adds their own.
- Keep CTA elements inside the safe area (not glued to the bottom edge).
- In After Effects: **the user runs scripts themselves**; zoom lives on an **adjustment layer with a
  Transform effect**, never as keyframes on the raw layer.
- Talk to the user in Indonesian (casual), short status lines while working.

## Stage 1 - Study the inputs

1. `ffprobe` raw + references (duration, fps, frames, size). Note the raw frame count - it is law.
2. Contact sheets of each reference, 1 fps, timestamped:
   `ffmpeg -i ref.mp4 -vf "fps=1,scale=360:640,drawtext=text='%{pts\:hms}':x=8:y=8:fontsize=28:fontcolor=yellow:box=1:boxcolor=black@0.6,tile=5x2" sheet_%02d.jpg`
   Then crop text regions at full res to judge letterforms.
3. Fonts: list `%LOCALAPPDATA%\Microsoft\Windows\Fonts` and `C:\Windows\Fonts` unfiltered, pick
   serif/sans candidates, render them side by side with `scripts/font_compare.py` and compare to the
   reference crops (g, j, a, f, italic). Previous match: The Seasons (big serif), Helvetica (tight
   sans), Times New Roman (small serif), Helvetica Now Display (heavy caps hero words).
4. Assets folder (logos, 3D PNGs): check alpha by compositing over grey; sample the brand colour.

See `references/style-system.md` for the caption/motion system the references used.

## Stage 2 - Transcribe

`python scripts/transcribe.py raw.wav large-v3-turbo out.json` (faster-whisper, word timestamps,
language `id`; it loads the wav with numpy because the installed PyAV breaks faster-whisper's decoder).
Extract audio first: `ffmpeg -i Raw.mp4 -ac 1 -ar 16000 raw.wav`.
Fix brand/proper nouns by hand (e.g. ASB->HSB, BAPEPTI->BAPPEBTI), merge split tokens ("1-3", "1-5%"),
and **flag doubtful words to the user instead of guessing** (re-transcribe the slice with a prompt to test).

## Stage 3 - Build in Remotion, preview on localhost

Scaffold with the remotion skill (`npx create-video@latest --yes --blank --no-tailwind <dir>`), add
`@remotion/media @remotion/captions @remotion/fonts`, copy fonts + assets + raw into `public/`.
Start from the templates in `assets/remotion/src/` - they are a working edit:

- `captionData.ts` - word list + hand-authored PAGES (lines with style codes); `buildPages` consumes
  words in order and throws on any mismatch (keeps captions honest).
- `Captions.tsx` - kinetic page renderer (word blur-in, stacked mixed-font lines, logo-for-brand-word).
- `fx.tsx`, `scenes.tsx` - dark cutaway scenes, chrome headlines, pop/float, chips, glow.
- `Main.tsx` - raw `<Video>` full length + zoom keyframes + overlays + scenes + captions.

Rewrite PAGES, scenes and cue times for the new script; keep the components. Typecheck
(`npx tsc --noEmit`), check stills with `npx remotion still <id> out.jpg --frame=N --scale=0.5`
against reference crops, then open Studio (`.claude/launch.json` at the session root; use
`npm --prefix <dir> run dev -- --no-open --port=3000`) and hand the user the URL.

## Stage 4 - After Effects export (editable)

Template: `assets/ae/HSB_build.jsx` (+ `dump-ae.mjs` to dump pages/candles as ASCII-safe JSON into
its `DATA` placeholder). It builds into the open project: footage/asset folders, main comp with exact
frame count, raw + ZOOM adjustment layer, overlays, scene precomps, caption text layers with a
word-reveal Expression Selector, then saves an .aep (never overwrites). Read
`references/after-effects.md` before editing it - it lists the verified match names, font PostScript
names and the ExtendScript traps that already cost a crash each.

Hand the user the .jsx and the run steps (File > Scripts > Run Script File, new project first);
debug from the log file it writes, not by driving AE yourself.


## Done means

Duration/frame count identical to raw, user previewed (Remotion URL or their AE run), no render
unless asked, and every change reported with what was and wasn't verified.
