import { useEffect } from "react";

export function useKeyPress(key: string, handler: () => void): void {
  useEffect(
    function () {
      function handlePress(e: KeyboardEvent) {
        if (e.key === key) {
          handler?.();
        }
      }

      document.addEventListener("keydown", handlePress, true);
      return () => document.removeEventListener("keydown", handlePress);
    },
    [key, handler]
  );
}
