#!/bin/bash
cd /home/z/my-project
OUT="./public/images/products"
STATE="./scripts/gen-state.txt"
LOG="./scripts/gen-progress.log"

# Read resume position
START=0
if [ -f "$STATE" ]; then
  START=$(cat "$STATE")
fi

declare -a NAMES=(
  "schedule-40-pvc-pipe|Schedule 40 PVC Pipe|Charlotte Pipe brand PVC plumbing pipe"
  "cpvc-pipe|CPVC Pipe|Charlotte Pipe CPVC tubing hot water plumbing"
  "pex-tube|PEX Tube|SharkBite cross-linked polyethylene flexible tube"
  "copper-pipe|Copper Pipe|Mueller copper plumbing pipe Type L"
  "45-degree-elbow|45 Degree Elbow|PVC pipe elbow fitting 45 degree"
  "90-degree-elbow|90 Degree Elbow|PVC pipe 90 degree elbow fitting"
  "tee-fitting|Tee Fitting|PVC T-shaped pipe fitting connector"
  "coupling|Coupling|PVC pipe coupling straight connector"
  "reducer|Reducer|PVC pipe reducing fitting"
  "union|Union|PVC union pipe fitting nut"
  "ball-valve|Ball Valve|brass ball valve plumbing shut off"
  "gate-valve|Gate Valve|gate valve handwheel plumbing"
  "check-valve|Check Valve|swing check valve PVC"
  "angle-stop-valve|Angle Stop Valve|chrome angle stop valve"
  "shower-valve|Shower Valve|Moen single handle shower mixer"
  "single-handle-faucet|Single Handle Faucet|Moen chrome bathroom faucet"
  "widespread-faucet|Widespread Faucet|Moen widespread bathroom faucet"
  "rain-shower-head|Rain Shower Head|Moen large rain shower head"
  "p-trap|P-Trap|PVC P-trap plumbing drain fitting"
  "bottle-trap|Bottle Trap|chrome decorative bottle drain"
  "floor-drain|Floor Drain|stainless steel floor drain"
  "channel-drain|Channel Drain|linear channel drain polymer"
  "cleanout-plug|Cleanout Plug|PVC cleanout plug fitting"
  "sewer-coupling|Sewer Coupling|flexible rubber sewer coupling"
  "backwater-valve|Backwater Valve|backwater prevention valve"
  "one-piece-toilet|One Piece Toilet|white ceramic toilet"
  "two-piece-toilet|Two Piece Toilet|white ceramic two-piece toilet"
  "wall-hung-toilet|Wall Hung Toilet|wall-mounted toilet system"
  "undermount-sink|Undermount Sink|stainless steel kitchen sink"
  "pedestal-basin|Pedestal Basin|white ceramic pedestal sink"
  "thhn-copper-wire|THHN Copper Wire|THHN copper wire spool"
  "romex-nm-b-cable|Romex NM-B Cable|NM-B sheathed cable"
  "uf-b-underground-cable|UF-B Underground Cable|UF-B underground cable"
  "circuit-breaker|Circuit Breaker|20A circuit breaker"
  "afci-breaker|AFCI Breaker|arc fault breaker"
  "gfci-breaker|GFCI Breaker|ground fault breaker"
  "main-breaker-panel|Main Breaker Panel|main electrical panel"
  "load-center|Load Center|electrical load center"
  "junction-box|Junction Box|plastic junction box"
  "outdoor-box|Outdoor Box|weatherproof electrical box"
  "pvc-conduit|PVC Conduit|PVC electrical conduit pipe"
  "emt-conduit|EMT Conduit|EMT metallic conduit"
  "flexible-metal-conduit|Flexible Metal Conduit|flexible metal conduit"
  "ground-rod|Ground Rod|copper-clad ground rod"
  "wire-connector|Wire Connector|twist-on wire connector"
  "gfci-outlet|GFCI Outlet|GFCI tamper-resistant outlet"
  "weather-resistant-outlet|Weather Resistant Outlet|outdoor outlet"
  "usb-outlet|USB Outlet|wall outlet with USB ports"
  "decora-switch|Decora Switch|Decora light switch"
  "single-pole-switch|Single Pole Switch|single pole switch"
  "led-bulb|LED Bulb|LED A19 warm white bulb"
  "led-tube-light|LED Tube Light|LED T8 tube light 4ft"
  "recessed-downlight|Recessed Downlight|LED recessed can light"
  "panel-light|Panel Light|LED flat panel ceiling light"
  "flood-light|Flood Light|LED outdoor flood light"
  "wall-pack-light|Wall Pack Light|LED wall pack commercial"
  "pendant-light|Pendant Light|industrial pendant light"
  "landscape-light|Landscape Light|LED landscape path light"
  "ceiling-fan|Ceiling Fan|ceiling fan with light kit"
  "exhaust-fan|Exhaust Fan|bathroom exhaust fan"
  "tankless-water-heater|Tankless Water Heater|tankless gas heater"
  "electric-water-heater|Electric Water Heater|electric tank heater"
  "gas-water-heater|Gas Water Heater|natural gas heater"
  "water-heater-valve|Water Heater Valve|water heater relief valve"
  "expansion-tank|Expansion Tank|thermal expansion tank"
  "fan-capacitor|Fan Capacitor|ceiling fan capacitor"
  "ac-line-set|AC Line Set|AC copper line set"
  "ceramic-tile|Ceramic Tile|white ceramic floor tile"
  "porcelain-tile|Porcelain Tile|porcelain wood-look tile"
  "marble-tile|Marble Tile|white marble tile polished"
  "granite-tile|Granite Tile|granite polished tile"
  "mosaic-tile|Mosaic Tile|glass mosaic tile sheet"
  "laminate-flooring|Laminate Flooring|laminate wood plank"
  "luxury-vinyl-plank|Luxury Vinyl Plank|luxury vinyl plank"
  "asphalt-shingle|Asphalt Shingle|architectural roof shingle"
  "ridge-cap-shingle|Ridge Cap Shingle|ridge cap shingle"
  "roof-flashing|Roof Flashing|aluminum roof flashing"
  "roof-sealant|Roof Sealant|roofing sealant caulk"
  "roof-underlayment|Roof Underlayment|synthetic underlayment"
  "cement-board|Cement Board|cement backer board"
  "drywall-sheet|Drywall Sheet|gypsum drywall panel"
  "concrete-mix|Concrete Mix|Portland cement bag"
  "mortar-mix|Mortar Mix|mortar mix bag"
  "tile-adhesive|Tile Adhesive|tile thinset mortar bag"
  "tile-grout|Tile Grout|sanded tile grout bag"
  "tile-leveling-clips|Tile Leveling Clips|tile leveling clips"
  "fiberglass-insulation|Fiberglass Insulation|fiberglass batt roll"
  "foam-board-insulation|Foam Board Insulation|foam board panel"
  "fiber-cement-siding|Fiber Cement Siding|fiber cement siding plank"
  "underlayment-roll|Underlayment Roll|flooring underlayment"
  "joint-compound|Joint Compound|joint compound bucket"
  "liquid-waterproofing-membrane|Liquid Waterproofing Membrane|waterproofing membrane"
  "steel-angle|Steel Angle|galvanized steel angle iron"
  "flat-bar|Flat Bar|hot-rolled steel flat bar"
  "square-steel-tube|Square Steel Tube|square steel tubing"
  "round-steel-pipe|Round Steel Pipe|galvanized round pipe"
  "anchor-bolt|Anchor Bolt|hex anchor bolt galvanized"
  "concrete-screw|Concrete Screw|masonry concrete screw"
  "hex-nut|Hex Nut|zinc hex nut"
  "flat-washer|Flat Washer|zinc flat washer"
  "wood-screw|Wood Screw|Phillips wood screw"
  "cutting-disc|Cutting Disc|metal cutting disc grinder"
  "welding-rod|Welding Rod|E7018 welding electrode"
  "door-hinge|Door Hinge|brass door hinge butt"
  "door-closer|Door Closer|commercial door closer"
  "deadbolt|Deadbolt|single cylinder deadbolt lock"
  "door-lockset|Door Lockset|entry door handle lockset"
  "cabinet-pull|Cabinet Pull|stainless cabinet drawer pull"
  "drawer-slide|Drawer Slide|ball bearing drawer slide"
  "soft-close-hinge|Soft Close Hinge|soft-close cabinet hinge"
  "pull-out-basket|Pull-Out Basket|chrome pull-out wire basket"
  "hammer|Hammer|16oz claw hammer fiberglass"
  "pipe-wrench|Pipe Wrench|14-inch pipe wrench"
  "pliers-set|Pliers Set|electricians pliers set"
  "screwdriver-set|Screwdriver Set|multi-bit screwdriver set"
  "drill-driver|Drill Driver|20V cordless drill"
)

