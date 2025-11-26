// src/pages/Favourites.jsx
import { useFavourites } from "../favourites/FavouritesContext";
import { useAudioPlayer } from "../audio/AudioPlayerContext";
import { Link } from "react-router-dom";
import "../styles/Favourites.css";
import { useState } from "react";

export default function Favourites() {
  const { favourites, removeFavourite } = useFavourites();
  const { currentEpisode, isPlaying, playEpisode, pause } = useAudioPlayer();

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
}
