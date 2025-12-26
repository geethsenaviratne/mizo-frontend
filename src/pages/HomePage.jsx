import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-600">MyApp</h2>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Welcome Back 👋
        </h1>

        <p className="text-gray-600 mb-8 max-w-2xl">
          This is your home page. From here you can manage users,
          view data, and explore features.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Dashboard
            </h3>
            <p className="text-gray-500">
              View analytics and system overview
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Profile
            </h3>
            <p className="text-gray-500">
              Manage your personal information
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Settings
            </h3>
            <p className="text-gray-500">
              Configure application preferences
            </p>
          </div>

        </div>

        {/* Login Link */}
        <div className="mt-10 text-center">
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}
