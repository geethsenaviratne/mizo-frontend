import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";



export default function LoginPage() {
   
  const [email, setEmail] = useState("Your email");
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
      toast.success("Login successful");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        <div className="space-y-4">
          <input defaultValue={email} onChange={(e)=>{
            setEmail(e.target.value)
          }}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password" defaultValue={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button onClick={login}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span className="text-indigo-600 hover:underline cursor-pointer">
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}
