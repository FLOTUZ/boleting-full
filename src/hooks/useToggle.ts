import { useCallback, useEffect, useState } from "react";

/**
 * @description A hook that returns a boolean value and a function to toggle it saving in local storage.
 *
 * @param {boolean} initialValue
 * @returns {[boolean, () => void]}
 * @example
 */
export const useToggle = (initialValue: boolean): [boolean, () => void] => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue((v) => {
      const newValue = !v;
      localStorage.setItem("view-mode", newValue ? "true" : "false");
      return newValue;
    });
  }, []);

  useEffect(() => {
    // Get the user's preference from local storage
    const storedValue = localStorage.getItem("view-mode");
    if (storedValue) {
      setValue(storedValue === "true");
    }
  }, []);
  return [value, toggle];
};
