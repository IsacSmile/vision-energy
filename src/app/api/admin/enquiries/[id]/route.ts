import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'product';
    const body = await request.json();
    const { status, notes } = body;

    if (type === 'product') {
      const updated = await db.productEnquiry.update({
        where: { id },
        data: {
          ...(status !== undefined && { status }),
          ...(notes !== undefined && { notes }),
        },
      });
      return NextResponse.json({ success: true, data: updated });
    } else {
      const updated = await db.serviceEnquiry.update({
        where: { id },
        data: {
          ...(status !== undefined && { status }),
          ...(notes !== undefined && { notes }),
        },
      });
      return NextResponse.json({ success: true, data: updated });
    }
  } catch (error: any) {
    console.error('Admin Enquiry PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'product';

    if (type === 'product') {
      await db.productEnquiry.delete({ where: { id } });
    } else {
      await db.serviceEnquiry.delete({ where: { id } });
    }

    return NextResponse.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error: any) {
    console.error('Admin Enquiry DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
