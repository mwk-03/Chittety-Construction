import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, phone, email, company, projectType, category, sku, quantity, deliveryLocation, requirementType, message } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Name, phone, and email are required' }, { status: 400 });
    }

    const quote = await db.quoteRequest.create({
      data: {
        name,
        phone,
        email,
        company: company || '',
        projectType: projectType || '',
        category: category || '',
        sku: sku || '',
        quantity: quantity || 1,
        deliveryLocation: deliveryLocation || '',
        requirementType: requirementType || '',
        message: message || '',
        status: 'New',
      }
    });

    return NextResponse.json({ success: true, id: quote.id });
  } catch (error) {
    console.error('Quote submission error:', error);
    return NextResponse.json({ error: 'Failed to submit quote request' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: any = {};
    if (status) where.status = status;

    const skip = (page - 1) * limit;

    const [quotes, total] = await Promise.all([
      db.quoteRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.quoteRequest.count({ where }),
    ]);

    return NextResponse.json({
      quotes,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Quote list error:', error);
    return NextResponse.json({ error: 'Failed to fetch quote requests' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'id and status are required' }, { status: 400 });
    }

    const validStatuses = ['New', 'In Review', 'Quoted', 'Closed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updated = await db.quoteRequest.update({
      where: { id: Number(id) },
      data: { status },
    });

    return NextResponse.json({ success: true, quote: updated });
  } catch (error) {
    console.error('Quote status update error:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}