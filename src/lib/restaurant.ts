import { prisma } from "@/lib/prisma";

export async function getRestaurantSettings() {
  return prisma.restaurantSettings.findFirst();
}

export async function getOpeningHours() {
  return prisma.openingHour.findMany({
    orderBy: {
      dayOfWeek: "asc",
    },
  });
}