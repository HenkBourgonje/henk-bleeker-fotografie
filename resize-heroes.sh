#!/bin/zsh
# Resize original photos into web-ready hero images (sRGB, metadata stripped).
# Usage: ./resize-heroes.sh ["DW website"] [public/photos]
set -euo pipefail
src=${1:-"DW website"}
out=${2:-public/photos}
widths=(640 1280 1920 2560 3840)
mkdir -p "$out"

for f in "$src"/*.(jpg|jpeg|tif|tiff)(N); do
  name=${${f:t:r}:l}
  # corrupt originals decode with visible glitches (e.g. a stripe) — don't publish them
  if ! vips avg "${f}[fail_on=warning]" >/dev/null 2>&1; then
    echo "SKIPPED (damaged file, ask for a fresh copy): $f"
    continue
  fi
  w0=$(vipsheader -f width "$f")
  for w in $widths; do
    (( w < w0 )) || continue  # never upscale
    # AVIF Q60 keeps the film grain and is ~30% smaller; WebP was larger than JPEG on these grainy photos
    for ext in "jpg[Q=82,optimize_coding,interlace,trellis_quant,keep=none]" "avif[Q=60,effort=4,keep=none]"; do
      vips thumbnail "$f" "$out/$name-$w.$ext" $w --height 100000 --export-profile srgb
    done
  done
  echo "done: $name"
done
