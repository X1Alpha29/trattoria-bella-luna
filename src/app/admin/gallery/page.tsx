import Image from "next/image";

import { getAdminGalleryImages } from "@/lib/admin";

export default async function AdminGalleryPage() {
  const images = await getAdminGalleryImages();

  return (
    <main className="min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <div className="max-w-7xl">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-olive">
          Administration
        </p>

        <h1 className="mt-4 font-display text-5xl tracking-[-0.05em] text-bella-charcoal sm:text-6xl">
          Gallery
        </h1>

        <p className="mt-6 max-w-2xl font-body text-base leading-7 text-bella-muted">
          Manage the images, captions and ordering used throughout the
          restaurant website.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <article
              key={image.id}
              className="overflow-hidden border border-bella-line bg-bella-white"
            >
              <div className="relative aspect-[4/3] bg-bella-cream-dark">
                <Image
                  src={image.url}
                  alt={image.title ?? "Bella Luna gallery image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl text-bella-charcoal">
                      {image.title ?? "Untitled"}
                    </h2>

                    <p className="mt-1 font-body text-xs uppercase tracking-[0.15em] text-bella-olive">
                      {image.category}
                    </p>
                  </div>

                  {image.isFeatured && (
                    <span className="border border-bella-olive/20 bg-bella-olive/10 px-3 py-1 font-body text-[10px] uppercase tracking-[0.12em] text-bella-olive">
                      Featured
                    </span>
                  )}
                </div>

                <p className="mt-4 font-body text-sm leading-6 text-bella-muted">
                  {image.caption ?? "No caption added."}
                </p>

                <p className="mt-4 font-body text-xs text-bella-muted">
                  Display order: {image.displayOrder}
                </p>
              </div>
            </article>
          ))}

          {images.length === 0 && (
            <div className="border border-bella-line bg-bella-white px-6 py-16 text-center sm:col-span-2 lg:col-span-3">
              <p className="font-body text-sm text-bella-muted">
                No gallery images have been added yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}