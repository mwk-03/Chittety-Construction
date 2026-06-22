#!/bin/bash
# Continue batch 2 image generation - only missing images, sequential with delays

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
COUNT=0
FAILED=0
SKIPPED=0

for entry in "${PRODUCTS[@]}"; do
  IFS='|' read -r type desc <<< "$entry"
  dir="$BASE/$type"
  mkdir -p "$dir"
  
  for i in 1 2 3 4 5; do
    file="$dir/angle-$i.png"
    
    # Skip if file exists and >5KB
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
    
    success=false
    for attempt in 1 2 3 4 5; do
      if [ $attempt -gt 1 ]; then
        wait_time=$((attempt * 30))
        echo "[$(date +%H:%M:%S)] RETRY $type/angle-$i attempt $attempt, waiting ${wait_time}s..."
        sleep $wait_time
      fi
      
      echo "[$(date +%H:%M:%S)] GEN $type/angle-$i..."
      if z-ai image -p "$prompt" -o "$file" 2>/dev/null; then
        if [ -f "$file" ]; then
          size=$(stat -c%s "$file" 2>/dev/null || echo 0)
          if [ "$size" -gt 5120 ]; then
            echo "[$(date +%H:%M:%S)] OK $type/angle-$i ($size bytes)"
            COUNT=$((COUNT + 1))
            success=true
            # Small delay between successful requests
            sleep 3
            break
          else
            echo "[$(date +%H:%M:%S)] SMALL $type/angle-$i ($size bytes)"
            rm -f "$file"
          fi
        fi
      else
        echo "[$(date +%H:%M:%S)] ERR $type/angle-$i"
      fi
    done
    
    if [ "$success" = false ]; then
      echo "[$(date +%H:%M:%S)] FAILED $type/angle-$i"
      FAILED=$((FAILED + 1))
    fi
  done
done

echo ""
echo "========== SUMMARY =========="
echo "Generated: $COUNT"
echo "Skipped (already exist): $SKIPPED"
echo "Failed: $FAILED"