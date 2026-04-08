#!/usr/bin/env python3
"""
Lossy WebP output at high quality for web; falls back to optimized PNG/JPEG if larger.
Run from repo root: python3 corvo-labs-enhanced/scripts/optimize_raster_images.py path1 path2 ...
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

WEBP_QUALITY = 90
JPEG_QUALITY = 90


def _webp_save_kwargs(image: Image.Image) -> dict:
    save_kwargs: dict = {"format": "WEBP", "quality": WEBP_QUALITY, "method": 6}
    if image.mode == "RGBA":
        save_kwargs["lossless"] = False
    return save_kwargs


def _normalize_mode(image: Image.Image) -> Image.Image:
    if image.mode in ("RGB", "RGBA"):
        return image
    return image.convert("RGBA" if "A" in image.getbands() else "RGB")


def optimize_one(path: Path) -> None:
    if not path.is_file():
        print(f"skip (missing): {path}")
        return
    ext = path.suffix.lower()
    if ext not in {".png", ".jpg", ".jpeg", ".webp"}:
        print(f"skip (not raster): {path}")
        return

    original = path.stat().st_size
    with Image.open(path) as src:
        img = _normalize_mode(src.copy())

    # Existing WebP: never write WebP output to the same path as the source.
    if ext == ".webp":
        candidate = path.with_suffix(".opt.webp")
        img.save(candidate, **_webp_save_kwargs(img))
        cand_size = candidate.stat().st_size
        if cand_size < original:
            candidate.replace(path)
            print(f"OK {path.name} recompressed WebP  {original} -> {cand_size} bytes")
        else:
            candidate.unlink(missing_ok=True)
            print(f"no win: {path}")
        return

    final_webp = path.with_suffix(".webp")
    cand_webp = path.with_suffix(".opt.webp")

    if ext in {".jpg", ".jpeg"}:
        img.save(cand_webp, **_webp_save_kwargs(img))
        webp_size = cand_webp.stat().st_size

        tmp_jpg = path.with_suffix(".opt.jpg")
        img.convert("RGB").save(tmp_jpg, format="JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
        jpg_size = tmp_jpg.stat().st_size

        if webp_size <= jpg_size and webp_size < original:
            path.unlink(missing_ok=True)
            tmp_jpg.unlink(missing_ok=True)
            cand_webp.replace(final_webp)
            print(f"OK {path.name} -> {final_webp.name}  {original} -> {webp_size} bytes")
            return
        if jpg_size < original:
            tmp_jpg.replace(path)
            cand_webp.unlink(missing_ok=True)
            print(f"OK {path.name} optimized JPEG  {original} -> {jpg_size} bytes")
            return
        tmp_jpg.unlink(missing_ok=True)
        cand_webp.unlink(missing_ok=True)
        print(f"no win: {path}")
        return

    # PNG: compare WebP vs zlib-optimized PNG (only .png reaches here)
    img.save(cand_webp, **_webp_save_kwargs(img))
    webp_size = cand_webp.stat().st_size

    tmp_png = path.with_suffix(".opt.png")
    img.save(tmp_png, format="PNG", optimize=True, compress_level=9)
    png_size = tmp_png.stat().st_size

    if webp_size < original and webp_size <= png_size:
        path.unlink()
        tmp_png.unlink(missing_ok=True)
        cand_webp.replace(final_webp)
        print(f"OK {path.name} -> {final_webp.name}  {original} -> {webp_size} bytes")
        return
    if png_size < original:
        tmp_png.replace(path)
        cand_webp.unlink(missing_ok=True)
        print(f"OK {path.name} optimized PNG  {original} -> {png_size} bytes")
        return
    tmp_png.unlink(missing_ok=True)
    cand_webp.unlink(missing_ok=True)
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
