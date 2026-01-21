import { Link, Routes, Route } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FiBox } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import AdminProductsPage from "./admin/adminProductsPage";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProductForm";
import AdminOrderPage from "./admin/adminOrderPage";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminUsersPage from "./admin/usersPage";
import AdminDashboard from "./admin/adminDashboard";

export default function AdminHomePage() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to access admin panel");
      navigate("/login");
      return;
    }
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.type !== "admin") {
          navigate("/login");
        } else {
          setUser(res.data);
        }
      })
      .catch((err) => {
        toast.error("Error fetching user data");
        navigate("/login");
      });
  }, []);

  return (
    <div className="min-h-screen flex bg-[#fff3ef]">
      {/* MOBILE TOPBAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white shadow flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <img
            src="/logo.jpg"
            alt="Admin Logo"
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
          />
          <span className="font-bold text-gray-800 text-lg">MIZO BEAUTY Admin</span>
        </div>
        <button
          className="p-2 rounded-md border border-gray-200 bg-rose-50 text-rose-500 focus:outline-none"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label="Open sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed z-40 md:static top-0 left-0 h-full w-64 bg-white shadow-xl flex flex-col transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{ minHeight: "100vh" }}
      >
        {/* LOGO + TITLE */}
        <div className="flex flex-col items-center py-6 border-b">
          <img
            src="/logo.jpg"
            alt="Admin Logo"
            className="w-20 h-20 rounded-full object-cover shadow border-4 border-white mb-3"
          />
          <h2 className="text-lg font-bold text-gray-800">MIZO BEAUTY Admin</h2>
        </div>
        {/* NAVIGATION */}
        <nav className="flex-1 p-4 space-y-2 text-gray-700 font-medium">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-rose-100 transition"
            onClick={() => setSidebarOpen(false)}
          >
            <GoGraph className="text-xl text-rose-500" /> Dashboard
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-rose-100 transition"
            onClick={() => setSidebarOpen(false)}
          >
            <FiBox className="text-xl text-rose-500" /> Products
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-rose-100 transition"
            onClick={() => setSidebarOpen(false)}
          >
            <HiOutlineShoppingBag className="text-xl text-rose-500" /> Orders
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-rose-100 transition"
            onClick={() => setSidebarOpen(false)}
          >
            <FaUsers className="text-xl text-rose-500" /> Users
          </Link>
        </nav>
      </aside>

      {/* OVERLAY for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 p-2 md:p-8 pt-16 md:pt-8 min-h-screen flex flex-col">
        <div className="bg-white rounded-2xl shadow-lg p-2 md:p-8 min-h-full w-full">
          {user != null && (
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="products/addProduct" element={<AddProductForm />} />
              <Route path="products/editproduct" element={<EditProductForm />} />
              <Route path="/orders" element={<AdminOrderPage />} />
              <Route path="/users" element={<AdminUsersPage />} />
              {/* DEFAULT ADMIN HOME */}
              <Route
                index
                element={
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                      Welcome to CBC Admin 👋
                    </h1>
                    <p className="text-gray-500 mb-6 md:mb-10">
                      Manage products, orders, and customers with ease
                    </p>
                    {/* DASHBOARD CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl">
                      <AdminCard
                        icon={<GoGraph />}
                        title="Dashboard"
                        desc="Analytics & system overview"
                        bg="bg-rose-50"
                        iconBg="bg-rose-100"
                        iconColor="text-rose-500"
                      />
                      <AdminCard
                        icon={<FiBox />}
                        title="Products"
                        desc="Manage beauty products"
                        bg="bg-pink-50"
                        iconBg="bg-pink-100"
                        iconColor="text-pink-500"
                      />
                      <AdminCard
                        icon={<HiOutlineShoppingBag />}
                        title="Orders"
                        desc="Track customer orders"
                        bg="bg-emerald-50"
                        iconBg="bg-emerald-100"
                        iconColor="text-emerald-500"
                      />
                      <AdminCard
                        icon={<FaUsers />}
                        title="Customers"
                        desc="View registered users"
                        bg="bg-purple-50"
                        iconBg="bg-purple-100"
                        iconColor="text-purple-500"
                      />
                    </div>
                    <p className="mt-8 md:mt-10 text-xs md:text-sm text-gray-400">
                      Use the sidebar to navigate admin features ✨
                    </p>
                  </div>
                }
              />
            </Routes>
          )}
          {user == null && (
            <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-5 bg-[#f9fafb]">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-b-rose-400"></div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* SMALL REUSABLE CARD */
function AdminCard({ icon, title, desc, bg, iconBg, iconColor }) {
  return (
    <div className={`${bg} rounded-xl p-6 shadow-sm hover:shadow-md transition`}>
      <div className="flex justify-center mb-4">
        <div className={`${iconBg} p-4 rounded-full`}>
          <span className={`text-3xl ${iconColor}`}>
            {icon}
          </span>
        </div>
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mb-1">
        {title}
      </h2>
      <p className="text-sm text-gray-500">
        {desc}
      </p>
    </div>
  );
}
