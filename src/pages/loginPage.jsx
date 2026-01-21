import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const navigate = useNavigate();
  const googlelogin = useGoogleLogin({
    onSuccess: (res) => {
      console.log("Google login success:", res);
      axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/google", {
        token: res.access_token
      }).then(
        (res) => {
          if (res.data.message == "User created successfully") {
            toast.success("Your account has been created via Google Login");
          } else {
            localStorage.setItem("token", res.data.token);
            if (res.data.user.type === "admin") {
              navigate("/admin");
            } else {
              navigate("/");
            }
          }
        }
      ).catch((err) => {
  toast.error(err?.response?.data?.message || "Google login failed");
});
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    try {
      setLoading(true);
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        { email, password }
      );

      if (!res.data || res.data.user == null) {
        toast.error(res.data?.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      toast.success("Login successful");
      localStorage.setItem("token", res.data.token);

      const destination = res.data.user.type === "admin" ? "/admin" : "/";
      setTimeout(() => {
        navigate(destination);
        setLoading(false);
      }, 700);
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.response?.data?.message || "Login failed");
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-stretch relative"
      style={{
        backgroundImage: 'url(/login.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for darkening background if needed */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Left Info Section */}
      <div className="hidden md:flex flex-col justify-center items-start w-1/2 pl-16 z-10 relative">
        <div className="max-w-lg">
          <h1 className="text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            Glow on. <span className="text-rose-300">Shop on.</span>
          </h1>
          <p className="text-2xl text-white/90 mb-8 drop-shadow">
            Sign in to explore exclusive offers, track your orders, and save your favorite beauty picks. Beautiful shopping, made simple.
          </p>
        </div>
      </div>

      {/* Login Card on Right */}
      <div className="w-full md:w-[420px] lg:w-[720px] flex items-center justify-center ml-auto md:mr-29 relative z-20">
        <div
          className="w-full max-w-md rounded-2xl shadow-2xl p-8 flex flex-col items-center"
          style={{
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          {/* Logo */}
          <img
            src="/logo.jpg"
            alt="Mizo Beauty Logo"
            className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to MIZO BEAUTY</h2>
          <p className="text-white mb-6 text-center">
            Log in to continue your beauty journey and checkout faster.
          </p>
          <div className="w-full space-y-4 text-left">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
              {/* Forgot Password Link */}
              <div className="w-full text-right mb-2">
                <Link to="/forgot-password" className="text-sm text-rose-400 hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>
            <button
              onClick={login}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition active:scale-95 ${
                loading
                  ? "bg-rose-300 cursor-not-allowed"
                  : "bg-rose-400 hover:bg-rose-500"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-white">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            {/* Google Login Button */}
            <button
              onClick={() => googlelogin()}
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold border border-gray-300 bg-white hover:bg-gray-50 transition active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
            >
              <FcGoogle className="text-xl" />
              <span className="text-gray-700">Continue with Google</span>
            </button>
          </div>
          <p className="text-sm text-center text-white mt-6">
            New to CBC?{' '}
            <Link
              to="/signup"
              className="text-black font-medium hover:underline"
            >
              Create your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
