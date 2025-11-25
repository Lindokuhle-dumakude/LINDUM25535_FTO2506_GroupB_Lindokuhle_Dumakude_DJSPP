// src/components/SortSelect.jsx

import { usePodcasts } from "../context/PodcastContext";
import "../styles/SortSelect.css";

/**
 * Sorting dropdown to change podcast order.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function SortSelect() {
  const { sortOrder, setSortOrder } = usePodcasts();

  /**
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const handleChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="sort-select">
      <label className="sort-label">Sort by:</label>

      <select
        className="sort-dropdown"
        value={sortOrder}
        onChange={handleChange}
      >
        <option value="az">Title (A → Z)</option>
        <option value="za">Title (Z → A)</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}
