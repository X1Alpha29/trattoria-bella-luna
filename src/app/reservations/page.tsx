import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import ReservationForm from "@/components/site/ReservationForm";

export const metadata = {
  title: "Reservations | Trattoria Bella Luna",
  description:
    "Request a table at Trattoria Bella Luna in London.",
};

export default function ReservationsPage() {
  return (
    <main className="min-h-screen bg-bella-cream">
      <section className="bg-bella-charcoal px-6 pb-20 pt-36 text-bella-cream lg:px-10 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Link
              href="/"
              className="font-body text-xs uppercase tracking-[0.2em] text-bella-cream/60 transition-colors duration-300 hover:text-bella-cream"
            >
              ← Back to home
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-16 font-body text-xs font-semibold uppercase tracking-[0.3em] text-bella-cream/60">
              Reservations
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="mt-5 max-w-5xl font-display text-6xl leading-[0.88] tracking-[-0.055em] sm:text-7xl lg:text-9xl">
              Your table
              <br />
              <span className="text-bella-cream/50">is waiting.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.35fr_1fr] lg:gap-24">
          <Reveal>
            <aside>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-bella-muted">
                Book with us
              </p>

              <h2 className="mt-5 font-display text-4xl leading-[0.95] tracking-[-0.035em] text-bella-charcoal sm:text-5xl">
                A few details,
                <br />
                then we&apos;ll take care of the rest.
              </h2>

              <div className="mt-8 space-y-5 font-body text-sm leading-6 text-bella-muted">
                <p>
                  Tell us when you&apos;d like to visit and how many guests
                  you&apos;ll be bringing.
                </p>

                <p>
                  Your request will be reviewed by our team and confirmed
                  before your visit.
                </p>
              </div>

              <div className="mt-10 border-t border-bella-line pt-6">
                <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-bella-muted">
                  Opening hours
                </p>

                <div className="mt-4 space-y-2 font-body text-sm text-bella-charcoal">
                  <div className="flex justify-between gap-6">
                    <span>Mon – Thu</span>
                    <span>12:00 – 22:30</span>
                  </div>

                  <div className="flex justify-between gap-6">
                    <span>Fri – Sat</span>
                    <span>12:00 – 23:30</span>
                  </div>

                  <div className="flex justify-between gap-6">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-bella-line pt-6">
                <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-bella-muted">
                  Need help?
                </p>

                <p className="mt-3 font-body text-sm leading-6 text-bella-charcoal">
                  +44 20 7946 0123
                  <br />
                  hello@bellaluna.example
                </p>
              </div>
            </aside>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="border-t border-bella-line pt-8 sm:pt-10">
              <ReservationForm />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}