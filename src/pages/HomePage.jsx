import Header from "../components/header";
import { Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoginPage from "./loginPage";
import ProductOverview from "./home/productOverview";
import ProductPage from "./home/product";
import Cart from "./home/cart";
import HomeSlider from "../components/HomeSlider";
import ProductCard from "../components/productCard";
import ReviewSlider from "../components/ReviewSlider";
import Footer from "../components/Footer";
import AboutPage from "./about";

// Home Content Component with Slider and New Arrivals
function HomeContent() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/")
      .then((res) => {
        // Get first 5 products for New Arrivals
        setNewArrivals(res.data.slice(0, 5));
        // Get next 5 products (6-10) for Best Sellers
        setBestSellers(res.data.slice(5, 10));
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error fetching products");
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full">
      {/* Hero Image Slider */}
      <div className="-mx-6 -mt-10">
        <HomeSlider />
      </div>

      {/* New Arrivals Section */}
      <div className="mt-12 sm:mt-16">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1e3a5f]">
            New Arrivals
          </h2>
          <Link
            to="/products"
            className="text-[#1e3a5f] hover:text-[#2d5a8a] text-sm font-medium underline underline-offset-4 transition-colors"
          >
            View all
          </Link>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e3a5f]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Best Sellers Section */}
      <div className="mt-12 sm:mt-16">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1e3a5f]">
            Best Sellers
          </h2>
          <Link
            to="/products"
            className="text-[#1e3a5f] hover:text-[#2d5a8a] text-sm font-medium underline underline-offset-4 transition-colors"
          >
            View all
          </Link>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e3a5f]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Discover Your Radiance Section */}
      <div className="mt-16 sm:mt-20 -mx-6 px-6 py-16 bg-gradient-to-r from-[#fdf8f6] to-[#f5ebe6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <p className="text-sm font-medium tracking-widest text-[#c97b5d] mb-4">
                WELCOME TO MIZO BEAUTY
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-gray-900 leading-tight mb-2">
                Discover Your
              </h2>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#c97b5d] leading-tight mb-6">
                Radiance
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                Curated premium cosmetics and skincare products from around the world. Elevate your beauty routine with our exclusive collection.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-rose-400 hover:bg-rose-500 text-white font-medium px-6 py-3 transition-colors"
                >
                  Shop Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-medium px-6 py-3 border border-gray-300 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Video */}
            <div className="order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <video
                  src="/home.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <ReviewSlider />

      {/* Trust Features Section */}
      <div className="mt-16 sm:mt-20 -mx-6 px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 100% Authentic */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-serif text-[#1e3a5f] mb-2">100 % Authentic</h3>
              <p className="text-gray-500 text-sm">100% Authentic Products from Trusted Sellers</p>
            </div>

            {/* Islandwide Delivery */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-serif text-[#1e3a5f] mb-2">Islandwide Delivery</h3>
              <p className="text-gray-500 text-sm">Quick and Secure delivery within 1-3 working days</p>
            </div>

            {/* Easy Payment Options */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-serif text-[#1e3a5f] mb-2">Easy Payment Options</h3>
              <p className="text-gray-500 text-sm">Enjoy the convenience of getting what you want and paying for it over time with KokoPay</p>
            </div>

            {/* Trusted Online Store */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-serif text-[#1e3a5f] mb-2">Trusted Online Store</h3>
              <p className="text-gray-500 text-sm">Join our Thriving Community of 10,000+ customers since 2015</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="w-full">
      <Header />

      <div className="w-full min-h-screen pt-30 bg-[#f9fafb] px-6 pt-10">
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productInfo/:id" element={<ProductOverview />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
