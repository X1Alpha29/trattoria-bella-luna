import Link from "next/link";
import { getFeaturedDishes } from "@/lib/menu";
import Reveal from "./Reveal";

export default async function FeaturedDishes() {
  const dishes = await getFeaturedDishes();

  if (dishes.length === 0) {
    return null;
  }

  const featuredDish = dishes[0];
  const secondaryDishes = dishes.slice(1);

  return (
    <section
      id="menu"
      className="bg-bella-cream px-6 py-24 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="mb-5 font-body text-xs font-semibold uppercase tracking-[0.3em] text-bella-muted">
                From our kitchen
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="max-w-3xl font-display text-5xl leading-[0.92] tracking-[-0.045em] text-bella-charcoal sm:text-6xl lg:text-8xl">
                Made slowly.
                <br />
                <span className="text-bella-olive">Enjoyed fully.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <Link
              href="/menu"
              className="inline-flex w-fit border-b border-bella-charcoal pb-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-bella-charcoal transition-colors duration-300 hover:border-bella-terracotta hover:text-bella-terracotta"
            >
              Explore full menu
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Featured dish */}
          <Reveal>
            <article className="group relative aspect-[4/5] overflow-hidden bg-bella-olive">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url('${featuredDish.image}')`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-bella-charcoal/80 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-8 text-bella-white sm:p-10">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p className="mb-3 font-body text-[10px] uppercase tracking-[0.24em] text-bella-white/60">
                      {featuredDish.category}
                    </p>

                    <h3 className="font-display text-4xl tracking-[-0.03em] sm:text-5xl">
                      {featuredDish.name}
                    </h3>

                    <p className="mt-3 max-w-md font-body text-sm leading-6 text-bella-white/75">
                      {featuredDish.description}
                    </p>
                  </div>

                  <span className="shrink-0 font-display text-3xl">
                    {featuredDish.price}
                  </span>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Secondary dishes */}
          <div className="grid gap-6">
            {secondaryDishes.map((dish, index) => (
              <Reveal key={dish.id} delay={0.1 + index * 0.1}>
                <article className="group grid overflow-hidden bg-bella-cream-dark sm:grid-cols-2">
                  <div className="relative min-h-72 overflow-hidden">
                    {dish.image && (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{
                          backgroundImage: `url('${dish.image}')`,
                        }}
                      />
                    )}
                  </div>

                  <div className="flex flex-col justify-between p-7 sm:p-8">
                    <div>
                      <p className="font-body text-[10px] uppercase tracking-[0.24em] text-bella-muted">
                        {dish.category}
                      </p>

                      <h3 className="mt-4 font-display text-3xl leading-tight tracking-[-0.03em] text-bella-charcoal">
                        {dish.name}
                      </h3>

                      <p className="mt-4 font-body text-sm leading-6 text-bella-muted">
                        {dish.description}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-bella-line pt-5">
                      <span className="font-body text-xs uppercase tracking-[0.16em] text-bella-muted">
                        Chef&apos;s selection
                      </span>

                      <span className="font-display text-2xl text-bella-charcoal">
                        {dish.price}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}