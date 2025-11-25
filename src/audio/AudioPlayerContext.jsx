// src/audio/AudioPlayerContext.jsx
import { createContext, useContext } from "react";

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
  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}
