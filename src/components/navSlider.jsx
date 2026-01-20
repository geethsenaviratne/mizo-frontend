import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NavSlider({ onClose }) {
  const [user, setUser] = useState(null);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    onClose();
    window.location.href = "/login";
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Slider Panel */}
      <div className="absolute left-0 top-0 w-[280px] h-full shadow-xl flex flex-col overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
          style={{ backgroundImage: "url('/mobile.jpg')" }}
        />
        <div className="absolute inset-0 bg-white/70" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">

          {/* ===== BRAND HEADER ===== */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300/50 bg-[#fff3ef]/80 backdrop-blur">
            <div className="flex items-center gap-2">
              <img
                src="/logo.jpg"   // <-- your logo path
                alt="Mizo Beauty"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="font-bold text-lg text-[#1e3a5f]  sm:block">
          MIZO BEAUTY
        </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-700 hover:text-rose-500 transition"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>

          {/* ===== PROFILE SECTION ===== */}
          {user ? (
            <div className="px-6 py-4 border-b border-gray-300/50">
              <div className="flex items-center gap-3 bg-white/80 rounded-xl p-3 shadow-sm">
                <img
                  src={user.profilePicture || "/user.png"}
                  alt={user.firstName}
                  className="w-12 h-12 rounded-full object-cover border"
                  onError={e => { e.target.onerror = null; e.target.src = "/user.png"; }}
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {user.firstName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.type || "user"}
                  </p>
                </div>
              </div>

              <Link
                to="/orders"
                onClick={onClose}
                className="block mt-3 text-sm font-medium text-gray-700 hover:text-rose-500"
              >
                View Orders →
              </Link>
            </div>
          ) : (
            <div className="px-6 py-4 border-b border-gray-300/50">
              <p className="text-sm text-gray-600">
                Welcome 👋 Please login to continue
              </p>
            </div>
          )}

          {/* ===== NAV LINKS ===== */}
          <nav className="flex flex-col px-6 gap-4 mt-4">
            {[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "About Us", path: "/about" },
              { name: "Contact Us", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className="font-semibold text-gray-800 hover:text-rose-500 transition py-2 border-b border-gray-200/50"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* ===== AUTH / LOGOUT ===== */}
          <div className="mt-auto p-6 flex flex-col gap-3">
            {user ? (
              <>
                <button
                  onClick={() => setIsLogoutConfirmOpen(true)}
                  className="flex items-center justify-center gap-2 py-2 border border-red-400 rounded-lg text-red-600 font-semibold hover:bg-rose-200 transition cursor-pointer"
                >
                  <FiLogOut />
                  Logout
                </button>
                {isLogoutConfirmOpen && (
                  <div className="fixed inset-0 z-[200] flex items-start justify-center pt-16 bg-black/40">
                    <div className="bg-white rounded-2xl p-8 shadow-2xl w-80 border border-gray-200 animate-fade-in-up relative">
                      <button
                        onClick={() => setIsLogoutConfirmOpen(false)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold focus:outline-none"
                        aria-label="Close"
                      >
                        &times;
                      </button>
                      <div className="flex flex-col items-center">
                        <div className="mb-3 text-rose-500">
                          <FiLogOut className="text-4xl" />
                        </div>
                        <p className="mb-6 text-center text-lg text-gray-800 font-semibold">Are you sure you want to logout?</p>
                        <div className="flex gap-4 w-full">
                          <button
                            onClick={() => setIsLogoutConfirmOpen(false)}
                            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium shadow"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={logout}
                            className="flex-1 px-4 py-2 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition font-medium shadow"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={onClose}
                  className="px-4 py-2 bg-rose-500 text-white shadow hover:bg-rose-600 transition text-sm font-medium rounded-lg text-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={onClose}
                  className="px-4 py-2 bg-[#1e3a5f] text-white shadow hover:bg-[#1e3a5f]/90 transition text-sm font-medium rounded-lg text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
