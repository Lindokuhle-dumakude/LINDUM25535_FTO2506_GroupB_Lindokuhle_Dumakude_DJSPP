// src/components/SearchBar.jsx

import { usePodcasts } from "../context/PodcastContext";
import "../styles/SearchBar.css";

/**
 * SearchBar component for filtering podcasts by name.
 * Updates global search term state.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function SearchBar() {
  const { searchTerm, setSearchTerm } = usePodcasts();

  /**
   * Handles input change to update search term
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search podcasts..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
}
