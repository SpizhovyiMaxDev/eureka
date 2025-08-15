import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const {
    data: bookings,
    error,
    isPending: isFetching,
  } = useQuery({
    queryKey: ["bookings"] as const,
    queryFn: getBookings,
  });

  return { bookings, error, isFetching };
}
