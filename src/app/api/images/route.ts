import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const IMAGES_MAP_FILE = path.join(process.cwd(), 'src/lib/data/product-images.json');
const PRODUCTS_FILE = path.join(process.cwd(), 'src/lib/data/products.json');

interface ProductImageData {
  sku: string;
  productType: string;
}

type ImagesMap = Record<string, string[]>;
type TypeToSlugMap = Record<string, string>;

function toSlug(productType: string): string {
  return productType.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function getImagesMap(): ImagesMap {
  try {
    if (fs.existsSync(IMAGES_MAP_FILE)) {
      return JSON.parse(fs.readFileSync(IMAGES_MAP_FILE, 'utf-8'));
    }
  } catch (e) {}
  return {};
}

function getTypeToSlugMap(): TypeToSlugMap {
  try {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8')) as ProductImageData[];
    const map: TypeToSlugMap = {};
    for (const p of products) {
      if (!map[p.productType]) {
        map[p.productType] = toSlug(p.productType);
      }
    }
    return map;
  } catch (e) {}
  return {};
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productType = searchParams.get('type') || '';
  const sku = searchParams.get('sku') || '';
  
  const imagesMap = getImagesMap();
  const typeToSlug = getTypeToSlugMap();
  
  if (sku) {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8')) as ProductImageData[];
    const product = products.find((p) => p.sku === sku);
    if (product) {
      const slug = typeToSlug[product.productType] || toSlug(product.productType);
      const images = imagesMap[slug] || [];
      return NextResponse.json({ images, productType: product.productType, sku, slug });
    }
    return NextResponse.json({ images: [], sku });
  }
  
  if (productType) {
    const slug = typeToSlug[productType] || toSlug(productType);
    const images = imagesMap[slug] || [];
    return NextResponse.json({ images, productType, slug });
  }
  
  return NextResponse.json({ 
    mapping: imagesMap, 
    typeToSlug,
    totalTypes: Object.keys(imagesMap).length,
    totalImages: Object.values(imagesMap).reduce((a, v) => a + v.length, 0)
  });
}
