import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'vision-energy-super-secret-jwt-key-2026-change-this'
);

export const COOKIE_NAME = 'admin_session';

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminHash) return false;
  return bcrypt.compare(password, adminHash);
}

export async function signAdminSession(email: string): Promise<string> {
  return new SignJWT({ email, role: 'ADMIN' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload;
  } catch (err) {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
