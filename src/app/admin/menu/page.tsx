import Image from "next/image";

import { getAdminMenu } from "@/lib/admin";

export default async function AdminMenuPage() {
  const categories = await getAdminMenu();

  return (
    <main className="min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <div className="max-w-7xl">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-olive">
          Administration
        </p>

        <h1 className="mt-4 font-display text-5xl tracking-[-0.05em] text-bella-charcoal sm:text-6xl">
          Menu
        </h1>

        <p className="mt-6 max-w-2xl font-body text-base leading-7 text-bella-muted">
          Manage dishes, pricing, availability and featured items displayed
          on the restaurant website.
        </p>

        <div className="mt-12 space-y-12">
          {categories.map((category) => (
            <section key={category.id}>
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-bella-olive">
                    Menu category
                  </p>

                  <h2 className="mt-2 font-display text-4xl tracking-[-0.04em] text-bella-charcoal">
                    {category.name}
                  </h2>
                </div>

                <p className="font-body text-sm text-bella-muted">
                  {category.items.length}{" "}
                  {category.items.length === 1 ? "dish" : "dishes"}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <article
                    key={item.id}
                    className="overflow-hidden border border-bella-line bg-bella-white"
                  >
                    <div className="relative aspect-[4/3] bg-bella-cream-dark">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="font-display text-4xl text-bella-muted/40">
                            {item.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-2xl text-bella-charcoal">
                          {item.name}
                        </h3>

                        <span className="shrink-0 font-body text-sm text-bella-charcoal">
                          £{item.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="mt-3 font-body text-sm leading-6 text-bella-muted">
                        {item.description ?? "No description added."}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <span
                          className={`border px-3 py-1 font-body text-[10px] uppercase tracking-[0.12em] ${
                            item.isAvailable
                              ? "border-bella-olive/20 bg-bella-olive/10 text-bella-olive"
                              : "border-bella-line bg-bella-cream text-bella-muted"
                          }`}
                        >
                          {item.isAvailable ? "Available" : "Unavailable"}
                        </span>

                        {item.isFeatured && (
                          <span className="border border-bella-terracotta/20 bg-bella-terracotta/10 px-3 py-1 font-body text-[10px] uppercase tracking-[0.12em] text-bella-terracotta">
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="mt-4 font-body text-xs text-bella-muted">
                        Display order: {item.displayOrder}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          {categories.length === 0 && (
            <div className="border border-bella-line bg-bella-white px-6 py-16 text-center">
              <p className="font-body text-sm text-bella-muted">
                No menu categories have been added yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}