import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomeSlider() {
  const images = [
    "/home4.jpg",
    "/home5.jpg",
    "/home3.jpg",
    "/home1.jpg",
    "/home2.jpg",
    "/home6.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect - runs every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Slides Container */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Gradient Overlay for brand consistency */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/70 via-[#1e3a5f]/20 to-transparent z-15 pointer-events-none" />

      {/* SHOP NOW Button */}
      <Link
        to="/products"
        className="absolute left-1/2 -translate-x-1/2 bottom-10 sm:bottom-24 md:bottom-18 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-8 py-3 sm:px-10 sm:py-4  shadow-lg transition-all duration-300 z-20 text-sm sm:text-base tracking-wide"
      >
        SHOP NOW!
      </Link>

      

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? "bg-white w-6 sm:w-8" 
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
