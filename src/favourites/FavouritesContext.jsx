// src/favourites/FavouritesContext.jsx

import { createContext, useContext, useEffect, useState } from "react";

/**
 * Context to share favourite episodes across the app.
 */
const FavouritesContext = createContext();

/**
 * Provides favourite episodes state and functions to children components.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that can access favourites
 */
export function FavouritesProvider({ children }) {
  /** Array of favourited episodes */
  const [favourites, setFavourites] = useState([]);

  // Load favourites from localStorage when component mounts
  useEffect(() => {
    const stored = localStorage.getItem("favourites");
    if (stored) setFavourites(JSON.parse(stored));
  }, []);

  // Save favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // Provide favourites state and toggle function to children
  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}
