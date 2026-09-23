import { getOpeningHours, getRestaurantSettings } from "@/lib/restaurant";
import RestaurantSettingsForm from "@/components/admin/RestaurantSettingsForm";
import OpeningHourEditForm from "@/components/admin/OpeningHourEditForm";

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

export default async function AdminSettingsPage() {
  const [settings, openingHours] = await Promise.all([
    getRestaurantSettings(),
    getOpeningHours(),
  ]);

  const orderedOpeningHours = [...openingHours].sort(
    (a, b) => dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek),
  );

  return (
    <main className="min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <div className="max-w-7xl">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-olive">
          Administration
        </p>

        <h1 className="mt-4 font-display text-5xl tracking-[-0.05em] text-bella-charcoal sm:text-6xl">
          Settings
        </h1>

        <p className="mt-6 max-w-2xl font-body text-base leading-7 text-bella-muted">
          Manage the restaurant information and opening hours displayed across
          the website.
        </p>

        <div className="mt-12 grid items-start gap-4 lg:grid-cols-2">
          <details className="border border-bella-line bg-bella-white">
            <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 sm:px-8">
              <div>
                <p className="font-body text-xs uppercase tracking-[0.2em] text-bella-olive">
                  Restaurant details
                </p>

                <h2 className="mt-1 font-display text-2xl text-bella-charcoal">
                  Contact &amp; website information
                </h2>
              </div>

              <span className="font-body text-2xl text-bella-charcoal">+</span>
            </summary>

            {settings ? (
              <RestaurantSettingsForm
                restaurantName={settings.restaurantName}
                tagline={settings.tagline ?? ""}
                description={settings.description ?? ""}
                address={settings.address}
                phone={settings.phone}
                email={settings.email}
                instagramUrl={settings.instagramUrl ?? ""}
                facebookUrl={settings.facebookUrl ?? ""}
              />
            ) : (
              <div className="border-t border-bella-line p-6 sm:p-8">
                <p className="font-body text-sm text-bella-muted">
                  Restaurant settings have not been configured yet.
                </p>
              </div>
            )}
          </details>

          <details className="border border-bella-line bg-bella-white">
            <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 sm:px-8">
              <div>
                <p className="font-body text-xs uppercase tracking-[0.2em] text-bella-olive">
                  Opening hours
                </p>

                <h2 className="mt-1 font-display text-2xl text-bella-charcoal">
                  Weekly schedule
                </h2>
              </div>

              <span className="font-body text-2xl text-bella-charcoal">+</span>
            </summary>

            <div className="border-t border-bella-line p-6 sm:p-8">
              <div className="grid gap-x-8 sm:grid-cols-2">
                {orderedOpeningHours.map((day) => (
                  <OpeningHourEditForm
                    key={day.id}
                    id={day.id}
                    dayLabel={dayLabels[day.dayOfWeek]}
                    initialOpenTime={day.openTime ?? ""}
                    initialCloseTime={day.closeTime ?? ""}
                    initialIsClosed={day.isClosed}
                  />
                ))}
              </div>
            </div>
          </details>
        </div>
      </div>
    </main>
  );
}