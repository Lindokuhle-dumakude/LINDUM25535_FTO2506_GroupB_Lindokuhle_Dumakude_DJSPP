// src/components/PodcastCard.jsx

import { Link } from "react-router-dom";
import "../styles/PodcastCard.css";
import { genres } from "../utils/data";
import { formatDate } from "../utils/formatDate";

export default function PodcastCard({ podcast }) {
  const genreName =
    podcast.genres
      ?.map((id) => genres.find((g) => g.id === id)?.title)
      .filter(Boolean)
      .join(", ") || "Unknown Genre";

  const formattedDate = formatDate(podcast.updated);

  return (
    <Link
      to={`/show/${podcast.id}`}
      className="podcast-card"
      state={{ podcast }}
    >
      <img
        className="podcast-card-image"
        src={podcast.image}
        alt={podcast.title}
      />

      <div className="podcast-card-content">
        <h3 className="podcast-card-title">{podcast.title}</h3>
        <p className="podcast-card-genre">{genreName}</p>
        <small className="podcast-card-updated">Updated: {formattedDate}</small>
      </div>
    </Link>
  );
}
