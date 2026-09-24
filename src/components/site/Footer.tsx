import Link from "next/link";
import { getRestaurantSettings } from "@/lib/restaurant";

export default async function Footer() {
  const restaurant = await getRestaurantSettings();

  if (!restaurant) {
    return null;
  }

  return (
    <footer className="bg-bella-cream px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-bella-line pb-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="font-display text-4xl tracking-[-0.04em] text-bella-charcoal"
            >
              Bella Luna
            </Link>

            <p className="mt-4 max-w-sm font-body text-sm leading-6 text-bella-muted">
              {restaurant.tagline}
            </p>
          </div>

          <div>
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-bella-muted">
              Explore
            </p>

            <nav className="mt-4 flex flex-col gap-3">
              <Link
                href="/"
                className="font-body text-sm text-bella-charcoal transition-colors hover:text-bella-terracotta"
              >
                Home
              </Link>

              <Link
                href="/menu"
                className="font-body text-sm text-bella-charcoal transition-colors hover:text-bella-terracotta"
              >
                Menu
              </Link>

              <Link
                href="/reservations"
                className="font-body text-sm text-bella-charcoal transition-colors hover:text-bella-terracotta"
              >
                Reservations
              </Link>
            </nav>
          </div>

          <div>
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-bella-muted">
              Contact
            </p>

            <div className="mt-4 space-y-2 font-body text-sm leading-6 text-bella-charcoal">
              <p>{restaurant.address}</p>
              <p>{restaurant.phone}</p>
              <p>{restaurant.email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 pt-6 sm:flex-row">
          <p className="font-body text-[10px] uppercase tracking-[0.15em] text-bella-muted">
            © {new Date().getFullYear()} Trattoria Bella Luna
          </p>

          <p className="font-body text-[10px] uppercase tracking-[0.15em] text-bella-muted">
            Authentic Italian flavours, made for London.
          </p>
        </div>
      </div>
    </footer>
  );
}