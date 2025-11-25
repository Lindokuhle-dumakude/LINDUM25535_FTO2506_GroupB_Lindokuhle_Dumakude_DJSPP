// src/pages/Home.jsx
import { usePodcasts } from "../context/PodcastContext";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import SortSelect from "../components/SortSelect";
import Pagination from "../components/Pagination";
import PodcastGrid from "../components/PodcastGrid";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import "../App.css";

/**
 * Home page component displaying the main podcasts shows.
 *
 * Handles loading, error states, and renders:
 * - Header
 * - Search, Genre, and Sort controls
 * - PodcastGrid for visible podcasts
 * - Pagination for navigating pages
 *
 * @component
 * @returns {JSX.Element} The home page UI
 */
export default function Home() {
  const {
    loading,
    error,
    visiblePodcasts,
    totalPages,
    currentPage,
    setCurrentPage,
  } = usePodcasts();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="app-container">
      <Header />

      <div className="controls">
        <SearchBar />
        <GenreFilter />
        <SortSelect />
      </div>

      <PodcastGrid podcasts={visiblePodcasts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
