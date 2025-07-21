import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { Cabin } from "../../types/cabin";

export function useCabins() {
  const {
    data: cabins,
    error,
    isPending: isFetching,
  } = useQuery<Cabin[], Error, Cabin[], string[]>({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, error, isFetching };
}
