import { Link, Routes, Route, Outlet } from "react-router-dom";
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
      <aside className="w-64 bg-indigo-100 p-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-8">
          Admin Panel
        </h2>

        <nav className="space-y-3 font-medium text-indigo-800">
          <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-200">
            <GoGraph /> Dashboard
          </Link>

          <Link to="/admin/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-200">
            <FiBox /> Products
          </Link>


          <Link to="/admin/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-200">
            <HiOutlineShoppingBag /> Orders
          </Link>

          <Link to="/admin/customers" className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-200">
            <FaUsers /> Customers
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-emerald-100 p-10">
        <div className="bg-white rounded-xl shadow p-6 h-full">
          
          {/* ADMIN ROUTES RENDER HERE */}
          <Routes path="/*">
            
            <Route path="dashboard" element={<h1 className="text-2xl font-bold">Dashboard</h1>} />
            <Route path="products" element={<AdminProductsPage/>} />
            <Route path="/products/addProduct" element={<AddProductForm/>} />
            <Route path="orders" element={<h1 className="text-2xl font-bold">Orders</h1>} />
            <Route path="customers" element={<h1 className="text-2xl font-bold">Customers</h1>} />

            <Route path="/*" element={
    <div className="flex items-center justify-center h-full">
      <div className="text-center px-6">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-indigo-100 p-4 rounded-full">
            <GoGraph className="text-4xl text-indigo-500" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Nothing selected yet
        </h1>

        <p className="text-gray-500 max-w-sm">
          Please choose an option from the sidebar to continue🙂.
        </p>

      </div>
    </div>
  } />
          </Routes>

        </div>
      </main>

    </div>
  );
}
