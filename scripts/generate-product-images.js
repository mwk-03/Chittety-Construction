#!/usr/bin/env node
/**
 * Chittety Construction - Product Image Generator
 * Generates realistic product images for all 116 product types
 * Each product type gets 5 images at different angles/styles
 */
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const OUTPUT_DIR = './public/images/products';
const PRODUCTS_FILE = './src/lib/data/products.json';

// Ensure output directory
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Load products
const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));

// Group by productType (116 unique types)
const productTypes: Record<string, { type: string; samples: any[] }> = {};
for (const p of products) {
  const t = p.productType;
  if (!productTypes[t]) productTypes[t] = { type: t, samples: [] };
  if (productTypes[t].samples.length < 2) {
    productTypes[t].samples.push({ name: p.name, spec: p.specification, brand: p.brand });
  }
}

// Define image angle prompts for each type
function getPromptsForProductType(productType: string, sampleName: string, sampleBrand: string): string[] {
  return [
    // 1. Main front view
    `Professional product photography of a ${productType}, front view, ${sampleBrand} brand, clean white background, studio lighting, high resolution, commercial construction supply catalog photo`,
    // 2. Side angle
    `${productType} side angle view, ${sampleBrand}, on white background, professional studio photography, construction materials catalog, detailed product shot`,
    // 3. Close-up detail
    `Close-up detail shot of ${productType}, ${sampleBrand}, showing texture and build quality, macro product photography, white background, sharp focus`,
    // 4. Installed/use-case
    `${productType} installed in construction setting, ${sampleBrand}, professional installation photo, realistic building environment, context shot`,
    // 5. Packaging/brand image
    `${productType} with ${sampleBrand} branding and packaging, product packaging shot, label visible, retail display style, white background`,
  ];
}

async function generateImage(zai: any, prompt: string, outputPath: string): Promise<boolean> {
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
  console.log(`Chittety Construction Product Image Generator`);
  console.log(`Total product types: ${Object.keys(productTypes).length}`);
  console.log(`Images to generate: ${Object.keys(productTypes).length * 5}`);
  console.log();

  const zai = await ZAI.create();

  // Build mapping file
  const imageMap: Record<string, string[]> = {};
  const types = Object.keys(productTypes).sort();
  
  let totalGenerated = 0;
  let totalFailed = 0;

  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    const sample = productTypes[type].samples[0];
    const dirName = type.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const dirPath = path.join(OUTPUT_DIR, dirName);
    
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    
    const prompts = getPromptsForProductType(type, sample.name, sample.brand);
    imageMap[type] = [];
    
    console.log(`[${i+1}/${types.length}] ${type} (${productTypes[type].samples.length} products)`);
    
    for (let j = 0; j < prompts.length; j++) {
      const filename = `angle-${j+1}.png`;
      const filepath = path.join(dirPath, filename);
      const publicPath = `/images/products/${dirName}/${filename}`;
      
      // Skip if already generated
      if (fs.existsSync(filepath) && fs.statSync(filepath).size > 1000) {
        imageMap[type].push(publicPath);
        console.log(`  ✓ Skipped (exists): ${filename}`);
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

  // Save image mapping
  const mapPath = './src/lib/data/product-images.json';
  fs.writeFileSync(mapPath, JSON.stringify(imageMap, null, 2));
  
  console.log(`\n=== Complete ===`);
  console.log(`Generated: ${totalGenerated} new images`);
  console.log(`Failed: ${totalFailed}`);
  console.log(`Total product types mapped: ${Object.keys(imageMap).length}`);
  console.log(`Mapping saved to: ${mapPath}`);
}

main().catch(console.error);
