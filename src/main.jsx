import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PodcastProvider } from "./context/PodcastContext.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PodcastProvider>
      <App />
    </PodcastProvider>
  </BrowserRouter>
);
