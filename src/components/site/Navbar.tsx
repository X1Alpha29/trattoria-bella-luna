"use client";

import { useState } from "react";
import Link from "next/link";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Our Story", href: "/story" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link
          href="/"
          className="font-display text-2xl tracking-[-0.03em] text-bella-white"
        >
          Bella Luna
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-body text-sm text-bella-white/85 transition-colors duration-300 hover:text-bella-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/reservations"
            className="inline-flex items-center border border-bella-white/70 px-5 py-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-bella-white transition-all duration-300 hover:bg-bella-white hover:text-bella-charcoal"
          >
            Book a Table
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="relative z-50 flex h-11 w-11 items-center justify-center border border-bella-white/40 lg:hidden"
        >
          <span className="sr-only">
            {isOpen ? "Close menu" : "Open menu"}
          </span>

          <span className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-px w-full bg-bella-white transition-transform duration-300 ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`h-px w-full bg-bella-white transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`h-px w-full bg-bella-white transition-transform duration-300 ${
                isOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`absolute inset-x-0 top-0 -z-10 bg-bella-charcoal transition-all duration-500 lg:hidden ${
          isOpen
            ? "pointer-events-auto visible min-h-screen opacity-100"
            : "pointer-events-none invisible h-0 opacity-0"
        }`}
      >
        <div className="flex min-h-screen flex-col px-6 pb-10 pt-28">
          <nav className="flex flex-col gap-6">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-display text-5xl tracking-[-0.04em] text-bella-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto">
            <Link
              href="/reservations"
              onClick={() => setIsOpen(false)}
              className="inline-flex w-full justify-center bg-bella-cream px-6 py-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-bella-charcoal"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}