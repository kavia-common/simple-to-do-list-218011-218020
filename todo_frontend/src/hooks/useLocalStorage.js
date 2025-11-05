import { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * useLocalStorage
 * A React hook that syncs state with localStorage.
 *
 * @param {string} key - The localStorage key to read/write
 * @param {any} initialValue - The default value if nothing exists in localStorage
 * @returns {[any, Function]} The stateful value and a setter function
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (_err) {
      // Fallback to initial value if parsing fails
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (_err) {
      // Silently ignore write errors (e.g., storage full)
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
