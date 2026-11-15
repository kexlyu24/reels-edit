/*  HSB_build.jsx - rebuilds the HSB edit (Remotion preview) as native, editable After Effects layers.
    Run: After Effects > File > Scripts > Run Script File... > pick this file.
    Builds into the open project (folder "HSB Edit"), never renders. Log: HSB_build.log next to this file.

    Editing tips
    - Caption text layers: double-click to edit text. Word-by-word reveal = Text > Animator "Reveal" >
      Expression Selector; the T=[...] list holds each word's start (seconds after the layer's in-point).
    - Brand mention "HSB" uses the volt logo image layer instead of text.
    - Scenes are precomps in "HSB Edit/Scenes"; every scene layer has its own fade/blur in & out.
*/
(function () {
  var DATA = {"pages":[{"s":0,"e":1.04,"raised":false,"l":[{"st":"s","dx":-40,"c":"","w":[["buat",0],["yang",0.12],["lagi",0.22],["belajar",0.36]]},{"st":"d","dx":60,"c":"","w":[["trading",0.62]]}]},{"s":1.04,"e":1.7,"raised":false,"l":[{"st":"s","dx":-70,"c":"","w":[["harus",1.04],["sadar",1.16]]},{"st":"di","dx":110,"c":"","w":[["guys",1.44]]}]},{"s":1.7,"e":3.2,"raised":false,"l":[{"st":"s","dx":-170,"c":"","w":[["kalau",1.7]]},{"st":"h","dx":0,"c":"volt","w":[["PROFIT",1.78]]},{"st":"t","dx":40,"c":"","w":[["itu",2.2],["bukan",2.38],["satu-satunya",2.56]]}]},{"s":3.2,"e":4.62,"raised":false,"l":[{"st":"s","dx":-50,"c":"","w":[["hal",3.2],["yang",3.48],["harus",3.58],["kita",3.72]]},{"st":"d","dx":50,"c":"","w":[["perhatiin",3.9]]}]},{"s":4.62,"e":5.8,"raised":false,"l":[{"st":"t","dx":-80,"c":"","w":[["ada",4.62],["hal",4.76],["lain",4.9],["yang",5.08]]},{"st":"s","dx":90,"c":"","w":[["gak",5.2],["kalah",5.28]]},{"st":"db","dx":0,"c":"","w":[["penting",5.44]]}]},{"s":5.8,"e":7.2,"raised":false,"l":[{"st":"s","dx":-110,"c":"","w":[["yaitu",5.8],["milih",6.02]]},{"st":"d","dx":0,"c":"","w":[["broker",6.28]]},{"st":"di","dx":120,"c":"volt","w":[["yang",6.56],["tepat",6.7]]}]},{"s":7.2,"e":8.5,"raised":false,"l":[{"st":"s","dx":-120,"c":"","w":[["aku",7.2],["sendiri",7.4]]},{"st":"h","dx":0,"c":"volt","w":[["3",7.64],["BULAN",7.82]]},{"st":"t","dx":110,"c":"","w":[["terakhir",8.04],["ini",8.32]]}]},{"s":8.5,"e":9.62,"raised":false,"l":[{"st":"s","dx":-60,"c":"","w":[["pakai",8.5],["aplikasi",8.72]]},{"st":"db","dx":80,"c":"volt","w":[["HSB",9.08]]}]},{"s":9.62,"e":11.28,"raised":false,"l":[{"st":"t","dx":-60,"c":"","w":[["aku",9.62],["mau",9.74],["sharing",9.88],["nih",10.2]]},{"st":"d","dx":30,"c":"","w":[["hal-hal",10.4],["penting",10.8]]}]},{"s":11.28,"e":13,"raised":false,"l":[{"st":"s","dx":-70,"c":"","w":[["untuk",11.28],["kamu",11.78],["yang",12.04]]},{"st":"di","dx":80,"c":"","w":[["baru",12.18],["mulai",12.38]]}]},{"s":13,"e":14.36,"raised":false,"l":[{"st":"s","dx":-90,"c":"","w":[["pastiin",13],["dulu",13.28]]},{"st":"h","dx":0,"c":"volt","w":[["3",13.5],["HAL",13.7],["INI",13.92]]}]},{"s":14.36,"e":15.82,"raised":false,"l":[{"st":"s","dx":-80,"c":"","w":[["satu,",14.36],["harus",14.66],["punya",14.84]]},{"st":"d","dx":0,"c":"","w":[["strategi",15.02]]},{"st":"ti","dx":130,"c":"","w":[["yang",15.42],["bagus",15.52]]}]},{"s":15.82,"e":17.16,"raised":false,"l":[{"st":"s","dx":-60,"c":"","w":[["dan",15.82],["udah",16.06],["dilakuin",16.3]]},{"st":"db","dx":40,"c":"volt","w":[["backtest",16.68]]}]},{"s":17.16,"e":19.6,"raised":false,"l":[{"st":"t","dx":-60,"c":"","w":[["di",17.16],["aplikasi",17.32],["demo",17.74]]},{"st":"h","dx":0,"c":"volt","w":[["1\u20133",18.12],["BULAN",19.06]]}]},{"s":19.6,"e":20.76,"raised":false,"l":[{"st":"s","dx":-40,"c":"","w":[["termasuk",19.6],["di",19.92],["dalamnya",20.08]]},{"st":"d","dx":60,"c":"","w":[["memilih",20.42]]}]},{"s":20.76,"e":22.46,"raised":false,"l":[{"st":"t","dx":-110,"c":"","w":[["jenis",20.76],["trading",21]]},{"st":"t","dx":110,"c":"","w":[["waktu",21.66],["trading",21.88]]}]},{"s":22.46,"e":23.7,"raised":false,"l":[{"st":"s","dx":-150,"c":"","w":[["dan",22.46],["juga",22.52]]},{"st":"d","dx":0,"c":"","w":[["instrumen",22.74]]},{"st":"ti","dx":140,"c":"","w":[["tradingnya",23.16]]}]},{"s":23.7,"e":24.84,"raised":false,"l":[{"st":"s","dx":-100,"c":"","w":[["yang",23.7],["kedua,",24.04]]},{"st":"db","dx":40,"c":"","w":[["disiplin",24.42]]}]},{"s":24.84,"e":26.78,"raised":false,"l":[{"st":"t","dx":-70,"c":"","w":[["mengatur",24.84],["risiko",25.14]]},{"st":"h","dx":0,"c":"volt","w":[["1\u20135%",25.58]]}]},{"s":26.86,"e":27.78,"raised":false,"l":[{"st":"s","dx":-130,"c":"","w":[["setiap",26.86]]},{"st":"d","dx":50,"c":"","w":[["trade",27.52]]}]},{"s":27.78,"e":29.98,"raised":false,"l":[{"st":"s","dx":-120,"c":"","w":[["dan",27.78],["juga",28.06]]},{"st":"d","dx":0,"c":"","w":[["menjurnal",28.44]]},{"st":"di","dx":120,"c":"","w":[["atau",29.16],["dicatat",29.38]]}]},{"s":29.98,"e":31.26,"raised":false,"l":[{"st":"s","dx":-80,"c":"","w":[["tiga,",29.98],["kamu",30.38],["harus",30.54]]},{"st":"d","dx":0,"c":"","w":[["memahami",30.7]]},{"st":"t","dx":230,"c":"","w":[["nih",31.12]]}]},{"s":31.26,"e":32.58,"raised":false,"l":[{"st":"db","dx":-40,"c":"","w":[["platform",31.26]]},{"st":"s","dx":90,"c":"","w":[["dan",31.72],["juga",31.98],["broker",32.2]]}]},{"s":32.58,"e":34.28,"raised":false,"l":[{"st":"t","dx":-30,"c":"","w":[["tempat",32.58],["kamu",33.08],["melakukan",33.3]]},{"st":"d","dx":40,"c":"","w":[["transaksi",33.6]]}]},{"s":34.28,"e":35.42,"raised":false,"l":[{"st":"s","dx":-110,"c":"","w":[["mulai",34.28],["dari",34.48]]},{"st":"db","dx":30,"c":"volt","w":[["legalitas,",34.62]]}]},{"s":35.42,"e":36.5,"raised":false,"l":[{"st":"d","dx":0,"c":"","w":[["keamanan",35.42],["dana,",35.9]]}]},{"s":36.5,"e":38.44,"raised":false,"l":[{"st":"s","dx":-160,"c":"","w":[["sampai",36.5]]},{"st":"d","dx":0,"c":"","w":[["fasilitas",36.92]]},{"st":"ti","dx":110,"c":"","w":[["yang",37.52],["disediain",37.66]]}]},{"s":38.44,"e":39.34,"raised":false,"l":[{"st":"s","dx":-80,"c":"","w":[["nah,",38.44],["itu",38.64],["juga",38.76]]},{"st":"t","dx":90,"c":"","w":[["yang",38.96],["menjadi",39.12]]}]},{"s":39.34,"e":40.52,"raised":false,"l":[{"st":"t","dx":-120,"c":"","w":[["salah",39.34],["satu",39.54]]},{"st":"d","dx":0,"c":"","w":[["alasan",39.74]]},{"st":"s","dx":150,"c":"","w":[["kenapa",40.14]]}]},{"s":40.52,"e":42.2,"raised":false,"l":[{"st":"s","dx":-60,"c":"","w":[["aku",40.52],["masih",40.7],["pakai",40.9]]},{"st":"t","dx":-40,"c":"","w":[["aplikasi",41.18]]},{"st":"db","dx":120,"c":"volt","w":[["HSB",41.6]]}]},{"s":42.2,"e":43.22,"raised":false,"l":[{"st":"s","dx":-40,"c":"","w":[["yang",42.2],["pertama,",42.32],["soal",42.72]]},{"st":"d","dx":40,"c":"","w":[["legalitas",42.84]]}]},{"s":43.22,"e":44.8,"raised":false,"l":[{"st":"s","dx":-50,"c":"","w":[["HSB",43.22],["udah",43.7],["memiliki",43.92]]},{"st":"d","dx":50,"c":"","w":[["perizinan",44.26]]}]},{"s":44.8,"e":46.08,"raised":false,"l":[{"st":"t","dx":-80,"c":"","w":[["dan",44.8],["juga",45],["dalam",45.16]]},{"st":"db","dx":30,"c":"","w":[["pengawasan",45.38]]}]},{"s":46.08,"e":47.92,"raised":false,"l":[{"st":"s","dx":-90,"c":"","w":[["sesuai",46.08],["ketentuan",46.42]]},{"st":"d","dx":0,"c":"","w":[["regulator",46.8]]},{"st":"ti","dx":170,"c":"","w":[["terkait",47.2]]}]},{"s":47.92,"e":50.38,"raised":false,"l":[{"st":"t","dx":-170,"c":"","w":[["seperti",47.92]]},{"st":"h","dx":0,"c":"volt","w":[["BAPPEBTI",48.1],["OJK",48.98]]},{"st":"s","dx":-60,"c":"","w":[["dan",49.64],["juga",49.78]]},{"st":"h","dx":90,"c":"volt","w":[["BI",50.04]]}]},{"s":50.38,"e":52.24,"raised":false,"l":[{"st":"s","dx":-120,"c":"","w":[["yang",50.38],["kedua,",50.92]]},{"st":"d","dx":0,"c":"","w":[["pengelolaan",51.32]]},{"st":"t","dx":100,"c":"","w":[["dana",51.66],["nasabahnya",51.8]]}]},{"s":52.24,"e":53.72,"raised":false,"l":[{"st":"s","dx":-110,"c":"","w":[["ditempatkan",52.24],["di",52.76]]},{"st":"db","dx":0,"c":"volt","w":[["segregated",52.84]]},{"st":"di","dx":150,"c":"","w":[["account",53.14]]}]},{"s":53.72,"e":54.94,"raised":false,"l":[{"st":"t","dx":-100,"c":"","w":[["atau",53.72],["rekening",54.1]]},{"st":"d","dx":60,"c":"","w":[["terpisah",54.42]]}]},{"s":54.94,"e":56.22,"raised":false,"l":[{"st":"di","dx":-90,"c":"","w":[["menariknya,",54.94]]},{"st":"s","dx":60,"c":"","w":[["HSB",55.34],["juga",55.58],["memiliki",55.82]]}]},{"s":56.22,"e":57.8,"raised":false,"l":[{"st":"s","dx":-200,"c":"","w":[["fitur",56.22]]},{"st":"d","dx":0,"c":"","w":[["perlindungan",56.5]]},{"st":"t","dx":170,"c":"","w":[["asuransi",57.1]]}]},{"s":57.8,"e":60.34,"raised":false,"l":[{"st":"s","dx":-40,"c":"","w":[["dana",57.8],["nasabah",58.06],["hingga",58.68]]},{"st":"h","dx":0,"c":"volt","w":[["1",59.14],["JUTA",59.36],["USD",59.56]]}]},{"s":60.34,"e":61.2,"raised":false,"l":[{"st":"s","dx":-60,"c":"","w":[["perlu",60.34],["dicatat",60.6]]},{"st":"di","dx":120,"c":"","w":[["guys,",60.92]]}]},{"s":61.2,"e":62.26,"raised":false,"l":[{"st":"t","dx":-70,"c":"","w":[["perlindungan",61.2],["ini",61.58]]},{"st":"db","dx":40,"c":"","w":[["bukan",61.76],["untuk",62.04]]}]},{"s":62.26,"e":63.3,"raised":false,"l":[{"st":"s","dx":-110,"c":"","w":[["menanggung",62.26]]},{"st":"d","dx":50,"c":"red","w":[["kerugian",62.72]]}]},{"s":63.3,"e":65.38,"raised":false,"l":[{"st":"t","dx":-70,"c":"","w":[["yang",63.3],["berasal",63.6],["dari",64.14]]},{"st":"d","dx":0,"c":"","w":[["aktivitas",64.36],["trading",64.78]]}]},{"s":65.38,"e":66.46,"raised":false,"l":[{"st":"s","dx":-90,"c":"","w":[["dan",65.38],["dari",65.52],["sisi",65.72]]},{"st":"d","dx":70,"c":"","w":[["produk",65.94]]}]},{"s":66.46,"e":67.58,"raised":false,"l":[{"st":"t","dx":-60,"c":"","w":[["instrumennya",66.46],["juga",66.9]]},{"st":"db","dx":60,"c":"volt","w":[["beragam",67.1]]}]},{"s":67.58,"e":69.3,"raised":false,"l":[{"st":"s","dx":-130,"c":"","w":[["mulai",67.58],["dari",67.78]]},{"st":"d","dx":20,"c":"","w":[["forex,",67.98],["emas,",68.78]]}]},{"s":69.3,"e":70.96,"raised":false,"l":[{"st":"s","dx":-170,"c":"","w":[["hingga",69.3]]},{"st":"d","dx":0,"c":"","w":[["komoditas",69.62]]},{"st":"di","dx":200,"c":"","w":[["lain",70.1]]}]},{"s":70.96,"e":71.7,"raised":false,"l":[{"st":"s","dx":-110,"c":"","w":[["jadi",70.96],["guys,",71.12]]},{"st":"d","dx":40,"c":"","w":[["trading",71.36],["itu",71.52]]}]},{"s":71.7,"e":72.98,"raised":false,"l":[{"st":"t","dx":-100,"c":"","w":[["bukan",71.7],["cuma",71.92]]},{"st":"s","dx":80,"c":"","w":[["bagaimana",72.2],["kita",72.76]]}]},{"s":72.98,"e":74.86,"raised":false,"l":[{"st":"s","dx":-170,"c":"","w":[["mencari",72.98]]},{"st":"d","dx":0,"c":"","w":[["keuntungan",73.38]]},{"st":"di","dx":140,"c":"","w":[["atau",73.98],["profit",74.22]]}]},{"s":74.86,"e":76.5,"raised":false,"l":[{"st":"s","dx":-50,"c":"","w":[["tapi",74.86],["bagaimana",75.12],["juga",75.54]]},{"st":"t","dx":110,"c":"","w":[["kita",75.8],["untuk",76.26]]}]},{"s":76.5,"e":78.58,"raised":false,"l":[{"st":"s","dx":-30,"c":"","w":[["memahami",76.5],["tempat",76.98],["kita",77.46]]},{"st":"db","dx":0,"c":"volt","w":[["bertransaksi",77.76]]}]},{"s":78.58,"e":79.88,"raised":false,"l":[{"st":"s","dx":-60,"c":"","w":[["kalau",78.58],["mau",78.88],["kenalan",79.02]]},{"st":"d","dx":50,"c":"","w":[["lebih",79.32],["jauh",79.52]]}]},{"s":79.88,"e":80.8,"raised":true,"l":[{"st":"t","dx":-120,"c":"","w":[["dengan",79.88]]},{"st":"h","dx":60,"c":"volt","w":[["HSB",80.02]]}]},{"s":80.8,"e":82.867,"raised":true,"l":[{"st":"s","dx":-130,"c":"","w":[["klik",80.8],["aja",81.26]]},{"st":"d","dx":0,"c":"","w":[["link",81.48]]},{"st":"ti","dx":90,"c":"","w":[["yang",81.76],["ada",81.92],["di",82.1],["bio",82.24],["ya",82.5]]}]}],"candles":[{"x":150,"top":770.206,"bot":860.051,"hi":736.499,"lo":950.04,"up":true},{"x":208,"top":770.206,"bot":842.596,"hi":734.872,"lo":876.784,"up":false},{"x":266,"top":701.411,"bot":842.596,"hi":602.402,"lo":923.557,"up":true},{"x":324,"top":701.411,"bot":885.388,"hi":623.426,"lo":923.882,"up":false},{"x":382,"top":728.592,"bot":885.388,"hi":645.814,"lo":980,"up":true},{"x":440,"top":615.311,"bot":728.592,"hi":541.554,"lo":829.039,"up":true},{"x":498,"top":615.311,"bot":720.018,"hi":598.745,"lo":753.336,"up":false},{"x":556,"top":720.018,"bot":885.668,"hi":608.231,"lo":897.904,"up":false},{"x":614,"top":782.663,"bot":885.668,"hi":699.57,"lo":889.072,"up":true},{"x":672,"top":690.016,"bot":782.663,"hi":673.568,"lo":791.274,"up":true},{"x":730,"top":690.016,"bot":792.088,"hi":662.437,"lo":884.53,"up":false},{"x":788,"top":681.83,"bot":792.088,"hi":658.134,"lo":899.473,"up":true},{"x":846,"top":495.629,"bot":681.83,"hi":483.581,"lo":780.563,"up":true},{"x":904,"top":495.629,"bot":568.833,"hi":420,"lo":595.643,"up":false}]};

  var FPS = 30, W = 1080, H = 1920, FRAMES = 2486;
  var VOLT = [209 / 255, 248 / 255, 1 / 255];
  var WHITE = [1, 1, 1], BLACK = [0, 0, 0];
  var HERE = File($.fileName).parent;
  var ROOT = HERE.parent; // "HSB 2" folder: Raw/ and Assets/ live here
  var log = new File(HERE.fsName + "/HSB_build.log");
  log.encoding = "UTF-8";
  log.open("w");

  var errors = 0, fontMiss = 0, captionLayers = 0;
  // append + close per line so the log survives a crash
  function L(s) { log.open("a"); log.writeln(s); log.close(); }
  function hex(h) { return [parseInt(h.substr(1, 2), 16) / 255, parseInt(h.substr(3, 2), 16) / 255, parseInt(h.substr(5, 2), 16) / 255]; }
  function fr(f) { return f / FPS; }
  function snap(t) { return Math.round(t * FPS) / FPS; }

  // ---------- generic helpers ----------
  function setKeys(prop, frames, values, offset) {
    for (var i = 0; i < frames.length; i++) prop.setValueAtTime(fr(frames[i]) + (offset || 0), values[i]);
    // ease-out feel: linear-ish start, long settle (approximates cubic-bezier(.16,1,.3,1))
    // ease needs one entry per dimension (Scale = 3), but spatial props (Position) take a single entry
    var v0 = prop.keyValue(1);
    var dims = !prop.isSpatial && typeof v0 === "object" && v0.length ? v0.length : 1;
    for (var k = 1; k <= prop.numKeys; k++) {
      var inE = [], outE = [];
      for (var d = 0; d < dims; d++) { inE.push(new KeyframeEase(0, 85)); outE.push(new KeyframeEase(0, 0.1)); }
      prop.setTemporalEaseAtKey(k, inE, outE);
    }
  }
  function fx(layer, match) { return layer.property("ADBE Effect Parade").addProperty(match); }
  function dropShadow(layer, color, opacity01, softness, distance) {
    var e = fx(layer, "ADBE Drop Shadow");
    e.property(1).setValue(color);
    e.property(2).setValue(opacity01 * 255);
    e.property(4).setValue(distance || 0);
    e.property(5).setValue(softness);
    return e;
  }
  function glow(layer, color, opacity01) { return dropShadow(layer, color, opacity01, 40, 0); }
  function blurFx(layer) { var e = fx(layer, "ADBE Gaussian Blur 2"); e.property(3).setValue(0); return e.property(1); } // Repeat Edge Pixels off

  function addText(comp, str, font, size, tracking, color, just) {
    var l = comp.layers.addText(str);
    var st = l.property("ADBE Text Properties").property("ADBE Text Document");
    var td = st.value;
    td.resetCharStyle();
    td.font = font;
    td.fontSize = size;
    td.tracking = tracking;
    td.applyFill = true;
    td.fillColor = color;
    td.applyStroke = false;
    td.justification = just || ParagraphJustification.CENTER_JUSTIFY;
    st.setValue(td);
    try { if (st.value.fontObject.isSubstitute) { fontMiss++; L("FONT MISSING " + font + " for '" + str + "'"); } } catch (e) {}
    l.name = str.replace(/\r/g, " ");
    return l;
  }
  function rectOf(l) { return l.sourceRectAtTime(l.inPoint, false); }
  // place a text layer so its glyph box is centred on (cx, cy)
  function centerText(l, cx, cy) {
    var r = rectOf(l);
    l.property("ADBE Transform Group").property("ADBE Position").setValue([cx - (r.left + r.width / 2), cy - (r.top + r.height / 2)]);
  }

  function shapeLayer(comp, name) {
    var l = comp.layers.addShape();
    l.name = name;
    l.property("ADBE Transform Group").property("ADBE Anchor Point").setValue([0, 0]);
    l.property("ADBE Transform Group").property("ADBE Position").setValue([0, 0]);
    return l;
  }
  function group(l, name) { var g = l.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group"); g.name = name; return g.property("ADBE Vectors Group"); }
  function rect(c, cx, cy, w, h, round) {
    var r = c.addProperty("ADBE Vector Shape - Rect");
    r.property("ADBE Vector Rect Size").setValue([w, h]);
    r.property("ADBE Vector Rect Position").setValue([cx, cy]);
    r.property("ADBE Vector Rect Roundness").setValue(round || 0);
    return r;
  }
  function ellipse(c, cx, cy, d) {
    var e = c.addProperty("ADBE Vector Shape - Ellipse");
    e.property("ADBE Vector Ellipse Size").setValue([d, d]);
    e.property("ADBE Vector Ellipse Position").setValue([cx, cy]);
    return e;
  }
  function path(c, pts, closed) {
    var p = c.addProperty("ADBE Vector Shape - Group");
    var s = new Shape();
    s.vertices = pts;
    s.closed = !!closed;
    p.property("ADBE Vector Shape").setValue(s);
    return p;
  }
  function fill(c, color, opacity) { var f = c.addProperty("ADBE Vector Graphic - Fill"); f.property("ADBE Vector Fill Color").setValue(color); f.property("ADBE Vector Fill Opacity").setValue(opacity === undefined ? 100 : opacity); return f; }
  function stroke(c, color, width, opacity) { var s = c.addProperty("ADBE Vector Graphic - Stroke"); s.property("ADBE Vector Stroke Color").setValue(color); s.property("ADBE Vector Stroke Width").setValue(width); s.property("ADBE Vector Stroke Opacity").setValue(opacity === undefined ? 100 : opacity); return s; }
  function trim(c) { return c.addProperty("ADBE Vector Filter - Trim"); }

  // soft radial blob (stand-in for the CSS radial-gradient glow)
  function blob(comp, x, y, r, opacity01, color) {
    var l = shapeLayer(comp, "glow");
    var c = group(l, "glow");
    ellipse(c, x, y, r * 1.3);
    fill(c, color || VOLT, 100);
    l.property("ADBE Transform Group").property("ADBE Opacity").setValue(55 * opacity01);
    var b = fx(l, "ADBE Gaussian Blur 2"); b.property(1).setValue(r * 0.55); b.property(3).setValue(0);
    return l;
  }

  function importFile(rel, folder) {
    var f = new File(ROOT.fsName + "/" + rel);
    if (!f.exists) throw new Error("Missing file: " + f.fsName);
    var it = app.project.importFile(new ImportOptions(f));
    it.parentFolder = folder;
    return it;
  }

  // spring-like pop: scale 0 -> overshoot -> settle, fade + unblur, optional float + exit
  // T(): fresh transform property every time - adding an effect invalidates refs held from before
  function T(layer, name) { return layer.property("ADBE Transform Group").property(name); }
  function pop(layer, at, baseScale, floatPx, exitAt) {
    var s = baseScale;
    var bl = blurFx(layer); // effect first, transform refs fetched after
    setKeys(bl, [at, at + 6], [10, 0]);
    if (exitAt !== undefined) setKeys(bl, [exitAt - 5, exitAt], [0, 10]);
    setKeys(T(layer, "ADBE Scale"), [at, at + 6, at + 10, at + 14], [[0, 0, 100], [s * 1.08, s * 1.08, 100], [s * 0.97, s * 0.97, 100], [s, s, 100]]);
    setKeys(T(layer, "ADBE Opacity"), [at, at + 4], [0, 100]);
    if (exitAt !== undefined) {
      setKeys(T(layer, "ADBE Opacity"), [exitAt - 5, exitAt], [100, 0]);
      setKeys(T(layer, "ADBE Scale"), [exitAt - 5, exitAt], [[s, s, 100], [s * 0.85, s * 0.85, 100]]);
    }
    if (floatPx) T(layer, "ADBE Position").expression = "value + [0, Math.sin((time*30 - " + at + ")/14) * " + floatPx + "]";
  }

  // pill chip: rounded shape + text, returns [shape, text]
  function chip(comp, label, size, volt, cx, cy) {
    var t = addText(comp, label, "HelveticaNowDisplay-Bd", size, -20, volt ? hex("#0b0b0b") : WHITE);
    centerText(t, cx, cy);
    var r = rectOf(t);
    var bw = r.width + size * 1.24, bh = size * 1.2 + size * 0.64;
    var s = shapeLayer(comp, "chip bg " + label);
    var c = group(s, "pill");
    rect(c, 0, 0, bw, bh, bh / 2); // drawn at the layer origin so scale pops from the chip centre
    s.property("ADBE Transform Group").property("ADBE Position").setValue([cx, cy]);
    if (volt) { fill(c, VOLT, 100); glow(s, VOLT, 0.55); }
    else { fill(c, WHITE, 8); stroke(c, WHITE, 2, 35); }
    s.moveAfter(t);
    return [s, t];
  }

  // chrome headline text (flat fill + glow; the CSS gradient is not scriptable as a fill)
  function chrome(comp, str, size, volt, x, baseline, weightFont) {
    var t = addText(comp, str, weightFont || "HelveticaNowDisplay-XBd", size, -40, volt ? VOLT : WHITE);
    t.property("ADBE Transform Group").property("ADBE Position").setValue([x, baseline]);
    if (volt) glow(t, VOLT, 0.65); else glow(t, WHITE, 0.3);
    return t;
  }

  // ---------- project setup ----------
  var proj = app.project;
  for (var i = 1; i <= proj.numItems; i++) {
    if (proj.item(i).name === "HSB_MAIN") { L("ABORT: HSB_MAIN already exists in this project. Nothing changed."); return; }
  }
  app.beginUndoGroup("Build HSB edit");
  try {
    var root = proj.items.addFolder("HSB Edit");
    var fFoot = proj.items.addFolder("Footage"); fFoot.parentFolder = root;
    var fAsset = proj.items.addFolder("Assets"); fAsset.parentFolder = root;
    var fScene = proj.items.addFolder("Scenes"); fScene.parentFolder = root;

    var raw = importFile("Raw/Raw.mp4", fFoot);
    var A = {
      legal: importFile("Assets/Legalitas.png", fAsset),
      insur: importFile("Assets/KV Insurance Aswata.png", fAsset),
      instr: importFile("Assets/Instrumen.png", fAsset),
      partner: importFile("Assets/Partnership.png", fAsset),
      logo: importFile("Assets/Logo HSB/volt - logo.png", fAsset) // 1080x1080, logo centred, visible 894x321
    };
    var LOGO_W = 894, LOGO_H = 321;

    var main = proj.items.addComp("HSB_MAIN", W, H, 1, FRAMES / FPS, FPS);
    main.parentFolder = root;
    L("main comp frames=" + Math.round(main.duration * main.frameRate) + " fps=" + main.frameRate + " size=" + main.width + "x" + main.height);
    L("raw footage duration=" + raw.duration + " fps=" + raw.frameRate + " audio=" + raw.hasAudio);

    // ---------- 1. speaker + punch-in zooms ----------
    var ZOOMS = [[0, 1.0], [1.7, 1.12], [4.62, 1.0], [7.2, 1.08], [9.62, 1.0], [14.36, 1.1], [19.6, 1.0], [23.7, 1.1],
      [27.78, 1.0], [29.98, 1.12], [31.26, 1.0], [38.44, 1.08], [42.2, 1.0], [44.8, 1.1], [50.38, 1.0],
      [54.94, 1.1], [60.34, 1.14], [62.26, 1.0], [65.38, 1.08], [70.96, 1.0], [72.98, 1.1], [74.86, 1.0],
      [76.5, 1.08], [78.58, 1.0], [80.8, 1.1]];
    var sp = main.layers.add(raw);
    sp.name = "SPEAKER (Raw.mp4)";
    sp.startTime = 0;
    // zoom lives on an adjustment layer's Transform effect, the raw layer stays untouched;
    // everything built after this sits above it, so only the speaker gets zoomed
    var zm = main.layers.addSolid(BLACK, "ZOOM (Transform)", W, H, 1);
    zm.adjustmentLayer = true;
    zm.label = 5;
    var tf = fx(zm, "ADBE Geometry2");
    tf.property(1).setValue([540, 614.4]); // Anchor Point: face area, same origin as the preview
    tf.property(2).setValue([540, 614.4]); // Position
    var zf = [0], zv = [100];
    for (var z = 1; z < ZOOMS.length; z++) {
      var f0 = Math.round(ZOOMS[z][0] * FPS), prev = ZOOMS[z - 1][1] * 100, nw = ZOOMS[z][1] * 100;
      zf.push(f0, f0 + 6); zv.push(prev, nw);
    }
    setKeys(tf.property(4), zf, zv); // Scale (Uniform Scale is on by default)
    L("zoom ok: param=" + tf.property(4).name + " uniform=" + tf.property(3).value + " keys=" + tf.property(4).numKeys);

    // ---------- 2. overlays on the speaker ----------
    try {
      var pl = shapeLayer(main, "PROFIT LINE");
      var pc = group(pl, "line");
      path(pc, [[-40, 760], [180, 620], [300, 690], [470, 470], [600, 540], [790, 300], [900, 360], [1120, 120]], false);
      var pst = stroke(pc, VOLT, 14, 100);
      pst.property("ADBE Vector Stroke Line Join").setValue(2);
      var ptr = trim(pc);
      pl.inPoint = fr(53); pl.outPoint = fr(53 + 48);
      setKeys(ptr.property("ADBE Vector Trim End"), [53, 53 + 18], [0, 100]);
      setKeys(pl.property("ADBE Transform Group").property("ADBE Opacity"), [53 + 42, 53 + 48], [100, 0]);
      glow(pl, VOLT, 0.9);
      L("profit line ok");
    } catch (e) { errors++; L("ERROR profit line: " + e.toString() + " line " + e.line); }

    try {
      var pin = 2295, pout = 2357; // 76.5s -> 78.58s
      var pg = blob(main, 880, 760, 240, 0.55);
      pg.inPoint = fr(pin); pg.outPoint = fr(pout); pg.name = "glow partnership";
      var pa = main.layers.add(A.partner);
      pa.name = "PARTNERSHIP";
      pa.inPoint = fr(pin); pa.outPoint = fr(pout);
      pa.property("ADBE Transform Group").property("ADBE Position").setValue([880, 760]);
      dropShadow(pa, BLACK, 0.5, 60, 20);
      pop(pa, pin, 400 / 1024 * 100, 12, pout);
      L("partnership ok");
    } catch (e) { errors++; L("ERROR partnership: " + e.toString() + " line " + e.line); }

    try {
      var cin = 2424; // 80.8s end card
      var cg = blob(main, 540, 1468, 253, 0.8);
      cg.inPoint = fr(cin); cg.name = "glow CTA";
      setKeys(cg.property("ADBE Transform Group").property("ADBE Opacity"), [cin, cin + 6], [0, 44]);
      var lg = main.layers.add(A.logo);
      lg.name = "CTA LOGO";
      lg.inPoint = fr(cin);
      lg.property("ADBE Transform Group").property("ADBE Position").setValue([540, 1390 + 460 * LOGO_H / LOGO_W / 2]);
      glow(lg, VOLT, 0.55);
      pop(lg, cin, 460 / LOGO_W * 100, 6);
      var ch = chip(main, "LINK DI BIO \u2197", 50, true, 540, 1390 + 460 * 0.36 + 14 + 46);
      for (var q = 0; q < 2; q++) { ch[q].inPoint = fr(2444); pop(ch[q], 2444, 100, 4); }
      ch[1].name = "CTA CHIP TEXT"; ch[0].name = "CTA CHIP BG";
      L("CTA ok");
    } catch (e) { errors++; L("ERROR CTA: " + e.toString() + " line " + e.line); }

    // ---------- 3. scene precomps ----------
    function sceneComp(name, start, end, tint, build) {
      try {
        var f0 = Math.round(start * FPS), f1 = Math.round(end * FPS), dur = f1 - f0;
        var c = proj.items.addComp(name, W, H, 1, dur / FPS, FPS);
        c.parentFolder = fScene;
        var bg = c.layers.addSolid(BLACK, "BG", W, H, 1);
        var rp = fx(bg, "ADBE Ramp");
        rp.property(1).setValue([540, 730]);
        rp.property(2).setValue(hex(tint || "#1d1f1a"));
        rp.property(3).setValue([540 + 760, 730 + 760]);
        rp.property(4).setValue(BLACK);
        rp.property(5).setValue(2); // radial
        build(c, start, dur);
        var gr = c.layers.addSolid(BLACK, "GRAIN (adjustment)", W, H, 1);
        gr.adjustmentLayer = true;
        var nz = fx(gr, "ADBE Noise"); nz.property(1).setValue(6); nz.property(2).setValue(0); // mono grain
        gr.moveToBeginning();
        var l = main.layers.add(c);
        l.startTime = fr(f0);
        l.name = name;
        setKeys(blurFx(l), [f0, f0 + 4, f1 - 4, f1], [18, 0, 0, 18]);
        setKeys(T(l, "ADBE Opacity"), [f0, f0 + 4, f1 - 4, f1], [0, 100, 100, 0]);
        setKeys(T(l, "ADBE Scale"), [f0, f1], [[104, 104, 100], [100, 100, 100]]);
        L("scene ok: " + name + " (" + dur + "f)");
      } catch (e) { errors++; L("ERROR scene " + name + ": " + e.toString() + " line " + e.line); }
    }
    function cue(t, start) { return Math.round((t - start) * FPS); }

    sceneComp("SC1 3 HAL", 13.0, 14.36, null, function (c) {
      blob(c, 540, 560, 420, 0.8);
      var three = chrome(c, "3", 640, false, 540, 690, "HelveticaNowDisplay-Blk");
      pop(three, 0, 100, 6);
      var labels = ["01 STRATEGI", "02 RISIKO", "03 BROKER"], made = [], total = 0;
      for (var i = 0; i < 3; i++) { made.push(chip(c, labels[i], 40, i === 0, 0, 897)); total += rectOf(made[i][1]).width + 40 * 1.24; }
      var x = 540 - (total + 44) / 2;
      for (var j = 0; j < 3; j++) {
        var bw = rectOf(made[j][1]).width + 40 * 1.24;
        var dx = x + bw / 2;
        for (var k = 0; k < 2; k++) {
          var p = made[j][k].property("ADBE Transform Group").property("ADBE Position");
          var v = p.value;
          var base = [v[0] + dx, v[1]];
          var a = 6 + j * 5;
          setKeys(p, [a, a + 8], [[base[0], base[1] + 30], base]);
          setKeys(made[j][k].property("ADBE Transform Group").property("ADBE Opacity"), [a, a + 4], [0, 100]);
        }
        x += bw + 22;
      }
    });

    sceneComp("SC2 BACKTEST", 16.06, 19.5, "#151515", function (c) {
      var g = shapeLayer(c, "GRID");
      var gc = group(g, "lines");
      for (var i = 0; i < 7; i++) path(gc, [[90 + i * 150, -20], [90 + i * 150, 1940]], false);
      for (var j = 0; j < 12; j++) path(gc, [[-20, 80 + j * 160], [1100, 80 + j * 160]], false);
      stroke(gc, WHITE, 2.5, 55);
      var ww = fx(g, "ADBE Wave Warp");
      ww.property(2).setValue(8); ww.property(3).setValue(700); ww.property(5).setValue(0.3);
      var K = DATA.candles;
      for (var n = 0; n < K.length; n++) {
        var k = K[n], col = k.up ? VOLT : hex("#ff5a4e");
        var cl = shapeLayer(c, "candle " + (n + 1));
        var cc = group(cl, "candle");
        rect(cc, k.x, (k.hi + k.lo) / 2, 4, k.lo - k.hi, 0);
        rect(cc, k.x, (k.top + k.bot) / 2, 34, Math.max(6, k.bot - k.top), 4);
        fill(cc, col, 100);
        var tr = cl.property("ADBE Transform Group");
        tr.property("ADBE Anchor Point").setValue([k.x, k.bot]);
        tr.property("ADBE Position").setValue([k.x, k.bot]);
        var at = 6 + n * 4;
        setKeys(tr.property("ADBE Scale"), [at, at + 6], [[100, 0, 100], [100, 100, 100]]);
        setKeys(tr.property("ADBE Opacity"), [at, at + 6], [0, 100]);
        glow(cl, col, 0.7);
      }
      var ch = chip(c, "AKUN DEMO", 46, true, 540, 170 + 42);
      pop(ch[0], 2, 100, 4); pop(ch[1], 2, 100, 4);
    });

    sceneComp("SC3 RISIKO", 25.5, 27.7, null, function (c) {
      blob(c, 540, 640, 360, 0.5);
      pop(chrome(c, "RISIKO / TRADE", 96, false, 540, 235), 0, 100, 0);
      var d = shapeLayer(c, "DONUT");
      var bgc = group(d, "track"); ellipse(bgc, 540, 650, 500); stroke(bgc, WHITE, 70, 14);
      var vc = group(d, "risk 5%"); ellipse(vc, 540, 650, 500); stroke(vc, VOLT, 70, 100);
      var tp = trim(vc);
      setKeys(tp.property("ADBE Vector Trim End"), [8, 30], [0, 5]);
      glow(d, VOLT, 0.8);
      var pct = chrome(c, "5%", 190, true, 540, 676);
      pct.property("ADBE Text Properties").property("ADBE Text Document").expression =
        "var d=Math.min(Math.max((time*30-8)/22,0),1); Math.max(1, Math.round(5*(1-Math.pow(1-d,3)))) + '%'";
      var mk = addText(c, "maksimal", "The-Seasons-Light-Italic", 64, 0, WHITE);
      mk.property("ADBE Transform Group").property("ADBE Position").setValue([540, 770]);
    });

    sceneComp("SC4 LEGALITAS-KEAMANAN-FASILITAS", 34.28, 38.3, null, function (c, start) {
      var items = [
        { at: 34.62, it: A.legal, w: 290, src: 768, label: "LEGALITAS" },
        { at: 35.42, it: A.insur, w: 330, src: 2048, label: "KEAMANAN DANA" },
        { at: 36.92, it: A.instr, w: 280, src: 1854, label: "FASILITAS" }
      ];
      for (var i = 0; i < 3; i++) {
        var x = 190 + i * 350, at = cue(items[i].at, start);
        blob(c, x, 650, 200, 0.6);
        var im = c.layers.add(items[i].it);
        im.name = items[i].label;
        im.property("ADBE Transform Group").property("ADBE Position").setValue([x, 610]);
        pop(im, at, items[i].w / items[i].src * 100, 10);
        var lb = addText(c, items[i].label, "HelveticaNowDisplay-Bd", 34, -10, i === 1 ? VOLT : WHITE);
        lb.property("ADBE Transform Group").property("ADBE Position").setValue([x, 873]);
        pop(lb, at, 100, 10);
      }
    });

    sceneComp("SC5 REGULATOR", 47.9, 50.38, null, function (c, start) {
      blob(c, 540, 560, 420, 0.55);
      var lg = c.layers.add(A.legal);
      lg.name = "LEGALITAS (BI OJK BAPPEBTI)";
      lg.property("ADBE Transform Group").property("ADBE Position").setValue([540, 583.3]);
      pop(lg, 0, 560 / 768 * 100, 8);
      var coins = [{ at: 48.1, x: 534, y: 611, n: "BAPPEBTI" }, { at: 48.98, x: 689, y: 494, n: "OJK" }, { at: 50.04, x: 549, y: 356, n: "BI" }];
      for (var i = 0; i < 3; i++) {
        var r = shapeLayer(c, "ring " + coins[i].n);
        var rc = group(r, "ring");
        ellipse(rc, 0, 0, 164); stroke(rc, VOLT, 6, 100);
        var tr = r.property("ADBE Transform Group");
        tr.property("ADBE Position").setValue([coins[i].x, coins[i].y]);
        tr.property("ADBE Position").expression = "value + [0, Math.sin(time*30/14) * 8]"; // floats with the asset
        var at = cue(coins[i].at, start);
        setKeys(tr.property("ADBE Scale"), [at, at + 8], [[160, 160, 100], [100, 100, 100]]);
        setKeys(tr.property("ADBE Opacity"), [at, at + 6], [0, 100]);
        glow(r, VOLT, 0.9);
      }
      pop(chrome(c, "BERIZIN & DIAWASI", 84, false, 540, 182), 4, 100, 0);
    });

    sceneComp("SC6 SEGREGATED", 52.76, 54.86, null, function (c) {
      pop(chrome(c, "SEGREGATED ACCOUNT", 92, false, 540, 298), 0, 100, 0);
      var div = shapeLayer(c, "divider");
      var dc = group(div, "dash");
      path(dc, [[540, 520], [540, 930]], false);
      var ds = stroke(dc, WHITE, 4, 100);
      var dsh = ds.property("ADBE Vector Stroke Dashes");
      var dashNames = ["ADBE Vector Stroke Dash 1", "ADBE Vector Stroke Gap 1"], dashVals = [18, 14];
      for (var dn = 0; dn < 2; dn++) (dsh.canAddProperty(dashNames[dn]) ? dsh.addProperty(dashNames[dn]) : dsh.property(dashNames[dn])).setValue(dashVals[dn]);
      setKeys(trim(dc).property("ADBE Vector Trim End"), [8, 24], [0, 100]);
      var cards = [{ label: "DANA\rPERUSAHAAN", volt: false, dir: 1 }, { label: "DANA\rNASABAH", volt: true, dir: -1 }];
      for (var i = 0; i < 2; i++) {
        var cd = cards[i];
        var nl = c.layers.addNull(); nl.name = "CARD " + cd.label.replace("\r", " ");
        nl.property("ADBE Transform Group").property("ADBE Position").setValue([540, 725]);
        var sh = shapeLayer(c, "card bg " + cd.label.replace("\r", " "));
        var sc = group(sh, "card");
        rect(sc, 540, 725, 420, 330, 40);
        if (cd.volt) { fill(sc, VOLT, 15); stroke(sc, VOLT, 3, 100); glow(sh, VOLT, 0.35); }
        else { fill(sc, WHITE, 6); stroke(sc, WHITE, 3, 35); dropShadow(sh, BLACK, 0.6, 50, 20); }
        var sub = addText(c, "rekening", "TimesNewRomanPSMT", 46, -30, hex("#dddddd"));
        sub.property("ADBE Transform Group").property("ADBE Position").setValue([540, 677]);
        var lb = addText(c, cd.label, "HelveticaNowDisplay-XBd", 54, -30, cd.volt ? VOLT : WHITE);
        var td = lb.property("ADBE Text Properties").property("ADBE Text Document").value;
        td.autoLeading = false; td.leading = 54; lb.property("ADBE Text Properties").property("ADBE Text Document").setValue(td);
        lb.property("ADBE Transform Group").property("ADBE Position").setValue([540, 745]);
        sh.parent = nl; sub.parent = nl; lb.parent = nl;
        var nt = nl.property("ADBE Transform Group");
        setKeys(nt.property("ADBE Position"), [8, 24], [[540, 725], [540 + cd.dir * 235, 725]]);
        setKeys(nt.property("ADBE Rotate Z"), [8, 24], [0, cd.dir * 4]);
      }
    });

    sceneComp("SC7 ASURANSI", 56.5, 59.9, null, function (c, start) {
      blob(c, 540, 520, 430, 0.65);
      var im = c.layers.add(A.insur);
      im.name = "INSURANCE";
      im.property("ADBE Transform Group").property("ADBE Position").setValue([540, 490]);
      pop(im, 0, 680 / 2048 * 100, 10);
      var a = cue(57.8, start), b = cue(59.3, start);
      var ct = chrome(c, "$1.000.000", 150, true, 540, 970);
      ct.name = "COUNTER $1.000.000";
      ct.property("ADBE Text Properties").property("ADBE Text Document").expression =
        "var d=Math.min(Math.max((time*30-" + a + ")/" + (b - a) + ",0),1); var v=Math.round(1000000*(1-Math.pow(1-d,3)));" +
        " '$' + v.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, '.')";
      setKeys(ct.property("ADBE Transform Group").property("ADBE Opacity"), [cue(57.6, start), cue(57.9, start)], [0, 100]);
    });

    sceneComp("SC8 INSTRUMEN", 67.58, 70.4, null, function (c, start) {
      blob(c, 540, 560, 420, 0.6);
      var im = c.layers.add(A.instr);
      im.name = "INSTRUMEN";
      im.property("ADBE Transform Group").property("ADBE Position").setValue([540, 516.7]);
      pop(im, 0, 520 / 1854 * 100, 10);
      im.property("ADBE Transform Group").property("ADBE Rotate Z").expression = "Math.sin(time*30/20) * 4";
      var chips = [{ at: 67.98, t: "FOREX" }, { at: 68.78, t: "EMAS" }, { at: 69.62, t: "KOMODITAS" }], made = [], total = 0;
      for (var i = 0; i < 3; i++) { made.push(chip(c, chips[i].t, 46, i === 1, 0, 1002)); total += rectOf(made[i][1]).width + 46 * 1.24; }
      var x = 540 - (total + 40) / 2;
      for (var j = 0; j < 3; j++) {
        var bw = rectOf(made[j][1]).width + 46 * 1.24, at = cue(chips[j].at, start);
        for (var k = 0; k < 2; k++) {
          var tr = made[j][k].property("ADBE Transform Group");
          var v = tr.property("ADBE Position").value;
          tr.property("ADBE Position").setValue([v[0] + x + bw / 2, v[1]]);
          setKeys(tr.property("ADBE Opacity"), [at, at + 4], [0, 100]);
          setKeys(tr.property("ADBE Scale"), [at, at + 8], [[60, 60, 100], [100, 100, 100]]);
          setKeys(blurFx(made[j][k]), [at, at + 6], [8, 0]);
        }
        x += bw + 20;
      }
    });

    // ---------- 4. captions (top of the stack) ----------
    var STY = {
      s: { font: "Helvetica", size: 70, tr: -45 },
      sb: { font: "Helvetica-Bold", size: 92, tr: -40 },
      t: { font: "TimesNewRomanPSMT", size: 86, tr: -45 },
      ti: { font: "TimesNewRomanPS-ItalicMT", size: 86, tr: -40 },
      d: { font: "The-Seasons-Regular", size: 158, tr: -35 },
      db: { font: "The-Seasons-Bold", size: 160, tr: -30 },
      di: { font: "The-Seasons-Light-Italic", size: 100, tr: -20 },
      h: { font: "HelveticaNowDisplay-XBd", size: 132, tr: -35 }
    };
    function styleCaption(l, line) {
      if (line.c === "volt") {
        var td = l.property("ADBE Text Properties").property("ADBE Text Document").value;
        td.fillColor = line.st === "h" ? VOLT : hex("#E6FF5E");
        l.property("ADBE Text Properties").property("ADBE Text Document").setValue(td);
        glow(l, VOLT, 0.75);
      } else if (line.c === "red") {
        var td2 = l.property("ADBE Text Properties").property("ADBE Text Document").value;
        td2.fillColor = hex("#FF5A4E");
        l.property("ADBE Text Properties").property("ADBE Text Document").setValue(td2);
        glow(l, hex("#FF3C28"), 0.7);
      } else if (line.st === "h") {
        glow(l, WHITE, 0.35);
      } else {
        dropShadow(l, BLACK, 0.45, 36, 3);
      }
    }
    function revealAnimator(l, rel, big) {
      var a = l.property("ADBE Text Properties").property("ADBE Text Animators").addProperty("ADBE Text Animator");
      a.name = "Reveal";
      var p = a.property("ADBE Text Animator Properties");
      p.addProperty("ADBE Text Opacity").setValue(0);
      p.addProperty("ADBE Text Blur").setValue([14, 14]);
      p.addProperty("ADBE Text Position 3D").setValue([0, big ? 26 : 16, 0]);
      p.addProperty("ADBE Text Scale 3D").setValue(big ? [114, 114, 100] : [106, 106, 100]);
      var sel = a.property("ADBE Text Selectors").addProperty("ADBE Text Expressible Selector");
      sel.property("ADBE Text Range Type2").setValue(3); // based on words
      sel.property("ADBE Text Expressible Amount").expression =
        "// T = each word's start (s) after this layer's in-point\nvar T=[" + rel.join(",") + "];\n" +
        "var k=textIndex-1; if (k>=T.length) 0; else { var d=Math.min(Math.max((time-inPoint-T[k])/0.3,0),1); 100*Math.pow(1-d,3); }";
    }
    function pageExit(l, endF) {
      setKeys(l.property("ADBE Transform Group").property("ADBE Opacity"), [endF - 5, endF], [100, 0]);
      setKeys(blurFx(l), [endF - 5, endF], [0, 12]);
    }

    var P = DATA.pages;
    for (var pi = 0; pi < P.length; pi++) {
      try {
        var pg = P[pi];
        var inF = Math.round(pg.s * FPS), outF = Math.round(pg.e * FPS);
        var cursor = pg.raised ? 1040 : 1170;
        for (var li = 0; li < pg.l.length; li++) {
          var line = pg.l[li], st = STY[line.st];
          var big = line.st === "d" || line.st === "db" || line.st === "h";
          var x = 540 + line.dx;
          // split the line into runs: text words and "HSB" logo tokens
          var runs = [], cur = null;
          for (var wi = 0; wi < line.w.length; wi++) {
            var w = line.w[wi];
            if (w[0] === "HSB") { cur = null; runs.push({ logo: true, at: w[1] }); }
            else { if (!cur) { cur = { logo: false, words: [] }; runs.push(cur); } cur.words.push(w); }
          }
          // size: shrink to fit 960px like the preview
          var size = st.size, made = [];
          for (var ri = 0; ri < runs.length; ri++) {
            if (runs[ri].logo) continue;
            var txt = [];
            for (var q = 0; q < runs[ri].words.length; q++) txt.push(runs[ri].words[q][0]);
            var tl = addText(main, txt.join(" "), st.font, size, st.tr, WHITE,
              runs.length > 1 ? ParagraphJustification.LEFT_JUSTIFY : ParagraphJustification.CENTER_JUSTIFY);
            tl.inPoint = fr(inF); tl.outPoint = fr(outF);
            runs[ri].layer = tl;
            made.push(tl);
          }
          if (runs.length === 1 && !runs[0].logo) {
            var wpx = rectOf(runs[0].layer).width;
            if (wpx > 960) {
              size = st.size * 960 / wpx;
              var tds = runs[0].layer.property("ADBE Text Properties").property("ADBE Text Document").value;
              tds.fontSize = size;
              runs[0].layer.property("ADBE Text Properties").property("ADBE Text Document").setValue(tds);
            }
          }
          if (li > 0) cursor -= 0.12 * size;
          var baseline = cursor + 0.8 * size;
          var logoH = Math.max(size * 0.8, 76), logoW = logoH * LOGO_W / LOGO_H, gap = 0.24 * size;
          // total row width for mixed/logo rows
          var total = 0;
          for (var r2 = 0; r2 < runs.length; r2++) total += (r2 ? gap : 0) + (runs[r2].logo ? logoW : rectOf(runs[r2].layer).width);
          var cx = x - total / 2;
          for (var r3 = 0; r3 < runs.length; r3++) {
            var run = runs[r3];
            if (r3) cx += gap;
            if (run.logo) {
              var lgL = main.layers.add(A.logo);
              lgL.name = "HSB logo (caption)";
              lgL.inPoint = fr(inF); lgL.outPoint = fr(outF);
              var lt = lgL.property("ADBE Transform Group");
              var ls = logoH / LOGO_H * 100;
              var pos = [cx + logoW / 2, baseline - 0.08 * size - logoH / 2];
              var a0 = Math.round(run.at * FPS);
              setKeys(lt.property("ADBE Position"), [a0, a0 + 9], [[pos[0], pos[1] + (big ? 26 : 16)], pos]);
              setKeys(lt.property("ADBE Scale"), [a0, a0 + 9], [[ls * (big ? 1.14 : 1.06), ls * (big ? 1.14 : 1.06), 100], [ls, ls, 100]]);
              setKeys(lt.property("ADBE Opacity"), [a0, a0 + 5, outF - 5, outF], [0, 100, 100, 0]);
              glow(lgL, VOLT, 0.6);
              setKeys(blurFx(lgL), [a0, a0 + 8, outF - 5, outF], [14, 0, 0, 12]);
              cx += logoW;
              captionLayers++;
            } else {
              var lay = run.layer;
              if (runs.length > 1) { var rr = rectOf(lay); lay.property("ADBE Transform Group").property("ADBE Position").setValue([cx - rr.left, baseline]); cx += rr.width; }
              else lay.property("ADBE Transform Group").property("ADBE Position").setValue([x, baseline]);
              styleCaption(lay, line);
              var rel = [];
              for (var q2 = 0; q2 < run.words.length; q2++) rel.push(Math.round((run.words[q2][1] - pg.s) * 1000) / 1000);
              revealAnimator(lay, rel, big);
              pageExit(lay, outF);
              lay.label = line.c === "volt" ? 9 : 2;
              captionLayers++;
            }
          }
          cursor += 1.08 * size;
        }
      } catch (e) { errors++; L("ERROR caption page " + pi + ": " + e.toString() + " line " + e.line); }
    }
    L("captions ok, layers=" + captionLayers);

    // ---------- save ----------
    if (!proj.file) {
      var out = new File(HERE.fsName + "/HSB_edit.aep"), n = 2;
      while (out.exists) out = new File(HERE.fsName + "/HSB_edit_" + (n++) + ".aep");
      proj.save(out);
      L("saved " + out.fsName);
    } else L("project already has a file; not saved (save it yourself)");
    main.openInViewer();
  } catch (e) {
    errors++;
    L("FATAL " + e.toString() + " line " + e.line);
  }
  app.endUndoGroup();
  L("SUMMARY errors=" + errors + " fontMissing=" + fontMiss + " captionLayers=" + captionLayers);
  L("DONE");

})();
