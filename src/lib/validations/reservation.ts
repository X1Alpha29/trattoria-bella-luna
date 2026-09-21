import { z } from "zod";

export const reservationSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Your name is too long."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(150, "Your email address is too long."),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(30, "Your phone number is too long."),

  reservationDate: z.string().min(1, "Please select a date."),

  reservationTime: z.string().min(1, "Please select a time."),

  guestCount: z.coerce
    .number()
    .int("Number of guests must be a whole number.")
    .min(1, "There must be at least 1 guest.")
    .max(12, "For groups larger than 12, please contact us directly."),

  specialRequests: z
    .string()
    .trim()
    .max(500, "Special requests are too long.")
    .optional(),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;