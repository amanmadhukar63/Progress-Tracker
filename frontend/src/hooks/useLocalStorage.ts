import { useState, useEffect } from "react";

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>, () => void] {
  const readValue = (): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(readValue);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  }, [key, value]);

  const updateValue: SetValue<T> = (val) => {
    setValue((prev) => (val instanceof Function ? val(prev) : val));
  };

  const remove = () => {
    try {
      localStorage.removeItem(key);
      setValue(initialValue);
    } catch (error) {
      console.error("Error removing localStorage key:", key, error);
    }
  };

  return [value, updateValue, remove];
}