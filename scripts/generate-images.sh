#!/bin/bash
# Chittety Construction - Product Image Generator (CLI batch version)
# Generates 5 images per product type using z-ai CLI
set -e

cd /home/z/my-project

OUT="./public/images/products"
mkdir -p "$OUT"

declare -A TYPE_BRANDS
declare -A TYPE_NAMES

# Plumbing products
PLUMBING_TYPES=(
  "Schedule 40 PVC Pipe|Charlotte Pipe|White PVC plumbing pipe, Schedule 40 rated"
  "CPVC Pipe|Charlotte Pipe|CPVC tubing for hot water plumbing"
  "PEX Tube|SharkBite|Cross-linked polyethylene flexible plumbing tube"
  "Copper Pipe|Mueller|Copper plumbing pipe, Type L"
  "45 Degree Elbow|Charlotte Pipe|PVC 45-degree elbow fitting"
  "90 Degree Elbow|Charlotte Pipe|PVC 90-degree elbow fitting"
  "Tee Fitting|Charlotte Pipe|PVC T-shaped pipe fitting"
  "Coupling|Charlotte Pipe|PVC pipe coupling connector"
  "Reducer|Charlotte Pipe|PVC reducing fitting"
  "Union|Charlotte Pipe|PVC union fitting with nut"
  "Ball Valve|PROFLO|Brass ball valve for plumbing"
  "Gate Valve|PROFLO|Gate valve with handwheel"
  "Check Valve|PROFLO|Swing check valve, PVC"
  "Angle Stop Valve|PROFLO|Angle stop valve, chrome"
  "Shower Valve|Moen|Single handle shower mixer valve"
  "Single Handle Faucet|Moen|Single handle bathroom faucet, chrome"
  "Widespread Faucet|Moen|Widespread bathroom faucet set"
  "Rain Shower Head|Moen|Large rain-style shower head"
  "P-Trap|Oatey|PVC P-trap plumbing fitting"
  "Bottle Trap|Oatey|Decorative bottle trap, chrome"
  "Floor Drain|Oatey|Stainless steel floor drain"
  "Channel Drain|NDS|Linear channel drain, polymer"
  "Cleanout Plug|Oatey|PVC cleanout plug fitting"
  "Sewer Coupling|Fernco|Flexible sewer pipe coupling"
  "Backwater Valve|Oatey|Backwater prevention valve"
  "One Piece Toilet|American Standard|One-piece toilet, white ceramic"
  "Two Piece Toilet|American Standard|Two-piece toilet tank and bowl"
  "Wall Hung Toilet|Geberit|Wall-mounted toilet carrier system"
  "Undermount Sink|Kohler|Stainless steel undermount kitchen sink"
  "Pedestal Basin|Kohler|White ceramic pedestal bathroom sink"
)

# Electrical products
ELECTRICAL_TYPES=(
  "THHN Copper Wire|Southwire|THHN copper building wire on spool"
  "Romex NM-B Cable|Southwire|NM-B non-metallic sheathed cable"
  "UF-B Underground Cable|Southwire|UF-B underground feeder cable"
  "Circuit Breaker|Schneider Electric|Standard circuit breaker, 20A"
  "AFCI Breaker|Eaton|Arc fault circuit interrupter breaker"
  "GFCI Breaker|Siemens|Ground fault circuit interrupter breaker"
  "Main Breaker Panel|Square D|Main electrical panel with breakers"
  "Load Center|Square D|Electrical load center panel"
  "Junction Box|Leviton|Plastic junction box, 4-inch square"
  "Outdoor Box|Leviton|Weatherproof outdoor electrical box"
  "PVC Conduit|Carlon|PVC electrical conduit pipe"
  "EMT Conduit|Allied Tube|Electrical metallic tubing conduit"
  "Flexible Metal Conduit|Flexcon|Flexible metal conduit, galvanized"
  "Ground Rod|Ericson|Copper-clad ground rod, 8ft"
  "Wire Connector|Ideal|Twist-on wire connector"
  "GFCI Outlet|Leviton|GFCI tamper-resistant outlet"
  "Weather Resistant Outlet|Leviton|Weather-resistant outdoor outlet"
  "USB Outlet|Leviton|Wall outlet with USB charging ports"
  "Decora Switch|Leviton|Decora style light switch"
  "Single Pole Switch|Leviton|Standard single pole light switch"
)

