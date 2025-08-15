import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    data: cabins,
    error,
    isPending: isFetching,
  } = useQuery({
    queryKey: ["cabins"] as const,
    queryFn: getCabins,
  });

  return { cabins, error, isFetching };
}
