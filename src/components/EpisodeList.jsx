import "../styles/EpisodeList.css";
import { useFavourites } from "../favourites/FavouritesContext";
import { useAudioPlayer } from "../audio/AudioPlayerContext";

/**
 * EpisodeList component displays all episodes of a season with titles, descriptions,
 * favourite button, progress bars, finished badges, and play button for each episode.
 */
export default function EpisodeList({
  episodes = [],
  seasonImage,
  showId,
  showTitle,
  seasonNumber,
}) {
  const { favourites, toggleFavourite } = useFavourites();
  const { currentEpisode, isPlaying, playEpisode, pause, listeningProgress } =
    useAudioPlayer();

  return (
    <div className="episode-list">
      {episodes.map((ep, index) => {
        const episodeNumber = ep.episode ?? index + 1;
        const episodeUid = `${showId}-${seasonNumber}-${episodeNumber}`;
        const isFavourited = favourites.some((f) => f.id === episodeUid);
        const isCurrentlyPlaying =
          currentEpisode?.id === episodeUid && isPlaying;
        const epProgress = listeningProgress[episodeUid]?.timestamp || 0;
        const epFinished = listeningProgress[episodeUid]?.finished;

        return (
          <div key={episodeUid} className="episode-card">
            <img
              src={seasonImage}
              alt={`Season thumbnail`}
              className="episode-image"
            />

            <div className="episode-content">
              <h4 className="episode-title">
                Episode {episodeNumber}: {ep.title ?? "Untitled"}
                {epFinished && (
                  <span className="finished-badge">✔️ Finished</span>
                )}
              </h4>

              <p className="episode-description">
                {ep.description?.length > 150
                  ? ep.description.slice(0, 150) + "..."
                  : ep.description ?? "No description available."}
              </p>

              {!epFinished && (
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${(epProgress / (ep.duration || 1)) * 100}%`,
                    }}
                  ></div>
                </div>
              )}
            </div>

            <div className="episode-actions">
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

              <button
                className="fav-btn"
                onClick={() =>
                  toggleFavourite(
                    { ...ep, id: episodeUid },
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
