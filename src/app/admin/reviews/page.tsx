import { getAdminReviews } from "@/lib/admin";

export default async function AdminReviewsPage() {
  const reviews = await getAdminReviews();

  return (
    <main className="min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <div className="max-w-7xl">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-olive">
          Administration
        </p>

        <h1 className="mt-4 font-display text-5xl tracking-[-0.05em] text-bella-charcoal sm:text-6xl">
          Reviews
        </h1>

        <p className="mt-6 max-w-2xl font-body text-base leading-7 text-bella-muted">
          Review customer feedback and manage which testimonials appear on
          the website.
        </p>

        <div className="mt-12 overflow-x-auto border border-bella-line bg-bella-white">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="border-b border-bella-line">
                <th className="px-6 py-4 font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
                  Customer
                </th>

                <th className="px-6 py-4 font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
                  Rating
                </th>

                <th className="px-6 py-4 font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
                  Review
                </th>

                <th className="px-6 py-4 font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
                  Staff
                </th>

                <th className="px-6 py-4 font-body text-xs uppercase tracking-[0.15em] text-bella-muted">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review) => (
                <tr
                  key={review.id}
                  className="border-b border-bella-line last:border-b-0"
                >
                  <td className="px-6 py-5 font-body text-sm text-bella-charcoal">
                    {review.customerName}
                  </td>

                  <td className="px-6 py-5 font-body text-sm text-bella-charcoal">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </td>

                  <td className="max-w-md px-6 py-5 font-body text-sm leading-6 text-bella-muted">
                    {review.comment}
                  </td>

                  <td className="px-6 py-5 font-body text-sm text-bella-charcoal">
                    {review.teamMember?.name ?? "—"}
                  </td>

                  <td className="px-6 py-5">
                    <span className="inline-block border border-bella-line bg-bella-cream px-3 py-1 font-body text-xs uppercase tracking-[0.12em] text-bella-charcoal">
                      {review.status}
                    </span>
                  </td>
                </tr>
              ))}

              {reviews.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center font-body text-sm text-bella-muted"
                  >
                    No reviews have been submitted yet.
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