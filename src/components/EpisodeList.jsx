// src/components/EpisodeList.jsx
import "../styles/EpisodeList.css";
import { useFavourites } from "../favourites/FavouritesContext";
import { useAudioPlayer } from "../audio/AudioPlayerContext";

/**
 * EpisodeList component displays all episodes of a season with titles, descriptions,
 * favourite button, and play button for each episode.
 *
 * @param {Object} props - Component props
 * @param {Array} props.episodes - List of episode objects to display
 * @param {string} props.seasonImage - Thumbnail image for the season
 * @param {string} props.showId - Show ID
 * @param {string} props.showTitle - Show title
 * @param {number} props.seasonNumber - Season number
 */
export default function EpisodeList({
  episodes,
  seasonImage,
  showId,
  showTitle,
  seasonNumber,
}) {
  const { favourites, toggleFavourite } = useFavourites();
  const { currentEpisode, isPlaying, playEpisode, pause } = useAudioPlayer();

  return (
    <div className="episode-list">
      {episodes.map((ep) => {
        const isFavourited = favourites.some((f) => f.id === ep.id);
        const isCurrentlyPlaying = currentEpisode?.id === ep.id && isPlaying;

        return (
          <div key={ep.id} className="episode-card">
            {/* Episode thumbnail */}
            <img
              src={seasonImage}
              alt={`Season thumbnail`}
              className="episode-image"
            />

            {/* Episode title and description */}
            <div className="episode-content">
              <h4 className="episode-title">
                Episode {ep.episode}: {ep.title}
              </h4>

              <p className="episode-description">
                {ep.description?.length > 150
                  ? ep.description.slice(0, 150) + "..."
                  : ep.description}
              </p>
            </div>

            {/* Controls */}
            <div className="episode-actions">
              {/* Play / Pause button */}
              <button
                className={`play-btn ${isCurrentlyPlaying ? "playing" : ""}`}
                onClick={() => (isCurrentlyPlaying ? pause() : playEpisode(ep))}
              >
                {isCurrentlyPlaying ? "⏸️" : "▶️"}
              </button>

              {/* Favourite button */}
              <button
                className="fav-btn"
                onClick={() =>
                  toggleFavourite(ep, showTitle, seasonNumber, showId)
                }
              >
                {isFavourited ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
