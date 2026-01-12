import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export default function NavSlider({ onClose }) {
return (
      <div className="fixed inset-0 z-[100]">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50" 
          onClick={onClose}
        />
        {/* Slider Panel */}
        <div className="absolute left-0 top-0 w-[280px] h-full shadow-xl flex flex-col overflow-hidden">
          {/* Blurred Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
            style={{ backgroundImage: "url('/mobile.jpg')" }}
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-white/70" />
          
          {/* Content - positioned above the blur */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button 
                onClick={onClose}
                className="p-2 text-gray-700 hover:text-rose-500 transition"
              >
                <IoClose className="text-2xl" />
              </button>
            </div>
            {/* Nav Links */}
            <nav className="flex flex-col px-6 gap-4">
              <Link
                to="/"
                onClick={onClose}
                className="font-semibold text-gray-800 hover:text-rose-500 transition py-2 border-b border-gray-200/50"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={onClose}
                className="font-semibold text-gray-800 hover:text-rose-500 transition py-2 border-b border-gray-200/50"
              >
                Products
              </Link>
              <Link
                to="/about"
                onClick={onClose}
                className="font-semibold text-gray-800 hover:text-rose-500 transition py-2 border-b border-gray-200/50"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={onClose}
                className="font-semibold text-gray-800 hover:text-rose-500 transition py-2 border-b border-gray-200/50"
              >
                Contact Us
              </Link>
            </nav>
            {/* Auth Buttons */}
            <div className="mt-auto p-6 flex flex-col gap-3">
              <Link
                to="/login"
                onClick={onClose}
                className="text-center py-2 border border-gray-400 rounded-lg text-gray-800 font-semibold hover:bg-white/50 transition backdrop-blur-sm"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={onClose}
                className="text-center py-2 bg-rose-400 text-white font-semibold rounded-lg hover:bg-rose-500 transition shadow-md"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    )

}