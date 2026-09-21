import { prisma } from "@/lib/prisma";

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

  return dishes.flatMap((dish, index) => {
    if (!dish.imageUrl) {
      return [];
    }

    return [
      {
        id: dish.id,
        name: dish.name,
        description: dish.description ?? "",
        price: `£${dish.price.toFixed(2)}`,
        image: dish.imageUrl,
        category: dish.category.name,
        size: index === 0 ? "large" : "small",
      },
    ];
  });
}