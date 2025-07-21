import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

interface useDeleteCabinProps {
  isDeleting: boolean;
  deleteMutation: (id: number) => void;
}

function useDeleteCabin(): useDeleteCabinProps {
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

export default useDeleteCabin;
