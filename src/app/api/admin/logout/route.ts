import { NextResponse } from "next/server";
import { COOKIE_NAME, getAdminSession } from "@/lib/auth";
import { recordAuditLog } from "@/lib/audit";

export async function POST() {
  const session = await getAdminSession();
  if (session?.email) {
    await recordAuditLog({
      actor: session.email,
      action: "LOGOUT",
      entity: "ADMIN_AUTH",
      summary: "Admin logged out",
    });
  }

  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
