// Run with: node scripts/gen-loop.js
// Generates all product type images sequentially
// State is saved after each type for resume capability
const ZAI = require('z-ai-web-dev-sdk').default;
const fs = require('fs');
const path = require('path');

const OUT = './public/images/products';
const STATE_FILE = './scripts/gen-state.json';

const TYPES = [
  ["schedule-40-pvc-pipe", "Charlotte Pipe brand PVC plumbing pipe"],
  ["cpvc-pipe", "Charlotte Pipe CPVC tubing hot water plumbing"],
  ["pex-tube", "SharkBite cross-linked polyethylene flexible tube"],
  ["copper-pipe", "Mueller copper plumbing pipe Type L"],
  ["45-degree-elbow", "PVC pipe elbow fitting 45 degree"],
  ["90-degree-elbow", "PVC 90 degree elbow fitting"],
  ["tee-fitting", "PVC T-shaped pipe fitting"],
  ["coupling", "PVC pipe coupling connector"],
  ["reducer", "PVC reducing fitting"],
  ["union", "PVC union fitting with nut"],
  ["ball-valve", "brass ball valve plumbing"],
  ["gate-valve", "gate valve handwheel"],
  ["check-valve", "swing check valve PVC"],
  ["angle-stop-valve", "chrome angle stop valve"],
  ["shower-valve", "single handle shower mixer valve"],
  ["single-handle-faucet", "chrome single handle bathroom faucet"],
  ["widespread-faucet", "widespread bathroom faucet set"],
  ["rain-shower-head", "large rain shower head chrome"],
  ["p-trap", "PVC P-trap drain fitting"],
  ["bottle-trap", "chrome decorative bottle trap"],
  ["floor-drain", "stainless steel floor drain"],
  ["channel-drain", "linear channel drain polymer"],
  ["cleanout-plug", "PVC cleanout plug fitting"],
  ["sewer-coupling", "flexible rubber sewer coupling"],
  ["backwater-valve", "backwater prevention valve"],
  ["one-piece-toilet", "white ceramic toilet"],
  ["two-piece-toilet", "white ceramic two-piece toilet"],
  ["wall-hung-toilet", "wall-mounted toilet system"],
  ["undermount-sink", "stainless steel kitchen sink"],
  ["pedestal-basin", "white ceramic pedestal sink"],
  ["thhn-copper-wire", "THHN copper wire on spool"],
  ["romex-nm-b-cable", "NM-B sheathed cable"],
  ["uf-b-underground-cable", "UF-B underground cable"],
  ["circuit-breaker", "20A circuit breaker"],
  ["afci-breaker", "arc fault breaker"],
  ["gfci-breaker", "ground fault breaker"],
  ["main-breaker-panel", "main electrical panel"],
  ["load-center", "electrical load center"],
  ["junction-box", "plastic junction box"],
  ["outdoor-box", "weatherproof electrical box"],
  ["pvc-conduit", "PVC electrical conduit"],
  ["emt-conduit", "EMT metallic conduit"],
  ["flexible-metal-conduit", "flexible metal conduit"],
  ["ground-rod", "copper-clad ground rod"],
  ["wire-connector", "twist-on wire connector"],
  ["gfci-outlet", "GFCI outlet"],
  ["weather-resistant-outlet", "outdoor outlet"],
  ["usb-outlet", "wall outlet with USB"],
  ["decora-switch", "Decora light switch"],
  ["single-pole-switch", "single pole switch"],
  ["led-bulb", "LED A19 warm white bulb"],
  ["led-tube-light", "LED T8 tube light"],
  ["recessed-downlight", "LED recessed can light"],
  ["panel-light", "LED flat panel light"],
  ["flood-light", "LED outdoor flood light"],
  ["wall-pack-light", "LED wall pack light"],
  ["pendant-light", "industrial pendant light"],
  ["landscape-light", "LED landscape path light"],
  ["ceiling-fan", "ceiling fan with light"],
  ["exhaust-fan", "bathroom exhaust fan"],
  ["tankless-water-heater", "tankless gas water heater"],
  ["electric-water-heater", "electric tank heater"],
  ["gas-water-heater", "natural gas water heater"],
  ["water-heater-valve", "water heater relief valve"],
  ["expansion-tank", "thermal expansion tank"],
  ["fan-capacitor", "ceiling fan capacitor"],
  ["ac-line-set", "AC copper line set"],
  ["ceramic-tile", "white ceramic floor tile"],
  ["porcelain-tile", "porcelain floor tile"],
  ["marble-tile", "white marble tile"],
  ["granite-tile", "granite floor tile"],
  ["mosaic-tile", "glass mosaic tile"],
  ["laminate-flooring", "laminate wood plank"],
  ["luxury-vinyl-plank", "luxury vinyl plank"],
  ["asphalt-shingle", "architectural roof shingle"],
  ["ridge-cap-shingle", "ridge cap shingle"],
  ["roof-flashing", "aluminum roof flashing"],
  ["roof-sealant", "roofing sealant"],
  ["roof-underlayment", "synthetic underlayment"],
  ["cement-board", "cement backer board"],
  ["drywall-sheet", "gypsum drywall panel"],
  ["concrete-mix", "Portland cement bag"],
  ["mortar-mix", "mortar mix bag"],
  ["tile-adhesive", "tile thinset mortar"],
  ["tile-grout", "sanded tile grout"],
  ["tile-leveling-clips", "tile leveling clips"],
  ["fiberglass-insulation", "fiberglass batt roll"],
  ["foam-board-insulation", "foam board panel"],
  ["fiber-cement-siding", "fiber cement siding"],
  ["underlayment-roll", "flooring underlayment"],
  ["joint-compound", "joint compound bucket"],
  ["liquid-waterproofing-membrane", "waterproofing membrane"],
  ["steel-angle", "galvanized steel angle"],
  ["flat-bar", "hot-rolled steel flat bar"],
  ["square-steel-tube", "square steel tubing"],
  ["round-steel-pipe", "galvanized round pipe"],
  ["anchor-bolt", "hex anchor bolt"],
  ["concrete-screw", "masonry screw"],
  ["hex-nut", "zinc hex nut"],
  ["flat-washer", "zinc flat washer"],
  ["wood-screw", "Phillips wood screw"],
  ["cutting-disc", "metal cutting disc"],
  ["welding-rod", "E7018 welding electrode"],
  ["door-hinge", "brass door hinge"],
  ["door-closer", "commercial door closer"],
  ["deadbolt", "deadbolt lock"],
  ["door-lockset", "entry door lockset"],
  ["cabinet-pull", "stainless cabinet pull"],
  ["drawer-slide", "drawer slide"],
  ["soft-close-hinge", "soft close hinge"],
  ["pull-out-basket", "chrome wire basket"],
  ["hammer", "claw hammer"],
  ["pipe-wrench", "pipe wrench"],
  ["pliers-set", "pliers set"],
  ["screwdriver-set", "screwdriver set"],
  ["drill-driver", "cordless drill"],
];

