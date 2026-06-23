import { NextResponse } from 'next/server';

interface InquiryPayload {
  name?: string;
  phone?: string;
  source?: string;
  email?: string;
  company_name?: string;
  product_sku?: string;
  product_name?: string;
  category?: string;
  brand?: string;
  price_reference?: string;
  quantity?: string;
  delivery_location?: string;
  project_type?: string;
  requirement_type?: string;
  message?: string;
  page_url?: string;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character] || character);
}

function requestId(date: Date) {
  const value = date.toISOString().replace(/[-:T]/g, '').slice(0, 14);
  return `CCQ-${value.slice(0, 8)}-${value.slice(8)}`;
}

function subjectFor(inquiry: InquiryPayload, id: string) {
  const type = inquiry.requirement_type?.toLowerCase() || '';
  const source = inquiry.source?.toLowerCase() || '';
  if (type.includes('bulk')) return `New Bulk Supply Inquiry — ${id}`;
  if (source.includes('support')) return `New Support Request — ${inquiry.requirement_type || 'General Support'} — ${id}`;
  if (source.includes('contact')) return `New Contact Request — Chittety Construction — ${id}`;
  if (inquiry.product_name) return `New Product Inquiry — ${inquiry.product_name} — ${id}`;
  return `New Quote Request — Chittety Construction — ${id}`;
}

function buildMessage(inquiry: InquiryPayload, id: string, submittedAt: string) {
  const sections = [
    ['Request Details', [
      ['Request ID', id], ['Submitted At', submittedAt], ['Source', inquiry.source],
      ['Requirement Type', inquiry.requirement_type], ['Page URL', inquiry.page_url],
    ]],
    ['Customer Details', [
      ['Name', inquiry.name], ['Phone', inquiry.phone], ['Email', inquiry.email], ['Company Name', inquiry.company_name],
    ]],
    ['Product Details', [
      ['SKU', inquiry.product_sku], ['Product Name', inquiry.product_name], ['Category', inquiry.category],
      ['Brand', inquiry.brand], ['Price Reference', inquiry.price_reference], ['Quantity', inquiry.quantity],
    ]],
    ['Project Details', [
      ['Project Type', inquiry.project_type], ['Delivery Location', inquiry.delivery_location], ['Message', inquiry.message],
    ]],
  ] as const;

  const html = sections.map(([title, rows]) => {
    const visibleRows = rows.filter(([, value]) => value);
    if (!visibleRows.length) return '';
    return `<h2 style="font-size:16px;margin:24px 0 8px;color:#111827">${title}</h2><table style="border-collapse:collapse;width:100%">${visibleRows.map(([label, value]) => `<tr><td style="padding:7px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;width:180px">${label}</td><td style="padding:7px 10px;border:1px solid #e5e7eb">${escapeHtml(String(value))}</td></tr>`).join('')}</table>`;
  }).join('');

  const text = sections.flatMap(([title, rows]) => {
    const visibleRows = rows.filter(([, value]) => value);
    return visibleRows.length ? [`\n${title}`, ...visibleRows.map(([label, value]) => `${label}: ${value}`)] : [];
  }).join('\n');

  return {
    html: `<div style="font-family:Arial,sans-serif;color:#374151;max-width:720px"><h1 style="color:#111827">New Chittety Construction Inquiry</h1>${html}<p style="margin-top:24px;color:#6b7280;font-size:13px">This inquiry was submitted from the Chittety Construction website.</p></div>`,
    text: `New Chittety Construction Inquiry\n${text}\n\nThis inquiry was submitted from the Chittety Construction website.`,
  };
}

export async function POST(request: Request) {
  try {
    const inquiry = await request.json() as InquiryPayload;
    if (!inquiry.name?.trim() || !inquiry.phone?.trim() || (!inquiry.source?.trim() && !inquiry.requirement_type?.trim())) {
      return NextResponse.json({ success: false, message: 'Please provide name, phone number, and requirement type.' }, { status: 400 });
    }

    const now = new Date();
    const id = requestId(now);
    const to = process.env.INQUIRY_TO_EMAIL;
    const resendKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.INQUIRY_FROM_EMAIL;
    const smtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && (process.env.SMTP_FROM || resendFrom);

    if (!to || (!resendKey && !smtpConfigured)) {
      return NextResponse.json({ success: false, message: 'Email service is not configured. Please add RESEND_API_KEY or SMTP credentials.' }, { status: 503 });
    }

    const subject = subjectFor(inquiry, id);
    const content = buildMessage(inquiry, id, now.toLocaleString('en-US', { timeZone: 'America/Chicago' }));

    if (resendKey) {
      if (!resendFrom) {
        return NextResponse.json({ success: false, message: 'INQUIRY_FROM_EMAIL is required when using Resend.' }, { status: 503 });
      }
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: resendFrom, to: [to], subject, html: content.html, text: content.text, reply_to: inquiry.email || undefined }),
      });
      if (!response.ok) throw new Error(`Resend rejected the message (${response.status}).`);
    } else {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT || 587) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: process.env.SMTP_FROM || resendFrom,
        to,
        replyTo: inquiry.email || undefined,
        subject,
        html: content.html,
        text: content.text,
      });
    }

    return NextResponse.json({ success: true, request_id: id, message: 'Your inquiry has been sent successfully. Our team will contact you soon.' });
  } catch (error) {
    console.error('Inquiry email error:', error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Unable to send inquiry. Please try again.' }, { status: 500 });
  }
}
