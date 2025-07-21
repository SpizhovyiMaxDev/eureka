import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { NewCabin } from "../../types/cabin";

interface UseCreateCabinretuenTypes {
  isCreating: boolean;
  createMutation: (
    cabin: NewCabin,
    options?: { onSuccess?: () => void }
  ) => void;
}

export function useCreateCabin(): UseCreateCabinretuenTypes {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createMutation } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createMutation };
}
