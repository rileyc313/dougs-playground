#!/bin/bash
mkdir -p ./img/gallery_compressed
find ./img/gallery -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" | while read -r f; do
  rel="${f#./img/gallery/}"
  outdir="./img/gallery_compressed/$(dirname "$rel")"
  mkdir -p "$outdir"
  echo "Processing: $f"
  magick "$f" -resize "400x>" -strip -quality 82 "./img/gallery_compressed/$rel"
done