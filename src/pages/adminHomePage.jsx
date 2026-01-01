import { Link, Routes, Route } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FiBox } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import AdminProductsPage from "./admin/adminProductsPage";
import AddProductForm from "./admin/addProductForm";

export default function AdminHomePage() {
  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-indigo-100 p-6 shadow-md">
        <h2 className="text-2xl font-bold text-indigo-700 mb-8">
          Admin Panel
        </h2>

        <nav className="space-y-3 font-medium text-indigo-800">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-200 transition"
          >
            <GoGraph /> Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-200 transition"
          >
            <FiBox /> Products
          </Link>

          <Link
            to="/admin/orders"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-200 transition"
          >
            <HiOutlineShoppingBag /> Orders
          </Link>

          <Link
            to="/admin/customers"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-200 transition"
          >
            <FaUsers /> Customers
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-emerald-100 p-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 h-full">

          {/* ADMIN ROUTES */}
          <Routes path="/*">

            <Route
              path="dashboard"
              element={<h1 className="text-2xl font-bold">Dashboard</h1>}
            />

            <Route
              path="products"
              element={<AdminProductsPage />}
            />

            <Route
              path="/products/addProduct"
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
              path="/*"
              element={
                <div className="h-full flex items-center justify-center">
                  <div className="max-w-4xl w-full text-center px-6">

                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      Welcome to the CBC Admin Panel 👋
                    </h1>
                    <p className="text-gray-500 mb-10">
                      Manage your beauty products, orders, and customers from one place
                    </p>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                      {/* Dashboard */}
                      <div className="bg-indigo-50 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                        <div className="flex justify-center mb-4">
                          <div className="bg-indigo-100 p-4 rounded-full">
                            <GoGraph className="text-3xl text-indigo-600" />
                          </div>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                          Dashboard
                        </h2>
                        <p className="text-sm text-gray-500">
                          View analytics and system overview
                        </p>
                      </div>

                      {/* Products */}
                      <div className="bg-pink-50 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                        <div className="flex justify-center mb-4">
                          <div className="bg-pink-100 p-4 rounded-full">
                            <FiBox className="text-3xl text-pink-600" />
                          </div>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                          Products
                        </h2>
                        <p className="text-sm text-gray-500">
                          Manage cosmetic products and pricing
                        </p>
                      </div>

                      {/* Orders */}
                      <div className="bg-emerald-50 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                        <div className="flex justify-center mb-4">
                          <div className="bg-emerald-100 p-4 rounded-full">
                            <HiOutlineShoppingBag className="text-3xl text-emerald-600" />
                          </div>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                          Orders
                        </h2>
                        <p className="text-sm text-gray-500">
                          Track customer orders and deliveries
                        </p>
                      </div>

                      {/* Customers */}
                      <div className="bg-purple-50 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                        <div className="flex justify-center mb-4">
                          <div className="bg-purple-100 p-4 rounded-full">
                            <FaUsers className="text-3xl text-purple-600" />
                          </div>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                          Customers
                        </h2>
                        <p className="text-sm text-gray-500">
                          View and manage registered customers
                        </p>
                      </div>

                    </div>

                    <p className="mt-10 text-sm text-gray-400">
                      Use the sidebar to navigate through admin features ✨
                    </p>

                  </div>
                </div>
              }
            />
          </Routes>

        </div>
      </main>

    </div>
  );
}
