import { RefObject, useEffect, useRef } from "react";

interface useOutsideClickProps {
  fn: () => void;
}

export function useOutsideClick<T extends HTMLElement>({
  fn,
}: useOutsideClickProps): RefObject<T> {
  const ref = useRef<T>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        fn();
        console.log();
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [fn]);

  return ref;
}
