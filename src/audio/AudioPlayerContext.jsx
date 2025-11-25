// src/audio/AudioPlayerContext.jsx
import { createContext, useContext, useRef } from "react";

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

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}
