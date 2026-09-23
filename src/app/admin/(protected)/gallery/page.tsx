import Image from "next/image";

import { getAdminGalleryImages } from "@/lib/admin";
import GalleryEditForm from "@/components/admin/GalleryEditForm";
import GalleryCreateForm from "@/components/admin/GalleryCreateForm";

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
          Manage the photography used throughout the restaurant website.
        </p>

        <div className="mt-12">
          <GalleryCreateForm />
        </div>

        <div className="mt-10 border border-bella-line bg-bella-white">
          <div className="hidden border-b border-bella-line px-6 py-3 sm:grid sm:grid-cols-[88px_1fr_140px_80px_28px] sm:items-center sm:gap-5">
            <span className="font-body text-[10px] uppercase tracking-[0.15em] text-bella-muted">
              Image
            </span>

            <span className="font-body text-[10px] uppercase tracking-[0.15em] text-bella-muted">
              Details
            </span>

            <span className="font-body text-[10px] uppercase tracking-[0.15em] text-bella-muted">
              Category
            </span>

            <span className="font-body text-[10px] uppercase tracking-[0.15em] text-bella-muted">
              Order
            </span>

            <span />
          </div>

          {images.map((image) => (
            <details
              key={image.id}
              className="group border-b border-bella-line last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 px-4 py-4 sm:grid sm:grid-cols-[88px_1fr_140px_80px_28px] sm:gap-5 sm:px-6">
                <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-bella-cream-dark sm:h-16 sm:w-[88px]">
                  <Image
                    src={image.url}
                    alt={image.title ?? "Bella Luna gallery image"}
                    fill
                    className="object-cover"
                    sizes="88px"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-xl text-bella-charcoal">
                      {image.title ?? "Untitled"}
                    </h2>

                    {image.isFeatured && (
                      <span className="border border-bella-olive/20 bg-bella-olive/10 px-2.5 py-1 font-body text-[9px] uppercase tracking-[0.1em] text-bella-olive">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="mt-1 truncate font-body text-sm text-bella-muted">
                    {image.caption || "No caption added."}
                  </p>
                </div>

                <span className="hidden font-body text-xs uppercase tracking-[0.1em] text-bella-muted sm:block">
                  {image.category}
                </span>

                <span className="hidden font-body text-sm text-bella-charcoal sm:block">
                  {image.displayOrder}
                </span>

                <span className="shrink-0 font-body text-xl text-bella-charcoal transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>

              <div className="border-t border-bella-line bg-bella-cream/40 px-4 py-6 sm:px-6 sm:py-8">
                <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-bella-cream-dark">
                    <Image
                      src={image.url}
                      alt={image.title ?? "Bella Luna gallery image"}
                      fill
                      className="object-cover"
                      sizes="280px"
                    />
                  </div>

                  <GalleryEditForm
                    imageId={image.id}
                    initialTitle={image.title ?? ""}
                    initialCaption={image.caption ?? ""}
                    initialCategory={image.category}
                    initialDisplayOrder={image.displayOrder}
                    initialIsFeatured={image.isFeatured}
                  />
                </div>
              </div>
            </details>
          ))}

          {images.length === 0 && (
            <div className="px-6 py-16 text-center">
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