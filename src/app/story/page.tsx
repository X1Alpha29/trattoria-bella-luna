import Image from "next/image";

import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import Reveal from "@/components/site/Reveal";

export const metadata = {
  title: "Our Story | Trattoria Bella Luna",
  description:
    "Discover the story, philosophy and inspiration behind Trattoria Bella Luna.",
};

export default function StoryPage() {
  return (
    <>
      <main className="bg-bella-cream">
        <section className="relative min-h-[75vh] overflow-hidden bg-bella-charcoal">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=85"
              alt="Warm Italian restaurant interior"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="absolute inset-0 bg-bella-charcoal/55" />

          <Navbar />

          <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-7xl items-end px-6 pb-20 sm:px-10 lg:px-16 lg:pb-28">
            <div className="max-w-4xl text-bella-white">
              <Reveal>
                <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-cream/70">
                  Our Story
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="mt-5 font-display text-6xl leading-[0.9] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
                  Rooted in Italy.
                  <br />
                  Made for London.
                </h1>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[1fr_1.2fr] lg:gap-24 lg:px-16 lg:py-32">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85"
                alt="Italian food prepared with fresh ingredients"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>

          <div className="self-center">
            <Reveal>
              <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-olive">
                Where it began
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-5xl leading-[0.95] tracking-[-0.05em] text-bella-charcoal sm:text-6xl">
                Food that feels like home.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 space-y-5 font-body text-base leading-8 text-bella-muted">
                <p>
                  Bella Luna was born from a simple idea: bring the warmth,
                  generosity and character of an Italian trattoria to the
                  heart of London.
                </p>

                <p>
                  Our kitchen is inspired by the places where food is never
                  rushed and every meal is an excuse to stay a little longer.
                  We work with seasonal ingredients, handmade pasta and
                  recipes shaped by generations of Italian cooking.
                </p>

                <p>
                  The result is food that is familiar without being ordinary,
                  served in a space designed for long evenings, good
                  conversation and memorable moments.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-bella-olive text-bella-cream">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-24 lg:px-16 lg:py-28">
            <Reveal>
              <div>
                <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-cream/60">
                  Our philosophy
                </p>

                <h2 className="mt-5 font-display text-5xl leading-[0.95] tracking-[-0.05em] sm:text-6xl">
                  Keep it simple.
                  <br />
                  Do it beautifully.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-8 font-body text-base leading-8 text-bella-cream/75">
                <p>
                  We believe great Italian cooking does not need to hide behind
                  complexity. The best ingredients deserve attention, restraint
                  and time.
                </p>

                <p>
                  From handmade pasta to slowly prepared sauces, every dish is
                  built around balance, texture and honest flavour.
                </p>

                <p>
                  Our dining room follows the same philosophy: warm light,
                  natural textures and an atmosphere that feels elegant without
                  feeling formal.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-32">
          <Reveal>
            <div className="relative aspect-[16/8] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1800&q=85"
                alt="Atmosphere inside a contemporary Italian restaurant"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mx-auto mt-10 max-w-3xl text-center">
              <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-olive">
                Come as you are
              </p>

              <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-[-0.05em] text-bella-charcoal sm:text-6xl">
                Stay for the evening.
              </h2>

              <p className="mt-6 font-body text-base leading-7 text-bella-muted">
                Whether it is dinner for two, a celebration with friends or
                simply a craving for handmade pasta, Bella Luna is a place to
                slow down and enjoy the moment.
              </p>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}