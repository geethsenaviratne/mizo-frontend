export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
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
