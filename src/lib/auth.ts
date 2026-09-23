import "server-only";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { env } from "./env";

export const COOKIE_NAME = "admin_session";

function getSessionSecret(): Uint8Array {
  const secret = env.SESSION_SECRET || "default_fallback_session_secret_min_32_bytes_long_string!";
  return new TextEncoder().encode(secret);
}

// In-memory rate limiting map for login attempts: key -> Array of timestamps (ms)
const loginAttemptsMap = new Map<string, number[]>();

export function checkLoginRateLimit(key: string, maxAttempts = 5, windowMs = 15 * 60 * 1000): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const attempts = loginAttemptsMap.get(key) || [];
  const validAttempts = attempts.filter((ts) => now - ts < windowMs);

  if (validAttempts.length >= maxAttempts) {
    const oldest = validAttempts[0];
    const retryAfterSeconds = Math.ceil((oldest + windowMs - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  return { allowed: true };
}

export function recordLoginAttempt(key: string, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const attempts = loginAttemptsMap.get(key) || [];
  const validAttempts = attempts.filter((ts) => now - ts < windowMs);
  validAttempts.push(now);
  loginAttemptsMap.set(key, validAttempts);
}

export function clearLoginAttempts(key: string) {
  loginAttemptsMap.delete(key);
}

// In-memory rate limiting map for upload requests: key -> Array of timestamps (ms)
const uploadAttemptsMap = new Map<string, number[]>();

export function checkUploadRateLimit(key: string, maxUploads = 30, windowMs = 60 * 60 * 1000): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const attempts = uploadAttemptsMap.get(key) || [];
  const validAttempts = attempts.filter((ts) => now - ts < windowMs);

  if (validAttempts.length >= maxUploads) {
    const oldest = validAttempts[0];
    const retryAfterSeconds = Math.ceil((oldest + windowMs - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  validAttempts.push(now);
  uploadAttemptsMap.set(key, validAttempts);
  return { allowed: true };
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const adminHash = env.ADMIN_PASSWORD_HASH;
  if (!adminHash) return false;
  try {
    return await bcrypt.compare(password, adminHash);
  } catch (err) {
    return false;
  }
}

export async function signAdminSession(email: string): Promise<string> {
  const nowSec = Math.floor(Date.now() / 1000);
  const secret = getSessionSecret();

  return new SignJWT({
    email,
    role: "ADMIN",
    lastActive: nowSec,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(nowSec)
    .setExpirationTime(nowSec + 8 * 60 * 60) // 8 hours absolute limit
    .sign(secret);
}

export interface SessionPayload {
  email: string;
  role: string;
  lastActive: number;
  exp: number;
}

export async function verifyAdminToken(token: string): Promise<SessionPayload | null> {
  try {
    const secret = getSessionSecret();
    const verified = await jwtVerify(token, secret);
    const payload = verified.payload as unknown as SessionPayload;

    if (!payload || !payload.email) return null;

    // Check sliding idle limit (60 minutes = 3600 seconds)
    const nowSec = Math.floor(Date.now() / 1000);
    if (payload.lastActive && nowSec - payload.lastActive > 60 * 60) {
      return null;
    }

    return payload;
  } catch (err) {
    return null;
  }
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}
