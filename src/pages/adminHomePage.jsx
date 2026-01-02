import { Link, Routes, Route } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FiBox } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import AdminProductsPage from "./admin/adminProductsPage";
import AddProductForm from "./admin/addProductForm";

export default function AdminHomePage() {
  return (
    <div className="min-h-screen flex bg-[#fff3ef]">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-xl flex flex-col">

        {/* LOGO + TITLE */}
        <div className="flex flex-col items-center py-6 border-b">
          <img
            src="/logo.jpg"
            alt="Admin Logo"
            className="w-20 h-20 rounded-full object-cover shadow border-4 border-white mb-3"
          />
          <h2 className="text-lg font-bold text-gray-800">
            CBC Admin Panel
          </h2>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-4 space-y-2 text-gray-700 font-medium">

          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-rose-100 transition"
          >
            <GoGraph className="text-xl text-rose-500" />
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-rose-100 transition"
          >
            <FiBox className="text-xl text-rose-500" />
            Products
          </Link>

          <Link
            to="/admin/orders"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-rose-100 transition"
          >
            <HiOutlineShoppingBag className="text-xl text-rose-500" />
            Orders
          </Link>

          <Link
            to="/admin/customers"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-rose-100 transition"
          >
            <FaUsers className="text-xl text-rose-500" />
            Customers
          </Link>

        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 min-h-full">

          <Routes>

            <Route
              path="dashboard"
              element={<h1 className="text-2xl font-bold">Dashboard</h1>}
            />

            <Route
              path="products"
              element={<AdminProductsPage />}
            />

            <Route
              path="products/addProduct"
              element={<AddProductForm />}
            />

            <Route
              path="orders"
              element={<h1 className="text-2xl font-bold">Orders</h1>}
            />

            <Route
              path="customers"
              element={<h1 className="text-2xl font-bold">Customers</h1>}
            />

            {/* DEFAULT ADMIN HOME */}
            <Route
              index
              element={
                <div className="flex flex-col items-center justify-center h-full text-center">

                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Welcome to CBC Admin 👋
                  </h1>
                  <p className="text-gray-500 mb-10">
                    Manage products, orders, and customers with ease
                  </p>

                  {/* DASHBOARD CARDS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">

                    {/* Card */}
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

                  <p className="mt-10 text-sm text-gray-400">
                    Use the sidebar to navigate admin features ✨
                  </p>
                </div>
              }
            />

          </Routes>
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
