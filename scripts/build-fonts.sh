#!/usr/bin/env bash
# Subset + convert the landing page's TTF faces to WOFF2.
#
# The source TTFs are the exact files the mobile apps bundle (byte-identical),
# so the rendered shapes stay the same; this only changes the container format
# and drops codepoints the site never renders.
set -euo pipefail

SRC="$1"   # directory holding the .ttf files
OUT="$2"   # directory to write .woff2 into

# Latin + the punctuation, currency (₵ U+20B5), arrows, box-drawing, geometric
# shapes and dingbats (✓ U+2713) that actually appear in the source. Emoji are
# intentionally excluded: they render from the system emoji font either way.
UNICODES="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,\
U+0100-017F,U+0300-036F,U+2000-206F,U+2070-209F,U+20A0-20BF,U+2100-214F,\
U+2190-21FF,U+2200-22FF,U+2500-257F,U+25A0-25FF,U+2600-26FF,U+2700-27BF,\
U+FEFF,U+FFFD"

mkdir -p "$OUT"

for ttf in "$SRC"/*.ttf; do
  base="$(basename "$ttf" .ttf)"
  pyftsubset "$ttf" \
    --output-file="$OUT/$base.woff2" \
    --flavor=woff2 \
    --layout-features='kern,liga,clig,calt,ccmp,locl,mark,mkmk,rlig' \
    --unicodes="$UNICODES" \
    --name-IDs='*' \
    --drop-tables+=DSIG \
    --no-hinting \
    --desubroutinize
  printf '%-26s %7s -> %7s\n' "$base" \
    "$(du -k "$ttf" | cut -f1)K" "$(du -k "$OUT/$base.woff2" | cut -f1)K"
done

echo
echo "total ttf : $(cat "$SRC"/*.ttf | wc -c) bytes"
echo "total wof2: $(cat "$OUT"/*.woff2 | wc -c) bytes"
