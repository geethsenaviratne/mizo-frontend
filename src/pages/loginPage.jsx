import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login () {
    axios.post("http://localhost:5000/api/users/login", {
      email: email,
      password: password
    }).then((res) => {
      
      if (res.data.user == null) {
        toast.error(res.data.message);
        return;
      }
      else{
        toast.success("Login successful");
      }
      localStorage.setItem("token", res.data.token);

      if (res.data.user.type === "admin") {
        window.location.href = "/admin";
      }
      else {
        window.location.href = "/";
      }

    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-indigo-200 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Please login to your account
        </p>

        {/* Form */}
        <div className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="text"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {/* Button */}
          <button
            onClick={login}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 active:scale-95 transition-all duration-300 shadow-md"
          >
            Login
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span className="text-indigo-600 font-medium hover:underline cursor-pointer">
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}
