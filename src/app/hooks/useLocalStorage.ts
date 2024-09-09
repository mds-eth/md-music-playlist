import { useState, useEffect } from "react";

export const useLocalStorage = (key: any, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (storedValue.length > 0 && typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  }, [storedValue, key]);

  return [storedValue, setStoredValue];
};
