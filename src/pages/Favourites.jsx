// src/pages/Favourites.jsx
import { useFavourites } from "../favourites/FavouritesContext";
import { useAudioPlayer } from "../audio/AudioPlayerContext";
import { Link } from "react-router-dom";
import "../styles/Favourites.css";
import { useState } from "react";
import Header from "../components/Header";

export default function Favourites() {
  const { favourites, removeFavourite } = useFavourites();
  const {
    currentEpisode,
    isPlaying,
    playEpisode,
    pause,
    listeningProgress,
    resetProgress,
  } = useAudioPlayer();

  const [openGroups, setOpenGroups] = useState({});
  const [sortType, setSortType] = useState("newest");

  // Sorting function
  const applySorting = (list) => {
    switch (sortType) {
      case "newest":
        return [...list].sort(
          (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
        );
      case "oldest":
        return [...list].sort(
          (a, b) => new Date(a.addedAt) - new Date(b.addedAt)
        );
      case "az":
        return [...list].sort((a, b) => a.title.localeCompare(b.title));
      case "za":
        return [...list].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return list;
    }
  };

  // Group favourites by show title
  const groups = favourites.reduce((acc, ep) => {
    if (!acc[ep.showTitle]) acc[ep.showTitle] = [];
    acc[ep.showTitle].push(ep);
    return acc;
  }, {});

  // Apply sorting within each group
  Object.keys(groups).forEach((show) => {
    groups[show] = applySorting(groups[show]);
  });

  const showTitles = Object.keys(groups).sort();

  if (favourites.length === 0) {
    return (
      <div className="favourites-empty">
        <h2>No favourites yet ❤️</h2>
        <p>
          Browse any show and tap the heart to save your favourite episodes.
        </p>
        <Link to="/" className="browse-btn">
          Browse Shows →
        </Link>
      </div>
    );
  }

  const toggleGroup = (title) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      <Header />
      <div className="favourites-page">
        <div className="fav-header">
          <h2>Your Favourites</h2>

          <div className="fav-controls">
            <select
              className="sort-select"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="newest">Newest → Oldest</option>
              <option value="oldest">Oldest → Newest</option>
              <option value="az">A–Z (Title)</option>
              <option value="za">Z–A (Title)</option>
            </select>

            {/* Reset Listening History Button */}
            <button className="reset-btn" onClick={resetProgress}>
              Reset Listening History
            </button>
          </div>
        </div>

        {showTitles.map((show) => (
          <div key={show} className="group-block">
            <button className="group-header" onClick={() => toggleGroup(show)}>
              <span>{show}</span>
              <span>{openGroups[show] ? "▲" : "▼"}</span>
            </button>

            {openGroups[show] && (
              <div className="group-content">
                {groups[show].map((ep) => {
                  const isCurrentlyPlaying =
                    currentEpisode?.id === ep.id && isPlaying;

                  const epProgress = listeningProgress[ep.id]?.timestamp || 0;
                  const epFinished = listeningProgress[ep.id]?.finished;

                  return (
                    <div key={ep.id} className="favourite-card">
                      <img
                        src={ep.image}
                        alt={ep.title}
                        className="favourite-image"
                      />

                      <div className="fav-info">
                        <h3>
                          {ep.title}
                          {epFinished && (
                            <span className="finished-badge">✔️ Finished</span>
                          )}
                        </h3>
                        <p className="meta">
                          Season {ep.season}, Episode {ep.episode} • Added:{" "}
                          {new Date(ep.addedAt).toLocaleString()}
                        </p>

                        {ep.description && (
                          <p className="description">
                            {ep.description.length > 140
                              ? ep.description.slice(0, 140) + "..."
                              : ep.description}
                          </p>
                        )}

                        {/* Progress bar */}
                        {!epFinished && (
                          <div className="progress-container">
                            <div
                              className="progress-bar"
                              style={{
                                width: `${
                                  (epProgress / (ep.duration || 1)) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                        )}

                        <Link className="show-link" to={`/show/${ep.showId}`}>
                          View Show →
                        </Link>
                      </div>

                      <div className="favourite-actions">
                        <button
                          className={`play-btn ${
                            isCurrentlyPlaying ? "playing" : ""
                          }`}
                          onClick={() =>
                            isCurrentlyPlaying ? pause() : playEpisode(ep)
                          }
                        >
                          {isCurrentlyPlaying ? "⏸️" : "▶️"}
                        </button>

                        <button
                          className="remove-btn"
                          onClick={() => removeFavourite(ep.id)}
                        >
                          Remove ❌
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
