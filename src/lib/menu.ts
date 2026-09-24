import { prisma } from "@/lib/prisma";

export type MenuItemView = {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string | null;
  dietaryTags: string[];
};

export type MenuCategoryView = {
  id: string;
  name: string;
  slug: string;
  items: MenuItemView[];
};

export async function getMenu(): Promise<MenuCategoryView[]> {
  const categories = await prisma.menuCategory.findMany({
    orderBy: {
      displayOrder: "asc",
    },
    include: {
      items: {
        where: {
          isAvailable: true,
        },
        orderBy: {
          displayOrder: "asc",
        },
      },
    },
  });

  return categories
    .filter((category) => category.items.length > 0)
    .map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      items: category.items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description ?? "",
        price: `£${item.price.toFixed(2)}`,
        imageUrl: item.imageUrl,
        dietaryTags: item.dietaryTags,
      })),
    }));
}

export async function getFeaturedDishes() {
  const dishes = await prisma.menuItem.findMany({
    where: {
      isAvailable: true,
      isFeatured: true,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      featuredOrder: "asc",
    },
    take: 3,
  });

  return dishes.map((dish) => ({
    id: dish.id,
    name: dish.name,
    description: dish.description ?? "",
    price: `£${dish.price.toFixed(2)}`,
    image: dish.imageUrl,
    category: dish.category.name,
  }));
}