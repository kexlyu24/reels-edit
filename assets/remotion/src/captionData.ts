// Word timings from whisper large-v3-turbo on Raw.mp4, hand-corrected
// (ASB -> HSB, BAPEPTI -> BAPPEBTI, komunitas -> komoditas, split tokens merged).
const TRANSCRIPT = `
buat 0.00|yang 0.12|lagi 0.22|belajar 0.36|trading 0.62|harus 1.04|sadar 1.16|guys 1.44|
kalau 1.70|profit 1.78|itu 2.20|bukan 2.38|satu-satunya 2.56|hal 3.20|yang 3.48|harus 3.58|kita 3.72|perhatiin 3.90|
ada 4.62|hal 4.76|lain 4.90|yang 5.08|gak 5.20|kalah 5.28|penting 5.44|yaitu 5.80|milih 6.02|broker 6.28|yang 6.56|tepat 6.70|
aku 7.20|sendiri 7.40|3 7.64|bulan 7.82|terakhir 8.04|ini 8.32|pakai 8.50|aplikasi 8.72|HSB 9.08|
aku 9.62|mau 9.74|sharing 9.88|nih 10.20|hal-hal 10.40|penting 10.80|untuk 11.28|kamu 11.78|yang 12.04|baru 12.18|mulai 12.38|
pastiin 13.00|dulu 13.28|3 13.50|hal 13.70|ini 13.92|
satu, 14.36|harus 14.66|punya 14.84|strategi 15.02|yang 15.42|bagus 15.52|dan 15.82|udah 16.06|dilakuin 16.30|backtest 16.68|di 17.16|aplikasi 17.32|demo 17.74|1–3 18.12|bulan 19.06|
termasuk 19.60|di 19.92|dalamnya 20.08|memilih 20.42|jenis 20.76|trading 21.00|waktu 21.66|trading 21.88|dan 22.46|juga 22.52|instrumen 22.74|tradingnya 23.16|
yang 23.70|kedua, 24.04|disiplin 24.42|mengatur 24.84|risiko 25.14|1–5% 25.58|setiap 26.86|trade 27.52|dan 27.78|juga 28.06|menjurnal 28.44|atau 29.16|dicatat 29.38|
tiga, 29.98|kamu 30.38|harus 30.54|memahami 30.70|nih 31.12|platform 31.26|dan 31.72|juga 31.98|broker 32.20|tempat 32.58|kamu 33.08|melakukan 33.30|transaksi 33.60|
mulai 34.28|dari 34.48|legalitas, 34.62|keamanan 35.42|dana, 35.90|sampai 36.50|fasilitas 36.92|yang 37.52|disediain 37.66|
nah, 38.44|itu 38.64|juga 38.76|yang 38.96|menjadi 39.12|salah 39.34|satu 39.54|alasan 39.74|kenapa 40.14|aku 40.52|masih 40.70|pakai 40.90|aplikasi 41.18|HSB 41.60|
yang 42.20|pertama, 42.32|soal 42.72|legalitas 42.84|HSB 43.22|udah 43.70|memiliki 43.92|perizinan 44.26|dan 44.80|juga 45.00|dalam 45.16|pengawasan 45.38|
sesuai 46.08|ketentuan 46.42|regulator 46.80|terkait 47.20|seperti 47.92|BAPPEBTI 48.10|OJK 48.98|dan 49.64|juga 49.78|BI 50.04|
yang 50.38|kedua, 50.92|pengelolaan 51.32|dana 51.66|nasabahnya 51.80|ditempatkan 52.24|di 52.76|segregated 52.84|account 53.14|atau 53.72|rekening 54.10|terpisah 54.42|
menariknya, 54.94|HSB 55.34|juga 55.58|memiliki 55.82|fitur 56.22|perlindungan 56.50|asuransi 57.10|dana 57.80|nasabah 58.06|hingga 58.68|1 59.14|juta 59.36|USD 59.56|
perlu 60.34|dicatat 60.60|guys, 60.92|perlindungan 61.20|ini 61.58|bukan 61.76|untuk 62.04|menanggung 62.26|kerugian 62.72|yang 63.30|berasal 63.60|dari 64.14|aktivitas 64.36|trading 64.78|
dan 65.38|dari 65.52|sisi 65.72|produk 65.94|instrumennya 66.46|juga 66.90|beragam 67.10|mulai 67.58|dari 67.78|forex, 67.98|emas, 68.78|hingga 69.30|komoditas 69.62|lain 70.10|
jadi 70.96|guys, 71.12|trading 71.36|itu 71.52|bukan 71.70|cuma 71.92|bagaimana 72.20|kita 72.76|mencari 72.98|keuntungan 73.38|atau 73.98|profit 74.22|
tapi 74.86|bagaimana 75.12|juga 75.54|kita 75.80|untuk 76.26|memahami 76.50|tempat 76.98|kita 77.46|bertransaksi 77.76|
kalau 78.58|mau 78.88|kenalan 79.02|lebih 79.32|jauh 79.52|dengan 79.88|HSB 80.02|klik 80.80|aja 81.26|link 81.48|yang 81.76|ada 81.92|di 82.10|bio 82.24|ya 82.50`;

