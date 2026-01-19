import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function signup() {
    // Basic validation for empty fields
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        firstName,
        lastName,
        email,
        password,
      });
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (e) {
      toast.error("Signup failed. Please try again.");
      console.error(e);
    }
  }
  
  return (
    <div
      className="min-h-screen w-full flex items-stretch relative"
      style={{
        backgroundImage: "url(/login.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for darkening background if needed */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* SIGNUP CARD ON LEFT */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 relative z-10">
        <div
          className="w-full max-w-md rounded-2xl shadow-2xl p-8 flex flex-col items-center"
          style={{
            background: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          {/* Logo */}
          <img
            src="/logo.jpg"
            alt="Mizo Beauty Logo"
            className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-white mb-6 text-center">Join MIZO BEAUTY today</p>
          <div className="w-full space-y-4 text-left">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            <button
              onClick={signup}
              className="w-full py-3 rounded-lg font-semibold text-white bg-rose-400 hover:bg-rose-500 transition active:scale-95"
            >
              SIGN UP
            </button>
          </div>
          <p className="text-sm text-center text-white mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-black font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      {/* INFO SECTION ON RIGHT */}
      <div className="hidden md:flex flex-col justify-center items-start w-1/2 pr-50 pl-18 z-10 relative bg-transparent">
        <div className="max-w-xl ml-auto">
          <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg whitespace-nowrap">
            Welcome to <span className="text-rose-300">MIZO BEAUTY</span>
          </h1>
          <p className="text-2xl text-white/90 mb-8 drop-shadow">
            Discover exclusive offers, track your orders, and enjoy a personalized beauty experience.<br />
            Sign up now and start your journey with us!
          </p>
        </div>
      </div>
    </div>
  );
}
