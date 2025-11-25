// src/components/PodcastGrid.jsx

import PodcastCard from "./PodcastCard";
import "../styles/PodcastGrid.css";

/**
 * PodcastGrid component renders a grid of PodcastCard components.
 *
 * Displays a message if no podcasts are available.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.podcasts - Array of podcast objects to display
 * @returns {JSX.Element} Grid layout of podcast cards or empty message
 */
export default function PodcastGrid({ podcasts }) {
  if (!podcasts || podcasts.length === 0) {
    return (
      <div className="podcast-grid-empty">
        <p>No podcasts found.</p>
      </div>
    );
  }

  return (
    <div className="podcast-grid">
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
}
