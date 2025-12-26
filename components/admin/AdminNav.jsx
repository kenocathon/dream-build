"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  HomeIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
  { name: "Jobs", href: "/admin/jobs", icon: BriefcaseIcon },
  { name: "Social Posts", href: "/admin/posts", icon: ChatBubbleLeftRightIcon },
  { name: "Analytics", href: "/admin/analytics", icon: ChartBarIcon },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <Link href="/admin/dashboard">
          <Image
            src="/images/logo.png"
            width={160}
            height={60}
            alt="Dream Build"
            className="h-10 w-auto"
          />
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-gold-500 text-deepblack"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2 mt-2 text-gray-500 hover:text-gold-500 transition-colors text-sm"
        >
          View Website &rarr;
        </a>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-gray-900 border-r border-gray-800 min-h-screen fixed left-0 top-0">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/admin/dashboard">
            <Image
              src="/images/logo.png"
              width={120}
              height={40}
              alt="Dream Build"
              className="h-8 w-auto"
            />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-gray-900 pt-16">
          <NavContent />
        </div>
      )}
    </>
  );
}
