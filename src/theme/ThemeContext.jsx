// src/theme/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

/**
 * Context to manage the app's light/dark theme globally.
 */
const ThemeContext = createContext();

/**
 * Provides theme state and toggle function to child components.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components that can access the theme
 */
export function ThemeProvider({ children }) {
  // Load initial theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored ? stored : "light";
  });

  // Update localStorage and apply theme class to body whenever theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = ""; // Clear any previous class
    document.body.classList.add(theme); // Add current theme class
  }, [theme]);

  /**
   * Toggle between 'light' and 'dark' themes
   */
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to access theme context easily.
 */
export const useTheme = () => useContext(ThemeContext);
