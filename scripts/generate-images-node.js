const ZAI = require('z-ai-web-dev-sdk').default;
const fs = require('fs');
const path = require('path');

const OUT = './public/images/products';

const TYPES = [
  "Schedule 40 PVC Pipe|Charlotte Pipe brand PVC plumbing pipe",
  "CPVC Pipe|Charlotte Pipe CPVC tubing hot water plumbing",
  "PEX Tube|SharkBite cross-linked polyethylene flexible tube",
  "Copper Pipe|Mueller copper plumbing pipe Type L",
  "45 Degree Elbow|PVC pipe elbow fitting 45 degree connector",
  "90 Degree Elbow|PVC pipe 90 degree elbow fitting connector",
  "Tee Fitting|PVC T-shaped pipe fitting connector",
  "Coupling|PVC pipe coupling straight connector fitting",
  "Reducer|PVC pipe reducing fitting connector",
  "Union|PVC union pipe fitting with locking nut",
  "Ball Valve|brass ball valve plumbing shut off",
  "Gate Valve|gate valve with handwheel plumbing",
  "Check Valve|swing check valve PVC plumbing",
  "Angle Stop Valve|chrome angle stop valve plumbing",
  "Shower Valve|Moen single handle shower mixer valve",
  "Single Handle Faucet|Moen chrome single handle bathroom faucet",
  "Widespread Faucet|Moen widespread bathroom faucet set",
  "Rain Shower Head|Moen large rain style shower head chrome",
  "P-Trap|PVC P-trap plumbing drain fitting",
  "Bottle Trap|chrome decorative bottle drain trap",
  "Floor Drain|stainless steel floor drain grate",
  "Channel Drain|linear channel drain polymer construction",
  "Cleanout Plug|PVC cleanout plug drain fitting",
  "Sewer Coupling|flexible rubber sewer pipe coupling",
  "Backwater Valve|backwater prevention valve plumbing",
  "One Piece Toilet|white ceramic one-piece toilet",
  "Two Piece Toilet|white ceramic two-piece toilet tank bowl",
  "Wall Hung Toilet|wall-mounted toilet carrier system",
  "Undermount Sink|stainless steel undermount kitchen sink",
  "Pedestal Basin|white ceramic pedestal bathroom sink",
  "THHN Copper Wire|THHN copper electrical wire on spool",
  "Romex NM-B Cable|NM-B non-metallic sheathed electrical cable",
  "UF-B Underground Cable|UF-B underground feeder cable",
  "Circuit Breaker|standard 20A circuit breaker electrical panel",
  "AFCI Breaker|arc fault circuit interrupter breaker",
  "GFCI Breaker|ground fault circuit interrupter breaker",
  "Main Breaker Panel|main electrical breaker panel box",
  "Load Center|electrical load center distribution panel",
  "Junction Box|plastic 4-inch square junction box electrical",
  "Outdoor Box|weatherproof outdoor electrical box NEMA rated",
  "PVC Conduit|PVC electrical conduit pipe gray",
  "EMT Conduit|electrical metallic tubing EMT conduit galvanized",
  "Flexible Metal Conduit|flexible metal conduit galvanized",
  "Ground Rod|copper-clad 8ft ground rod electrical",
  "Wire Connector|twist-on wire nut connector electrical",
  "GFCI Outlet|GFCI tamper-resistant electrical outlet",
  "Weather Resistant Outlet|weather-resistant outdoor electrical outlet",
  "USB Outlet|wall outlet with USB charging ports",
  "Decora Switch|Decora style light switch white",
  "Single Pole Switch|single pole light switch white",
  "LED Bulb|LED A19 light bulb warm white 60W equivalent",
  "LED Tube Light|LED T8 tube light 4ft fluorescent replacement",
  "Recessed Downlight|LED recessed can light trim white",
  "Panel Light|LED flat panel ceiling light office",
  "Flood Light|LED outdoor flood light security",
  "Wall Pack Light|LED wall pack light commercial building",
  "Pendant Light|industrial pendant ceiling light fixture",
  "Landscape Light|LED landscape path light outdoor",
  "Ceiling Fan|ceiling fan with light kit white blades",
  "Exhaust Fan|bathroom exhaust fan with light",
  "Tankless Water Heater|tankless gas water heater unit",
  "Electric Water Heater|electric tank water heater residential",
  "Gas Water Heater|natural gas tank water heater",
  "Water Heater Valve|water heater T&P relief valve",
  "Expansion Tank|thermal expansion tank water heater",
  "Fan Capacitor|ceiling fan run capacitor",
  "AC Line Set|AC copper line set refrigeration tubing",
  "Ceramic Tile|white ceramic floor tile 12x12 inch glossy",
  "Porcelain Tile|porcelain wood-look floor tile plank",
  "Marble Tile|white marble floor tile polished natural stone",
  "Granite Tile|granite floor tile polished speckled",
  "Mosaic Tile|glass mosaic tile sheet backsplash",
  "Laminate Flooring|laminate wood flooring plank oak",
  "Luxury Vinyl Plank|luxury vinyl flooring plank waterproof",
  "Asphalt Shingle|architectural asphalt roof shingle bundle",
  "Ridge Cap Shingle|ridge cap asphalt shingle roof",
  "Roof Flashing|aluminum roof flashing drip edge",
  "Roof Sealant|roofing sealant caulk tube waterproof",
  "Roof Underlayment|synthetic roof underlayment roll felt",
  "Cement Board|cement backer board sheet tile underlayment",
  "Drywall Sheet|standard gypsum drywall panel sheetrock",
  "Concrete Mix|Portland cement bag 94lb construction",
  "Mortar Mix|mortar mix bag masonry cement",
  "Tile Adhesive|tile adhesive thinset mortar bag",
  "Tile Grout|sanded tile grout bag gray",
  "Tile Leveling Clips|tile leveling system clips spacer",
  "Fiberglass Insulation|fiberglass insulation batt roll pink",
  "Foam Board Insulation|foam board insulation panel rigid",
  "Fiber Cement Siding|fiber cement siding plank lap",
  "Underlayment Roll|flooring underlayment roll cushion",
  "Joint Compound|all-purpose joint compound bucket drywall",
  "Liquid Waterproofing Membrane|waterproofing membrane liquid rubber",
  "Steel Angle|galvanized steel angle iron L-bracket",
  "Flat Bar|hot-rolled steel flat bar stock",
  "Square Steel Tube|square steel tubing structural",
  "Round Steel Pipe|galvanized round steel pipe galvanized",
  "Anchor Bolt|hex anchor bolt galvanized concrete",
  "Concrete Screw|masonry concrete screw tapcon",
  "Hex Nut|standard hex nut zinc plated",
  "Flat Washer|standard flat washer zinc plated",
  "Wood Screw|Phillips head wood screw",
  "Cutting Disc|metal cutting grinding disc angle grinder",
  "Welding Rod|E7018 welding electrode stick",
  "Door Hinge|residential door hinge brass butt",
  "Door Closer|commercial hydraulic door closer",
  "Deadbolt|single cylinder deadbolt lock brass",
  "Door Lockset|entry door handle lockset lever",
  "Cabinet Pull|stainless steel cabinet drawer pull handle",
  "Drawer Slide|ball bearing drawer slide telescoping",
  "Soft Close Hinge|Blum soft-close cabinet hinge European",
  "Pull-Out Basket|chrome pull-out wire basket kitchen organizer",
  "Hammer|16oz claw hammer fiberglass handle",
  "Pipe Wrench|14-inch pipe wrench adjustable",
  "Pliers Set|electricians pliers set needle nose",
  "Screwdriver Set|multi-bit screwdriver set professional",
  "Drill Driver|20V cordless drill driver tool",
];

