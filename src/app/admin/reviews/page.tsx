import { getAdminReviews } from "@/lib/admin";
import ReviewList from "@/components/admin/ReviewList";

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

        <ReviewList reviews={reviews} />
      </div>
    </main>
  );
}