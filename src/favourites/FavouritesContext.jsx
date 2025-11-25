// src/favourites/FavouritesContext.jsx

import { createContext, useContext } from "react";

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
  // Provide favourites state and toggle function to children
  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}
