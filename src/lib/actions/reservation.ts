"use server";

import { prisma } from "@/lib/prisma";
import { reservationSchema } from "@/lib/validations/reservation";

export type ReservationActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function createReservation(
  _previousState: ReservationActionState,
  formData: FormData,
): Promise<ReservationActionState> {
  const rawData = {
  customerName: formData.get("customerName"),
  email: formData.get("email"),
  phone: formData.get("phone"),
  reservationDate: formData.get("reservationDate"),
  reservationTime: formData.get("reservationTime"),
  guestCount: formData.get("guestCount"),
  specialRequests: formData.get("specialRequests") || undefined,
  };

  const result = reservationSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: "Please check the form and correct the highlighted fields.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const {
    customerName,
    email,
    phone,
    reservationDate,
    reservationTime,
    guestCount,
    specialRequests,
  } = result.data;

  const parsedDate = new Date(`${reservationDate}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return {
      success: false,
      message: "Please select a valid reservation date.",
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (parsedDate < today) {
    return {
      success: false,
      message: "Please select a future date.",
    };
  }

  try {
    await prisma.reservation.create({
      data: {
        customerName,
        email,
        phone,
        reservationDate: parsedDate,
        reservationTime,
        guestCount,
        specialRequests: specialRequests || null,
      },
    });

    return {
      success: true,
      message:
        "Your reservation request has been received. We will contact you to confirm your table.",
    };
  } catch (error) {
    console.error("Reservation creation failed:", error);

    return {
      success: false,
      message:
        "We could not submit your reservation right now. Please try again.",
    };
  }
}