const ANGLES = [
  "front view, clean white background, studio lighting, professional product photography",
  "side angle 45-degree view, white background, studio product photography",
  "close-up detail shot, macro photography, sharp focus, white background",
  "installed in construction setting, realistic building environment, use case",
  "product packaging branding, retail box display, white background",
];

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

async function main() {
  console.log('Initializing ZAI SDK...');
  const zai = await ZAI.create();
  
  let ok = 0, fail = 0, skip = 0;
  const total = TYPES.length;
  
  for (let i = 0; i < total; i++) {
    const [name, desc] = TYPES[i].split('|');
    const dir = path.join(OUT, slug(name));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    console.log(`[${i+1}/${total}] ${name}`);
    
    for (let j = 0; j < ANGLES.length; j++) {
      const file = path.join(dir, `angle-${j+1}.png`);
      
      // Skip if exists and valid
      if (fs.existsSync(file) && fs.statSync(file).size > 5000) {
        skip++;
        continue;
      }
      
      const prompt = `Professional product photography of ${desc}, ${ANGLES[j]}`;
      
      try {
        const resp = await zai.images.generations.create({ prompt, size: '1024x1024' });
        fs.writeFileSync(file, Buffer.from(resp.data[0].base64, 'base64'));
        if (fs.statSync(file).size > 5000) {
          ok++;
          console.log(`  ✓ angle-${j+1}.png`);
        } else {
          fail++;
          console.log(`  ✗ angle-${j+1}.png (too small)`);
        }
      } catch(e) {
        fail++;
        console.log(`  ✗ angle-${j+1}.png: ${e.message}`);
      }
    }
  }
  
  console.log(`\nDone! OK: ${ok}, FAIL: ${fail}, SKIP: ${skip}`);
  
  // Build mapping
  const map = {};
  for (const [name] of TYPES) {
    const dir = slug(name);
    const imgs = [];
    for (let i = 1; i <= 5; i++) {
      const f = path.join(OUT, dir, `angle-${i}.png`);
      if (fs.existsSync(f) && fs.statSync(f).size > 5000) {
        imgs.push(`/images/products/${dir}/angle-${i}.png`);
      }
    }
    if (imgs.length > 0) map[dir] = imgs;
  }
  fs.writeFileSync('./src/lib/data/product-images.json', JSON.stringify(map, null, 2));
  console.log(`Mapping: ${Object.keys(map).length} types, ${Object.values(map).reduce((a,v)=>a+v.length,0)} images`);
}

main().catch(e => { console.error(e); process.exit(1); });
