import React, { useState, useEffect } from 'react';
import './Header.css';
import { assets } from '../../assets/assets'; // Assuming assets contains the video paths

const Header = () => {
  const slides = [
    {
      src: 'https://fillongley-hall.co.uk/wp-content/uploads/2024/04/FH-Website-header-sizes.png',
      caption: "Experience seamless event management tailored to perfection.",
    },
    {
      src: 'https://www.cvent.com/sites/default/files/image/2019-08/blog-topic-header-connect.jpg',
      caption: "Create memories that last a lifetime with our expert services.",
    },
    {
      src: 'https://www.drpgroup.com/hubfs/Case%20Studies%20(New%20Site)/Homepage/Hero%20Headers/Exhibition%20and%20Display%20-%20Hero%20Header%20-%20Homepage%20-%201.jpg',
      caption: "Your moments, our passion. Watch your dreams come alive.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [slides.length]);

  return (
    <div className="header-carousel">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <img src={slide.src} className="carousel-video" />
          <div className="carousel-content">
            <h2 style={{fontSize:"60px",textShadow:'2px 2px 2px black'}}>{slide.caption}</h2>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Header;
