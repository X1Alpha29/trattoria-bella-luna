import Link from "next/link";

import Navbar from "./Navbar";
import { getRestaurantSettings } from "@/lib/restaurant";

export default async function Hero() {
  const settings = await getRestaurantSettings();

  const restaurantName =
  settings?.restaurantName ?? "Trattoria Bella Luna";

  const tagline =
    settings?.tagline ?? "Authentic Italian Dining in London";

  const description =
    settings?.description ??
    "Authentic Italian flavours, seasonal ingredients and memorable evenings in the heart of London.";

  const address =
    settings?.address ?? "12–14 Kensington Park Road";

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-bella-charcoal">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=85')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-bella-charcoal/55 via-bella-charcoal/15 to-bella-charcoal/75" />

      <div className="absolute inset-0 bg-gradient-to-r from-bella-charcoal/55 via-transparent to-transparent" />

      <Navbar />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-40 lg:px-10 lg:pb-20">
        <div className="max-w-5xl">
          <p className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.3em] text-bella-white/80">
            {restaurantName} · {tagline}
          </p>

          <h1 className="max-w-5xl font-display text-6xl leading-[0.88] tracking-[-0.055em] text-bella-white sm:text-7xl lg:text-9xl">
            A taste of Italy
            <br />
            in the heart of London.
          </h1>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            <p className="max-w-md font-body text-sm leading-7 text-bella-white/80 sm:text-base">
              {description}
            </p>

            <div className="flex gap-3">
              <Link
                href="/reservations"
                className="inline-flex items-center bg-bella-cream px-6 py-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-bella-charcoal transition-transform duration-300 hover:-translate-y-1"
              >
                Book a Table
              </Link>

              <Link
                href="/menu"
                className="inline-flex items-center border border-bella-white/60 px-6 py-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-bella-white transition-colors duration-300 hover:bg-bella-white hover:text-bella-charcoal"
              >
                View Menu
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-end justify-between">
          <div className="hidden max-w-xs border-l border-bella-white/40 pl-4 sm:block">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-bella-white/60">
              {address}
            </p>
          </div>

          <div className="ml-auto flex flex-col items-center gap-3 text-bella-white/70">
            <span className="font-body text-[10px] uppercase tracking-[0.3em]">
              Scroll
            </span>

            <span className="h-12 w-px bg-bella-white/50" />
          </div>
        </div>
      </div>
    </section>
  );
}