declare -a ANGLES=(
  "front view, clean white background, studio lighting, professional product photography"
  "side angle 45-degree view, white background, studio product photography"
  "close-up detail shot, macro photography, sharp focus, white background"
  "installed in construction setting, realistic building environment"
  "product packaging branding, retail box display, white background"
)

TOTAL=${#NAMES[@]}
OK=0; FAIL=0; SKIP=0

echo "Resuming from position $START / $TOTAL"
echo "$(date): Starting generation from $START" >> "$LOG"

for (( i=START; i<TOTAL; i++ )); do
  IFS='|' read -r dirSlug name desc <<< "${NAMES[$i]}"
  dir="$OUT/$dirSlug"
  mkdir -p "$dir"
  
  ALL_EXIST=true
  for j in 1 2 3 4 5; do
    f="$dir/angle-$j.png"
    if [ ! -f "$f" ] || [ $(stat -c%s "$f" 2>/dev/null || echo 0) -lt 5000 ]; then
      ALL_EXIST=false
      break
    fi
  done
  
  if $ALL_EXIST; then
    SKIP=$((SKIP+5))
    echo "$((i+1))" > "$STATE"
    continue
  fi
  
  echo "[$((i+1))/$TOTAL] $name" | tee -a "$LOG"
  
  for j in "${!ANGLES[@]}"; do
    angleNum=$((j+1))
    file="$dir/angle-$angleNum.png"
    
    if [ -f "$file" ] && [ $(stat -c%s "$file" 2>/dev/null || echo 0) -gt 5000 ]; then
      SKIP=$((SKIP+1))
      continue
    fi
    
    prompt="Professional product photography of $desc, ${ANGLES[$j]}"
    z-ai image -p "$prompt" -o "$file" 2>&1 >/dev/null
    
    if [ -f "$file" ] && [ $(stat -c%s "$file" 2>/dev/null || echo 0) -gt 5000 ]; then
      OK=$((OK+1))
      echo "  ✓ $angleNum" >> "$LOG"
    else
      FAIL=$((FAIL+1))
      echo "  ✗ $angleNum" >> "$LOG"
    fi
  done
  
  # Save state after each product type
  echo "$((i+1))" > "$STATE"
done

echo "$(date): Complete! OK=$OK FAIL=$FAIL SKIP=$SKIP" >> "$LOG"
echo "DONE: OK=$OK FAIL=$FAIL SKIP=$SKIP"

# Build mapping
node -e "
const fs = require('fs');
const path = require('path');
const map = {};
const dirs = fs.readdirSync('$OUT').filter(d => fs.statSync(path.join('$OUT', d)).isDirectory());
for (const d of dirs) {
  const imgs = [1,2,3,4,5].map(n => '/images/products/' + d + '/angle-' + n + '.png').filter(f => {
    try { return fs.statSync(path.join('.', f)).size > 5000; } catch(e) { return false; }
  });
  if (imgs.length > 0) map[d] = imgs;
}
fs.writeFileSync('./src/lib/data/product-images.json', JSON.stringify(map, null, 2));
console.log('Mapping: ' + Object.keys(map).length + ' types, ' + Object.values(map).reduce((a,v)=>a+v.length,0) + ' images');
"
