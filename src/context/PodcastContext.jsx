// src/context/PodcastContext.jsx
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { fetchPodcasts } from "../api/podcastApi";
import { genres } from "../utils/data"; // maps genre IDs → titles
import useLocalStorage from "../hooks/useLocalStorage";

/**
 * React Context for managing podcast state globally.
 * Provides podcasts data, filters, sorting, pagination, and loading/error states.
 */
const PodcastContext = createContext();

/**
 * Provider component that wraps the app and provides podcast state.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - child components to render within the provider
 * @returns {JSX.Element} Context provider wrapping children
 */
export function PodcastProvider({ children }) {
  // -----------------------------
  // Core State
  // -----------------------------
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useLocalStorage("searchTerm", "");
  const [selectedGenres, setSelectedGenres] = useLocalStorage(
    "selectedGenres",
    []
  );
  const [sortOrder, setSortOrder] = useLocalStorage("sortOrder", "az");
  const [currentPage, setCurrentPage] = useLocalStorage("currentPage", 1);

  const PODCASTS_PER_PAGE = 12;

  // -----------------------------
  // Fetch API
  // -----------------------------
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchPodcasts();
        setPodcasts(data);
        setError(null);
      } catch (err) {
        setError("Failed to load podcasts.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // -----------------------------
  // Search, Filter, Sort
  // -----------------------------
  const filteredAndSorted = useMemo(() => {
    let temp = [...podcasts];

    // Search
    if (searchTerm.trim() !== "") {
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenres.length > 0) {
      temp = temp.filter((p) =>
        p.genres?.some((g) => selectedGenres.includes(g))
      );
    }

    // Sorting
    if (sortOrder === "az") {
      temp.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "za") {
      temp.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOrder === "newest") {
      temp.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    }

    return temp;
  }, [podcasts, searchTerm, selectedGenres, sortOrder]);

  // -----------------------------
  // Pagination
  // -----------------------------
  const totalPages = Math.ceil(filteredAndSorted.length / PODCASTS_PER_PAGE);

  const visiblePodcasts = useMemo(() => {
    const start = (currentPage - 1) * PODCASTS_PER_PAGE;
    return filteredAndSorted.slice(start, start + PODCASTS_PER_PAGE);
  }, [filteredAndSorted, currentPage]);

  // Reset pagination when filters/search/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGenres, sortOrder]);

  // -----------------------------
  // Context Value
  // -----------------------------
  const value = {
    podcasts,
    loading,
    error,

    searchTerm,
    setSearchTerm,

    selectedGenres,
    setSelectedGenres,

    sortOrder,
    setSortOrder,

    currentPage,
    setCurrentPage,

    totalPages,
    visiblePodcasts,
  };

  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
}

/**
 * Custom hook to access PodcastContext state and actions.
 *
 * @returns {Object} Podcast context value containing state and setters
 */
export function usePodcasts() {
  return useContext(PodcastContext);
}
