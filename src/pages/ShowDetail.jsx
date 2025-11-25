import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchShowById } from "../api/fetchShowById";
import { formatDate } from "../utils/formatDate";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import SeasonList from "../components/SeasonList";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import "../styles/ShowDetail.css";
import { GENRE_MAP } from "../utils/genreMap";

/**
 * Component that displays detailed information about a single TV show.
 *
 * Fetches show data from the API using the `id` from URL parameters,
 * and displays its image, title, description, genres, seasons, episodes,
 * and last updated date.
 *
 * @component
 * @returns {JSX.Element} The ShowDetail page component
 */
export default function ShowDetail() {
  const { id } = useParams();
  const location = useLocation();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(false);

  const previousState = location.state || null;

  /**
   * Fetch show details from the API when component mounts or `id` changes.
   */
  useEffect(() => {
    async function loadShow() {
      try {
        const data = await fetchShowById(id);
        setShow(data);
      } catch (err) {
        setError("Could not load show details.");
      } finally {
        setLoading(false);
      }
    }
    loadShow();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!show) return <ErrorMessage message="Show not found." />;

  // Map genre IDs to their human-readable titles
  const mappedGenres =
    show.genres?.map((id) => GENRE_MAP[id] || "Unknown") || [];

  const totalSeasons = show.seasons.length;
  const totalEpisodes = show.seasons.reduce(
    (sum, season) => sum + season.episodes.length,
    0
  );

  const shortDescription =
    show.description?.length > 350
      ? show.description.slice(0, 350) + "..."
      : show.description;

  return (
    <div className="show-detail-page">
      <Header />

      <div className="show-detail-container">
        <BackButton previousState={previousState} className="back-button" />

        <div className="show-header">
          <img src={show.image} alt={show.title} className="show-banner" />

          <div className="show-info">
            <h1 className="show-title">{show.title}</h1>

            <p className="show-description">
              {expanded ? show.description : shortDescription}
              {show.description.length > 300 && (
                <span
                  className="read-more-link"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? " Show less" : " Read more"}
                </span>
              )}
            </p>

            <div className="show-meta">
              <div className="meta-left">
                <div className="genres">
                  <h3>GENRES</h3>
                  <div className="genre-tags">
                    {mappedGenres.map((title, i) => (
                      <span key={i} className="genre-tag">
                        {title}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="total-seasons">
                  <h3>TOTAL SEASONS</h3>
                  <p>{totalSeasons} Seasons</p>
                </div>
              </div>

              <div className="meta-right">
                <div className="last-updated">
                  <h3>LAST UPDATED</h3>
                  <p>{formatDate(show.updated)}</p>
                </div>

                <div className="total-episodes">
                  <h3>TOTAL EPISODES</h3>
                  <p>{totalEpisodes} Episodes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SeasonList seasons={show.seasons} />
      </div>
    </div>
  );
}
