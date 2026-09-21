import { getFeaturedReviews } from "@/lib/reviews";
import Reveal from "./Reveal";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-1"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={index < rating ? "text-bella-terracotta" : "text-bella-line"}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default async function ReviewsSection() {
  const reviews = await getFeaturedReviews();

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="bg-bella-cream px-6 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-bella-muted">
                From our guests
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-5 max-w-xl font-display text-5xl leading-[0.92] tracking-[-0.045em] text-bella-charcoal sm:text-6xl lg:text-8xl">
                Good food.
                <br />
                <span className="text-bella-olive">Good company.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md font-body text-sm leading-7 text-bella-muted sm:text-base">
                A restaurant is built around the people who walk through its
                doors. Here&apos;s what some of our guests have to say.
              </p>
            </Reveal>
          </div>

          <div className="grid border-t border-bella-line">
            {reviews.map((review, index) => (
              <Reveal key={review.id} delay={0.1 + index * 0.1}>
                <article className="border-b border-bella-line py-8 sm:py-10">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <Stars rating={review.rating} />

                    <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-bella-muted">
                      Guest review
                    </p>
                  </div>

                  <blockquote className="mt-6 max-w-3xl font-display text-3xl leading-[1.05] tracking-[-0.03em] text-bella-charcoal sm:text-4xl">
                    &ldquo;{review.comment}&rdquo;
                  </blockquote>

                  <p className="mt-6 font-body text-xs font-semibold uppercase tracking-[0.16em] text-bella-muted">
                    {review.customerName}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}