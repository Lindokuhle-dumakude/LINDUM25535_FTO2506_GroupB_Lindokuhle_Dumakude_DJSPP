// src/audio/AudioPlayer.jsx
import { useAudioPlayer } from "./AudioPlayerContext";

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
}
