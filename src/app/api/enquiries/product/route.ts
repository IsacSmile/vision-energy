import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { productEnquirySchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limit';
import { sendNotificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = productEnquirySchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || 'Validation error';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = result.data;

    // Spam honeypot check
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // Generate unique reference string: PRD-20260919-C3D4
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    const reference = `PRD-${dateStr}-${randStr}`;

    const enquiry = await db.productEnquiry.create({
      data: {
        reference,
        categoryCode: data.categoryCode,
        categoryTitle: data.categoryTitle,
        name: data.name,
        company: data.company || null,
        phone: data.phone,
        email: data.email,
        quantity: data.quantity || null,
        deliveryLocation: data.deliveryLocation || null,
        message: data.message,
        sourceUrl: data.sourceUrl,
        status: 'NEW',
      },
    });

    // Optional email dispatch
    await sendNotificationEmail(
      `[NEW PRODUCT ENQUIRY] ${reference} - [${data.categoryCode}] ${data.categoryTitle}`,
      `
      <h2>New Product Category Enquiry</h2>
      <p><strong>Reference:</strong> ${reference}</p>
      <p><strong>Category:</strong> [${data.categoryCode}] ${data.categoryTitle}</p>
      <p><strong>Client Name:</strong> ${data.name}</p>
      <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Estimated Quantity:</strong> ${data.quantity || 'N/A'}</p>
      <p><strong>Delivery Location:</strong> ${data.deliveryLocation || 'N/A'}</p>
      <p><strong>Message:</strong> ${data.message}</p>
      <p><strong>Source Page:</strong> <a href="${data.sourceUrl}">${data.sourceUrl}</a></p>
      `
    );

    return NextResponse.json({ success: true, reference: enquiry.reference });
  } catch (error: any) {
    console.error('Product Enquiry POST error:', error);
    return NextResponse.json(
      { error: 'Failed to record product enquiry request. Please try again.' },
      { status: 500 }
    );
  }
}
