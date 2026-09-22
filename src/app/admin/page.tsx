import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-bella-cream px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-olive">
          Administration
        </p>

        <h1 className="mt-4 font-display text-6xl tracking-[-0.05em] text-bella-charcoal">
          Bella Luna Admin
        </h1>

        <p className="mt-6 max-w-2xl font-body text-bella-muted">
          Manage the restaurant website content, reservations, reviews, gallery,
          team members and restaurant settings.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Menu", "/admin/menu"],
            ["Reservations", "/admin/reservations"],
            ["Reviews", "/admin/reviews"],
            ["Gallery", "/admin/gallery"],
            ["Team", "/admin/team"],
            ["Settings", "/admin/settings"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="border border-bella-line bg-bella-white p-8 transition hover:-translate-y-1 hover:border-bella-olive"
            >
              <span className="font-display text-3xl text-bella-charcoal">
                {label}
              </span>
              <span className="mt-3 block font-body text-sm text-bella-muted">
                Manage {label.toLowerCase()}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}