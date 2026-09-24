import Image from "next/image";
import Link from "next/link";
import { getGalleryImages } from "@/lib/gallery";
import Reveal from "./Reveal";

export default async function GallerySection() {
  const images = await getGalleryImages();

  if (images.length === 0) {
    return null;
  }

  const [featuredImage, ...secondaryImages] = images;

  return (
    <section
      id="gallery"
      className="overflow-hidden bg-bella-cream px-6 py-24 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="mb-5 font-body text-xs font-semibold uppercase tracking-[0.3em] text-bella-muted">
                A glimpse inside
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="max-w-3xl font-display text-5xl leading-[0.92] tracking-[-0.045em] text-bella-charcoal sm:text-6xl lg:text-8xl">
                Come for the food.
                <br />
                <span className="text-bella-olive">Stay for the feeling.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <Link
              href="/gallery"
              className="inline-flex w-fit border-b border-bella-charcoal pb-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-bella-charcoal transition-colors duration-300 hover:border-bella-terracotta hover:text-bella-terracotta"
            >
              View full gallery
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-12 lg:grid-rows-[280px_280px] lg:gap-5">
          {/* Featured image */}
          <Reveal className="lg:col-span-7 lg:row-span-2">
            <article className="group relative h-[420px] overflow-hidden sm:h-[560px] lg:h-[560px]">
              <Image
                src={featuredImage.url}
                alt={featuredImage.title}
                fill
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-bella-charcoal/70 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-7 text-bella-white sm:p-9">
                <p className="font-body text-[10px] uppercase tracking-[0.25em] text-bella-white/60">
                  {featuredImage.category}
                </p>

                <h3 className="mt-3 font-display text-3xl tracking-[-0.03em] sm:text-4xl">
                  {featuredImage.title}
                </h3>

                {featuredImage.caption && (
                  <p className="mt-2 max-w-md font-body text-sm leading-6 text-bella-white/70">
                    {featuredImage.caption}
                  </p>
                )}
              </div>
            </article>
          </Reveal>

          {/* Secondary images */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-5">
            {secondaryImages.slice(0, 2).map((image, index) => (
              <Reveal key={image.id} delay={0.1 + index * 0.1}>
                <article className="group relative h-[280px] overflow-hidden sm:h-[320px] lg:h-[280px]">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    sizes="(max-width: 1023px) 50vw, 42vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-bella-charcoal/65 via-transparent to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6 text-bella-white">
                    <p className="font-body text-[10px] uppercase tracking-[0.25em] text-bella-white/60">
                      {image.category}
                    </p>

                    <h3 className="mt-2 font-display text-2xl tracking-[-0.03em]">
                      {image.title}
                    </h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {images.length > 3 && (
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {images.slice(3, 6).map((image, index) => (
              <Reveal key={image.id} delay={0.1 + index * 0.05}>
                <article className="group relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    sizes="(max-width: 639px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-bella-charcoal/10 transition-colors duration-500 group-hover:bg-bella-charcoal/0" />
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}