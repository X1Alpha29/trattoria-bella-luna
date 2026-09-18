import Reveal from "./Reveal";

export default function ExperienceSection() {
  return (
    <section className="overflow-hidden bg-bella-olive px-6 py-24 text-bella-cream lg:px-10 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <Reveal className="relative">
            <div className="relative ml-0 aspect-[4/5] overflow-hidden sm:ml-10 lg:ml-16">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85')",
                }}
              />
            </div>

            <div className="absolute -bottom-8 left-0 hidden w-56 bg-bella-cream p-6 text-bella-charcoal sm:block">
              <p className="font-display text-4xl leading-none">
                From our
                <br />
                table to yours.
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="mb-5 font-body text-xs font-semibold uppercase tracking-[0.3em] text-bella-cream/60">
                The Bella Luna experience
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display text-5xl leading-[0.92] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
                More than
                <br />
                <span className="text-bella-cream/65">just dinner.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 max-w-lg font-body text-sm leading-7 text-bella-cream/70 sm:text-base">
                We believe the best meals are measured in more than courses.
                They are shared across a table, accompanied by conversation,
                good wine and the feeling that there is nowhere else you need
                to be.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 grid max-w-lg gap-6 border-t border-bella-cream/20 pt-6 sm:grid-cols-2">
                <div>
                  <p className="font-display text-3xl">Seasonal</p>
                  <p className="mt-2 font-body text-xs leading-5 text-bella-cream/60">
                    Ingredients selected around the seasons.
                  </p>
                </div>

                <div>
                  <p className="font-display text-3xl">Handmade</p>
                  <p className="mt-2 font-body text-xs leading-5 text-bella-cream/60">
                    Pasta and dishes prepared in our kitchen.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}