import { getAdminReservations } from "@/lib/admin";
import ReservationFilters from "@/components/admin/ReservationFilters";

export default async function AdminReservationsPage() {
  const reservations = await getAdminReservations();

  const serializedReservations = reservations.map((reservation) => ({
    ...reservation,
    reservationDate: reservation.reservationDate.toISOString(),
  }));

  return (
    <main className="min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <div className="max-w-7xl">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-olive">
          Administration
        </p>

        <h1 className="mt-4 font-display text-5xl tracking-[-0.05em] text-bella-charcoal sm:text-6xl">
          Reservations
        </h1>

        <p className="mt-6 max-w-2xl font-body text-base leading-7 text-bella-muted">
          View incoming table requests and manage their booking status.
        </p>

        <ReservationFilters reservations={serializedReservations} />
      </div>
    </main>
  );
}