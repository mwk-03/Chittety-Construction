#!/bin/bash
# Chittety Construction - Robust Image Generator
# Runs z-ai image CLI sequentially, retries on failure
set -o pipefail

cd /home/z/my-project
OUT="./public/images/products"
mkdir -p "$OUT"

LOG="./scripts/generate-all.log"
exec > >(tee -a "$LOG") 2>&1

generate_image() {
  local prompt="$1"
  local outfile="$2"
  if [ -f "$outfile" ] && [ $(stat -c%s "$outfile" 2>/dev/null || echo 0) -gt 5000 ]; then
    echo "  SKIP: $(basename $outfile)"
    return 0
  fi
  local max_retries=2
  for r in $(seq 0 $max_retries); do
    z-ai image -p "$prompt" -o "$outfile" 2>&1
    if [ $? -eq 0 ] && [ -f "$outfile" ] && [ $(stat -c%s "$outfile" 2>/dev/null || echo 0) -gt 5000 ]; then
      echo "  OK: $(basename $outfile)"
      return 0
    fi
    echo "  RETRY ($r/$max_retries): $(basename $outfile)"
    sleep 2
  done
  echo "  FAIL: $(basename $outfile)"
  return 1
}

# Product type definitions: TYPE_NAME|BRAND|DESCRIPTION
# Angle prompts
declare -a PROMPTS=(
  "front view, clean white background, studio lighting, professional product photography, high resolution, construction supply catalog"
  "side angle 45-degree view, on white background, studio photography, detailed product shot"
  "close-up detail shot, macro photography, sharp focus, white background"
  "installed in real construction setting showing practical use, realistic environment"
  "product packaging branding visible, retail box display, white background"
)

