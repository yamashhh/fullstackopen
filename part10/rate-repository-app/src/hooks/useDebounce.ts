import { useEffect, useState } from "react";

/**
 * @see https://usehooks-ts.com/react-hook/use-debounce
 * @param value
 * @param delay
 * @returns
 */
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setDebouncedValue(value);
      },
      delay == null ? 500 : delay
    );

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
