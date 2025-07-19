export type Bookings = {
  cabinId: number;
  guestId: number;
  createdAt: string;
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
