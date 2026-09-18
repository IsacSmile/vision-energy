import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { serviceEnquirySchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limit';
import { sendNotificationEmail } from '@/lib/email';
import { crypto } from 'next/dist/compiled/@edge-runtime/primitives';

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
    const result = serviceEnquirySchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || 'Validation error';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = result.data;

    // Spam honeypot check
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // Generate unique reference string: SRV-20260919-A1B2
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    const reference = `SRV-${dateStr}-${randStr}`;

    const enquiry = await db.serviceEnquiry.create({
      data: {
        reference,
        serviceSlug: data.serviceSlug,
        serviceTitle: data.serviceTitle,
        name: data.name,
        company: data.company || null,
        phone: data.phone,
        email: data.email,
        emirate: data.emirate,
        projectType: data.projectType,
        preferredDate: data.preferredDate || null,
        message: data.message,
        sourceUrl: data.sourceUrl,
        status: 'NEW',
      },
    });

    // Optional email dispatch
    await sendNotificationEmail(
      `[NEW SERVICE BOOKING] ${reference} - ${data.serviceTitle}`,
      `
      <h2>New Service Booking Request</h2>
      <p><strong>Reference:</strong> ${reference}</p>
      <p><strong>Service:</strong> ${data.serviceTitle} (${data.serviceSlug})</p>
      <p><strong>Client Name:</strong> ${data.name}</p>
      <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Emirate:</strong> ${data.emirate}</p>
      <p><strong>Project Type:</strong> ${data.projectType}</p>
      <p><strong>Preferred Start Date:</strong> ${data.preferredDate || 'Flexible'}</p>
      <p><strong>Message:</strong> ${data.message}</p>
      <p><strong>Source Page:</strong> <a href="${data.sourceUrl}">${data.sourceUrl}</a></p>
      `
    );

    return NextResponse.json({ success: true, reference: enquiry.reference });
  } catch (error: any) {
    console.error('Service Enquiry POST error:', error);
    return NextResponse.json(
      { error: 'Failed to record service booking request. Please try again.' },
      { status: 500 }
    );
  }
}
