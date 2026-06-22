import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  // Load JSON data
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const products = require('../src/lib/data/products.json') as any[];
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const services = require('../src/lib/data/services.json') as any[];

  console.log(`Seeding ${products.length} products...`);
  
  // Seed products in batches
  const batchSize = 100;
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    await Promise.all(
      batch.map(p => 
        prisma.product.create({
          data: {
            sku: p.sku,
            name: p.name,
            category: p.category,
            subcategory: p.subcategory,
            brand: p.brand,
            productType: p.productType,
            specification: p.specification,
            unit: p.unit,
            moq: p.moq,
            marketPrice: p.marketPrice,
            discount: p.discount,
            chittetyPrice: p.chittetyPrice,
            availability: p.availability,
            priceBasis: p.priceBasis,
            shortDescription: p.shortDescription,
            codePrefix: p.codePrefix,
          }
        })
      )
    );
    console.log(`  Seeded ${Math.min(i + batchSize, products.length)} / ${products.length} products`);
  }

  console.log(`Seeding ${services.length} services...`);
  for (const s of services) {
    await prisma.service.create({
      data: {
        code: s.code,
        category: s.category,
        name: s.name,
        startingPrice: s.startingPrice,
        priceType: s.priceType,
        notes: s.notes,
        cta: s.cta,
        source: s.source,
      }
    });
  }

  console.log('Seed complete!');
}

seed()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
