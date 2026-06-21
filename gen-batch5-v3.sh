#!/bin/bash
cd /home/z/my-project

PRODUCTS=(
  "tile-adhesive|tile thinset mortar bag"
  "tile-grout|sanded tile grout bag"
  "tile-leveling-clips|tile leveling clips"
  "fiberglass-insulation|fiberglass batt roll insulation"
  "foam-board-insulation|foam board panel insulation"
  "fiber-cement-siding|fiber cement siding plank"
  "underlayment-roll|flooring underlayment roll"
  "joint-compound|joint compound bucket"
  "liquid-waterproofing-membrane|waterproofing membrane liquid"
  "steel-angle|galvanized steel angle iron"
  "flat-bar|hot-rolled steel flat bar"
  "square-steel-tube|square steel tubing"
  "round-steel-pipe|galvanized round pipe"
  "anchor-bolt|hex anchor bolt galvanized"
  "concrete-screw|masonry concrete screw"
  "hex-nut|zinc hex nut"
  "flat-washer|zinc flat washer"
  "wood-screw|Phillips wood screw"
  "cutting-disc|metal cutting grinding disc"
  "welding-rod|E7018 welding electrode"
  "door-hinge|brass door hinge"
  "door-closer|commercial door closer"
  "deadbolt|deadbolt lock"
  "door-lockset|entry door lockset"
  "cabinet-pull|stainless cabinet drawer pull"
  "drawer-slide|drawer slide mechanism"
  "soft-close-hinge|soft close cabinet hinge"
  "pull-out-basket|chrome pull-out wire basket"
  "hammer|claw hammer fiberglass"
  "pipe-wrench|pipe wrench adjustable"
  "pliers-set|pliers set"
  "screwdriver-set|multi-bit screwdriver set"
  "drill-driver|20V cordless drill"
)

PROMPTS=(
  "1|Professional product photography of DESC, front view, white background, studio lighting"
  "2|DESC side angle 45-degree, white background, product catalog"
  "3|Close-up detail DESC, macro, sharp focus, white background"
  "4|DESC installed in construction, realistic building"
  "5|DESC packaging branding, retail display, white background"
)

TASKS=()
for product in "${PRODUCTS[@]}"; do
  IFS='|' read -r type desc <<< "$product"
  for prompt_tmpl in "${PROMPTS[@]}"; do
    IFS='|' read -r angle prompt <<< "$prompt_tmpl"
    outfile="public/images/products/${type}/angle-${angle}.png"
    if [ -f "$outfile" ] && [ $(stat -c%s "$outfile" 2>/dev/null || echo 0) -gt 5000 ]; then
      continue
    fi
    actual_prompt="${prompt//DESC/$desc}"
    TASKS+=("$outfile|$actual_prompt")
  done
done

echo "Tasks: ${#TASKS[@]}"
i=0; total=${#TASKS[@]}; ok=0; fail=0

while [ $i -lt $total ]; do
  # Launch 2 parallel, staggered by 2s
  for j in 0 1; do
    idx=$((i + j))
    [ $idx -ge $total ] && break
    IFS='|' read -r outfile prompt <<< "${TASKS[$idx]}"
    z-ai image -p "$prompt" -o "$outfile" &
    [ $j -eq 0 ] && sleep 2
  done
  wait
  sleep 3
  i=$((i + 2))
  # Count progress
  c=$(find public/images/products -name "angle-*.png" -size +5k 2>/dev/null | wc -l)
  echo "Progress: ~$i/$total, files>$5KB: $c"
done
echo "FINAL files>5KB: $(find public/images/products -name 'angle-*.png' -size +5k | wc -l)"
