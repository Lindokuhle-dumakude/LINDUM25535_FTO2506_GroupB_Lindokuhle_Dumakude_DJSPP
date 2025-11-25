// src/audio/AudioPlayerContext.jsx
import { createContext, useContext, useRef, useState } from "react";

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

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}
