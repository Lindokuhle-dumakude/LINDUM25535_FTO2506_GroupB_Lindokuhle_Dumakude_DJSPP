import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import Favourites from "./pages/Favourites";
import { PodcastProvider } from "./context/PodcastContext";
import { FavouritesProvider } from "./favourites/FavouritesContext";
import { AudioPlayerProvider } from "./audio/AudioPlayerContext";
import AudioPlayer from "./audio/AudioPlayer";
import { ThemeProvider } from "./theme/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <PodcastProvider>
        <FavouritesProvider>
          <AudioPlayerProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/show/:id" element={<ShowDetail />} />
              <Route path="/favourites" element={<Favourites />} />
            </Routes>

            <AudioPlayer />
          </AudioPlayerProvider>
        </FavouritesProvider>
      </PodcastProvider>
    </ThemeProvider>
  );
}
