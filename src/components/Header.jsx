// src/components/Header.jsx
import "../styles/Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="podcastLogoAndTitle">
        <img
          src="/assets/icons8-microphone-50.png"
          alt="PodcastApp Logo"
          className="podcastAppLogo"
        />
        <h1 className="podcastTitle">PodGenius</h1>
      </div>
    </header>
  );
}
