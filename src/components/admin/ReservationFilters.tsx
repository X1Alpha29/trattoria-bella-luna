"use client";

import ReservationList from "@/components/admin/ReservationList";

type Reservation = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  reservationDate: string;
  reservationTime: string;
  guestCount: number;
  specialRequests: string | null;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "DECLINED"
    | "CANCELLED"
    | "COMPLETED";
};

type Props = {
  reservations: Reservation[];
};

export default function ReservationFilters({ reservations }: Props) {
  return <ReservationList reservations={reservations} />;
}