import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SettingsField } from "../../types/settings";
import toast from "react-hot-toast";
import { editSettings } from "../../services/apiSettings";

interface useUpdateSettingsReturnTypes {
  isEditing: boolean;
  editMutation: (settings: SettingsField) => void;
}

export function useEditSettings(): useUpdateSettingsReturnTypes {
  const queryClient = useQueryClient();

  const { mutate: editMutation, isPending: isEditing } = useMutation({
    mutationFn: editSettings,
    onSuccess: () => {
      toast.success("Settings successfully edited");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editMutation, isEditing };
}
