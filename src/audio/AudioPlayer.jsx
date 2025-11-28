// src/audio/AudioPlayer.jsx
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
  } = useAudioPlayer();

  // Hide player if no episode is selected
  if (!currentEpisode) return null;

  // Handle user seeking through the audio
  const handleSeekChange = (e) => {
    seekTo(Number(e.target.value));
  };

  return (
    <div className="audio-player">
      {/* HTML5 audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Episode & show info */}
      <div className="player-info">
        <strong>{currentEpisode.title}</strong> - {currentEpisode.showTitle}
      </div>

      {/* Playback controls */}
      <div className="controls">
        <button onClick={isPlaying ? pause : () => playEpisode(currentEpisode)}>
          {isPlaying ? "⏸️" : "▶️"}
        </button>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={progress}
          onChange={handleSeekChange}
        />
        <span className="time">
          {Math.floor(progress / 60)}:
          {("0" + Math.floor(progress % 60)).slice(-2)} /{" "}
          {Math.floor(duration / 60)}:
          {("0" + Math.floor(duration % 60)).slice(-2)}
        </span>
      </div>
    </div>
  );
}
