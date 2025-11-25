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

  /**
   * Add an episode to favourites.
   *
   * @param {Object} episode - The episode object to add
   * @param {string} showTitle - The title of the show
   * @param {number} seasonNumber - The season number
   */
  function addFavourite(episode, showTitle, seasonNumber) {
    const fav = {
      id: episode.id,
      title: episode.title,
      episode: episode.episode,
      showTitle,
      season: seasonNumber,
      addedAt: new Date().toISOString(), // record when it was added
      description: episode.description,
    };

    setFavourites((prev) => [...prev, fav]);
  }

  /**
   * Remove an episode from favourites by ID.
   *
   * @param {number|string} id - ID of the episode to remove
   */
  function removeFavourite(id) {
    setFavourites((prev) => prev.filter((ep) => ep.id !== id));
  }

  /**
   * Toggle an episode in favourites.
   * If already favourited, remove it; otherwise, add it.
   *
   * @param {Object} episode - Episode to toggle
   * @param {string} showTitle - Show title
   * @param {number} seasonNumber - Season number
   */
  function toggleFavourite(episode, showTitle, seasonNumber) {
    const exists = favourites.some((ep) => ep.id === episode.id);

    if (exists) {
      removeFavourite(episode.id);
    } else {
      addFavourite(episode, showTitle, seasonNumber);
    }
  }

  // Provide favourites state and toggle function to children
  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}
