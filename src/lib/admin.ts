import { prisma } from "@/lib/prisma";

export async function getAdminStats() {
  const [pendingReservations, pendingReviews, availableMenuItems] =
    await Promise.all([
      prisma.reservation.count({
        where: { status: "PENDING" },
      }),

      prisma.review.count({
        where: { status: "PENDING" },
      }),

      prisma.menuItem.count({
        where: { isAvailable: true },
      }),
    ]);

  return {
    pendingReservations,
    pendingReviews,
    availableMenuItems,
  };
}

export async function getAdminReservations() {
  return prisma.reservation.findMany({
    orderBy: [
      { reservationDate: "asc" },
      { reservationTime: "asc" },
    ],
  });
}

export async function getAdminReviews() {
  return prisma.review.findMany({
    orderBy: [
        { createdAt: "desc" },
        { id: "asc" },
        ],
  });
}

export async function getAdminGalleryImages() {
  return prisma.galleryImage.findMany({
    orderBy: [
      { displayOrder: "asc" },
      { id: "asc" },
    ],
  });
}
export async function getAdminMenu() {
  return prisma.menuCategory.findMany({
    orderBy: [
      { displayOrder: "asc" },
      { id: "asc" },
    ],
    include: {
      items: {
        orderBy: [
          { displayOrder: "asc" },
          { id: "asc" },
        ],
      },
    },
  });
}