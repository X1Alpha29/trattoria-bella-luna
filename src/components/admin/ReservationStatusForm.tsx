"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateReservationStatus } from "@/lib/actions/admin-reservation";

type ReservationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "DECLINED"
  | "CANCELLED"
  | "COMPLETED";

type Props = {
  reservationId: string;
  currentStatus: ReservationStatus;
};

export default function ReservationStatusForm({
  reservationId,
  currentStatus,
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<ReservationStatus>(currentStatus);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();
    formData.set("reservationId", reservationId);
    formData.set("status", status);

    startTransition(async () => {
      await updateReservationStatus(formData);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <select
        name="status"
        value={status}
        onChange={(event) =>
          setStatus(event.target.value as ReservationStatus)
        }
        disabled={isPending}
        className="border border-bella-line bg-bella-cream px-3 py-2 font-body text-xs uppercase tracking-[0.1em] text-bella-charcoal outline-none disabled:opacity-50"
      >
        <option value="PENDING">Pending</option>
        <option value="CONFIRMED">Confirmed</option>
        <option value="DECLINED">Declined</option>
        <option value="CANCELLED">Cancelled</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <button
        type="submit"
        disabled={isPending}
        className="bg-bella-charcoal px-4 py-2 font-body text-xs uppercase tracking-[0.1em] text-bella-cream transition hover:bg-bella-olive disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}