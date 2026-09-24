import { getAdminStats } from "@/lib/admin";

export default async function AdminPage() {
  const stats = await getAdminStats();

  return (
    <main className="min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <div className="max-w-6xl">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-olive">
          Administration
        </p>

        <h1 className="mt-4 font-display text-5xl tracking-[-0.05em] text-bella-charcoal sm:text-6xl">
          Bella Luna Admin
        </h1>

        <p className="mt-6 max-w-2xl font-body text-base leading-7 text-bella-muted">
          Manage the restaurant website, reservations, menu, reviews and
          content from one place.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="border border-bella-line bg-bella-white p-7">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-bella-muted">
              Reservations
            </p>

            <p className="mt-4 font-display text-5xl text-bella-charcoal">
              {stats.pendingReservations}
            </p>

            <p className="mt-2 font-body text-sm text-bella-muted">
              Pending requests
            </p>
          </div>

          <div className="border border-bella-line bg-bella-white p-7">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-bella-muted">
              Reviews
            </p>

            <p className="mt-4 font-display text-5xl text-bella-charcoal">
              {stats.pendingReviews}
            </p>

            <p className="mt-2 font-body text-sm text-bella-muted">
              Awaiting approval
            </p>
          </div>

          <div className="border border-bella-line bg-bella-white p-7">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-bella-muted">
              Menu
            </p>

            <p className="mt-4 font-display text-5xl text-bella-charcoal">
              {stats.availableMenuItems}
            </p>

            <p className="mt-2 font-body text-sm text-bella-muted">
              Available dishes
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}