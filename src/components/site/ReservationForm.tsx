"use client";

import { useActionState } from "react";
import {
  createReservation,
  type ReservationActionState,
} from "@/lib/actions/reservation";

const initialState: ReservationActionState = {
  success: false,
  message: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-2 font-body text-xs text-bella-terracotta">
      {message}
    </p>
  );
}

export default function ReservationForm() {
  const [state, formAction, isPending] = useActionState(
    createReservation,
    initialState,
  );

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  return (
    <form action={formAction} className="space-y-8">
      {state.message && (
        <div
          className={`border p-4 font-body text-sm ${
            state.success
              ? "border-bella-olive/30 bg-bella-olive/10 text-bella-olive-dark"
              : "border-bella-terracotta/30 bg-bella-terracotta/10 text-bella-terracotta"
          }`}
          role="status"
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="customerName"
            className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-bella-charcoal"
          >
            Name
          </label>

          <input
            id="customerName"
            name="customerName"
            type="text"
            autoComplete="name"
            required
            className="mt-3 w-full border-b border-bella-line bg-transparent px-0 py-3 font-body text-sm text-bella-charcoal outline-none transition-colors placeholder:text-bella-muted/60 focus:border-bella-charcoal"
            placeholder="Your name"
          />

          <FieldError message={state.errors?.customerName?.[0]} />
        </div>

        <div>
          <label
            htmlFor="email"
            className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-bella-charcoal"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-3 w-full border-b border-bella-line bg-transparent px-0 py-3 font-body text-sm text-bella-charcoal outline-none transition-colors placeholder:text-bella-muted/60 focus:border-bella-charcoal"
            placeholder="you@example.com"
          />

          <FieldError message={state.errors?.email?.[0]} />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-bella-charcoal"
          >
            Phone
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className="mt-3 w-full border-b border-bella-line bg-transparent px-0 py-3 font-body text-sm text-bella-charcoal outline-none transition-colors placeholder:text-bella-muted/60 focus:border-bella-charcoal"
            placeholder="+44 ..."
          />

          <FieldError message={state.errors?.phone?.[0]} />
        </div>

        <div>
          <label
            htmlFor="guestCount"
            className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-bella-charcoal"
          >
            Guests
          </label>

          <select
            id="guestCount"
            name="guestCount"
            defaultValue="2"
            required
            className="mt-3 w-full border-b border-bella-line bg-transparent px-0 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-charcoal"
          >
            {Array.from({ length: 12 }, (_, index) => index + 1).map(
              (number) => (
                <option key={number} value={number}>
                  {number} {number === 1 ? "guest" : "guests"}
                </option>
              ),
            )}
          </select>

          <FieldError message={state.errors?.guestCount?.[0]} />
        </div>

        <div>
          <label
            htmlFor="reservationDate"
            className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-bella-charcoal"
          >
            Date
          </label>

          <input
            id="reservationDate"
            name="reservationDate"
            type="date"
            min={minDate}
            required
            className="mt-3 w-full border-b border-bella-line bg-transparent px-0 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-charcoal"
          />

          <FieldError message={state.errors?.reservationDate?.[0]} />
        </div>

        <div>
          <label
            htmlFor="reservationTime"
            className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-bella-charcoal"
          >
            Time
          </label>

          <select
            id="reservationTime"
            name="reservationTime"
            defaultValue=""
            required
            className="mt-3 w-full border-b border-bella-line bg-transparent px-0 py-3 font-body text-sm text-bella-charcoal outline-none focus:border-bella-charcoal"
          >
            <option value="" disabled>
              Select a time
            </option>
            {[
              "18:00",
              "18:30",
              "19:00",
              "19:30",
              "20:00",
              "20:30",
              "21:00",
              "21:30",
              "22:00",
            ].map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          <FieldError message={state.errors?.reservationTime?.[0]} />
        </div>
      </div>

      <div>
        <label
          htmlFor="specialRequests"
          className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-bella-charcoal"
        >
          Special requests
        </label>

        <textarea
          id="specialRequests"
          name="specialRequests"
          rows={4}
          className="mt-3 w-full resize-none border border-bella-line bg-transparent p-4 font-body text-sm text-bella-charcoal outline-none transition-colors placeholder:text-bella-muted/60 focus:border-bella-charcoal"
          placeholder="Allergies, celebrations, accessibility requirements..."
        />

        <FieldError message={state.errors?.specialRequests?.[0]} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-w-48 items-center justify-center bg-bella-charcoal px-7 py-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-bella-cream transition-all duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Sending..." : "Request a Table"}
      </button>

      <p className="font-body text-xs leading-5 text-bella-muted">
        Your reservation is a request and is subject to confirmation by the
        restaurant.
      </p>
    </form>
  );
}