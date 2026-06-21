#!/bin/bash
cd /home/z/my-project

declare -A PRODUCTS
PRODUCTS[tile-adhesive]="tile thinset mortar bag"
PRODUCTS[tile-grout]="sanded tile grout bag"
PRODUCTS[tile-leveling-clips]="tile leveling clips"
PRODUCTS[fiberglass-insulation]="fiberglass batt roll insulation"
PRODUCTS[foam-board-insulation]="foam board panel insulation"
PRODUCTS[fiber-cement-siding]="fiber cement siding plank"
PRODUCTS[underlayment-roll]="flooring underlayment roll"
PRODUCTS[joint-compound]="joint compound bucket"
PRODUCTS[liquid-waterproofing-membrane]="waterproofing membrane liquid"
PRODUCTS[steel-angle]="galvanized steel angle iron"
PRODUCTS[flat-bar]="hot-rolled steel flat bar"
PRODUCTS[square-steel-tube]="square steel tubing"
PRODUCTS[round-steel-pipe]="galvanized round pipe"
PRODUCTS[anchor-bolt]="hex anchor bolt galvanized"
PRODUCTS[concrete-screw]="masonry concrete screw"
PRODUCTS[hex-nut]="zinc hex nut"
PRODUCTS[flat-washer]="zinc flat washer"
PRODUCTS[wood-screw]="Phillips wood screw"
PRODUCTS[cutting-disc]="metal cutting grinding disc"
PRODUCTS[welding-rod]="E7018 welding electrode"
PRODUCTS[door-hinge]="brass door hinge"
PRODUCTS[door-closer]="commercial door closer"
PRODUCTS[deadbolt]="deadbolt lock"
PRODUCTS[door-lockset]="entry door lockset"
PRODUCTS[cabinet-pull]="stainless cabinet drawer pull"
PRODUCTS[drawer-slide]="drawer slide mechanism"
PRODUCTS[soft-close-hinge]="soft close cabinet hinge"
PRODUCTS[pull-out-basket]="chrome pull-out wire basket"
PRODUCTS[hammer]="claw hammer fiberglass"
PRODUCTS[pipe-wrench]="pipe wrench adjustable"
PRODUCTS[pliers-set]="pliers set"
PRODUCTS[screwdriver-set]="multi-bit screwdriver set"
PRODUCTS[drill-driver]="20V cordless drill"

# Build task queue
TASKS=()
for type in "${!PRODUCTS[@]}"; do
  desc="${PRODUCTS[$type]}"
  for angle in 1 2 3 4 5; do
    outfile="public/images/products/${type}/angle-${angle}.png"
    # Skip if file exists and >5KB
    if [ -f "$outfile" ] && [ $(stat -c%s "$outfile" 2>/dev/null || echo 0) -gt 5000 ]; then
      echo "SKIP: $outfile"
      continue
    fi
    case $angle in
      1) prompt="Professional product photography of ${desc}, front view, white background, studio lighting" ;;
      2) prompt="${desc} side angle 45-degree, white background, product catalog" ;;
      3) prompt="Close-up detail ${desc}, macro, sharp focus, white background" ;;
      4) prompt="${desc} installed in construction, realistic building" ;;
      5) prompt="${desc} packaging branding, retail display, white background" ;;
    esac
    TASKS+=("$type|$outfile|$prompt")
  done
done

echo "Total tasks: ${#TASKS[@]}"
idx=0
total=${#TASKS[@]}
failed=0

while [ $idx -lt $total ]; do
  pids=()
  for i in 0 1 2 3; do
    if [ $((idx + i)) -ge $total ]; then break; fi
    IFS='|' read -r type outfile prompt <<< "${TASKS[$((idx + i))]}"
    z-ai image -p "$prompt" -o "$outfile" &
    pids+=($!)
  done
  
  # Wait for all background jobs
  for pid in "${pids[@]}"; do
    if ! wait $pid; then
      failed=$((failed + 1))
    fi
  done
  
  idx=$((idx + 4))
  echo "Progress: $idx / $total done, $failed failed"
done

echo "DONE. Total: $total, Failed: $failed"
