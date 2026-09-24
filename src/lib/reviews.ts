import { prisma } from "@/lib/prisma";

export type ReviewView = {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
};

export async function getFeaturedReviews(): Promise<ReviewView[]> {
  const reviews = await prisma.review.findMany({
    where: {
      status: "APPROVED",
      isFeatured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return reviews.map((review) => ({
    id: review.id,
    customerName: review.customerName,
    rating: review.rating,
    comment: review.comment,
  }));
}