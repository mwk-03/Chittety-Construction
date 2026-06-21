import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { name, phone, email, company, projectType, category, sku, quantity, deliveryLocation, message } = body;
    
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
        message: message || '',
      }
    });
    
    return NextResponse.json({ success: true, id: quote.id });
  } catch (error) {
    console.error('Quote submission error:', error);
    return NextResponse.json({ error: 'Failed to submit quote request' }, { status: 500 });
  }
}
