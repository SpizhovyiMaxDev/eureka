import { useQuery } from "@tanstack/react-query";
import { Settings } from "../../types/settings";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    data: settings,
    error,
    isPending: isFetching,
  } = useQuery<Settings, Error, Settings, string[]>({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, error, isFetching };
}
