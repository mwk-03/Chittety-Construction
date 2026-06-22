#!/bin/bash
# Simplified batch 2 generator - redirect ALL output to log
exec > /home/z/my-project/batch2-gen.log 2>&1

echo "=== Started: $(date) ==="

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
    if [ -f "$file" ]; then
      size=$(stat -c%s "$file" 2>/dev/null || echo 0)
      if [ "$size" -gt 5120 ]; then
        echo "[$(date +%H:%M:%S)] SKIP $type/angle-$i ($size bytes)"
        SKIPPED=$((SKIPPED + 1))
        continue
      else
        rm -f "$file"
      fi
    fi
    
    prompt="${PROMPTS[$((i-1))]}"
    prompt="${prompt//\{DESC\}/$desc}"
    
    ok=false
    for attempt in $(seq 1 15); do
      if [ $attempt -gt 1 ]; then
        w=$((attempt * 20))
        echo "[$(date +%H:%M:%S)] RETRY $type/angle-$i attempt $attempt, sleep ${w}s"
        sleep $w
      fi
      echo "[$(date +%H:%M:%S)] GEN $type/angle-$i..."
      z-ai image -p "$prompt" -o "$file"
      rc=$?
      if [ $rc -eq 0 ] && [ -f "$file" ]; then
        size=$(stat -c%s "$file" 2>/dev/null || echo 0)
        if [ "$size" -gt 5120 ]; then
          echo "[$(date +%H:%M:%S)] OK $type/angle-$i ($size bytes)"
          COUNT=$((COUNT + 1))
          ok=true
          sleep 5
          break
        else
          echo "[$(date +%H:%M:%S)] TOO SMALL $type/angle-$i ($size bytes)"
          rm -f "$file"
        fi
      else
        echo "[$(date +%H:%M:%S)] FAIL $type/angle-$i rc=$rc"
      fi
    done
    
    if [ "$ok" = false ]; then
      FAILED=$((FAILED + 1))
      echo "[$(date +%H:%M:%S)] GAVE UP $type/angle-$i"
    fi
  done
done

echo ""
echo "=== Finished: $(date) ==="
echo "Generated: $COUNT | Skipped: $SKIPPED | Failed: $FAILED"