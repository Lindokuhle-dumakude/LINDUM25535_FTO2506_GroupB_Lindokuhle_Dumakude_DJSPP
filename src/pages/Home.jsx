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
import ThemeToggle from "../theme/ThemeToggle";
import Carousel from "../components/Carousel";

import "../App.css";

/**
 * Home page component displaying the main podcasts shows.
 *
 * Handles loading, error states, and renders:
 * - Header
 * - Recommended Shows Carousel
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

      {/* Recommended Shows Carousel */}
      <section className="carousel-section">
        <h2 className="section-title">Recommended Shows</h2>
        <Carousel shows={visiblePodcasts} />
      </section>

      {/* Controls: Search, Filter, Sort, Theme Toggle */}
      <div className="controls">
        <SearchBar />
        <GenreFilter />
        <SortSelect />
        <ThemeToggle />
      </div>

      {/* Main Podcast Grid */}
      <PodcastGrid podcasts={visiblePodcasts} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
