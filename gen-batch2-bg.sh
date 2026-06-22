#!/bin/bash
# Background image generator with smart rate limiting
# Runs as a daemon, generates all missing batch 2 images

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
LOG="/home/z/my-project/batch2-gen.log"
COUNT=0
FAILED=0
SKIPPED=0

echo "=== Batch 2 Image Generation Started: $(date) ===" > "$LOG"

gen_image() {
  local type="$1" desc="$2" idx="$3" prompt="$4" file="$5"
  local max_attempts=10
  local wait_base=30
  
  for attempt in $(seq 1 $max_attempts); do
    if [ $attempt -gt 1 ]; then
      local wait_time=$((wait_base * attempt))
      echo "[$(date +%H:%M:%S)] WAIT ${wait_time}s for $type/angle-$idx (attempt $attempt)" >> "$LOG"
      sleep $wait_time
    fi
    
    echo "[$(date +%H:%M:%S)] GEN $type/angle-$idx..." >> "$LOG"
    if z-ai image -p "$prompt" -o "$file" >> "$LOG" 2>&1; then
      if [ -f "$file" ]; then
        local size=$(stat -c%s "$file" 2>/dev/null || echo 0)
        if [ "$size" -gt 5120 ]; then
          echo "[$(date +%H:%M:%S)] OK $type/angle-$idx ($size bytes)" >> "$LOG"
          sleep 5
          return 0
        else
          rm -f "$file"
          echo "[$(date +%H:%M:%S)] SMALL $type/angle-$idx" >> "$LOG"
        fi
      fi
    else
      echo "[$(date +%H:%M:%S)] ERR $type/angle-$idx" >> "$LOG"
    fi
  done
  return 1
}

for entry in "${PRODUCTS[@]}"; do
  IFS='|' read -r type desc <<< "$entry"
  dir="$BASE/$type"
  mkdir -p "$dir"
  
  for i in 1 2 3 4 5; do
    file="$dir/angle-$i.png"
    if [ -f "$file" ]; then
      size=$(stat -c%s "$file" 2>/dev/null || echo 0)
      if [ "$size" -gt 5120 ]; then
        SKIPPED=$((SKIPPED + 1))
        echo "[$(date +%H:%M:%S)] SKIP $type/angle-$i" >> "$LOG"
        continue
      else
        rm -f "$file"
      fi
    fi
    
    prompt="${PROMPTS[$((i-1))]}"
    prompt="${prompt//\{DESC\}/$desc}"
    
    if gen_image "$type" "$desc" "$i" "$prompt" "$file"; then
      COUNT=$((COUNT + 1))
    else
      FAILED=$((FAILED + 1))
    fi
  done
done

echo "=== Batch 2 Complete: $(date) ===" >> "$LOG"
echo "Generated: $COUNT | Skipped: $SKIPPED | Failed: $FAILED" >> "$LOG"