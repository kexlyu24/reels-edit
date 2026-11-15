import os, sys
from PIL import Image, ImageDraw, ImageFont

U = os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\Windows\Fonts")
fonts = [
    ("The Seasons Regular", "The Seasons Regular.ttf"),
    ("The Seasons Light", "The Seasons Light.ttf"),
    ("The Seasons Italic", "The Seasons Italic.ttf"),
    ("Times New Normal", "Times New Normal Regular.ttf"),
    ("Tobias Light", "TobiasTRIAL-Light-BF6719af6e0a52b.otf"),
    ("Tobias RegItalic", "TobiasTRIAL-RegularItalic-BF6719af6d05a23.otf"),
    ("Vogue", "Vogue.ttf"),
    ("Classyvogue", "Classyvogueregular.ttf"),
    ("Helvetica", "Helvetica.ttf"),
    ("HelvNowDisp Medium", "HelveticaNowDisplayMedium.otf"),
    ("UntitledSans Medium", "UntitledSans-Medium.otf"),
]
samples = "kalau gaji  investasi  flat atau tetap  rahasianya  sama hasilnya  bersertifikat resmi  beli langsung"
W, H = 2400, 110 * len(fonts) + 20
img = Image.new("RGB", (W, H), (40, 40, 40))
d = ImageDraw.Draw(img)
lab = ImageFont.truetype(os.path.join(U, "Helvetica.ttf"), 22)
for i, (name, f) in enumerate(fonts):
    y = 10 + i * 110
    d.text((10, y + 40), name, font=lab, fill=(255, 220, 0))
    d.text((260, y), samples, font=ImageFont.truetype(os.path.join(U, f), 80), fill=(255, 255, 255))
img.save(sys.argv[1], quality=85)
