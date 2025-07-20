export type Settings = {
  id?: number;
  createdAt?: string;
  guestId: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};
