// src/audio/AudioPlayerContext.jsx
import { createContext, useContext, useRef, useState, useEffect } from "react";

/**
 * Creates a context for the audio player so components can share audio state and controls.
 */
const AudioPlayerContext = createContext();

/**
 * Provides audio player state and control functions to child components.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that can access the audio player.
 */
export function AudioPlayerProvider({ children }) {
  /** Reference to the HTML audio element. Used to control playback. */
  const audioRef = useRef(null);

  /** The currently playing episode object. */
  const [currentEpisode, setCurrentEpisode] = useState(null);

  /** Whether audio is currently playing. */
  const [isPlaying, setIsPlaying] = useState(false);

  /** Current playback time (in seconds). */
  const [progress, setProgress] = useState(0);

  /** Total duration of the current audio (in seconds). */
  const [duration, setDuration] = useState(0);

  /**
   * Plays a given episode.
   *
   * @param {Object} episode - The episode object to play.
   */
  const playEpisode = (episode) => {
    setCurrentEpisode(episode);

    // Wait for the audio element to load the new source, then play
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 0);
  };

  /**
   * Pauses the current audio playback.
   */
  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  /**
   * Seeks the audio to a specific time.
   *
   * @param {number} seconds - The time in seconds to jump to in the audio.
   */
  const seekTo = (seconds) => {
    audioRef.current.currentTime = seconds;
    setProgress(seconds);
  };

  /** Update progress as audio plays */
  const handleTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
  };

  /** Set duration when metadata is loaded */
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  /** Warn user before leaving the page if audio is playing */
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isPlaying) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isPlaying]);

  // All values and functions we want to share with other components
  const value = {
    audioRef,
    currentEpisode,
    isPlaying,
    progress,
    duration,
    playEpisode,
    pause,
    seekTo,
    setProgress,
    setDuration,
    handleTimeUpdate,
    handleLoadedMetadata,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

/**
 * Custom hook to access the audio player context.
 *
 * @returns {Object} The audio player state and control functions.
 */
export const useAudioPlayer = () => useContext(AudioPlayerContext);