# Lighting / HVAC / Pumps
LIGHTING_TYPES=(
  "LED Bulb|Philips|LED light bulb, A19, warm white"
  "LED Tube Light|Philips|LED T8 tube light, 4ft"
  "Recessed Downlight|Halo|LED recessed can light trim"
  "Panel Light|Lithonia|LED flat panel ceiling light"
  "Flood Light|Lithonia|LED outdoor flood light"
  "Wall Pack Light|Lithonia|LED wall pack light, commercial"
  "Pendant Light|Progress|Industrial pendant ceiling light"
  "Landscape Light|Malibu|LED landscape path light"
  "Ceiling Fan|Hunter|Ceiling fan with light kit"
  "Exhaust Fan|Broan-NuTone|Bathroom exhaust fan"
  "Tankless Water Heater|Rheem|Tankless gas water heater"
  "Electric Water Heater|Rheem|Electric tank water heater"
  "Gas Water Heater|A.O. Smith|Natural gas tank water heater"
  "Water Heater Valve|Rheem|Water heater relief valve"
  "Expansion Tank|Amtrol|Thermal expansion tank"
  "Fan Capacitor|Hunter|Ceiling fan capacitor"
  "AC Line Set|Carrier|AC copper line set"
)

# Flooring / Roofing / Building
FLOORING_TYPES=(
  "Ceramic Tile|Daltile|White ceramic floor tile, 12x12"
  "Porcelain Tile|Daltile|Porcelain floor tile, wood look"
  "Marble Tile|MS International|White marble floor tile"
  "Granite Tile|MS International|Granite floor tile, polished"
  "Mosaic Tile|Daltile|Glass mosaic tile sheet"
  "Laminate Flooring|Pergo|Laminate wood flooring plank"
  "Luxury Vinyl Plank|Armstrong|Luxury vinyl flooring plank"
  "Asphalt Shingle|GAF|Architectural asphalt roof shingle"
  "Ridge Cap Shingle|GAF|Ridge cap shingle bundle"
  "Roof Flashing|GAF|Aluminum roof flashing"
  "Roof Sealant|GAF|Roofing sealant caulk tube"
  "Roof Underlayment|GAF|Synthetic roof underlayment roll"
  "Cement Board|HardieBacker|Cement backer board sheet"
  "Drywall Sheet|USG|Standard gypsum drywall panel"
  "Concrete Mix|Quikrete|Portland cement bag, 94lb"
  "Mortar Mix|Quikrete|Mortar mix bag"
  "Tile Adhesive|Custom|Tile adhesive thinset mortar bag"
  "Tile Grout|Custom|Sanded tile grout bag"
  "Tile Leveling Clips|Sigma|Tile leveling system clips"
  "Fiberglass Insulation|Owens Corning|Fiberglass insulation batt roll"
  "Foam Board Insulation|Owens Corning|Foam board insulation panel"
  "Fiber Cement Siding|James Hardie|Fiber cement siding plank"
  "Underlayment Roll|Roberts|Flooring underlayment roll"
  "Joint Compound|USG|All-purpose joint compound bucket"
  "Liquid Waterproofing Membrane|Laticrete|Waterproofing membrane liquid"
)

# Hardware / Steel / Tools
HARDWARE_TYPES=(
  "Steel Angle|Everbilt|Galvanized steel angle iron"
  "Flat Bar|Everbilt|Hot-rolled steel flat bar"
  "Square Steel Tube|Everbilt|Square steel tubing"
  "Round Steel Pipe|Everbilt|Galvanized steel round pipe"
  "Anchor Bolt|Powers|Hex anchor bolt, galvanized"
  "Concrete Screw|Tapcon|Masonry concrete screw"
  "Hex Nut|Everbilt|Standard hex nut, zinc plated"
  "Flat Washer|Everbilt|Standard flat washer, zinc"
  "Wood Screw|Everbilt|Phillips wood screw"
  "Cutting Disc|DEWALT|Metal cutting grinding disc"
  "Welding Rod|Lincoln Electric|E7018 welding electrode"
  "Door Hinge|Stanley|Residential door hinge, brass"
  "Door Closer|LCN|Commercial door closer"
  "Deadbolt|Schlage|Single cylinder deadbolt lock"
  "Door Lockset|Schlage|Entry door handle lockset"
  "Cabinet Pull|Amerock|Stainless steel cabinet drawer pull"
  "Drawer Slide|Knape & Vogt|Ball bearing drawer slide"
  "Soft Close Hinge|Blum|Blum soft-close cabinet hinge"
  "Pull-Out Basket|Rev-A-Shelf|Chrome pull-out wire basket"
  "Hammer|Stanley|16oz claw hammer"
  "Pipe Wrench|Ridge|Ridge pipe wrench, 14-inch"
  "Pliers Set|Klein Tools|Electricians pliers set"
  "Screwdriver Set|Klein Tools|Multi-bit screwdriver set"
  "Drill Driver|DEWALT|20V cordless drill driver"
)

