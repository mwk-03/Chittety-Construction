import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const category = searchParams.get('category') || '';
  const subcategory = searchParams.get('subcategory') || '';
  const brand = searchParams.get('brand') || '';
  const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : 0;
  const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : Infinity;
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '24');
  const sort = searchParams.get('sort') || 'sku';
  const codePrefix = searchParams.get('codePrefix') || '';

  const where: any = {};
  if (category) where.category = category;
  if (subcategory) where.subcategory = subcategory;
  if (brand) where.brand = brand;
  if (codePrefix) where.codePrefix = codePrefix;
  if (minPrice > 0 || maxPrice < Infinity) {
    where.marketPrice = { gte: minPrice };
    if (maxPrice < Infinity) where.marketPrice = { gte: minPrice, lte: maxPrice };
  }
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { sku: { contains: search } },
      { brand: { contains: search } },
      { category: { contains: search } },
    ];
  }

  const skip = (page - 1) * limit;
  
  let orderBy: any = { sku: 'asc' };
  if (sort === 'price-asc') orderBy = { marketPrice: 'asc' };
  else if (sort === 'price-desc') orderBy = { marketPrice: 'desc' };
  else if (sort === 'name') orderBy = { name: 'asc' };

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),
    db.product.count({ where }),
  ]);

  const [categories, brands, subcategories] = await Promise.all([
    db.product.findMany({ distinct: ['category'], select: { category: true }, orderBy: { category: 'asc' } }),
    db.product.findMany({ distinct: ['brand'], select: { brand: true }, orderBy: { brand: 'asc' } }),
    db.product.findMany({ distinct: ['subcategory'], select: { subcategory: true }, orderBy: { subcategory: 'asc' } }),
  ]);

  return NextResponse.json({
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    filters: {
      categories: categories.map(c => c.category),
      brands: brands.map(b => b.brand).filter(Boolean),
      subcategories: subcategories.map(s => s.subcategory).filter(Boolean),
    }
  });
}
