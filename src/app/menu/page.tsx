import Link from "next/link";
import { getMenu } from "@/lib/menu";
import Reveal from "@/components/site/Reveal";

export const metadata = {
  title: "Menu | Trattoria Bella Luna",
  description:
    "Explore the seasonal Italian menu at Trattoria Bella Luna in London.",
};

export default async function MenuPage() {
  const categories = await getMenu();

  return (
    <main className="min-h-screen bg-bella-cream">
      {/* Header */}
      <section className="bg-bella-charcoal px-6 pb-20 pt-36 text-bella-cream lg:px-10 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Link
              href="/"
              className="font-body text-xs uppercase tracking-[0.2em] text-bella-cream/60 transition-colors hover:text-bella-cream"
            >
              ← Back to home
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-16 font-body text-xs font-semibold uppercase tracking-[0.3em] text-bella-cream/60">
              Our menu
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.9] tracking-[-0.055em] sm:text-7xl lg:text-9xl">
              Italian cooking,
              <br />
              <span className="text-bella-cream/55">simply done.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl font-body text-sm leading-7 text-bella-cream/70 sm:text-base">
              Seasonal ingredients, handmade pasta and time-honoured recipes
              with a contemporary London touch.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category navigation */}
      <div className="sticky top-0 z-30 border-b border-bella-line bg-bella-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6 py-5 lg:px-10">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.slug}`}
              className="shrink-0 font-body text-xs font-semibold uppercase tracking-[0.16em] text-bella-muted transition-colors hover:text-bella-charcoal"
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>

      {/* Menu */}
      <section className="px-6 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          {categories.map((category, categoryIndex) => (
            <section
              key={category.id}
              id={category.slug}
              className="scroll-mt-24 border-b border-bella-line py-16 first:pt-0 last:border-b-0"
            >
              <div className="grid gap-10 lg:grid-cols-[0.35fr_1fr]">
                <Reveal>
                  <div>
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-bella-muted">
                      {String(categoryIndex + 1).padStart(2, "0")}
                    </p>

                    <h2 className="mt-4 font-display text-5xl leading-none tracking-[-0.04em] text-bella-charcoal sm:text-6xl">
                      {category.name}
                    </h2>
                  </div>
                </Reveal>

                <div className="divide-y divide-bella-line">
                  {category.items.map((item, itemIndex) => (
                    <Reveal
                      key={item.id}
                      delay={Math.min(itemIndex * 0.05, 0.2)}
                    >
                      <article className="group py-8 first:pt-0 last:pb-0">
                        <div className="flex gap-6">
                          {item.imageUrl && (
                            <div
                              className="hidden h-28 w-28 shrink-0 overflow-hidden bg-bella-cream-dark sm:block"
                              style={{
                                backgroundImage: `url('${item.imageUrl}')`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            />
                          )}

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-6">
                              <div>
                                <h3 className="font-display text-2xl tracking-[-0.02em] text-bella-charcoal sm:text-3xl">
                                  {item.name}
                                </h3>

                                {item.dietaryTags.length > 0 && (
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {item.dietaryTags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="border border-bella-line px-2 py-1 font-body text-[9px] font-semibold uppercase tracking-[0.12em] text-bella-muted"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <span className="shrink-0 font-display text-2xl text-bella-charcoal">
                                {item.price}
                              </span>
                            </div>

                            <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-bella-muted">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="bg-bella-olive px-6 py-24 text-bella-cream lg:px-10 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-bella-cream/60">
                Join us
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[0.9] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
                Your table
                <br />
                <span className="text-bella-cream/60">is waiting.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <Link
              href="/reservations"
              className="inline-flex w-fit bg-bella-cream px-7 py-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-bella-charcoal transition-transform duration-300 hover:-translate-y-1"
            >
              Book a Table
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}