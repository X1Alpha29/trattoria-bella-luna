import Link from "next/link";

import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import Reveal from "@/components/site/Reveal";
import { getOpeningHours, getRestaurantSettings } from "@/lib/restaurant";

const dayOrder = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const dayLabels: Record<string, string> = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday",
  SUNDAY: "Sunday",
};

export const metadata = {
  title: "Contact | Trattoria Bella Luna",
  description:
    "Find Trattoria Bella Luna, get in touch and view our opening hours.",
};

export default async function ContactPage() {
  const [settings, openingHours] = await Promise.all([
    getRestaurantSettings(),
    getOpeningHours(),
  ]);

  const orderedOpeningHours = [...openingHours].sort(
    (a, b) => dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek),
  );

  return (
    <>
      <main className="bg-bella-cream">
        <section className="border-b border-bella-line">
          <Navbar />

          <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 sm:px-10 lg:px-16 lg:pb-28">
            <Reveal>
              <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-olive">
                Contact
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.9] tracking-[-0.05em] text-bella-charcoal sm:text-7xl lg:text-8xl">
                Come and see us.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 max-w-2xl font-body text-base leading-7 text-bella-muted sm:text-lg">
                Questions, celebrations or simply looking for a great plate of
                pasta? Get in touch with Bella Luna.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <div>
              <Reveal>
                <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-olive">
                  Find us
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="mt-5 font-display text-5xl leading-[0.95] tracking-[-0.05em] text-bella-charcoal sm:text-6xl">
                  In the heart of London.
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-10 space-y-6">
                  {settings && (
                    <>
                      <div>
                        <p className="font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
                          Address
                        </p>

                        <p className="mt-2 max-w-sm font-body text-base leading-7 text-bella-charcoal">
                          {settings.address}
                        </p>
                      </div>

                      <div>
                        <p className="font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
                          Phone
                        </p>

                        <a
                          href={`tel:${settings.phone}`}
                          className="mt-2 inline-block font-body text-base text-bella-charcoal transition-colors hover:text-bella-olive"
                        >
                          {settings.phone}
                        </a>
                      </div>

                      <div>
                        <p className="font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
                          Email
                        </p>

                        <a
                          href={`mailto:${settings.email}`}
                          className="mt-2 inline-block font-body text-base text-bella-charcoal transition-colors hover:text-bella-olive"
                        >
                          {settings.email}
                        </a>
                      </div>

                      <div className="flex flex-wrap gap-5 pt-2">
                        {settings.instagramUrl && (
                          <a
                            href={settings.instagramUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-body text-xs uppercase tracking-[0.15em] text-bella-olive"
                          >
                            Instagram
                          </a>
                        )}

                        {settings.facebookUrl && (
                          <a
                            href={settings.facebookUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-body text-xs uppercase tracking-[0.15em] text-bella-olive"
                          >
                            Facebook
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="bg-bella-olive p-8 text-bella-cream sm:p-10">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-bella-cream/60">
                  Opening hours
                </p>

                <h2 className="mt-3 font-display text-4xl tracking-[-0.04em]">
                  Plan your visit.
                </h2>

                <div className="mt-8 divide-y divide-bella-cream/15">
                  {orderedOpeningHours.map((day) => (
                    <div
                      key={day.id}
                      className="flex items-center justify-between gap-6 py-4"
                    >
                      <span className="font-body text-sm">
                        {dayLabels[day.dayOfWeek]}
                      </span>

                      <span className="text-right font-body text-sm text-bella-cream/70">
                        {day.isClosed
                          ? "Closed"
                          : `${day.openTime ?? "—"} – ${day.closeTime ?? "—"}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-16 border border-bella-line bg-bella-white p-8 sm:p-10 lg:mt-24">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-bella-olive">
                    Reservations
                  </p>

                  <h2 className="mt-3 font-display text-4xl tracking-[-0.04em] text-bella-charcoal">
                    Join us for dinner.
                  </h2>

                  <p className="mt-3 max-w-xl font-body text-sm leading-6 text-bella-muted">
                    Reserve your table and let us take care of the rest.
                  </p>
                </div>

                <Link
                  href="/reservations"
                  className="shrink-0 bg-bella-charcoal px-7 py-4 text-center font-body text-xs font-semibold uppercase tracking-[0.18em] text-bella-cream transition hover:bg-bella-olive"
                >
                  Book a Table
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}