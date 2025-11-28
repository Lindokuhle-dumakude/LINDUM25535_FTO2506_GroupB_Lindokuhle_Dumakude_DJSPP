import { createContext, useContext, useRef, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

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
  const audioRef = useRef(null);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Persisted listening progress across sessions
  const [listeningProgress, setListeningProgress] = useLocalStorage(
    "listeningProgress",
    {}
  );

  const playEpisode = (episode) => {
    if (!episode.file) {
      alert("Audio not available for this episode.");
      return;
    }

    setCurrentEpisode(episode);

    if (audioRef.current) {
      audioRef.current.src = episode.file;

      // Resume from saved timestamp if available
      const savedTime = listeningProgress[episode.id]?.timestamp || 0;
      audioRef.current.currentTime = savedTime;

      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Playback failed:", err));
    }
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const seekTo = (seconds) => {
    audioRef.current.currentTime = seconds;
    setProgress(seconds);

    if (currentEpisode) {
      setListeningProgress((prev) => ({
        ...prev,
        [currentEpisode.id]: {
          ...prev[currentEpisode.id],
          timestamp: seconds,
          finished: seconds >= (duration || 0),
        },
      }));
    }
  };

  const handleTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);

    if (currentEpisode) {
      const finished =
        audioRef.current.currentTime >= (audioRef.current.duration || 0);

      setListeningProgress((prev) => ({
        ...prev,
        [currentEpisode.id]: {
          ...prev[currentEpisode.id],
          timestamp: audioRef.current.currentTime,
          finished,
        },
      }));
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Reset all listening progress
  const resetProgress = () => setListeningProgress({});

  // Warn user before leaving the page if audio is playing
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isPlaying) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isPlaying]);

  const value = {
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
    resetProgress,
    setProgress,
    setDuration,
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
