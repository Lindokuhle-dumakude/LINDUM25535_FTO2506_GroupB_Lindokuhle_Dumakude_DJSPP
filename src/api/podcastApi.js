// src/api/podcastApi.js
export const fetchPodcasts = async () => {
  const response = await fetch("https://podcast-api.netlify.app");
  if (!response.ok) throw new Error("Failed to fetch podcasts");
  return response.json();
};
