import json, sys, wave
import numpy as np
from faster_whisper import WhisperModel

wav, model_name, out = sys.argv[1], sys.argv[2], sys.argv[3]
# shortcut: bypass PyAV decode (installed av rejects metadata_errors kwarg); expects 16k mono s16 wav
with wave.open(wav) as f:
    audio = np.frombuffer(f.readframes(f.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0
m = WhisperModel(model_name, device="cpu", compute_type="int8")
segs, info = m.transcribe(audio, language="id", word_timestamps=True, vad_filter=False, beam_size=5)
res = []
for s in segs:
    res.append({"start": s.start, "end": s.end, "text": s.text,
                "words": [{"w": w.word, "s": w.start, "e": w.end, "p": w.probability} for w in s.words]})
    print(f"[{s.start:6.2f}-{s.end:6.2f}] {s.text}", flush=True)
json.dump(res, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