export const WORDS = TRANSCRIPT.split("|")
  .map((w) => w.trim())
  .filter(Boolean)
  .map((w) => {
    const i = w.lastIndexOf(" ");
    return { text: w.slice(0, i), at: Number(w.slice(i + 1)) };
  });

// Line styles (see Captions.tsx): s sans · sb sans bold · t times · ti times italic
// d seasons · db seasons bold · di seasons italic · h heavy caps hero
export type LineStyle = "s" | "sb" | "t" | "ti" | "d" | "db" | "di" | "h";
export type Accent = "volt" | "red";
type LineSpec = [LineStyle, string, { dx?: number; c?: Accent }?];

// One entry = one caption page; text must follow the transcript word order exactly.
const PAGES: LineSpec[][] = [
  [["s", "buat yang lagi belajar", { dx: -40 }], ["d", "trading", { dx: 60 }]],
  [["s", "harus sadar", { dx: -70 }], ["di", "guys", { dx: 110 }]],
  [["s", "kalau", { dx: -170 }], ["h", "PROFIT", { c: "volt" }], ["t", "itu bukan satu-satunya", { dx: 40 }]],
  [["s", "hal yang harus kita", { dx: -50 }], ["d", "perhatiin", { dx: 50 }]],
  [["t", "ada hal lain yang", { dx: -80 }], ["s", "gak kalah", { dx: 90 }], ["db", "penting"]],
  [["s", "yaitu milih", { dx: -110 }], ["d", "broker"], ["di", "yang tepat", { dx: 120, c: "volt" }]],
  [["s", "aku sendiri", { dx: -120 }], ["h", "3 BULAN", { c: "volt" }], ["t", "terakhir ini", { dx: 110 }]],
  [["s", "pakai aplikasi", { dx: -60 }], ["db", "HSB", { dx: 80, c: "volt" }]],
  [["t", "aku mau sharing nih", { dx: -60 }], ["d", "hal-hal penting", { dx: 30 }]],
  [["s", "untuk kamu yang", { dx: -70 }], ["di", "baru mulai", { dx: 80 }]],
  [["s", "pastiin dulu", { dx: -90 }], ["h", "3 HAL INI", { c: "volt" }]],
  [["s", "satu, harus punya", { dx: -80 }], ["d", "strategi"], ["ti", "yang bagus", { dx: 130 }]],
  [["s", "dan udah dilakuin", { dx: -60 }], ["db", "backtest", { dx: 40, c: "volt" }]],
  [["t", "di aplikasi demo", { dx: -60 }], ["h", "1–3 BULAN", { c: "volt" }]],
  [["s", "termasuk di dalamnya", { dx: -40 }], ["d", "memilih", { dx: 60 }]],
  [["t", "jenis trading", { dx: -110 }], ["t", "waktu trading", { dx: 110 }]],
  [["s", "dan juga", { dx: -150 }], ["d", "instrumen"], ["ti", "tradingnya", { dx: 140 }]],
  [["s", "yang kedua,", { dx: -100 }], ["db", "disiplin", { dx: 40 }]],
  [["t", "mengatur risiko", { dx: -70 }], ["h", "1–5%", { c: "volt" }]],
  [["s", "setiap", { dx: -130 }], ["d", "trade", { dx: 50 }]],
  [["s", "dan juga", { dx: -120 }], ["d", "menjurnal"], ["di", "atau dicatat", { dx: 120 }]],
  [["s", "tiga, kamu harus", { dx: -80 }], ["d", "memahami"], ["t", "nih", { dx: 230 }]],
  [["db", "platform", { dx: -40 }], ["s", "dan juga broker", { dx: 90 }]],
  [["t", "tempat kamu melakukan", { dx: -30 }], ["d", "transaksi", { dx: 40 }]],
  [["s", "mulai dari", { dx: -110 }], ["db", "legalitas,", { dx: 30, c: "volt" }]],
  [["d", "keamanan dana,"]],
  [["s", "sampai", { dx: -160 }], ["d", "fasilitas"], ["ti", "yang disediain", { dx: 110 }]],
  [["s", "nah, itu juga", { dx: -80 }], ["t", "yang menjadi", { dx: 90 }]],
  [["t", "salah satu", { dx: -120 }], ["d", "alasan"], ["s", "kenapa", { dx: 150 }]],
  [["s", "aku masih pakai", { dx: -60 }], ["t", "aplikasi", { dx: -40 }], ["db", "HSB", { dx: 120, c: "volt" }]],
  [["s", "yang pertama, soal", { dx: -40 }], ["d", "legalitas", { dx: 40 }]],
  [["s", "HSB udah memiliki", { dx: -50 }], ["d", "perizinan", { dx: 50 }]],
  [["t", "dan juga dalam", { dx: -80 }], ["db", "pengawasan", { dx: 30 }]],
  [["s", "sesuai ketentuan", { dx: -90 }], ["d", "regulator"], ["ti", "terkait", { dx: 170 }]],
  [["t", "seperti", { dx: -170 }], ["h", "BAPPEBTI OJK", { c: "volt" }], ["s", "dan juga", { dx: -60 }], ["h", "BI", { dx: 90, c: "volt" }]],
  [["s", "yang kedua,", { dx: -120 }], ["d", "pengelolaan"], ["t", "dana nasabahnya", { dx: 100 }]],
  [["s", "ditempatkan di", { dx: -110 }], ["db", "segregated", { c: "volt" }], ["di", "account", { dx: 150 }]],
  [["t", "atau rekening", { dx: -100 }], ["d", "terpisah", { dx: 60 }]],
  [["di", "menariknya,", { dx: -90 }], ["s", "HSB juga memiliki", { dx: 60 }]],
  [["s", "fitur", { dx: -200 }], ["d", "perlindungan"], ["t", "asuransi", { dx: 170 }]],
  [["s", "dana nasabah hingga", { dx: -40 }], ["h", "1 JUTA USD", { c: "volt" }]],
  [["s", "perlu dicatat", { dx: -60 }], ["di", "guys,", { dx: 120 }]],
  [["t", "perlindungan ini", { dx: -70 }], ["db", "bukan untuk", { dx: 40 }]],
  [["s", "menanggung", { dx: -110 }], ["d", "kerugian", { dx: 50, c: "red" }]],
  [["t", "yang berasal dari", { dx: -70 }], ["d", "aktivitas trading"]],
  [["s", "dan dari sisi", { dx: -90 }], ["d", "produk", { dx: 70 }]],
  [["t", "instrumennya juga", { dx: -60 }], ["db", "beragam", { dx: 60, c: "volt" }]],
  [["s", "mulai dari", { dx: -130 }], ["d", "forex, emas,", { dx: 20 }]],
  [["s", "hingga", { dx: -170 }], ["d", "komoditas"], ["di", "lain", { dx: 200 }]],
  [["s", "jadi guys,", { dx: -110 }], ["d", "trading itu", { dx: 40 }]],
  [["t", "bukan cuma", { dx: -100 }], ["s", "bagaimana kita", { dx: 80 }]],
  [["s", "mencari", { dx: -170 }], ["d", "keuntungan"], ["di", "atau profit", { dx: 140 }]],
  [["s", "tapi bagaimana juga", { dx: -50 }], ["t", "kita untuk", { dx: 110 }]],
  [["s", "memahami tempat kita", { dx: -30 }], ["db", "bertransaksi", { c: "volt" }]],
  [["s", "kalau mau kenalan", { dx: -60 }], ["d", "lebih jauh", { dx: 50 }]],
  [["t", "dengan", { dx: -120 }], ["h", "HSB", { dx: 60, c: "volt" }]],
  [["s", "klik aja", { dx: -130 }], ["d", "link"], ["ti", "yang ada di bio ya", { dx: 90 }]],
];

