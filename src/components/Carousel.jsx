// src/components/Carousel.jsx
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "../styles/Carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * Carousel component that displays a scrollable slider of shows.
 * Each show is clickable and navigates to its detail page.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.shows - List of show objects to display in the slider.
 */
export default function Carousel({ shows }) {
  const navigate = useNavigate(); // used to redirect when a show is clicked

  /**
   * Slider settings for react-slick.
   * Controls speed, number of slides shown, responsiveness, etc.
   */
  const settings = {
    dots: true, // show navigation dots
    infinite: true, // loop the slides
    speed: 500, // animation speed
    slidesToShow: 3, // show 3 slides at a time on desktop
    slidesToScroll: 1, // scroll one slide at a time
    swipeToSlide: true, // allow dragging/swiping freely
    arrows: true, // show left & right arrow buttons
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } }, // tablet view
      { breakpoint: 600, settings: { slidesToShow: 1 } }, // mobile view
    ],
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {shows.map((show) => (
          <div
            key={show.id}
            className="carousel-item card"
            onClick={() => navigate(`/show/${show.id}`)}
          >
            {/* Show image */}
            <img src={show.image} alt={show.title} className="carousel-image" />

            {/* Show title */}
            <h3>{show.title}</h3>

            {/* Show genre tags */}
            <div className="genre-tags">
              {show.genres.map((g) => (
                <span key={g} className="genre-tag">
                  {g}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
