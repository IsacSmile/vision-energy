import { NextResponse } from "next/server";
import { z } from "zod";
import {
  verifyAdminPassword,
  signAdminSession,
  COOKIE_NAME,
  checkLoginRateLimit,
  recordLoginAttempt,
  clearLoginAttempts,
} from "@/lib/auth";
import { recordAuditLog } from "@/lib/audit";
import { env } from "@/lib/env";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const { email, password } = result.data;
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const ipKey = `ip_${clientIp}`;
    const emailKey = `email_${email.toLowerCase()}`;

    // Rate limit check for both IP and Email
    const ipLimit = checkLoginRateLimit(ipKey);
    const emailLimit = checkLoginRateLimit(emailKey);

    if (!ipLimit.allowed || !emailLimit.allowed) {
      const wait = Math.max(ipLimit.retryAfterSeconds || 0, emailLimit.retryAfterSeconds || 0);
      return NextResponse.json(
        { error: `Too many login attempts. Please try again in ${wait} seconds.` },
        { status: 429 }
      );
    }

    const adminEmail = env.ADMIN_EMAIL;

    // Verify email match
    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      recordLoginAttempt(ipKey);
      recordLoginAttempt(emailKey);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Verify password hash
    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
      recordLoginAttempt(ipKey);
      recordLoginAttempt(emailKey);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Clear rate limits on successful authentication
    clearLoginAttempts(ipKey);
    clearLoginAttempts(emailKey);

    // Sign session JWT
    const token = await signAdminSession(email);

    // Log LOGIN audit entry
    await recordAuditLog({
      actor: email,
      action: "LOGIN",
      entity: "ADMIN_AUTH",
      summary: "Successful admin login",
    });

    const response = NextResponse.json({ success: true, message: "Authenticated successfully" });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 60 * 60, // 8 hours absolute
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
