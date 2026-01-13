import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const navigate = useNavigate();
  const googlelogin = useGoogleLogin({
    onSuccess: (res)=>{
      console.log("Google login success:", res);
      axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/google", {
        token: res.access_token
      }).then(
        (res)=>{
          if(res.data.message == "User created successfully"){

            toast.success("Your account has been created via Google Login");
        }else{
          localStorage.setItem("token", res.data.token);
          if(res.data.user.type === "admin"){
            navigate("/admin");
          }else{
            navigate("/");
          }
        }
      }
          
      )
    }
  })

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
    <div className="min-h-screen flex">

      {/* LEFT IMAGE SECTION */}
      <div className="hidden lg:flex w-1/2">
        <img
          src="/login.jpg"
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#fff3ef] px-6">
        <div className="w-full max-w-md text-center">

          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <img
              src="/logo.jpg"
              alt="Mizo Beauty Logo"
              className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-white"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to MIZO BEAUTY
          </h1>
          <p className="text-gray-500 mb-8">
            Login to your MIZO BEAUTY account
          </p>

          <div className="space-y-4 text-left">

            <input
              type="email"
              placeholder="Email"
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

            <button
              onClick={login}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition active:scale-95 ${
                loading
                  ? "bg-rose-300 cursor-not-allowed"
                  : "bg-rose-400 hover:bg-rose-500"
              }`}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-400">OR</span>
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

          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-rose-500 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
