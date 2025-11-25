import "../styles/EpisodeList.css";
import { useFavourites } from "../favourites/FavouritesContext";

/**
 * EpisodeList component displays all episodes of a season with titles, descriptions,
 * and a favourite button for each episode.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.episodes - List of episode objects to display.
 * @param {string} props.seasonImage - Image URL to show for each episode thumbnail.
 */
export default function EpisodeList({ episodes, seasonImage }) {
  // Access favourites state and toggle function from context
  const { favourites, toggleFavourite } = useFavourites();

  return (
    <div className="episode-list">
      {episodes.map((ep) => {
        // Check if this episode is already in favourites
        const isFavourited = favourites.some((f) => f.id === ep.id);

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
                {ep.description && ep.description.length > 150
                  ? ep.description.slice(0, 150) + "..."
                  : ep.description}
              </p>
            </div>

            {/* Favourite button: toggles heart icon */}
            <button className="fav-btn" onClick={() => toggleFavourite(ep)}>
              {isFavourited ? "❤️" : "🤍"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
