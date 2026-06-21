#!/bin/bash
# Generate a specific set of missing product images
# Args: start_product_num end_product_num (1-based within batch 2 products list)

PRODUCTS=(
  "sewer-coupling|flexible rubber sewer pipe coupling"
  "backwater-valve|backwater prevention valve"
  "one-piece-toilet|white ceramic one-piece toilet"
  "two-piece-toilet|white ceramic two-piece toilet"
  "wall-hung-toilet|wall-mounted toilet system"
  "undermount-sink|stainless steel undermount kitchen sink"
  "pedestal-basin|white ceramic pedestal bathroom sink"
  "thhn-copper-wire|THHN copper electrical wire on spool"
  "romex-nm-b-cable|NM-B non-metallic sheathed electrical cable"
  "uf-b-underground-cable|UF-B underground feeder cable"
  "circuit-breaker|20A circuit breaker electrical"
  "afci-breaker|arc fault circuit interrupter"
  "gfci-breaker|ground fault circuit interrupter"
  "main-breaker-panel|main electrical breaker panel"
  "load-center|electrical load center panel"
  "junction-box|plastic junction box electrical"
  "outdoor-box|weatherproof outdoor electrical box"
  "pvc-conduit|PVC electrical conduit pipe"
  "emt-conduit|EMT metallic conduit galvanized"
  "flexible-metal-conduit|flexible metal conduit"
)

PROMPTS=(
  "Professional product photography of {DESC}, front view, clean white background, studio lighting, high resolution"
  "{DESC} side angle 45-degree view, white background, studio product catalog photography"
  "Close-up detail of {DESC}, macro photography, sharp focus, white background"
  "{DESC} installed in construction setting, realistic building"
  "{DESC} product packaging branding, retail display, white background"
)

BASE="/home/z/my-project/public/images/products"
START=${1:-1}
END=${2:-20}
COUNT=0
SKIPPED=0

for pidx in $(seq $START $END); do
  idx=$((pidx - 1))
  entry="${PRODUCTS[$idx]}"
  IFS='|' read -r type desc <<< "$entry"
  dir="$BASE/$type"
  mkdir -p "$dir"
  
  for i in 1 2 3 4 5; do
    file="$dir/angle-$i.png"
    if [ -f "$file" ]; then
      size=$(stat -c%s "$file" 2>/dev/null || echo 0)
      if [ "$size" -gt 5120 ]; then
        SKIPPED=$((SKIPPED + 1))
        continue
      else
        rm -f "$file"
      fi
    fi
    
    prompt="${PROMPTS[$((i-1))]}"
    prompt="${prompt//\{DESC\}/$desc}"
    
    ok=false
    for attempt in 1 2 3 4 5 6 7 8; do
      if [ $attempt -gt 1 ]; then
        sleep $((attempt * 20))
      fi
      echo "[$(date +%H:%M:%S)] $type/angle-$i (attempt $attempt)..."
      if z-ai image -p "$prompt" -o "$file" 2>/dev/null; then
        if [ -f "$file" ]; then
          size=$(stat -c%s "$file" 2>/dev/null || echo 0)
          if [ "$size" -gt 5120 ]; then
            echo "  -> OK ($size bytes)"
            COUNT=$((COUNT + 1))
            ok=true
            break
          else
            rm -f "$file"
          fi
        fi
      fi
    done
    if [ "$ok" = false ]; then
      echo "  -> FAILED"
    fi
  done
done

echo ""
echo "DONE: generated=$COUNT skipped=$SKIPPED"