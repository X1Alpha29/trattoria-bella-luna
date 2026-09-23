import { getAdminReviews } from "@/lib/admin";
import ReviewStatusForm from "@/components/admin/ReviewStatusForm";
import ReviewFeaturedForm from "@/components/admin/ReviewFeaturedForm";

export default async function AdminReviewsPage() {
  const reviews = await getAdminReviews();

  return (
    <main className="min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <div className="max-w-6xl">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-olive">
          Administration
        </p>

        <h1 className="mt-4 font-display text-5xl tracking-[-0.05em] text-bella-charcoal sm:text-6xl">
          Reviews
        </h1>

        <p className="mt-6 max-w-2xl font-body text-base leading-7 text-bella-muted">
          Moderate customer feedback and choose which testimonials appear on
          the website.
        </p>

        <div className="mt-12 space-y-3">
          {reviews.map((review) => (
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

          {reviews.length === 0 && (
            <div className="border border-bella-line bg-bella-white px-6 py-16 text-center">
              <p className="font-body text-sm text-bella-muted">
                No reviews have been submitted yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}