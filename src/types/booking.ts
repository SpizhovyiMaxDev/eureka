export type Booking = {
  id?: number;
  createdAt?: string;
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
  totalPrice?: number;
};
