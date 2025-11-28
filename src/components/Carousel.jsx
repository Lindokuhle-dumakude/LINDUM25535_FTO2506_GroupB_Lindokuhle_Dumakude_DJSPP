import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

import "../styles/Carousel.css";
import { getGenreTitle } from "../utils/getGenreTitle";

/**
 * Carousel component displaying a scrollable slider of shows using Swiper.
 * Each show card is clickable and navigates to the show's detail page.
 *
 * @param {Object} props - Component props
 * @param {Array} props.shows - List of shows to display in the carousel
 */
export default function Carousel({ shows }) {
  const navigate = useNavigate(); // Used to navigate to show detail page

  return (
    <div className="carousel-wrapper">
      <Swiper
        modules={[Autoplay, Navigation]} // Enable autoplay and navigation arrows
        slidesPerView={3} // Number of slides shown at once
        spaceBetween={16} // Space in pixels between slides
        loop={true} // Loop the slides infinitely
        autoplay={{
          delay: 2500, // 2.5 seconds between auto-slide
          disableOnInteraction: false, // Keep autoplay after user interaction
          pauseOnMouseEnter: true, // Pause autoplay on hover
        }}
        speed={800} // Slide transition speed in ms
        navigation={true} // Show navigation arrows
        breakpoints={{
          // Responsive design
          0: { slidesPerView: 1 },
          700: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {shows.map((show) => (
          <SwiperSlide key={show.id}>
            <div
              className="carousel-item"
              onClick={() => navigate(`/show/${show.id}`)} // Go to detail page
            >
              {/* Show image */}
              <img
                src={show.image}
                alt={show.title}
                className="carousel-image"
              />

              {/* Show title */}
              <h3 className="carousel-title">{show.title}</h3>

              {/* Show genres */}
              <div className="genre-tags">
                {show.genres.map((genreId) => (
                  <span key={genreId} className="genre-tag">
                    {getGenreTitle(genreId)}{" "}
                    {/* Convert genre ID to readable title */}
                  </span>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
