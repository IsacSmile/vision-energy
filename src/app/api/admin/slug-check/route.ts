import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { RESERVED_SLUGS } from "@/lib/schemas/admin";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const slug = (searchParams.get("slug") || "").trim().toLowerCase();
  const type = searchParams.get("type") || "service";
  const excludeId = searchParams.get("excludeId");

  if (!slug) {
    return NextResponse.json({ available: false, reason: "Slug cannot be empty" });
  }

  if (RESERVED_SLUGS.includes(slug)) {
    return NextResponse.json({ available: false, reason: `"${slug}" is a reserved word` });
  }

  try {
    let exists = false;

    if (type === "product") {
      const found = await db.productCategory.findFirst({
        where: {
          slug,
          ...(excludeId ? { id: { not: excludeId } } : {}),
        },
      });
      exists = Boolean(found);
    } else if (type === "service") {
      const found = await db.service.findFirst({
        where: {
          slug,
          ...(excludeId ? { id: { not: excludeId } } : {}),
        },
      });
      exists = Boolean(found);
    } else if (type === "blog") {
      const found = await db.blogPost.findFirst({
        where: {
          slug,
          ...(excludeId ? { id: { not: excludeId } } : {}),
        },
      });
      exists = Boolean(found);
    }

    if (exists) {
      return NextResponse.json({ available: false, reason: "Slug is already in use" });
    }

    return NextResponse.json({ available: true });
  } catch (error) {
    return NextResponse.json({ error: "Slug check failed" }, { status: 500 });
  }
}
