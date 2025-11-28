import "../styles/EpisodeList.css";
import { useFavourites } from "../favourites/FavouritesContext";
import { useAudioPlayer } from "../audio/AudioPlayerContext";

/**

* EpisodeList component displays all episodes of a season with titles, descriptions,
* favourite button, and play button for each episode.
  */
export default function EpisodeList({
  episodes = [],
  seasonImage,
  showId,
  showTitle,
  seasonNumber,
}) {
  const { favourites, toggleFavourite } = useFavourites();
  const { currentEpisode, isPlaying, playEpisode, pause } = useAudioPlayer();

  return (
    <div className="episode-list">
      {episodes.map((ep, index) => {
        // Fallback for missing episode number
        const episodeNumber = ep.episode ?? index + 1;

        // Unique ID for favourites and key
        const episodeUid = `${showId}-${seasonNumber}-${episodeNumber}`;

        // Check if this episode is already favourited
        const isFavourited = favourites.some((f) => f.id === episodeUid);

        // Check if this episode is currently playing
        const isCurrentlyPlaying = currentEpisode?.id === ep.id && isPlaying;

        return (
          <div key={episodeUid} className="episode-card">
            {/* Episode thumbnail */}
            <img
              src={seasonImage}
              alt={`Season thumbnail`}
              className="episode-image"
            />

            {/* Episode title and description */}
            <div className="episode-content">
              <h4 className="episode-title">
                Episode {episodeNumber}: {ep.title ?? "Untitled"}
              </h4>

              <p className="episode-description">
                {ep.description?.length > 150
                  ? ep.description.slice(0, 150) + "..."
                  : ep.description ?? "No description available."}
              </p>
            </div>

            {/* Controls */}
            <div className="episode-actions">
              {/* Play / Pause button */}
              <button
                className={`play-btn ${isCurrentlyPlaying ? "playing" : ""}`}
                onClick={() =>
                  isCurrentlyPlaying
                    ? pause()
                    : playEpisode({
                        ...ep,
                        cover: seasonImage,
                        showTitle,
                        id: episodeUid,
                      })
                }
              >
                {isCurrentlyPlaying ? "⏸️" : "▶️"}
              </button>

              {/* Favourite button */}
              <button
                className="fav-btn"
                onClick={() =>
                  toggleFavourite(
                    { ...ep, id: episodeUid }, // pass consistent ID
                    showTitle,
                    seasonNumber,
                    showId
                  )
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
