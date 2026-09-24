import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import Reveal from "@/components/site/Reveal";
import { getAllGalleryImages } from "@/lib/gallery";

export const metadata = {
  title: "Gallery | Trattoria Bella Luna",
  description:
    "A glimpse into the food, interiors and memorable moments of Trattoria Bella Luna.",
};

export default async function GalleryPage() {
  const images = await getAllGalleryImages();

  return (
    <>
      <main className="bg-bella-cream">
        <section className="border-b border-bella-line">
          <Navbar />

          <div className="mx-auto max-w-7xl px-6 pb-20 pt-24 sm:px-10 lg:px-16 lg:pb-28 lg:pt-32">
            <Reveal>
              <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-olive">
                Bella Luna
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.9] tracking-[-0.05em] text-bella-charcoal sm:text-7xl lg:text-8xl">
                A taste of the
                <br />
                Bella Luna experience.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 max-w-2xl font-body text-base leading-7 text-bella-muted sm:text-lg">
                Explore the dishes, spaces and moments that make Bella Luna
                more than just dinner.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <Reveal key={image.id} delay={Math.min(index * 0.05, 0.2)}>
                <article
                  className={`group overflow-hidden ${
                    index % 5 === 0 ? "lg:col-span-2" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden bg-bella-cream-dark ${
                      index % 5 === 0
                        ? "aspect-[16/10]"
                        : "aspect-[4/5]"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                      sizes={
                        index % 5 === 0
                          ? "(max-width: 1024px) 100vw, 66vw"
                          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      }
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bella-charcoal/70 to-transparent p-6 pt-20">
                      <p className="font-body text-[10px] uppercase tracking-[0.2em] text-bella-cream/70">
                        {image.category}
                      </p>

                      <h2 className="mt-2 font-display text-2xl text-bella-white">
                        {image.title}
                      </h2>

                      {image.caption && (
                        <p className="mt-2 max-w-lg font-body text-sm leading-6 text-bella-cream/80">
                          {image.caption}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {images.length === 0 && (
            <div className="border border-bella-line py-20 text-center">
              <p className="font-body text-sm text-bella-muted">
                Our gallery is being prepared.
              </p>
            </div>
          )}

          <div className="mt-20 text-center">
            <Link
              href="/reservations"
              className="inline-block bg-bella-charcoal px-8 py-4 font-body text-xs uppercase tracking-[0.18em] text-bella-cream transition hover:bg-bella-olive"
            >
              Book a Table
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}