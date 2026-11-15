# After Effects export - verified facts (AE 2026, en_US)

## Running
- `AfterFX.exe -r script.jsx` did NOT execute reliably; File > Scripts > Run Script File does.
  The user prefers to run scripts themselves - give them the path and steps.
- "Allow Scripts to Write Files and Access Network" must be on (pref `Pref_SCRIPTING_FILE_NETWORK_SECURITY`).
- Build into the open project; abort if the main comp already exists (a failed half run leaves one:
  tell the user to start a New Project). Save to a new .aep name, never overwrite.
- No dialogs in automated runs; log to a file next to the script with open("a")/close per line so
  the log survives a crash.

## ExtendScript traps (each caused a real failure)
1. `"text" + errorObject` throws "Object of type Error found where a Number, Array, or Property is
   needed" (AE operator overloading) - always `e.toString()`.
2. Adding an effect invalidates previously fetched property objects of that layer - fetch transform
   props fresh after `addProperty` (helper `T(layer, matchName)`).
3. `setTemporalEaseAtKey` needs one KeyframeEase per dimension (Scale = 3) but one for spatial props;
   derive dims from `prop.keyValue(1).length` and `prop.isSpatial`, not `propertyValueType`.
4. `textDocument.font = "anything"` never errors; check `st.value.fontObject.isSubstitute`.
5. Keep the .jsx pure ASCII (escape non-ASCII as \uXXXX); ES3 only (no let/const/arrow/forEach/JSON).
6. Color properties accept [r,g,b] 0-1. Drop Shadow opacity param is 0-255.

## Font PostScript names (from app.fonts.allFonts)
Helvetica, Helvetica-Bold, TimesNewRomanPSMT, TimesNewRomanPS-ItalicMT,
The-Seasons-Regular / -Bold / -Light / -Italic / -Light-Italic (hyphens, not the spaced names in the file),
HelveticaNowDisplay-Md / -Bd / -XBd / -Blk.

## Match names used
Text: ADBE Text Properties > ADBE Text Document, ADBE Text Animators > ADBE Text Animator >
(ADBE Text Animator Properties: ADBE Text Opacity, ADBE Text Blur, ADBE Text Position 3D, ADBE Text Scale 3D;
ADBE Text Selectors > ADBE Text Expressible Selector: ADBE Text Range Type2 (3 = words), ADBE Text Expressible Amount).
Effects: ADBE Gaussian Blur 2 (1 Blurriness, 3 Repeat Edge), ADBE Drop Shadow (1 color, 2 opacity 0-255,
3 direction, 4 distance, 5 softness), ADBE Ramp (1 start, 2 start color, 3 end, 4 end color, 5 shape 2=radial),
ADBE Noise (1 amount %, 2 color noise), ADBE Wave Warp (2 height, 3 width, 5 speed), ADBE Geometry2 =
Transform (1 anchor, 2 position, 3 uniform scale, 4 scale).
Shapes: ADBE Root Vectors Group > ADBE Vector Group > ADBE Vectors Group; ADBE Vector Shape - Rect/Ellipse/Group,
ADBE Vector Graphic - Fill/Stroke, ADBE Vector Filter - Trim. Audio: ADBE Audio Group > ADBE Audio Levels.

## Not identical to the Remotion preview
Chrome gradient text -> flat fill + glow; no zoom creep; grid wobble via Wave Warp; no vignette.
Word reveal times live in each caption layer's selector expression `T=[...]` (seconds after in-point).
