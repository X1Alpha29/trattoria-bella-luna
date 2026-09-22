"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const allowedStatuses = [
  "PENDING",
  "CONFIRMED",
  "DECLINED",
  "CANCELLED",
  "COMPLETED",
] as const;

export async function updateReservationStatus(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const reservationId = formData.get("reservationId");
  const status = formData.get("status");

  if (
    typeof reservationId !== "string" ||
    typeof status !== "string" ||
    !allowedStatuses.includes(status as (typeof allowedStatuses)[number])
  ) {
    throw new Error("Invalid reservation update.");
  }

  await prisma.reservation.update({
    where: { id: reservationId },
    data: {
      status: status as (typeof allowedStatuses)[number],
    },
  });

  revalidatePath("/admin/reservations");
  revalidatePath("/admin");
}