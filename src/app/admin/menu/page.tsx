import Image from "next/image";

import { getAdminMenu } from "@/lib/admin";
import MenuItemEditForm from "@/components/admin/MenuItemEditForm";
import MenuItemCreateForm from "@/components/admin/MenuItemCreateForm";

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