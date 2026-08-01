#!/bin/bash
while read -r f; do
  rel="${f#./audio/}"
  outdir="./audio_compressed/$(dirname "$rel")"
  mkdir -p "$outdir"
  echo "Processing: $f"
  ffmpeg -i "$f" -t 60 -q:a 4 -ar 32000 -y "./audio_compressed/$rel" < /dev/null
done < <(find ./audio -iname "*.mp3")