const ANGLES = [
  "front view, clean white background, studio lighting, professional product photography",
  "side angle 45-degree view, white background, product catalog photography",
  "close-up detail shot, macro photography, sharp focus, white background",
  "installed in construction setting, realistic building environment",
  "product packaging branding, retail display, white background",
];

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8')); } catch { return { idx: 0 }; }
}

function saveState(idx) {
  fs.writeFileSync(STATE_FILE, JSON.stringify({ idx }));
}

function checkExists(file) {
  try { return fs.existsSync(file) && fs.statSync(file).size > 5000; } catch { return false; }
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const state = loadState();
  const start = state.idx;
  
  console.log(`Starting from type ${start + 1}/${TYPES.length}`);
  process.stdout.write('Initializing ZAI... ');
  
  const zai = await ZAI.create();
  console.log('OK');
  
  let ok = 0, fail = 0, skip = 0;
  
  for (let i = start; i < TYPES.length; i++) {
    const [slug, desc] = TYPES[i];
    const dir = path.join(OUT, slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    // Check if all 5 exist
    let allDone = true;
    for (let j = 1; j <= 5; j++) {
      if (!checkExists(path.join(dir, `angle-${j}.png`))) { allDone = false; break; }
    }
    
    if (allDone) {
      skip += 5;
      saveState(i + 1);
      continue;
    }
    
    console.log(`[${i+1}/${TYPES.length}] ${slug}`);
    
    for (let j = 0; j < ANGLES.length; j++) {
      const file = path.join(dir, `angle-${j+1}.png`);
      if (checkExists(file)) { skip++; continue; }
      
      const prompt = `Professional product photography of ${desc}, ${ANGLES[j]}`;
      
      for (let retry = 0; retry < 2; retry++) {
        try {
          process.stdout.write(`  generating angle-${j+1}...`);
          const resp = await zai.images.generations.create({ prompt, size: '1024x1024' });
          fs.writeFileSync(file, Buffer.from(resp.data[0].base64, 'base64'));
          
          if (checkExists(file)) {
            ok++;
            console.log(' OK');
            break;
          } else {
            console.log(' SMALL');
            if (retry === 1) fail++;
          }
        } catch(e) {
          console.log(` ERR(${e.message?.slice(0,50)})`);
          if (retry === 1) fail++;
          await sleep(2000);
        }
      }
    }
    
    saveState(i + 1);
  }
  
  console.log(`\n=== Complete: OK=${ok} FAIL=${fail} SKIP=${skip} ===`);
  
  // Build mapping
  const map = {};
  for (const [slug] of TYPES) {
    const dir = path.join(OUT, slug);
    const imgs = [1,2,3,4,5]
      .map(n => `/images/products/${slug}/angle-${n}.png`)
      .filter(f => checkExists(path.join('.', f)));
    if (imgs.length > 0) map[slug] = imgs;
  }
  fs.writeFileSync('./src/lib/data/product-images.json', JSON.stringify(map, null, 2));
  console.log(`Mapping: ${Object.keys(map).length} types`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
