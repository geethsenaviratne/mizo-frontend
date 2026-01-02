import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">

      {/* LEFT IMAGE SECTION */}
      <div className="hidden lg:flex w-1/2">
        <img
          src="/login.jpg"
          alt="Signup"
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
            Create Account
          </h1>
          <p className="text-gray-500 mb-8">
            Join MIZO BEAUTY today
          </p>

          <div className="space-y-4 text-left">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <button
              className="w-full py-3 rounded-lg font-semibold text-white bg-rose-400 hover:bg-rose-500 transition active:scale-95"
            >
              SIGN UP
            </button>
          </div>

          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-rose-500 font-medium hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
