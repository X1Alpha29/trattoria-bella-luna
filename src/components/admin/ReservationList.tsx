"use client";

import { useMemo, useState } from "react";

import ReservationStatusForm from "@/components/admin/ReservationStatusForm";

type ReservationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "DECLINED"
  | "CANCELLED"
  | "COMPLETED";

type Reservation = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  reservationDate: string;
  reservationTime: string;
  guestCount: number;
  specialRequests: string | null;
  status: ReservationStatus;
};

type Props = {
  reservations: Reservation[];
};

const statuses: ReservationStatus[] = [
  "PENDING",
  "CONFIRMED",
  "DECLINED",
  "CANCELLED",
  "COMPLETED",
];

export default function ReservationList({ reservations }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const filteredReservations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reservations.filter((reservation) => {
      const matchesSearch =
        !query ||
        reservation.customerName.toLowerCase().includes(query) ||
        reservation.email.toLowerCase().includes(query);

      const matchesStatus =
        status === "ALL" || reservation.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [reservations, search, status]);

  return (
    <>
      <div className="mt-12 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            placeholder="Search by customer or email..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="min-w-0 flex-1 border border-bella-line bg-bella-white px-4 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="border border-bella-line bg-bella-white px-4 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          >
            <option value="ALL">All statuses</option>

            {statuses.map((item) => (
              <option key={item} value={item}>
                {item.charAt(0) + item.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <p className="font-body text-xs text-bella-muted">
          Showing {filteredReservations.length} of {reservations.length}{" "}
          reservations.
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {filteredReservations.map((reservation) => (
          <details
            key={reservation.id}
            className="group border border-bella-line bg-bella-white"
          >
            <summary className="flex cursor-pointer list-none items-center gap-5 px-5 py-5 sm:px-6">
              <div className="w-24 shrink-0 border-r border-bella-line pr-5">
                <p className="font-display text-2xl leading-none text-bella-charcoal">
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                  }).format(new Date(reservation.reservationDate))}
                </p>

                <p className="mt-1 font-body text-[10px] uppercase tracking-[0.15em] text-bella-muted">
                  {new Intl.DateTimeFormat("en-GB", {
                    month: "short",
                  }).format(new Date(reservation.reservationDate))}
                </p>

                <p className="mt-2 font-body text-xs text-bella-olive">
                  {reservation.reservationTime}
                </p>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-body text-sm font-semibold text-bella-charcoal">
                    {reservation.customerName}
                  </h2>

                  <span className="font-body text-xs text-bella-muted">
                    {reservation.guestCount}{" "}
                    {reservation.guestCount === 1 ? "guest" : "guests"}
                  </span>
                </div>

                <p className="mt-1 truncate font-body text-sm text-bella-muted">
                  {reservation.email}
                </p>
              </div>

              <div className="hidden shrink-0 sm:block">
                <span className="border border-bella-line bg-bella-cream px-3 py-1 font-body text-[10px] uppercase tracking-[0.12em] text-bella-muted">
                  {reservation.status}
                </span>
              </div>

              <span className="shrink-0 font-body text-xl text-bella-charcoal transition-transform group-open:rotate-45">
                +
              </span>
            </summary>

            <div className="border-t border-bella-line bg-bella-cream/40 px-5 py-5 sm:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.15em] text-bella-muted">
                      Contact
                    </p>

                    <div className="mt-2 space-y-1">
                      <p className="font-body text-sm text-bella-charcoal">
                        {reservation.email}
                      </p>

                      <p className="font-body text-sm text-bella-charcoal">
                        {reservation.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.15em] text-bella-muted">
                      Reservation
                    </p>

                    <div className="mt-2 space-y-1">
                      <p className="font-body text-sm text-bella-charcoal">
                        {new Intl.DateTimeFormat("en-GB", {
                          weekday: "long",
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }).format(new Date(reservation.reservationDate))}
                      </p>

                      <p className="font-body text-sm text-bella-charcoal">
                        {reservation.reservationTime} ·{" "}
                        {reservation.guestCount}{" "}
                        {reservation.guestCount === 1 ? "guest" : "guests"}
                      </p>
                    </div>
                  </div>

                  {reservation.specialRequests && (
                    <div className="sm:col-span-2">
                      <p className="font-body text-[10px] uppercase tracking-[0.15em] text-bella-muted">
                        Special requests
                      </p>

                      <p className="mt-2 max-w-2xl font-body text-sm leading-6 text-bella-charcoal">
                        {reservation.specialRequests}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-bella-line pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                  <p className="mb-2 font-body text-[10px] uppercase tracking-[0.15em] text-bella-muted lg:hidden">
                    Status
                  </p>

                  <ReservationStatusForm
                    reservationId={reservation.id}
                    currentStatus={reservation.status}
                  />
                </div>
              </div>
            </div>
          </details>
        ))}

        {filteredReservations.length === 0 && (
          <div className="border border-bella-line bg-bella-white px-6 py-16 text-center">
            <p className="font-body text-sm text-bella-muted">
              No reservations match your search.
            </p>
          </div>
        )}
      </div>
    </>
  );
}