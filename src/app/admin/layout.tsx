import React from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/auth";

export const metadata = {
  title: "Vision Energy - Admin Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  const userEmail = session?.email || "admin@visionenergyme.com";

  return <AdminShell userEmail={userEmail}>{children}</AdminShell>;
}
