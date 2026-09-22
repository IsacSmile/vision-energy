import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Simple in-memory rate limiter for health endpoint
let lastCallTime = 0;

export async function GET() {
  const now = Date.now();
  // Rate limit: max 1 call per second
  if (now - lastCallTime < 1000) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }
  lastCallTime = now;

  try {
    // Trivial database query
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
