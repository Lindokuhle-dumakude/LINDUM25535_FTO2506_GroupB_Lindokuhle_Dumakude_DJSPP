import { useState } from "react";
import EpisodeList from "./EpisodeList";
import "../styles/SeasonList.css";

/**
 * Displays a dropdown to select a season and shows its episodes.
 */
export default function SeasonList({ seasons, show }) {
  const [selectedSeason, setSelectedSeason] = useState(0);

  const season = seasons[selectedSeason];

  return (
    <div className="season-list-container">
      <div className="season-list-header">
        <h2>Current Season</h2>

        <select
          className="season-dropdown"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
        >
          {seasons.map((s, i) => (
            <option key={s.id} value={i}>
              Season {s.season}
            </option>
          ))}
        </select>
      </div>

      <div className="season-info">
        <h3>
          Season {season.season}: {season.title || "Untitled Season"}
        </h3>
        <p className="season-description">{season.description}</p>
        <p className="season-meta">Episodes: {season.episodes.length}</p>
      </div>

      <EpisodeList
        episodes={season.episodes}
        seasonImage={season.image}
        showId={show.id}
        showTitle={show.title}
        seasonNumber={season.number}
      />
    </div>
  );
}
