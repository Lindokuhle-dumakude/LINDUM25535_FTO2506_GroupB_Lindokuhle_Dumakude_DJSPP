// src/audio/AudioPlayer.jsx
import { useAudioPlayer } from "./AudioPlayerContext";
import { useEffect } from "react";

/**
 * AudioPlayer component displays the audio controls and progress bar.
 * It uses the shared audio player context for state and functions.
 */
export default function AudioPlayer() {
  // Get all needed state and control functions from context
  const {
    audioRef,
    currentEpisode,
    isPlaying,
    progress,
    duration,
    setProgress,
    setDuration,
    pause,
  } = useAudioPlayer();

  /**
   * Effect to update progress and duration as the audio plays or loads.
   */
  useEffect(() => {
    const audio = audioRef.current;

    // Update progress every time the audio time changes
    const updateProgress = () => setProgress(audio.currentTime);

    // Set duration once audio metadata is loaded
    const loadedMetadata = () => setDuration(audio.duration);

    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("loadedmetadata", loadedMetadata);
    }

    // Cleanup listeners when component unmounts or audio changes
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("loadedmetadata", loadedMetadata);
      }
    };
  }, [audioRef, setProgress, setDuration]);

  // If no episode is selected, hide the player
  if (!currentEpisode) return null;

  return (
    <div className="audio-player">
      {/* The actual audio element */}
      <audio ref={audioRef} src={currentEpisode.audioUrl} />

      {/* Show title of current episode */}
      <div className="player-info">
        <strong>{currentEpisode.title}</strong>
      </div>

      {/* Play/Pause controls */}
      <div className="controls">
        {isPlaying ? (
          <button onClick={pause}>Pause</button>
        ) : (
          <button onClick={() => audioRef.current.play()}>Play</button>
        )}
      </div>

      {/* Seek bar to jump to different parts of the audio */}
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={progress}
        onChange={(e) => (audioRef.current.currentTime = e.target.value)}
      />
    </div>
  );
}
