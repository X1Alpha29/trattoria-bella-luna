"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateReviewStatus } from "@/lib/actions/admin-review";

type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

type Props = {
  reviewId: string;
  currentStatus: ReviewStatus;
};

export default function ReviewStatusForm({
  reviewId,
  currentStatus,
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<ReviewStatus>(currentStatus);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();
    formData.set("reviewId", reviewId);
    formData.set("status", status);

    startTransition(async () => {
      await updateReviewStatus(formData);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <select
        value={status}
        onChange={(event) =>
          setStatus(event.target.value as ReviewStatus)
        }
        disabled={isPending}
        className="border border-bella-line bg-bella-cream px-3 py-2 font-body text-xs uppercase tracking-[0.1em] text-bella-charcoal outline-none disabled:opacity-50"
      >
        <option value="PENDING">Pending</option>
        <option value="APPROVED">Approved</option>
        <option value="REJECTED">Rejected</option>
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