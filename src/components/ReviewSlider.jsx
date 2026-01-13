import { useState, useEffect, useRef } from "react";

// Testimonials Data
const testimonials = [
  {
    id: 1,
    review: "I've been using this product for a month and I'm amazed at how much it brightened up dark spots on my face, helped maintain moisture on my face (i have dry skin) and overall how it brightened my complexion.",
    title: "Impressive result",
    name: "Sachini K."
  },
  {
    id: 2,
    review: "A 'go to' place for genuine products at reasonable prices. Very much satisfied with their super fast delivery service. Highly recommended and thank you!",
    title: "My \"GO TO\" Place",
    name: "Krishaani R."
  },
  {
    id: 3,
    review: "Does what it says, leaves my skin soft and clean",
    title: "Love, love, love!",
    name: "Liyana L."
  },
  {
    id: 4,
    review: "Amazing quality products! The packaging is beautiful and the products work exactly as described. Will definitely be ordering again.",
    title: "Absolutely Amazing",
    name: "Nethmi S."
  },
  {
    id: 5,
    review: "Best skincare shop in Sri Lanka! Fast delivery and authentic products. Customer service is also excellent.",
    title: "Highly Recommend",
    name: "Dilini P."
  },
  {
    id: 6,
    review: "Finally found a reliable place for K-beauty products. The prices are reasonable and delivery is quick. Love shopping here!",
    title: "My Favorite Store",
    name: "Ayesha M."
  }
];

export default function ReviewSlider() {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll to center the active card (with cycling)
  const scrollToCard = (index) => {
    let newIndex = index;
    // Cycle to last if going before first
    if (index < 0) {
      newIndex = testimonials.length - 1;
    }
    // Cycle to first if going past last
    else if (index >= testimonials.length) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  // Center the active card when activeIndex changes
  useEffect(() => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const cardWidth = 350;
      const containerWidth = container.offsetWidth;
      const scrollPosition = (activeIndex * cardWidth) - (containerWidth / 2) + (cardWidth / 2);
      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (containerRef.current && containerRef.current.contains(document.activeElement)) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          scrollToCard(activeIndex - 1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          scrollToCard(activeIndex + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  // Mouse handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    updateActiveFromScroll();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      updateActiveFromScroll();
    }
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    updateActiveFromScroll();
  };

  // Update active index based on scroll position
  const updateActiveFromScroll = () => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const cardWidth = 350;
      const containerWidth = container.offsetWidth;
      const scrollPosition = container.scrollLeft + (containerWidth / 2);
      const index = Math.round(scrollPosition / cardWidth);
      setActiveIndex(Math.max(0, Math.min(index, testimonials.length - 1)));
    }
  };

  return (
    <div 
      ref={containerRef}
      tabIndex={0}
      className="mt-16 sm:mt-20 -mx-6 py-16 bg-[#f8d7d0] outline-none"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-serif text-[#1e3a5f] text-center mb-12">
          Don't take our word for it
        </h2>

        {/* Keyboard hint */}
        <p className="text-center text-gray-600 text-sm mb-6">
          Click here and use ← → arrow keys to navigate
        </p>

        {/* Testimonials Slider */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-4 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              onClick={() => scrollToCard(index)}
              className={`flex-shrink-0 w-[300px] sm:w-[350px] bg-white rounded-lg p-8 transition-all duration-300 cursor-pointer ${
                activeIndex === index 
                  ? 'shadow-2xl scale-110 z-10 -translate-y-2' 
                  : 'shadow-sm opacity-60 hover:opacity-80'
              }`}
            >
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${activeIndex === index ? 'text-yellow-500' : 'text-gray-800'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-center text-sm leading-relaxed mb-6 min-h-[80px]">
                {testimonial.review}
              </p>
              <div className="text-center">
                <p className="font-semibold text-gray-800">{testimonial.title}</p>
                <p className="text-gray-500 text-sm">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => scrollToCard(activeIndex - 1)}
            className="p-3 rounded-full transition-all bg-white text-gray-800 hover:bg-gray-100 shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-[#1e3a5f] w-6' : 'bg-gray-400 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollToCard(activeIndex + 1)}
            className="p-3 rounded-full transition-all bg-white text-gray-800 hover:bg-gray-100 shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
