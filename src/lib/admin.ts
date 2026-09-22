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
    include: {
      teamMember: {
        select: {
          name: true,
        },
      },
    },
    orderBy: [
        { createdAt: "desc" },
        { id: "asc" },
        ],
  });
}