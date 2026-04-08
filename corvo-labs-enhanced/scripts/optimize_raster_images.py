#!/usr/bin/env python3
"""
Lossy WebP output at high quality for web; falls back to optimized PNG/JPEG if larger.
Run from repo root: python3 corvo-labs-enhanced/scripts/optimize_raster_images.py path1 path2 ...
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

from PIL import Image

WEBP_QUALITY = 90
JPEG_QUALITY = 90


def optimize_one(path: Path) -> None:
    if not path.is_file():
        print(f"skip (missing): {path}")
        return
    ext = path.suffix.lower()
    if ext not in {".png", ".jpg", ".jpeg", ".webp"}:
        print(f"skip (not raster): {path}")
        return

    original = path.stat().st_size
    img = Image.open(path)
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGBA" if "A" in img.getbands() else "RGB")

    out_webp = path.with_suffix(".webp")
    save_kwargs: dict = {"format": "WEBP", "quality": WEBP_QUALITY, "method": 6}
    if img.mode == "RGBA":
        save_kwargs["lossless"] = False

    img.save(out_webp, **save_kwargs)
    webp_size = out_webp.stat().st_size

    if ext in {".jpg", ".jpeg"}:
        tmp = path.with_suffix(".opt.jpg")
        rgb = img.convert("RGB")
        rgb.save(tmp, format="JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
        jpg_size = tmp.stat().st_size
        if webp_size <= jpg_size and webp_size < original:
            path.unlink(missing_ok=True)
            tmp.unlink(missing_ok=True)
            print(f"OK {path.name} -> {out_webp.name}  {original} -> {webp_size} bytes")
            return
        if jpg_size < original:
            tmp.replace(path)
            out_webp.unlink(missing_ok=True)
            print(f"OK {path.name} optimized JPEG  {original} -> {jpg_size} bytes")
            return
        tmp.unlink(missing_ok=True)
        out_webp.unlink(missing_ok=True)
        print(f"no win: {path}")
        return

    # PNG: compare WebP vs zlib-optimized PNG
    tmp_png = path.with_suffix(".opt.png")
    img.save(tmp_png, format="PNG", optimize=True, compress_level=9)
    png_size = tmp_png.stat().st_size

    if webp_size < original and webp_size <= png_size:
        path.unlink()
        tmp_png.unlink(missing_ok=True)
        print(f"OK {path.name} -> {out_webp.name}  {original} -> {webp_size} bytes")
        return
    if png_size < original:
        tmp_png.replace(path)
        out_webp.unlink(missing_ok=True)
        print(f"OK {path.name} optimized PNG  {original} -> {png_size} bytes")
        return
    tmp_png.unlink(missing_ok=True)
    out_webp.unlink(missing_ok=True)
    print(f"no win: {path}")


def main() -> None:
    paths = [Path(p).resolve() for p in sys.argv[1:]]
    if not paths:
        print("usage: optimize_raster_images.py <file> [file...]")
        sys.exit(1)
    for p in paths:
        optimize_one(p)


if __name__ == "__main__":
    main()
