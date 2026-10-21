"""Create browser-ready portfolio videos. Requires imageio-ffmpeg."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import json
import subprocess
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/assets/VD"
OUTPUT = ROOT / "public/assets/videos"
OUTPUT.mkdir(parents=True, exist_ok=True)
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()


def prepare(source):
    name = source.stem.lower()
    for width, crf, maxrate, buffer in [(1080, 20, "6000k", "12000k"), (720, 22, "2600k", "5200k")]:
        target = OUTPUT / f"{name}-{width}.mp4"
        subprocess.run([
            FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-i", str(source),
            "-map", "0:v:0", "-map", "0:a:0?", "-vf", f"scale={width}:-2:flags=lanczos,fps=30",
            "-c:v", "libx264", "-preset", "medium", "-crf", str(crf),
            "-maxrate", maxrate, "-bufsize", buffer, "-pix_fmt", "yuv420p",
            "-profile:v", "high", "-level:v", "4.0", "-g", "60", "-threads", "2",
            "-c:a", "aac", "-b:a", "128k", "-ar", "48000",
            "-movflags", "+faststart", "-map_metadata", "-1", str(target),
        ], check=True)
        print(f"Ready: {target.name} ({target.stat().st_size / 1024 / 1024:.1f} MB)", flush=True)
    subprocess.run([
        FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-ss", "2", "-i", str(source),
        "-frames:v", "1", "-vf", "scale=540:-2", "-q:v", "3", str(OUTPUT / f"{name}-poster.jpg"),
    ], check=True)
    return {"source": source.name, "sourceBytes": source.stat().st_size,
            "fullHdBytes": (OUTPUT / f"{name}-1080.mp4").stat().st_size,
            "hdBytes": (OUTPUT / f"{name}-720.mp4").stat().st_size}


if __name__ == "__main__":
    sources = sorted(p for p in SOURCE.iterdir() if p.suffix.lower() in (".mov", ".mp4"))
    with ThreadPoolExecutor(max_workers=2) as pool:
        results = list(pool.map(prepare, sources))
    (OUTPUT / "media.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
    print("All portfolio videos prepared.", flush=True)
