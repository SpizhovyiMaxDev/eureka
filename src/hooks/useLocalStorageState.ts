import { useState, useEffect } from "react";

export function useLocalStorageState<A>(
  initialState: A,
  key: string
): [A, React.Dispatch<React.SetStateAction<A>>] {
  const [value, setValue] = useState<A>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as A) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