declare -a ALL_TYPES=(
  "schedule-40-pvc-pipe|Schedule 40 PVC Pipe|Charlotte Pipe brand PVC pipe"
  "cpvc-pipe|CPVC Pipe|Charlotte Pipe CPVC tubing for hot water"
  "pex-tube|PEX Tube|SharkBite PEX cross-linked polyethylene tube"
  "copper-pipe|Copper Pipe|Mueller copper plumbing pipe Type L"
  "45-degree-elbow|45 Degree Elbow|Charlotte Pipe PVC elbow fitting"
  "90-degree-elbow|90 Degree Elbow|Charlotte Pipe PVC 90 elbow"
  "tee-fitting|Tee Fitting|Charlotte Pipe PVC T-shaped fitting"
  "coupling|Coupling|Charlotte Pipe PVC pipe coupling"
  "reducer|Reducer|Charlotte Pipe PVC reducing fitting"
  "union|Union|Charlotte Pipe PVC union with nut"
  "ball-valve|Ball Valve|PROFLO brass ball valve plumbing"
  "gate-valve|Gate Valve|PROFLO gate valve with handwheel"
  "check-valve|Check Valve|PROFLO swing check valve PVC"
  "angle-stop-valve|Angle Stop Valve|PROFLO chrome angle stop valve"
  "shower-valve|Shower Valve|Moen single handle shower valve"
  "single-handle-faucet|Single Handle Faucet|Moen chrome bathroom faucet"
  "widespread-faucet|Widespread Faucet|Moen widespread bathroom faucet"
  "rain-shower-head|Rain Shower Head|Moen large rain shower head"
  "p-trap|P-Trap|Oatey PVC P-trap plumbing fitting"
  "bottle-trap|Bottle Trap|Oatey chrome decorative bottle trap"
  "floor-drain|Floor Drain|Oatey stainless steel floor drain"
  "channel-drain|Channel Drain|NDS linear channel drain polymer"
  "cleanout-plug|Cleanout Plug|Oatey PVC cleanout plug fitting"
  "sewer-coupling|Sewer Coupling|Fernco flexible sewer coupling"
  "backwater-valve|Backwater Valve|Oatey backwater prevention valve"
  "one-piece-toilet|One Piece Toilet|American Standard white ceramic toilet"
  "two-piece-toilet|Two Piece Toilet|American Standard two-piece toilet"
  "wall-hung-toilet|Wall Hung Toilet|Geberit wall-mounted toilet system"
  "undermount-sink|Undermount Sink|Kohler stainless steel kitchen sink"
  "pedestal-basin|Pedestal Basin|Kohler white ceramic pedestal sink"
  "thhn-copper-wire|THHN Copper Wire|Southwire THHN building wire spool"
  "romex-nm-b-cable|Romex NM-B Cable|Southwire NM-B sheathed cable"
  "uf-b-underground-cable|UF-B Underground Cable|Southwire UF-B underground cable"
  "circuit-breaker|Circuit Breaker|Schneider Electric 20A breaker"
  "afci-breaker|AFCI Breaker|Eaton arc fault breaker"
  "gfci-breaker|GFCI Breaker|Siemens ground fault breaker"
  "main-breaker-panel|Main Breaker Panel|Square D main electrical panel"
  "load-center|Load Center|Square D electrical load center"
  "junction-box|Junction Box|Leviton 4-inch plastic junction box"
  "outdoor-box|Outdoor Box|Leviton weatherproof outdoor box"
  "pvc-conduit|PVC Conduit|Carlon PVC electrical conduit pipe"
  "emt-conduit|EMT Conduit|Allied Tube EMT metallic conduit"
  "flexible-metal-conduit|Flexible Metal Conduit|Flexcon galvanized flexible conduit"
  "ground-rod|Ground Rod|Ericson copper-clad 8ft ground rod"
  "wire-connector|Wire Connector|Ideal twist-on wire connector"
  "gfci-outlet|GFCI Outlet|Leviton GFCI tamper-resistant outlet"
  "weather-resistant-outlet|Weather Resistant Outlet|Leviton outdoor outlet"
  "usb-outlet|USB Outlet|Leviton outlet with USB ports"
  "decora-switch|Decora Switch|Leviton Decora light switch"
  "single-pole-switch|Single Pole Switch|Leviton single pole switch"
  "led-bulb|LED Bulb|Philips LED A19 warm white bulb"
  "led-tube-light|LED Tube Light|Philips LED T8 tube light 4ft"
  "recessed-downlight|Recessed Downlight|Halo LED recessed can light"
  "panel-light|Panel Light|Lithonia LED flat panel ceiling light"
  "flood-light|Flood Light|Lithonia LED outdoor flood light"
  "wall-pack-light|Wall Pack Light|Lithonia LED wall pack commercial"
  "pendant-light|Pendant Light|Progress industrial pendant light"
  "landscape-light|Landscape Light|Malibu LED landscape path light"
  "ceiling-fan|Ceiling Fan|Hunter ceiling fan with light kit"
  "exhaust-fan|Exhaust Fan|Broan-NuTone bathroom exhaust fan"
  "tankless-water-heater|Tankless Water Heater|Rheem tankless gas heater"
  "electric-water-heater|Electric Water Heater|Rheem electric tank heater"
  "gas-water-heater|Gas Water Heater|A.O. Smith natural gas heater"
  "water-heater-valve|Water Heater Valve|Rheem relief valve"
  "expansion-tank|Expansion Tank|Amtrol thermal expansion tank"
  "fan-capacitor|Fan Capacitor|Hunter ceiling fan capacitor"
  "ac-line-set|AC Line Set|Carrier AC copper line set"
  "ceramic-tile|Ceramic Tile|Daltile white ceramic floor tile"
  "porcelain-tile|Porcelain Tile|Daltile porcelain wood-look tile"
  "marble-tile|Marble Tile|MS International white marble tile"
  "granite-tile|Granite Tile|MS International granite polished tile"
  "mosaic-tile|Mosaic Tile|Daltile glass mosaic tile sheet"
  "laminate-flooring|Laminate Flooring|Pergo laminate wood plank"
  "luxury-vinyl-plank|Luxury Vinyl Plank|Armstrong luxury vinyl plank"
  "asphalt-shingle|Asphalt Shingle|GAF architectural roof shingle"
  "ridge-cap-shingle|Ridge Cap Shingle|GAF ridge cap shingle"
  "roof-flashing|Roof Flashing|GAF aluminum roof flashing"
  "roof-sealant|Roof Sealant|GAF roofing sealant tube"
  "roof-underlayment|Roof Underlayment|GAF synthetic underlayment roll"
  "cement-board|Cement Board|HardieBacker cement board sheet"
  "drywall-sheet|Drywall Sheet|USG gypsum drywall panel"
  "concrete-mix|Concrete Mix|Quikrete Portland cement bag"
  "mortar-mix|Mortar Mix|Quikrete mortar mix bag"
  "tile-adhesive|Tile Adhesive|Custom tile thinset mortar bag"
  "tile-grout|Tile Grout|Custom sanded tile grout bag"
  "tile-leveling-clips|Tile Leveling Clips|Sigma tile leveling clips"
  "fiberglass-insulation|Fiberglass Insulation|Owens Corning fiberglass batt"
  "foam-board-insulation|Foam Board Insulation|Owens Corning foam panel"
  "fiber-cement-siding|Fiber Cement Siding|James Hardie siding plank"
  "underlayment-roll|Underlayment Roll|Roberts flooring underlayment"
  "joint-compound|Joint Compound|USG joint compound bucket"
  "liquid-waterproofing-membrane|Liquid Waterproofing Membrane|Laticrete waterproofing liquid"
  "steel-angle|Steel Angle|Everbilt galvanized steel angle iron"
  "flat-bar|Flat Bar|Everbilt hot-rolled steel flat bar"
  "square-steel-tube|Square Steel Tube|Everbilt square steel tubing"
  "round-steel-pipe|Round Steel Pipe|Everbilt galvanized round pipe"
  "anchor-bolt|Anchor Bolt|Powers hex anchor bolt galvanized"
  "concrete-screw|Concrete Screw|Tapcon masonry concrete screw"
  "hex-nut|Hex Nut|Everbilt zinc hex nut"
  "flat-washer|Flat Washer|Everbilt zinc flat washer"
  "wood-screw|Wood Screw|Everbilt Phillips wood screw"
  "cutting-disc|Cutting Disc|DEWALT metal cutting disc"
  "welding-rod|Welding Rod|Lincoln Electric E7018 electrode"
  "door-hinge|Door Hinge|Stanley brass door hinge"
  "door-closer|Door Closer|LCN commercial door closer"
  "deadbolt|Deadbolt|Schlage single cylinder deadbolt"
  "door-lockset|Door Lockset|Schlage entry door lockset"
  "cabinet-pull|Cabinet Pull|Amerock stainless cabinet pull"
  "drawer-slide|Drawer Slide|Knape Vogt drawer slide"
  "soft-close-hinge|Soft Close Hinge|Blum cabinet soft-close hinge"
  "pull-out-basket|Pull-Out Basket|Rev-A-Shelf chrome wire basket"
  "hammer|Hammer|Stanley 16oz claw hammer"
  "pipe-wrench|Pipe Wrench|Ridge 14-inch pipe wrench"
  "pliers-set|Pliers Set|Klein Tools pliers set"
  "screwdriver-set|Screwdriver Set|Klein Tools multi-bit set"
  "drill-driver|Drill Driver|DEWALT 20V cordless drill"
)

