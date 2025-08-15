import { Cabin } from "./cabin";
import { Guest } from "./guest";

export type Status = "unconfirmed" | "checked-in" | "checked-out";

export type BookingCore = {
  cabinId: number;
  guestId: number;
  startDate: string;
  endDate: string;
  numGuests: number;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  numNights?: number;
  cabinPrice?: number;
  extrasPrice?: number;
  totalPrice: number;
  status: Status;
};

export type Booking = BookingCore & {
  id?: number;
  createdAt?: string;
};

export type BookingWithRelations = Omit<Booking, "cabinId" | "guestId"> & {
  cabin: Cabin;
  guest: Guest;
};
