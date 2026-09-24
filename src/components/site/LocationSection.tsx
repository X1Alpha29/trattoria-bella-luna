import { getOpeningHours, getRestaurantSettings } from "@/lib/restaurant";
import Reveal from "./Reveal";

const dayLabels: Record<string, string> = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday",
  SUNDAY: "Sunday",
};

const dayOrder = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export default async function LocationSection() {
  const [restaurant, openingHours] = await Promise.all([
    getRestaurantSettings(),
    getOpeningHours(),
  ]);

  if (!restaurant) {
    return null;
  }

  const orderedHours = [...openingHours].sort(
    (a, b) =>
      dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek),
  );

  return (
    <section
      id="contact"
      className="bg-bella-charcoal px-6 py-24 text-bella-cream lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-bella-cream/50">
                Find us
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[0.9] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
                Come and
                <br />
                <span className="text-bella-cream/50">stay awhile.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 space-y-3 font-body text-sm leading-7 text-bella-cream/70 sm:text-base">
                <p>{restaurant.address}</p>
                <p>{restaurant.phone}</p>
                <p>{restaurant.email}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="border-t border-bella-cream/20 pt-6">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-bella-cream/50">
                Opening hours
              </p>

              <div className="mt-6 space-y-4">
                {orderedHours.map((hours) => (
                  <div
                    key={hours.id}
                    className="flex items-center justify-between gap-6 border-b border-bella-cream/10 pb-4 font-body text-sm"
                  >
                    <span className="text-bella-cream">
                      {dayLabels[hours.dayOfWeek]}
                    </span>

                    <span className="text-bella-cream/60">
                      {hours.isClosed
                        ? "Closed"
                        : `${hours.openTime} – ${hours.closeTime}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}