/**
 * Fetch a single podcast show by its ID.
 *
 * @param {number|string} id - The show ID to fetch.
 * @returns {Promise<Object>} The show data including seasons & episodes.
 */
export async function fetchShowById(id) {
  try {
    const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch show details");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching show:", error);
    throw error;
  }
}
