import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'product'; // 'product' | 'service'
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    // Get count badges of NEW items for both tabs
    const productNewCount = await db.productEnquiry.count({ where: { status: 'NEW' } });
    const serviceNewCount = await db.serviceEnquiry.count({ where: { status: 'NEW' } });

    // Build common filter object
    const dateFilter: any = {};
    if (startDate) dateFilter.gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      dateFilter.lte = end;
    }

    if (type === 'product') {
      const where: any = {};
      if (status) where.status = status;
      if (startDate || endDate) where.createdAt = dateFilter;
      if (search) {
        where.OR = [
          { reference: { contains: search } },
          { name: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } },
          { company: { contains: search } },
          { categoryCode: { contains: search } },
          { categoryTitle: { contains: search } },
        ];
      }

      const [total, data] = await Promise.all([
        db.productEnquiry.count({ where }),
        db.productEnquiry.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
      ]);

      return NextResponse.json({
        data,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        newCounts: { product: productNewCount, service: serviceNewCount },
      });
    } else {
      const where: any = {};
      if (status) where.status = status;
      if (startDate || endDate) where.createdAt = dateFilter;
      if (search) {
        where.OR = [
          { reference: { contains: search } },
          { name: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } },
          { company: { contains: search } },
          { serviceSlug: { contains: search } },
          { serviceTitle: { contains: search } },
          { emirate: { contains: search } },
        ];
      }

      const [total, data] = await Promise.all([
        db.serviceEnquiry.count({ where }),
        db.serviceEnquiry.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
      ]);

      return NextResponse.json({
        data,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        newCounts: { product: productNewCount, service: serviceNewCount },
      });
    }
  } catch (error: any) {
    console.error('Admin Enquiries GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}
