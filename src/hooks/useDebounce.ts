import { useEffect, useState } from "react";

/** -----------------------------
 * @description 디바운스 훅
 * @param value 값
 * @param delay 디바운스 지연 시간
 * @returns 디바운스 값
 * ----------------------------- */
export const useDebounce = <T>(value: T, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
