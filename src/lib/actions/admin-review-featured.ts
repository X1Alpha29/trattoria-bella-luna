"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function updateReviewFeatured(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const reviewId = formData.get("reviewId");
  const isFeatured = formData.get("isFeatured");

  if (typeof reviewId !== "string" || typeof isFeatured !== "string") {
    throw new Error("Invalid review update.");
  }

  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    throw new Error("Review not found.");
  }

  const featured = isFeatured === "true";

  if (featured && review.status !== "APPROVED") {
    throw new Error("Only approved reviews can be featured.");
  }

  await prisma.review.update({
    where: { id: reviewId },
    data: {
      isFeatured: featured,
    },
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/");
  revalidatePath("/admin");
}