import Reveal from "./Reveal";

export default function IntroSection() {
  return (
    <section
      id="story"
      className="overflow-hidden bg-bella-cream px-6 py-24 lg:px-10 lg:py-36"
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=85')",
              }}
            />
          </div>

          <div className="absolute -bottom-6 -right-4 hidden w-40 border border-bella-cream bg-bella-olive p-5 text-bella-cream sm:block lg:-right-8">
            <p className="font-display text-4xl leading-none">15</p>
            <p className="mt-2 font-body text-[10px] uppercase tracking-[0.2em]">
              Years of Italian tradition
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-5 font-body text-xs font-semibold uppercase tracking-[0.3em] text-bella-muted">
              Our story
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="max-w-3xl font-display text-5xl leading-[0.92] tracking-[-0.045em] text-bella-charcoal sm:text-6xl lg:text-8xl">
              Simple ingredients.
              <br />
              <span className="text-bella-olive">Beautiful moments.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 max-w-xl space-y-5 font-body text-sm leading-7 text-bella-muted sm:text-base">
              <p>
                Trattoria Bella Luna was born from a love of generous Italian
                cooking, seasonal ingredients and long evenings around the
                table.
              </p>

              <p>
                Our kitchen brings together familiar recipes and modern
                technique, using carefully selected ingredients to create food
                that feels both authentic and distinctly our own.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-8 border-t border-bella-line pt-6 sm:grid-cols-3">
              <div>
                <p className="font-display text-3xl text-bella-charcoal">
                  2011
                </p>
                <p className="mt-1 font-body text-[10px] uppercase tracking-[0.18em] text-bella-muted">
                  Established
                </p>
              </div>

              <div>
                <p className="font-display text-3xl text-bella-charcoal">
                  100%
                </p>
                <p className="mt-1 font-body text-[10px] uppercase tracking-[0.18em] text-bella-muted">
                  Italian spirit
                </p>
              </div>

              <div>
                <p className="font-display text-3xl text-bella-charcoal">
                  London
                </p>
                <p className="mt-1 font-body text-[10px] uppercase tracking-[0.18em] text-bella-muted">
                  Our home
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}