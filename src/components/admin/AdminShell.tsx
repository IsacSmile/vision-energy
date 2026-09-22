"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Inbox,
  Package,
  Wrench,
  FileText,
  Trash2,
  Activity,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { ToastContainer } from "./Toast";

interface AdminShellProps {
  children: React.ReactNode;
  userEmail?: string;
}

export default function AdminShell({ children, userEmail = "admin@visionenergyme.com" }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If preview route or login route, render children without shell
  if (pathname === "/admin/login" || pathname.startsWith("/admin/preview/")) {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Services", href: "/admin/services", icon: Wrench },
    { label: "Blog", href: "/admin/blog", icon: FileText },
    { label: "Trash", href: "/admin/trash", icon: Trash2 },
    { label: "Activity", href: "/admin/activity", icon: Activity },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const isNavActive = (item: typeof navItems[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white flex flex-col lg:flex-row antialiased">
      <ToastContainer />
      {/* MOBILE TOP BAR (below lg) */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#0D1117] border-b border-[#1F2937] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative rounded-lg overflow-hidden bg-[#050608] border border-[#1F2937] flex items-center justify-center">
            <Image src="/site-main-logo.png" alt="Vision Energy" width={24} height={24} style={{ width: "auto", height: "auto" }} />
          </div>
          <span className="font-bold text-sm tracking-tight text-white">VISION CMS</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-300 hover:text-white bg-[#050608] border border-[#1F2937] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-gray-300" /> : <Menu className="w-5 h-5 text-gray-300" />}
        </button>
      </header>

      {/* MOBILE FULL-SCREEN NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col bg-[#050608]/95 backdrop-blur-md">
          <div className="p-4 border-b border-[#1F2937] flex items-center justify-between bg-[#0D1117]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative rounded-lg overflow-hidden bg-[#050608] border border-[#1F2937] flex items-center justify-center">
                <Image src="/site-main-logo.png" alt="Vision Energy" width={24} height={24} style={{ width: "auto", height: "auto" }} />
              </div>
              <span className="font-bold text-sm text-white">VISION CMS</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-300 hover:text-white bg-[#050608] border border-[#1F2937] rounded-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const active = isNavActive(item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all min-h-[44px] ${
                    active
                      ? "bg-[#A3E635]/10 text-[#A3E635] border-l-4 border-[#A3E635] font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-[#0D1117]"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? "text-[#A3E635]" : "text-gray-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#1F2937] bg-[#0D1117] space-y-3">
            <div className="text-xs text-gray-400 font-mono truncate px-1">
              Signed in: <span className="text-white font-medium">{userEmail}</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 py-2.5 bg-[#050608] border border-[#1F2937] hover:border-gray-600 rounded-xl text-xs font-semibold text-gray-300 hover:text-white flex items-center justify-center gap-2 min-h-[44px]"
              >
                <ExternalLink className="w-4 h-4 text-gray-400" />
                <span>View site</span>
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-900/60 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 min-h-[44px]"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP FIXED LEFT SIDEBAR (lg: 240px wide) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[240px] lg:fixed lg:inset-y-0 bg-[#0D1117] border-r border-[#1F2937] z-30">
        {/* Brand Header */}
        <div className="p-5 border-b border-[#1F2937] flex items-center gap-3">
          <div className="w-9 h-9 relative rounded-xl overflow-hidden bg-[#050608] border border-[#1F2937] flex items-center justify-center shrink-0">
            <Image src="/site-main-logo.png" alt="Vision Energy" width={26} height={26} style={{ width: "auto", height: "auto" }} />
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-tight text-white leading-tight">VISION ENERGY</h2>
            <span className="text-[10px] font-semibold text-[#A3E635] tracking-wider uppercase">CMS Admin</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = isNavActive(item);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group min-h-[44px] ${
                  active
                    ? "bg-[#A3E635]/10 text-[#A3E635] font-semibold"
                    : "text-gray-400 hover:text-white hover:bg-[#050608]"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#A3E635] rounded-r" />
                )}
                <Icon className={`w-4 h-4 transition-colors ${active ? "text-[#A3E635]" : "text-gray-400 group-hover:text-white"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Sidebar Info & Actions */}
        <div className="p-4 border-t border-[#1F2937] space-y-3 bg-[#080B10]">
          <div className="text-[11px] text-gray-400 font-mono truncate px-1">
            <span className="block text-[10px] text-gray-500 uppercase font-sans">Account</span>
            <span className="text-gray-300 font-medium truncate block" title={userEmail}>
              {userEmail}
            </span>
          </div>

          <div className="pt-1 flex flex-col gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-3 py-2 bg-[#050608] border border-[#1F2937] hover:border-gray-600 rounded-xl text-xs font-semibold text-gray-300 hover:text-white flex items-center justify-center gap-2 transition-colors min-h-[44px]"
            >
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              <span>View site</span>
            </a>
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-900/60 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors min-h-[44px]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 lg:pl-[240px] min-h-screen flex flex-col">
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}
