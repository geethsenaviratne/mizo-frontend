import { useState, useEffect } from "react";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Premium Products" },
    { number: "50+", label: "Brand Partners" },
    { number: "10+", label: "Years Experience" },
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "100% Authentic",
      description: "Every product is sourced directly from authorized distributors and brands.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Customer First",
      description: "Your satisfaction is our priority. We're here to help you find your perfect products.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Global Brands",
      description: "We bring the world's finest beauty brands right to your doorstep.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Best Value",
      description: "Premium quality at competitive prices with regular offers and rewards.",
    },
  ];

  const team = [
    { image: "/about1.jpg", name: "Sarah Johnson", role: "Founder & CEO" },
    { image: "/about2.jpg", name: "Emily Chen", role: "Beauty Director" },
    { image: "/about3.jpg", name: "Maria Garcia", role: "Customer Experience" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative -mx-6 -mt-10 h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src="/about.jpg"
          alt="About MIZO BEAUTY"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/80 to-[#1e3a5f]/40" />
        <div 
          className={`absolute inset-0 flex items-center justify-center text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-3xl px-6">
            <p className="text-[#f8d7d0] text-sm tracking-[0.3em] mb-4 uppercase">Our Story</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
              Beauty That Inspires Confidence
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              Since 2015, we've been on a mission to bring the world's finest beauty products to you, 
              helping you discover your unique radiance.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-[#f8d7d0]/20 -mx-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center transition-all duration-700 delay-${index * 100} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <p className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-2">{stat.number}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}>
              <p className="text-[#f8d7d0] text-sm tracking-[0.2em] mb-3 uppercase font-medium">Who We Are</p>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-6">
                Curating Beauty, Creating Joy
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  MIZO BEAUTY was born from a simple belief: everyone deserves access to premium, 
                  authentic beauty products that make them feel confident and beautiful.
                </p>
                <p>
                  What started as a small passion project in 2015 has grown into Sri Lanka's most 
                  trusted online beauty destination, serving over 10,000 happy customers with carefully 
                  curated products from around the world.
                </p>
                <p>
                  We partner directly with authorized distributors and brands to ensure every product 
                  you receive is 100% authentic. Your trust is our most valued asset.
                </p>
              </div>
            </div>
            <div className={`relative transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}>
              <div className="relative">
                <img
                  src="/about1.jpg"
                  alt="Our Story"
                  className="w-full h-[400px] object-cover rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#f8d7d0] rounded-lg -z-10" />
                <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-[#1e3a5f] rounded-lg -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 md:py-24 bg-[#1e3a5f] -mx-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#f8d7d0] text-sm tracking-[0.2em] mb-3 uppercase font-medium">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 delay-${index * 100} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f8d7d0] text-[#1e3a5f] mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-white/70 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section with Image Grid */}
      <div className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/about2.jpg"
                  alt="Our Mission"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <img
                  src="/about3.jpg"
                  alt="Our Vision"
                  className="w-full h-48 object-cover rounded-lg shadow-lg mt-8"
                />
                <img
                  src="/about1.jpg"
                  alt="Our Team"
                  className="w-full h-48 object-cover rounded-lg shadow-lg -mt-4"
                />
                <img
                  src="/about.jpg"
                  alt="Our Products"
                  className="w-full h-48 object-cover rounded-lg shadow-lg mt-4"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-[#f8d7d0] text-sm tracking-[0.2em] mb-3 uppercase font-medium bg-[#f8d7d0]/20 inline-block px-3 py-1 rounded-full">Our Mission</p>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-6">
                Empowering Your Beauty Journey
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Our mission is simple: to make premium beauty accessible to everyone while maintaining 
                  the highest standards of authenticity and customer service.
                </p>
                <p>
                  We believe that beauty is personal, and finding the right products should be a joyful 
                  experience. That's why we've created a curated collection of the world's best beauty 
                  brands, all in one place.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#f8d7d0] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">Authentic Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#f8d7d0] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">Expert Curation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#f8d7d0] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 md:py-24 bg-gray-50 -mx-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#f8d7d0] text-sm tracking-[0.2em] mb-3 uppercase font-medium bg-[#f8d7d0]/30 inline-block px-4 py-1 rounded-full">Meet The Team</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mt-4">
              The Faces Behind MIZO
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Our passionate team works tirelessly to bring you the best beauty experience
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-[#f8d7d0] text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-6">
            Ready to Start Your Beauty Journey?
          </h2>
          <p className="text-gray-600 mb-8">
            Explore our collection of premium beauty products and discover what makes you shine.
          </p>
          <a
            href="/products"
            className="inline-block px-8 py-4 bg-[#1e3a5f] hover:bg-[#2d5a8a] text-white font-medium rounded-md transition-colors shadow-lg hover:shadow-xl"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}
