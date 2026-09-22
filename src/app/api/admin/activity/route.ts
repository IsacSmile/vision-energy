import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action") || undefined;
  const entity = searchParams.get("entity") || undefined;

  try {
    const where: any = {};
    if (action) where.action = action;
    if (entity) where.entity = entity;

    const logs = await db.auditLog.findMany({
      where,
      take: 200,
      orderBy: { at: "desc" },
    });

    return NextResponse.json({ logs });
  } catch (error) {
    console.error("Audit log API Error:", error);
    return NextResponse.json({ error: "Failed to fetch audit log" }, { status: 500 });
  }
}
