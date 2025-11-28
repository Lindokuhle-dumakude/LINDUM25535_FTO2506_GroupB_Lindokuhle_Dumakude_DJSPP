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
  function addFavourite(episode, showTitle, seasonNumber, showId) {
    const fav = {
      id: episode._uid,
      title: episode.title,
      episode: episode.episode,
      showId,
      showTitle,
      season: seasonNumber,
      description: episode.description,
      image: episode.image,
      addedAt: new Date().toISOString(),
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
  function toggleFavourite(episode, showTitle, seasonNumber, showId) {
    const exists = favourites.some((ep) => ep.id === episode.id);

    if (exists) {
      removeFavourite(episode.id);
    } else {
      addFavourite(episode, showTitle, seasonNumber, showId);
    }
  }

  // Provide favourites state and toggle function to children
  return (
    <FavouritesContext.Provider
      value={{ favourites, toggleFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

/**
 * Custom hook to access favourites context.
 *
 * @returns {Object} favourites array and toggleFavourite function
 */
export function useFavourites() {
  return useContext(FavouritesContext);
}
