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
      className="mt-16 sm:mt-20 -mx-6 py-16 bg-[#223b5b] outline-none"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-serif text-[#f8d7d0] text-center mb-4 tracking-wide uppercase">Our Customers Say</h2>
        <h3 className="text-4xl font-serif text-white text-center mb-12 font-bold">What Our Customers Think</h3>

        {/* Testimonials Cards in Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {testimonials.slice(0, 4).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-[#355072] rounded-xl shadow-lg p-8 flex flex-col items-center w-full max-w-xs min-h-[260px]"
            >
              {/* Icon */}
              <div className="bg-[#f8d7d0] rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#223b5b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <p className="text-white text-center text-base leading-relaxed mb-4">{testimonial.review}</p>
              <div className="text-center mt-auto">
                <p className="font-bold text-[#f8d7d0] text-lg">{testimonial.title}</p>
                <p className="text-[#f8d7d0] text-sm">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Show more button for all reviews */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => scrollToCard(activeIndex + 1)}
            className="px-6 py-3 rounded-lg bg-[#f8d7d0] text-[#223b5b] font-semibold shadow hover:bg-[#eec1b2] transition"
          >
            See More Reviews
          </button>
        </div>
      </div>
    </div>
  );
}
