// src/hooks/useLocalStorage.js

import { useState, useEffect } from "react";

/**
 * Custom hook that syncs a state value with localStorage.
 *
 * @param {string} key - Storage key to use in localStorage
 * @param {*} defaultValue - Fallback when nothing stored yet
 * @returns {[any, Function]} State value and setter function
 */
export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  // Save updates to storage automatically
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
