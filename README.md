# reels-edit

Skill Claude untuk menyelesaikan video vertikal talking-head (Reels / TikTok / Shorts) yang sudah di-rough-cut:
subtitle kinetic, text, dan motion graphics dengan style yang sama seperti video reference. Hasilnya bisa
di-preview di localhost (Remotion), lalu di-export ke project After Effects yang semua layernya bisa diedit.

> Sound design (SFX & backsound) **tidak** termasuk dalam skill ini, karena dikerjakan sendiri oleh editor.

---

## Instalasi

**Claude Code (PC ini / PC lain)**
Ekstrak `reels-edit.skill` (isinya zip) ke:
```
C:\Users\<nama>\.claude\skills\
```
sehingga hasilnya `...\.claude\skills\reels-edit\SKILL.md`.

**claude.ai / Claude desktop**
Settings → Capabilities → Skills → hapus versi lama (kalau ada) → **Upload skill** → pilih `reels-edit.skill`.

### Kebutuhan di PC
- Node.js 20+ dan ffmpeg / ffprobe di PATH
- Python 3.10+ dengan `faster-whisper` dan `Pillow`
- Adobe After Effects 2024+ (untuk tahap export AE), dengan *Allow Scripts to Write Files and Access Network* aktif
- Font yang dipakai reference sudah ter-install (contoh: The Seasons, Helvetica, Helvetica Now Display, Times New Roman)

---

## Persiapan folder project

```
NamaProject/
  Raw/        <- video yang sudah kamu rough-cut (durasinya TIDAK akan diubah)
  Reference/  <- 1-3 video contoh style
  Assets/     <- logo brand & aset PNG transparan (opsional)
```

---

## Cara pakai

1. Buka **Claude Code** dengan folder project sebagai working directory.
2. Tulis permintaanmu seperti biasa, misalnya:
   > edit video di folder Raw, kasih text, motion graphics, subtitle. Style harus sama kayak di folder Reference, font juga. Jangan ubah durasi.

   Kalau skill tidak terpakai otomatis, tambahkan **"pakai skill reels-edit"**.

### Alur kerja

| Tahap | Yang dilakukan Claude | Yang kamu lakukan |
|---|---|---|
| 1. Analisis | Melihat video reference, mencocokkan font dengan yang ter-install di PC | - |
| 2. Transkrip | Membuat subtitle per kata dengan timing dari audio raw | Menjawab kalau ada kata yang meragukan |
| 3. Preview | Membangun edit di Remotion dan membuka Studio di `http://localhost:...` | Cek dan minta revisi lewat chat |
| 4. After Effects | Membuat script `.jsx` yang membangun project AE | Jalankan scriptnya sendiri di AE, lalu cek |
| 5. Render & sound | - | Render dan sound design sendiri |

### Menjalankan script After Effects
1. Di AE: **File → New → New Project** (jangan disimpan kalau ada project setengah jadi)
2. **File → Scripts → Run Script File…** → pilih file `.jsx` yang dibuat Claude
3. Hasilnya tersimpan sebagai `.aep` baru (file lama tidak ditimpa). Kalau ada error, kirim isi file `.log` di sebelah script ke Claude.

### Hasil di After Effects
- **Comp utama:** durasinya persis sama dengan raw. Isinya:
  - raw video (tanpa keyframe)
  - **adjustment layer ZOOM (Transform)** untuk punch-in zoom
  - subtitle sebagai text layer
  - overlay
- **Subtitle:** animasi per kata ada di Animator "Reveal". Waktu tiap kata bisa diedit di `T=[...]` pada expression-nya.
- **Brand:** setiap kali brand disebut, katanya diganti image logo.
- **Scene cutaway:** masing-masing jadi precomp di folder `Scenes/`.

---

## Aturan bawaan skill
- Durasi dan potongan raw tidak diubah sama sekali.
- Tidak ada render tanpa diminta; selalu preview dulu.
- Style mengikuti reference (font, ukuran, posisi, gerakan).
- Kata brand diganti logo, dan logo tidak pernah muncul dobel di layar.
- Tanpa light leak / flash warna (ditambahkan sendiri oleh editor).
- CTA tetap di area aman, tidak mepet ke bawah.
- Script AE dijalankan sendiri oleh user.

## Tips revisi
- Sebutkan detik dan masalahnya, misalnya: *"detik 01:20 logonya terlalu kebawah"*, *"hsb-nya dobel"*, *"hapus lightleak"*.
- Taruh logo brand di `Assets/`, nanti otomatis dipakai menggantikan kata brand di subtitle.

---

## Isi skill

```
reels-edit/
  SKILL.md                      alur kerja + aturan
  README.md                     file ini
  references/
    style-system.md             sistem caption & motion dari reference
    after-effects.md            nama font, match name, jebakan ExtendScript
  scripts/
    transcribe.py               transkrip per kata (faster-whisper)
    font_compare.py             render perbandingan font
  assets/
    remotion/src/               komponen Remotion (template dari project HSB)
    ae/HSB_build.jsx            contoh script build After Effects
    ae/dump-ae.mjs              dump data caption untuk script AE
```

Template di `assets/` berasal dari project HSB. Scene di dalamnya (3 HAL, backtest, regulator, dll.)
hanya contoh, dan akan dibuat ulang sesuai naskah video berikutnya.
