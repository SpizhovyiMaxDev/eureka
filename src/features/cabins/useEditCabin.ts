import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin } from "../../services/apiCabins";
import { EditCabin } from "../../types/cabin";
import toast from "react-hot-toast";

interface useEditCabinReturnTypes {
  isEditing: boolean;
  editMutation: (
    cabin: EditCabin,
    options?: { onSuccess?: () => void }
  ) => void;
}

export function useEditCabin(): useEditCabinReturnTypes {
  const queryClient = useQueryClient();

  const { mutate: editMutation, isPending: isEditing } = useMutation({
    mutationFn: editCabin,
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editMutation, isEditing };
}