# Angle descriptions for prompts
ANGLE_PROMPTS=(
  "front view, clean white background, studio lighting, professional product photography, high resolution, construction supply catalog"
  "side angle view, 45 degree angle, on white background, studio photography, product catalog shot"
  "close-up detail shot showing texture and build quality, macro photography, sharp focus, white background"
  "installed in a real construction setting showing practical use, realistic environment"
  "product packaging and branding visible, retail box display, white background, label detail"
)

generate_for_type() {
  local fullDesc="$1"
  IFS='|' read -r typeName brandDesc <<< "$fullDesc"
  local cleanName=$(echo "$typeName" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')
  local dir="$OUT/$cleanName"
  mkdir -p "$dir"
  
  for i in "${!ANGLE_PROMPTS[@]}"; do
    local angleNum=$((i+1))
    local file="$dir/angle-$angleNum.png"
    if [ -f "$file" ] && [ $(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null) -gt 1000 ]; then
      echo "  ✓ SKIP: angle-$angleNum.png"
      continue
    fi
    echo "  → Generating angle-$angleNum.png..."
    z-ai image -p "Professional product photography of ${brandDesc}, ${ANGLE_PROMPTS[$i]}" -o "$file" 2>/dev/null
    if [ $? -eq 0 ]; then
      echo "  ✓ DONE: angle-$angleNum.png"
    else
      echo "  ✗ FAIL: angle-$angleNum.png"
    fi
  done
}

echo "============================================"
echo "Chittety Construction Image Generator"
echo "============================================"
echo ""

BATCH=${1:-0}
TOTAL_BATCHES=${2:-5}

# All types combined
ALL_TYPES=("${PLUMBING_TYPES[@]}" "${ELECTRICAL_TYPES[@]}" "${LIGHTING_TYPES[@]}" "${FLOORING_TYPES[@]}" "${HARDWARE_TYPES[@]}")
TOTAL=${#ALL_TYPES[@]}
BATCH_SIZE=$(( (TOTAL + TOTAL_BATCHES - 1) / TOTAL_BATCHES ))
START=$((BATCH * BATCH_SIZE))
END=$(( START + BATCH_SIZE ))
if [ $END -gt $TOTAL ]; then END=$TOTAL; fi

echo "Batch $((BATCH+1))/$TOTAL_BATCHES | Types $((START+1))-$END of $TOTAL"
echo ""

COUNT=0
for (( i=START; i<END; i++ )); do
  generate_for_type "${ALL_TYPES[$i]}"
  COUNT=$((COUNT+1))
  echo ""
done

echo "=== Batch Complete: $COUNT types processed ==="

# Build mapping file
echo "Building image mapping..."
node -e "
const fs = require('fs');
const path = require('path');
const dir = '$OUT';
const map = {};

function scanDir(d, type) {
  const full = path.join(dir, d);
  if (!fs.existsSync(full)) return [];
  return [1,2,3,4,5].map(n => '/images/products/' + d + '/angle-' + n + '.png').filter(f => fs.existsSync(path.join('.', f)));
}

const dirs = fs.readdirSync(dir).filter(d => fs.statSync(path.join(dir, d)).isDirectory());
for (const d of dirs) {
  const imgs = scanDir(d);
  if (imgs.length > 0) map[d] = imgs;
}
fs.writeFileSync('./src/lib/data/product-images.json', JSON.stringify(map, null, 2));
console.log('Mapped ' + Object.keys(map).length + ' product types with ' + Object.values(map).reduce((a,v)=>a+v.length,0) + ' images');
"
