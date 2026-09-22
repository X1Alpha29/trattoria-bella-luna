import { getAdminReservations } from "@/lib/admin";
import { updateReservationStatus } from "@/lib/actions/admin-reservation";
import ReservationStatusForm from "@/components/admin/ReservationStatusForm";

export default async function AdminReservationsPage() {
  const reservations = await getAdminReservations();

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
          View and manage table reservation requests from your customers.
        </p>

        <div className="mt-12 overflow-x-auto border border-bella-line bg-bella-white">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-bella-line">
                <th className="px-6 py-4 font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
                  Customer
                </th>

                <th className="px-6 py-4 font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
                  Date
                </th>

                <th className="px-6 py-4 font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
                  Time
                </th>

                <th className="px-6 py-4 font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
                  Guests
                </th>

                <th className="px-6 py-4 font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="border-b border-bella-line last:border-b-0"
                >
                  <td className="px-6 py-5">
                    <p className="font-body text-sm font-medium text-bella-charcoal">
                      {reservation.customerName}
                    </p>

                    <p className="mt-1 font-body text-xs text-bella-muted">
                      {reservation.email}
                    </p>

                    <p className="mt-1 font-body text-xs text-bella-muted">
                      {reservation.phone}
                    </p>
                  </td>

                  <td className="px-6 py-5 font-body text-sm text-bella-charcoal">
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).format(reservation.reservationDate)}
                  </td>

                  <td className="px-6 py-5 font-body text-sm text-bella-charcoal">
                    {reservation.reservationTime}
                  </td>

                  <td className="px-6 py-5 font-body text-sm text-bella-charcoal">
                    {reservation.guestCount}
                  </td>

                  <td className="px-6 py-5">
                    <ReservationStatusForm
                        reservationId={reservation.id}
                        currentStatus={reservation.status}
                        />
                  </td>
                </tr>
              ))}

              {reservations.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center font-body text-sm text-bella-muted"
                  >
                    No reservations have been submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}