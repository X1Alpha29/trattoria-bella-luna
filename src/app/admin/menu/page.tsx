import Image from "next/image";

import { getAdminMenu } from "@/lib/admin";
import MenuItemEditForm from "@/components/admin/MenuItemEditForm";
import MenuItemCreateForm from "@/components/admin/MenuItemCreateForm";
import MenuItemDeleteButton from "@/components/admin/MenuItemDeleteButton";
import MenuCategoryCreateForm from "@/components/admin/MenuCategoryCreateForm";

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
        <div className="mt-12">
          <MenuCategoryCreateForm />
        </div>

        <div className="mt-12">
          <MenuItemCreateForm
            categories={categories.map((category) => ({
              id: category.id,
              name: category.name,
            }))}
          />
        </div>

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

              <div className="space-y-3">
                {category.items.map((item) => (
                  <details
                    key={item.id}
                    className="border border-bella-line bg-bella-white"
                  >
                    <summary className="flex cursor-pointer list-none items-center gap-5 px-5 py-4 sm:px-6">
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-bella-cream-dark">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <span className="font-display text-2xl text-bella-muted/40">
                              {item.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-display text-xl text-bella-charcoal">
                            {item.name}
                          </h3>

                          <span
                            className={`border px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.1em] ${
                              item.isAvailable
                                ? "border-bella-olive/20 bg-bella-olive/10 text-bella-olive"
                                : "border-bella-line bg-bella-cream text-bella-muted"
                            }`}
                          >
                            {item.isAvailable ? "Available" : "Unavailable"}
                          </span>

                          {item.isFeatured && (
                            <span className="border border-bella-terracotta/20 bg-bella-terracotta/10 px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.1em] text-bella-terracotta">
                              Featured
                            </span>
                          )}
                        </div>

                        <p className="mt-1 font-body text-sm text-bella-muted">
                          {item.description || "No description added."}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-5">
                        <span className="font-body text-sm text-bella-charcoal">
                          £{item.price.toFixed(2)}
                        </span>

                        <span className="font-body text-xl text-bella-charcoal">
                          +
                        </span>
                      </div>
                    </summary>

                    <div className="border-t border-bella-line p-6 sm:p-8">
                      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                        <div className="relative aspect-[4/3] overflow-hidden bg-bella-cream-dark">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="280px"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <span className="font-display text-5xl text-bella-muted/40">
                                {item.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div>
                          <MenuItemEditForm
                            itemId={item.id}
                            initialName={item.name}
                            initialDescription={item.description ?? ""}
                            initialPrice={item.price.toFixed(2)}
                            initialImageUrl={item.imageUrl ?? ""}
                            initialDietaryTags={item.dietaryTags}
                            initialDisplayOrder={item.displayOrder}
                            initialIsAvailable={item.isAvailable}
                            initialIsFeatured={item.isFeatured}
                            initialFeaturedOrder={item.featuredOrder}
                          />

                          <div className="mt-3">
                            <MenuItemDeleteButton
                              itemId={item.id}
                              itemName={item.name}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>
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