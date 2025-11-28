import React from "react";
import { useAudioPlayer } from "./AudioPlayerContext";
import "../styles/AudioPlayer.css";

/**
 * AudioPlayer component displays global audio controls and progress.
 * Fixed at the bottom of the screen and uses context for state management.
 */
export default function AudioPlayer() {
  const {
    audioRef,
    currentEpisode,
    isPlaying,
    progress,
    duration,
    playEpisode,
    pause,
    seekTo,
    handleTimeUpdate,
    handleLoadedMetadata,
    listeningProgress,
  } = useAudioPlayer();

  if (!currentEpisode) return null;

  const handleSeekChange = (e) => {
    seekTo(Number(e.target.value));
  };

  const epProgress = listeningProgress[currentEpisode.id]?.timestamp || 0;
  const epFinished = listeningProgress[currentEpisode.id]?.finished;

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Cover Art */}
      <div className="player-cover">
        <img src={currentEpisode.cover || "/default-cover.png"} alt="cover" />
      </div>

      {/* Episode info */}
      <div className="player-info">
        <div className="audio-title">
          {currentEpisode.title}{" "}
          {epFinished && <span className="finished-badge">✔️ Finished</span>}
        </div>
        <div className="audio-meta">{currentEpisode.showTitle}</div>

        {!epFinished && (
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${(epProgress / (duration || 1)) * 100}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="audio-controls">
        <button
          className="audio-btn"
          onClick={isPlaying ? pause : () => playEpisode(currentEpisode)}
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>

        <input
          className="audio-progress"
          type="range"
          min="0"
          max={duration || 0}
          value={progress}
          onChange={handleSeekChange}
        />

        <span className="audio-time">
          {Math.floor(progress / 60)}:
          {("0" + Math.floor(progress % 60)).slice(-2)} /{" "}
          {Math.floor(duration / 60)}:
          {("0" + Math.floor(duration % 60)).slice(-2)}
        </span>

        <button className="audio-btn">☰</button>
      </div>
    </div>
  );
}
