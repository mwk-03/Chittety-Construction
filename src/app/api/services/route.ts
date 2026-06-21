import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '24');

  const where: any = {};
  if (category) where.category = category;
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { code: { contains: search } },
    ];
  }

  const skip = (page - 1) * limit;

  const [services, total] = await Promise.all([
    db.service.findMany({
      where,
      orderBy: { code: 'asc' },
      skip,
      take: limit,
    }),
    db.service.count({ where }),
  ]);

  const categories = await db.service.findMany({
    distinct: ['category'],
    select: { category: true },
    orderBy: { category: 'asc' },
  });

  return NextResponse.json({
    services,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    filters: {
      categories: categories.map(c => c.category),
    }
  });
}