// CTA pages ("dengan HSB", "klik aja link...") sit higher so the logo + LINK DI BIO chip fit under them
export const RAISED_FROM = 79.88;

export type CapWord = { text: string; at: number };
export type CapLine = { style: LineStyle; dx: number; accent?: Accent; words: CapWord[] };
export type CapPage = { start: number; end: number; lines: CapLine[] };

const norm = (s: string) => s.toLowerCase().replace(/[,.]/g, "");

// Consume WORDS in order; throws if a page's text drifts from the transcript.
export const buildPages = (totalSec: number): CapPage[] => {
  let i = 0;
  const pages = PAGES.map((spec) => {
    const lines = spec.map(([style, text, opt]) => ({
      style,
      dx: opt?.dx ?? 0,
      accent: opt?.c,
      words: text.split(" ").map((t) => {
        const w = WORDS[i++];
        if (!w || norm(w.text) !== norm(t)) {
          throw new Error(`Caption mismatch at word ${i - 1}: "${t}" vs "${w?.text}"`);
        }
        return { text: t, at: w.at };
      }),
    }));
    return { start: lines[0].words[0].at, end: 0, lines };
  });
  if (i !== WORDS.length) throw new Error(`Captions cover ${i}/${WORDS.length} words`);
  pages.forEach((p, k) => {
    const ll = p.lines[p.lines.length - 1];
    const last = ll.words[ll.words.length - 1].at;
    const next = pages[k + 1]?.start ?? totalSec;
    p.end = Math.min(next, Math.max(last + 1.2, p.start + 0.8), totalSec);
  });
  return pages;
};
