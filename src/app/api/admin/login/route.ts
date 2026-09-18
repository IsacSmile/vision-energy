import { NextResponse } from 'next/server';
import { adminLoginSchema } from '@/lib/validation';
import { verifyAdminPassword, signAdminSession, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = adminLoginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid email or password input' }, { status: 400 });
    }

    const { email, password } = result.data;
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@visionenergyme.com';

    // Verify email match
    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password hash
    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Sign session JWT
    const token = await signAdminSession(email);

    const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });

    // Set HttpOnly session cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 12, // 12 hours
    });

    return response;
  } catch (error: any) {
    console.error('Admin Login Error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
