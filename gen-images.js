const ZAI = require('/home/z/.bun/install/global/node_modules/z-ai-web-dev-sdk/dist/index.js').default;
const fs = require('fs');
const path = require('path');

const PRODUCTS = {
  "tile-adhesive": "tile thinset mortar bag",
  "tile-grout": "sanded tile grout bag",
  "tile-leveling-clips": "tile leveling clips",
  "fiberglass-insulation": "fiberglass batt roll insulation",
  "foam-board-insulation": "foam board panel insulation",
  "fiber-cement-siding": "fiber cement siding plank",
  "underlayment-roll": "flooring underlayment roll",
  "joint-compound": "joint compound bucket",
  "liquid-waterproofing-membrane": "waterproofing membrane liquid",
  "steel-angle": "galvanized steel angle iron",
  "flat-bar": "hot-rolled steel flat bar",
  "square-steel-tube": "square steel tubing",
  "round-steel-pipe": "galvanized round pipe",
  "anchor-bolt": "hex anchor bolt galvanized",
  "concrete-screw": "masonry concrete screw",
  "hex-nut": "zinc hex nut",
  "flat-washer": "zinc flat washer",
  "wood-screw": "Phillips wood screw",
  "cutting-disc": "metal cutting grinding disc",
  "welding-rod": "E7018 welding electrode",
  "door-hinge": "brass door hinge",
  "door-closer": "commercial door closer",
  "deadbolt": "deadbolt lock",
  "door-lockset": "entry door lockset",
  "cabinet-pull": "stainless cabinet drawer pull",
  "drawer-slide": "drawer slide mechanism",
  "soft-close-hinge": "soft close cabinet hinge",
  "pull-out-basket": "chrome pull-out wire basket",
  "hammer": "claw hammer fiberglass",
  "pipe-wrench": "pipe wrench adjustable",
  "pliers-set": "pliers set",
  "screwdriver-set": "multi-bit screwdriver set",
  "drill-driver": "20V cordless drill",
};

const ANGLE_PROMPTS = {
  1: "Professional product photography of {desc}, front view, white background, studio lighting",
  2: "{desc} side angle 45-degree, white background, product catalog",
  3: "Close-up detail {desc}, macro, sharp focus, white background",
  4: "{desc} installed in construction, realistic building",
  5: "{desc} packaging branding, retail display, white background",
};

async function generateWithRetry(zai, prompt, outfile, maxRetries = 5) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await zai.images.generations.create({
        prompt,
        n: 1,
        size: "1024x1024",
      });
      if (result.data && result.data[0] && result.data[0].base64) {
        const buffer = Buffer.from(result.data[0].base64, 'base64');
        fs.writeFileSync(outfile, buffer);
        return true;
      }
      console.error(`No image data in response for ${outfile}`);
    } catch (err) {
      const msg = err.message || '';
      if (msg.includes('429')) {
        const wait = Math.min(30000 * Math.pow(2, attempt), 120000);
        console.log(`  Rate limited, waiting ${wait/1000}s (attempt ${attempt+1}/${maxRetries})...`);
        await new Promise(r => setTimeout(r, wait));
        continue;
      }
      if (attempt < maxRetries - 1) {
        await new Promise(r => setTimeout(r, 5000));
        continue;
      }
    }
  }
  return false;
}

async function main() {
  const zai = await ZAI.create();
  
  // Build task list
  const tasks = [];
  for (const [ptype, desc] of Object.entries(PRODUCTS)) {
    for (let angle = 1; angle <= 5; angle++) {
      const outfile = path.join('public', 'images', 'products', ptype, `angle-${angle}.png`);
      if (fs.existsSync(outfile) && fs.statSync(outfile).size > 5000) continue;
      const prompt = ANGLE_PROMPTS[angle].replace('{desc}', desc);
      tasks.push({ ptype, angle, outfile, prompt });
    }
  }
  
  console.log(`Total missing tasks: ${tasks.length}`);
  let ok = 0, fail = 0;
  
  for (let i = 0; i < tasks.length; i++) {
    const t = tasks[i];
    process.stdout.write(`[${i+1}/${tasks.length}] ${t.ptype}/angle-${t.angle}...`);
    const success = await generateWithRetry(zai, t.prompt, t.outfile);
    if (success) {
      ok++;
      console.log(' OK');
    } else {
      fail++;
      console.log(' FAIL');
    }
    // Small delay between requests
    if (i < tasks.length - 1) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  
  console.log(`\nDONE. OK: ${ok}, FAIL: ${fail}`);
  
  // Count total
  let total = 0;
  for (const ptype of Object.keys(PRODUCTS)) {
    for (let angle = 1; angle <= 5; angle++) {
      const f = path.join('public', 'images', 'products', ptype, `angle-${angle}.png`);
      if (fs.existsSync(f) && fs.statSync(f).size > 5000) total++;
    }
  }
  console.log(`Total images >5KB: ${total}/${Object.keys(PRODUCTS).length * 5}`);
}

main().catch(console.error);
