"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const allowedStatuses = ["PENDING", "APPROVED", "REJECTED"] as const;

export async function updateReviewStatus(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const reviewId = formData.get("reviewId");
  const status = formData.get("status");

  if (
    typeof reviewId !== "string" ||
    typeof status !== "string" ||
    !allowedStatuses.includes(status as (typeof allowedStatuses)[number])
  ) {
    throw new Error("Invalid review update.");
  }

  await prisma.review.update({
    where: { id: reviewId },
    data: {
      status: status as (typeof allowedStatuses)[number],
    },
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/");
  revalidatePath("/admin");
}