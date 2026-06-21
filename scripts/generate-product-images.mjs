#!/usr/bin/env node
/**
 * Chittety Construction - Product Image Generator
 * Generates realistic product images for all 116 product types
 * Each product type gets 5 images at different angles/styles
 */
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = './public/images/products';
const PRODUCTS_FILE = './src/lib/data/products.json';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));

const productTypes = {};
for (const p of products) {
  const t = p.productType;
  if (!productTypes[t]) productTypes[t] = { type: t, samples: [] };
  if (productTypes[t].samples.length < 2) {
    productTypes[t].samples.push({ name: p.name, spec: p.specification, brand: p.brand });
  }
}

function getPromptsForProductType(productType, sampleName, sampleBrand) {
  return [
    `Professional product photography of a ${productType}, front view, ${sampleBrand} brand, clean white background, studio lighting, high resolution, commercial construction supply catalog photo`,
    `${productType} side angle view, ${sampleBrand}, on white background, professional studio photography, construction materials catalog, detailed product shot`,
    `Close-up detail shot of ${productType}, ${sampleBrand}, showing texture and build quality, macro product photography, white background, sharp focus`,
    `${productType} installed in construction setting, ${sampleBrand}, professional installation photo, realistic building environment, context shot`,
    `${productType} with ${sampleBrand} branding and packaging, product packaging shot, label visible, retail display style, white background`,
  ];
}

async function generateImage(zai, prompt, outputPath) {
  try {
    const response = await zai.images.generations.create({
      prompt,
      size: '1024x1024'
    });
    const base64 = response.data[0].base64;
    fs.writeFileSync(outputPath, Buffer.from(base64, 'base64'));
    return true;
  } catch (err) {
    console.error(`  ✗ Failed: ${err.message}`);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const batchIndex = args[0] ? parseInt(args[0]) : 0;
  const totalBatches = args[1] ? parseInt(args[1]) : 1;

  console.log(`Chittety Construction Product Image Generator`);
  console.log(`Batch ${batchIndex + 1}/${totalBatches}`);
  
  const types = Object.keys(productTypes).sort();
  const batchSize = Math.ceil(types.length / totalBatches);
  const startIdx = batchIndex * batchSize;
  const endIdx = Math.min(startIdx + batchSize, types.length);
  const batchTypes = types.slice(startIdx, endIdx);
  
  console.log(`Processing types ${startIdx + 1}-${endIdx} of ${types.length}`);
  console.log(`Product types in this batch: ${batchTypes.length}`);
  console.log(`Images to generate: ${batchTypes.length * 5}`);
  console.log();

  const zai = await ZAI.create();
  const imageMap = {};
  let totalGenerated = 0;
  let totalFailed = 0;

  for (let i = 0; i < batchTypes.length; i++) {
    const type = batchTypes[i];
    const sample = productTypes[type].samples[0];
    const dirName = type.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const dirPath = path.join(OUTPUT_DIR, dirName);
    
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    
    const prompts = getPromptsForProductType(type, sample.name, sample.brand);
    imageMap[type] = [];
    
    console.log(`[${i+1}/${batchTypes.length}] ${type}`);
    
    for (let j = 0; j < prompts.length; j++) {
      const filename = `angle-${j+1}.png`;
      const filepath = path.join(dirPath, filename);
      const publicPath = `/images/products/${dirName}/${filename}`;
      
      if (fs.existsSync(filepath) && fs.statSync(filepath).size > 1000) {
        imageMap[type].push(publicPath);
        console.log(`  ✓ Exists: ${filename}`);
        continue;
      }
      
      const success = await generateImage(zai, prompts[j], filepath);
      if (success) {
        imageMap[type].push(publicPath);
        totalGenerated++;
        console.log(`  ✓ Generated: ${filename}`);
      } else {
        totalFailed++;
        console.log(`  ✗ Failed: ${filename}`);
      }
    }
  }

  // Save partial mapping
  const mapPath = `./src/lib/data/product-images-batch-${batchIndex}.json`;
  fs.writeFileSync(mapPath, JSON.stringify(imageMap, null, 2));
  
  console.log(`\n=== Batch ${batchIndex + 1} Complete ===`);
  console.log(`Generated: ${totalGenerated} new images`);
  console.log(`Failed: ${totalFailed}`);
  console.log(`Mapping saved to: ${mapPath}`);
}

main().catch(console.error);
