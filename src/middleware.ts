import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";

function getSessionSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET || "default_fallback_session_secret_min_32_bytes_long_string!";
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Security headers for admin routes
  const securityHeaders = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "same-origin",
    "X-Robots-Tag": "noindex, nofollow",
  };

  // 1. Public Admin Login Routes (no auth required)
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    const response = NextResponse.next();
    if (pathname.startsWith("/admin")) {
      Object.entries(securityHeaders).forEach(([key, val]) => response.headers.set(key, val));
    }
    return response;
  }

  // 2. Protect /admin Pages
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    try {
      const secret = getSessionSecret();
      const verified = await jwtVerify(token, secret);
      const payload = verified.payload as any;
      const nowSec = Math.floor(Date.now() / 1000);
      if (payload.lastActive && nowSec - payload.lastActive > 3600) {
        throw new Error("Idle timeout");
      }
      const response = NextResponse.next();
      Object.entries(securityHeaders).forEach(([key, val]) => response.headers.set(key, val));
      return response;
    } catch {
      const loginUrl = new URL("/admin/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  // 3. Protect /api/admin Routes
  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    try {
      const secret = getSessionSecret();
      const verified = await jwtVerify(token, secret);
      const payload = verified.payload as any;
      const nowSec = Math.floor(Date.now() / 1000);
      if (payload.lastActive && nowSec - payload.lastActive > 3600) {
        return NextResponse.json({ error: "Session expired due to inactivity" }, { status: 401 });
      }
    } catch {
      return NextResponse.json({ error: "Session expired or invalid" }, { status: 401 });
    }

    // CSRF Protection for mutating API requests
    if (["POST", "PATCH", "PUT", "DELETE"].includes(request.method)) {
      const origin = request.headers.get("origin");
      const host = request.headers.get("host");
      if (origin && host) {
        try {
          const originHost = new URL(origin).host;
          if (originHost !== host) {
            return NextResponse.json({ error: "Forbidden: CSRF verification failed" }, { status: 403 });
          }
        } catch {
          return NextResponse.json({ error: "Forbidden: Invalid origin" }, { status: 403 });
        }
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
