import "../styles/EpisodeList.css";

/**
 * Displays a list of episodes for the selected season.
 */
export default function EpisodeList({ episodes, seasonImage }) {
  return (
    <div className="episode-list">
      {episodes.map((ep) => (
        <div key={ep.id} className="episode-card">
          <img
            src={seasonImage}
            alt={`Season thumbnail`}
            className="episode-image"
          />

          <div className="episode-content">
            <h4 className="episode-title">
              Episode {ep.episode}: {ep.title}
            </h4>

            <p className="episode-description">
              {ep.description && ep.description.length > 150
                ? ep.description.slice(0, 150) + "..."
                : ep.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
