"use client";

import { useMemo, useState } from "react";

import ReviewStatusForm from "@/components/admin/ReviewStatusForm";
import ReviewFeaturedForm from "@/components/admin/ReviewFeaturedForm";

type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

type Review = {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  isFeatured: boolean;
};

type Props = {
  reviews: Review[];
};

export default function ReviewList({ reviews }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const filteredReviews = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reviews.filter((review) => {
      const matchesSearch =
        !query ||
        review.customerName.toLowerCase().includes(query) ||
        review.comment.toLowerCase().includes(query);

      const matchesStatus =
        status === "ALL" || review.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [reviews, search, status]);

  return (
    <>
      <div className="mt-12 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            placeholder="Search by customer or review..."
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
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <p className="font-body text-xs text-bella-muted">
          Showing {filteredReviews.length} of {reviews.length} reviews.
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {filteredReviews.map((review) => (
          <article
            key={review.id}
            className="border border-bella-line bg-bella-white"
          >
            <div className="grid gap-4 px-5 py-5 lg:grid-cols-[180px_1fr_auto] lg:items-center lg:px-6">
              <div>
                <h2 className="font-body text-sm font-semibold text-bella-charcoal">
                  {review.customerName}
                </h2>

                <div className="mt-1 font-body text-sm text-bella-charcoal">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>

              <p className="line-clamp-2 font-body text-sm leading-6 text-bella-muted">
                “{review.comment}”
              </p>

              <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                <ReviewStatusForm
                  reviewId={review.id}
                  currentStatus={review.status}
                />

                <ReviewFeaturedForm
                  reviewId={review.id}
                  initialIsFeatured={review.isFeatured}
                  isApproved={review.status === "APPROVED"}
                />
              </div>
            </div>
          </article>
        ))}

        {filteredReviews.length === 0 && (
          <div className="border border-bella-line bg-bella-white px-6 py-16 text-center">
            <p className="font-body text-sm text-bella-muted">
              No reviews match your search.
            </p>
          </div>
        )}
      </div>
    </>
  );
}