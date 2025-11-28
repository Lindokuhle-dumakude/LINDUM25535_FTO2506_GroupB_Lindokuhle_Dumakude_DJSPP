// src/components/Header.jsx
import "../styles/Header.css";
import { Link } from "react-router-dom";
import ThemeToggle from "../theme/ThemeToggle";
import { useState } from "react";

export default function Header({ onSearch }) {
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    const value = e.target.value;
    setSearch(value);
    if (onSearch) onSearch(value);
  }

  return (
    <header className="header">
      {/* Left section */}
      <div className="podcastLogoAndTitle">
        <img
          src="/assets/icons8-microphone-50.png"
          alt="PodcastApp Logo"
          className="podcastAppLogo"
        />
        <h1 className="podcastTitle">PodGenius</h1>
      </div>

      {/* Search bar */}
      <div className="headerSearch">
        <input
          type="text"
          placeholder="Search podcasts..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Right section */}
      <div className="headerRight">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/favourites"> ❤️</Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
