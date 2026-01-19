import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { FiMoreVertical, FiLogOut, FiSettings } from "react-icons/fi";
import { FaBoxOpen } from "react-icons/fa";

export default function UserData() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token != null) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setUser(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    localStorage.removeItem("token");
                    setUser(null);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    /* ---------------- LOADING ---------------- */
    if (loading) {
        return (
            <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow animate-pulse">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="space-y-1">
                    <div className="w-20 h-3 bg-gray-200 rounded"></div>
                    <div className="w-12 h-2 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    /* ---------------- NOT LOGGED ---------------- */
    if (!user) {
    return (
        <div className="flex items-center gap-3">
            <a
                href="/login"
                className="px-4 py-2 bg-rose-500 text-white  shadow hover:bg-rose-600 transition text-sm font-medium"
            >
                Login
            </a>

            <a
                href="/signup"
                className="px-4 py-2 bg-[#1e3a5f] text-white  shadow hover:bg-[#1e3a5f]/90 transition text-sm font-medium"
            >
                Sign Up
            </a>
        </div>
    );
}

    /* ---------------- USER PILL ---------------- */
    return (
        <div className="relative" ref={menuRef}>
            <div className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-rose-200 to-rose-300 rounded-full shadow-lg text-black cursor-pointer hover:shadow-xl transition">

                {/* AVATAR */}
                <div className="w-9 h-9 rounded-full bg-white overflow-hidden">
                    <img
                        src={user.profilePicture || "/user.png"}
                        alt={user.firstName}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.onerror = null; e.target.src = "/user.png"; }}
                    />
                </div>

                {/* NAME + ROLE */}
                <div className="leading-tight">
                    <p className="text-sm font-semibold truncate max-w-[100px]">
                        {user.firstName}
                    </p>
                    <p className="text-xs opacity-90 capitalize">
                        {user.type || "user"}
                    </p>
                </div>

                {/* 3 DOT MENU */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="ml-1 p-1 rounded-full hover:bg-white/20 transition"
                >
                    <FiMoreVertical className="text-lg" />
                </button>
            </div>

            {/* DROPDOWN */}
            {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border z-50 overflow-hidden animate-fade-in">
                    
                    <a
                        href="/orders"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                        <FaBoxOpen className="text-gray-500" />
                        My Orders
                    </a>

                    <a
                        href="/account"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                        <FiSettings className="text-gray-500" />
                        Account Settings
                    </a>

                    <button
                        onClick={() => {setIsLogoutConfirmOpen(true)}}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
                    >
                        <FiLogOut />
                        Logout
                    </button>
                    {isLogoutConfirmOpen && (
                        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black/40">
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
                                            className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition font-medium shadow"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
