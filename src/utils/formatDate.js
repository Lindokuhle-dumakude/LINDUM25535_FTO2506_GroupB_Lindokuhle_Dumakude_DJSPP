// src/utils/formatDate.js

/**
 * Convert ISO date (e.g. "2025-11-13T09:00:00Z")
 * into "13 November 2025" format
 * @param {string} isoDate
 * @returns {string}
 */
export function formatDate(isoDate) {
  const date = new Date(isoDate);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}
