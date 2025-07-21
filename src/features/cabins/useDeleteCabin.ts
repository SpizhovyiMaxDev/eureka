import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

interface useDeleteCabinReturnTypes {
  isDeleting: boolean;
  deleteMutation: (id: number) => void;
}

export function useDeleteCabin(): useDeleteCabinReturnTypes {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteMutation } = useMutation({
    mutationFn: (id: number) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteMutation };
}
