import { Booking, BookingWithRelations } from "../types/booking";
import { getUTCTodayAtStartOrEndOfDay } from "../utils/date";
import supabase from "./supabase";

export async function getBookings(): Promise<BookingWithRelations[]> {
  const { data, error } = await supabase.from("bookings").select(`
      id,
      createdAt,
      startDate,
      endDate,
      numGuests,
      hasBreakfast,
      isPaid,
      observations,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      status,
      cabin:cabins(*),
      guest:guests(*)
    `);

  if (error) {
    console.error(error);
    throw new Error("Bookings not found");
  }

  if (!data) return [];

  const bookings: BookingWithRelations[] = data.map((booking) => ({
    ...booking,
    cabin: Array.isArray(booking.cabin) ? booking.cabin[0] : booking.cabin,
    guest: Array.isArray(booking.guest) ? booking.guest[0] : booking.guest,
  }));

  return bookings;
}

export async function getBooking(id: number): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: Date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getUTCTodayAtStartOrEndOfDay({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: Date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getUTCTodayAtStartOrEndOfDay());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getUTCTodayAtStartOrEndOfDay()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id: number, obj: Booking) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
