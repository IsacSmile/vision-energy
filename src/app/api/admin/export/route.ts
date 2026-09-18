import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'product';

    let csvContent = '';

    if (type === 'product') {
      const records = await db.productEnquiry.findMany({
        orderBy: { createdAt: 'desc' },
      });

      const headers = ['Reference', 'Date', 'Category Code', 'Category Title', 'Name', 'Company', 'Phone', 'Email', 'Quantity', 'Delivery Location', 'Message', 'Status', 'Notes', 'Source URL'];
      csvContent += headers.map((h) => `"${h}"`).join(',') + '\n';

      for (const r of records) {
        const row = [
          r.reference,
          new Date(r.createdAt).toISOString(),
          r.categoryCode,
          r.categoryTitle,
          r.name,
          r.company || '',
          r.phone,
          r.email,
          r.quantity || '',
          r.deliveryLocation || '',
          (r.message || '').replace(/"/g, '""'),
          r.status,
          (r.notes || '').replace(/"/g, '""'),
          r.sourceUrl,
        ];
        csvContent += row.map((field) => `"${field}"`).join(',') + '\n';
      }
    } else {
      const records = await db.serviceEnquiry.findMany({
        orderBy: { createdAt: 'desc' },
      });

      const headers = ['Reference', 'Date', 'Service Title', 'Service Slug', 'Name', 'Company', 'Phone', 'Email', 'Emirate', 'Project Type', 'Preferred Date', 'Message', 'Status', 'Notes', 'Source URL'];
      csvContent += headers.map((h) => `"${h}"`).join(',') + '\n';

      for (const r of records) {
        const row = [
          r.reference,
          new Date(r.createdAt).toISOString(),
          r.serviceTitle,
          r.serviceSlug,
          r.name,
          r.company || '',
          r.phone,
          r.email,
          r.emirate,
          r.projectType,
          r.preferredDate || '',
          (r.message || '').replace(/"/g, '""'),
          r.status,
          (r.notes || '').replace(/"/g, '""'),
          r.sourceUrl,
        ];
        csvContent += row.map((field) => `"${field}"`).join(',') + '\n';
      }
    }

    const filename = `vision-energy-${type}-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error('Admin Export CSV Error:', error);
    return NextResponse.json({ error: 'Failed to generate CSV export' }, { status: 500 });
  }
}
