"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateReviewFeatured } from "@/lib/actions/admin-review-featured";

type Props = {
  reviewId: string;
  initialIsFeatured: boolean;
  isApproved: boolean;
};

export default function ReviewFeaturedForm({
  reviewId,
  initialIsFeatured,
  isApproved,
}: Props) {
  const router = useRouter();

  const [isFeatured, setIsFeatured] = useState(initialIsFeatured);
  const [isPending, startTransition] = useTransition();

  function handleChange() {
    const nextValue = !isFeatured;
    setIsFeatured(nextValue);

    const formData = new FormData();
    formData.set("reviewId", reviewId);
    formData.set("isFeatured", String(nextValue));

    startTransition(async () => {
      try {
        await updateReviewFeatured(formData);
        router.refresh();
      } catch {
        setIsFeatured(initialIsFeatured);
      }
    });
  }

  return (
    <label className="flex items-center gap-2 font-body text-xs text-bella-charcoal">
      <input
        type="checkbox"
        checked={isFeatured}
        onChange={handleChange}
        disabled={isPending || !isApproved}
        className="h-4 w-4"
      />

      Featured
    </label>
  );
}