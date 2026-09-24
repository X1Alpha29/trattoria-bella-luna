"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navigation = [
  { label: "Dashboard", href: "/admin" },
  { label: "Menu", href: "/admin/menu" },
  { label: "Reservations", href: "/admin/reservations" },
  { label: "Reviews", href: "/admin/reviews" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-full flex-col border-r border-bella-line bg-bella-charcoal text-bella-cream lg:w-72 lg:shrink-0">
      <div className="border-b border-bella-cream/10 p-8">
        <Link
          href="/"
          className="font-display text-3xl tracking-[-0.04em]"
        >
          Bella Luna
        </Link>

        <p className="mt-2 font-body text-xs uppercase tracking-[0.2em] text-bella-cream/50">
          Administration
        </p>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 font-body text-sm transition ${
                  isActive
                    ? "bg-bella-cream text-bella-charcoal"
                    : "text-bella-cream/70 hover:bg-bella-cream/10 hover:text-bella-cream"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-bella-cream/10 p-4">
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full px-4 py-3 text-left font-body text-sm text-bella-cream/60 transition hover:bg-bella-cream/10 hover:text-bella-cream"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}