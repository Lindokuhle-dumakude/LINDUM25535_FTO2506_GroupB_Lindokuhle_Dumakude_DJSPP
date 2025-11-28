import { genres } from "./data";

/**
 * Convert a genre ID to its human-readable title.
 *
 * @param {number} id - Genre ID from API
 * @returns {string} Human-readable genre title
 */
export function getGenreTitle(id) {
  const found = genres.find((g) => g.id === id);
  return found ? found.title : "Unknown";
}