BATCH_NUM=$1
BATCH_TOTAL=${2:-1}
TOTAL=${#ALL_TYPES[@]}
BATCH_SIZE=$(( (TOTAL + BATCH_TOTAL - 1) / BATCH_TOTAL ))
START=$((BATCH_NUM * BATCH_SIZE))
END=$(( START + BATCH_SIZE ))
if [ $END -gt $TOTAL ]; then END=$TOTAL; fi

echo "============================================"
echo "Batch $((BATCH_NUM+1))/$BATCH_TOTAL | Items $((START+1))-$END of $TOTAL"
echo "Start: $(date)"
echo "============================================"

OK=0
FAIL=0
SKIP=0

for (( i=START; i<END; i++ )); do
  IFS='|' read -r slug name desc <<< "${ALL_TYPES[$i]}"
  echo ""
  echo "[$((i+1))/$TOTAL] $name"
  
  dir="$OUT/$slug"
  mkdir -p "$dir"
  
  for j in "${!PROMPTS[@]}"; do
    angle=$((j+1))
    file="$dir/angle-$angle.png"
    prompt="Professional product photography of $desc, ${PROMPTS[$j]}"
    
    if [ -f "$file" ] && [ $(stat -c%s "$file" 2>/dev/null || echo 0) -gt 5000 ]; then
      echo "  SKIP: angle-$angle.png"
      SKIP=$((SKIP+1))
      continue
    fi
    
    if z-ai image -p "$prompt" -o "$file" 2>&1; then
      if [ -f "$file" ] && [ $(stat -c%s "$file" 2>/dev/null || echo 0) -gt 5000 ]; then
        echo "  OK: angle-$angle.png"
        OK=$((OK+1))
      else
        echo "  FAIL: angle-$angle.png (empty)"
        FAIL=$((FAIL+1))
      fi
    else
      echo "  FAIL: angle-$angle.png (error)"
      FAIL=$((FAIL+1))
    fi
  done
done

echo ""
echo "============================================"
echo "Batch $((BATCH_NUM+1)) Complete: $(date)"
echo "OK: $OK | FAIL: $FAIL | SKIP: $SKIP"
echo "============================================"

# Rebuild mapping
echo "Rebuilding image mapping..."
node -e "
const fs = require('fs');
const path = require('path');
const dir = '$OUT';
const map = {};
const dirs = fs.readdirSync(dir).filter(d => fs.statSync(path.join(dir, d)).isDirectory());
for (const d of dirs) {
  const imgs = [1,2,3,4,5].map(n => '/images/products/' + d + '/angle-' + n + '.png').filter(f => {
    try { return fs.statSync(path.join('.', f)).size > 5000; } catch(e) { return false; }
  });
  if (imgs.length > 0) map[d] = imgs;
}
fs.writeFileSync('./src/lib/data/product-images.json', JSON.stringify(map, null, 2));
console.log('Mapped ' + Object.keys(map).length + ' product types with ' + Object.values(map).reduce((a,v)=>a+v.length,0) + ' images');
"
