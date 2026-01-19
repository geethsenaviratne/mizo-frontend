import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import NavSlider from "./navSlider";
import UserData from "./userData";


export default function Header() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  return (
    <>
    {/* Mobile Slider Menu */}
    {isSliderOpen && <NavSlider onClose={() => setIsSliderOpen(false)} />}


    <header className="fixed top-0 left-0 right-0 z-50 h-[80px] bg-[#fff3ef] shadow-md flex items-center px-6">

      {/* LEFT: LOGO */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.jpg"
          alt="Mizo Beauty Logo"
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow cursor-pointer"
        />
        <span className="font-bold text-lg text-[#1e3a5f]  sm:block">
          MIZO BEAUTY
        </span>
      </div>

      {/* MOBILE: Cart + Hamburger Menu - shows on mobile, hidden on large screens */}
      <div className="ml-auto lg:hidden flex items-center gap-3">
        <Link
          to="/cart"
          className="p-2 text-[#1e3a5f] hover:text-rose-500 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </Link>
        <button 
          onClick={() => setIsSliderOpen(true)}
          className="p-2 text-[#1e3a5f] hover:text-rose-500 transition"
        >
          <RxHamburgerMenu className="text-2xl" />
        </button>
      </div>

      {/* CENTER: NAV LINKS - absolutely centered */}
      <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex justify-center gap-8">
        <Link
          to="/"
          className="font-medium text-[#1e3a5f] hover:text-rose-500 transition"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="font-medium text-[#1e3a5f] hover:text-rose-500 transition"
        >
          Products
        </Link>
        <Link
          to="/about"
          className="font-medium text-[#1e3a5f] hover:text-rose-500 transition"
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="font-medium text-[#1e3a5f] hover:text-rose-500 transition"
        >
          Contact Us
        </Link>
      </nav>

      {/* RIGHT: CART & AUTH BUTTONS */}
      <div className="ml-auto hidden lg:flex items-center gap-5">
        {/* Cart Icon */}
        <Link
          to="/cart"
          className="relative flex items-center gap-1 text-[#1e3a5f] hover:text-rose-500 transition group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 group-hover:scale-110 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="hidden sm:inline font-medium">Cart</span>
        </Link>

        <div className="w-px h-6 bg-gray-300"></div>

        <div><UserData/></div>

       

        
      </div>

    </header>
    </>
  );
}
