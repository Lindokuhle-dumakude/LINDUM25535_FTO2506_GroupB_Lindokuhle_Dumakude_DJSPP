// src/components/GenreFilter.jsx

import { usePodcasts } from "../context/PodcastContext";
import { genres } from "../utils/data";
import "../styles/GenreFilter.css";

/**
 * Dropdown for filtering podcasts by genre.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function GenreFilter() {
  const { selectedGenres, setSelectedGenres } = usePodcasts();

  /**
   * Updates global genre filter
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const handleChange = (e) => {
    const val = e.target.value;

    if (val === "All") {
      setSelectedGenres([]);
    } else {
      setSelectedGenres([Number(val)]);
    }
  };

  const selectedValue = selectedGenres.length > 0 ? selectedGenres[0] : "All";

  return (
    <div className="genre-filter">
      <label className="genre-label">Filter by Genre:</label>

      <select
        className="genre-select"
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="All">All</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.title}
          </option>
        ))}
      </select>
    </div>
  );
}
