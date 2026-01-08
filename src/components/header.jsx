import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[80px] bg-[#fff3ef] shadow-md flex items-center px-6">

      {/* LEFT: LOGO */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.jpg"
          alt="Mizo Beauty Logo"
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow cursor-pointer"
        />
        <span className="font-bold text-lg text-gray-800 hidden sm:block">
          MIZO BEAUTY
        </span>
      </div>

      {/* CENTER: NAV LINKS */}
      <nav className="flex-1 flex justify-center gap-8">
        <Link
          to="/"
          className="font-medium text-gray-700 hover:text-rose-500 transition"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="font-medium text-gray-700 hover:text-rose-500 transition"
        >
          Products
        </Link>
        <Link
          to="/about"
          className="font-medium text-gray-700 hover:text-rose-500 transition"
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="font-medium text-gray-700 hover:text-rose-500 transition"
        >
          Contact Us
        </Link>
      </nav>

      {/* RIGHT: AUTH BUTTONS */}
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="text-gray-700 font-medium hover:text-rose-500 transition"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="px-4 py-2 rounded-lg bg-rose-400 text-white font-semibold hover:bg-rose-500 transition"
        >
          Sign Up
        </Link>
      </div>

    </header>
  );
}
