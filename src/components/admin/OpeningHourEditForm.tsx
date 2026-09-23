"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateOpeningHour } from "@/lib/actions/admin-settings";

type Props = {
  id: string;
  dayLabel: string;
  initialOpenTime: string;
  initialCloseTime: string;
  initialIsClosed: boolean;
};

export default function OpeningHourEditForm({
  id,
  dayLabel,
  initialOpenTime,
  initialCloseTime,
  initialIsClosed,
}: Props) {
  const router = useRouter();

  const [openTime, setOpenTime] = useState(initialOpenTime);
  const [closeTime, setCloseTime] = useState(initialCloseTime);
  const [isClosed, setIsClosed] = useState(initialIsClosed);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(false);

    const formData = new FormData();
    formData.set("id", id);
    formData.set("openTime", openTime);
    formData.set("closeTime", closeTime);
    formData.set("isClosed", String(isClosed));

    startTransition(async () => {
      await updateOpeningHour(formData);
      setSaved(true);
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-b border-bella-line py-3 last:border-b-0"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-body text-sm font-medium text-bella-charcoal">
          {dayLabel}
        </p>

        <label className="flex items-center gap-2 font-body text-xs text-bella-muted">
          <input
            type="checkbox"
            checked={isClosed}
            onChange={(event) => setIsClosed(event.target.checked)}
            disabled={isPending}
            className="h-4 w-4"
          />
          Closed
        </label>
      </div>

      <div className="mt-2 flex items-end gap-2">
        <div className="min-w-0 flex-1">
          <label
            htmlFor={`open-${id}`}
            className="block font-body text-[9px] uppercase tracking-[0.12em] text-bella-muted"
          >
            Opens
          </label>

          <input
            id={`open-${id}`}
            type="time"
            value={openTime}
            onChange={(event) => setOpenTime(event.target.value)}
            disabled={isPending || isClosed}
            className="mt-1 w-full border border-bella-line bg-bella-cream px-2 py-1.5 font-body text-xs text-bella-charcoal outline-none focus:border-bella-olive disabled:opacity-50"
          />
        </div>

        <div className="min-w-0 flex-1">
          <label
            htmlFor={`close-${id}`}
            className="block font-body text-[9px] uppercase tracking-[0.12em] text-bella-muted"
          >
            Closes
          </label>

          <input
            id={`close-${id}`}
            type="time"
            value={closeTime}
            onChange={(event) => setCloseTime(event.target.value)}
            disabled={isPending || isClosed}
            className="mt-1 w-full border border-bella-line bg-bella-cream px-2 py-1.5 font-body text-xs text-bella-charcoal outline-none focus:border-bella-olive disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="shrink-0 bg-bella-charcoal px-3 py-2 font-body text-[10px] uppercase tracking-[0.1em] text-bella-cream transition hover:bg-bella-olive disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "..." : saved ? "Saved" : "Save"}
        </button>
      </div>
    </form>
  );
}