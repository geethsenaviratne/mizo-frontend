import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash, FaPencil, FaPlus } from "react-icons/fa6";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
  {/* Left side: Title & description */}
  <div>
    <h1 className="text-3xl font-bold text-gray-800">
      Products Management
    </h1>
    <p className="text-gray-500 mt-1">
      Manage all products available in your inventory
    </p>
  </div>

  {/* Right side: Add button */}
  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700
               text-white px-5 py-2 rounded-lg shadow
               transition duration-200">
    <FaPlus size={14} />
    <span className="text-sm font-semibold">Add Product</span>
  </button>
</div>


      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Product ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-right">Price (Rs)</th>
              <th className="px-4 py-3 text-right">Last Price (Rs)</th>
              <th className="px-4 py-3 text-center">Stock</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-medium">
                  {product.productId}
                </td>
                <td className="px-4 py-3">
                  {product.productName}
                </td>
                <td className="px-4 py-3 text-right">
                  {product.price.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-gray-500 line-through">
                  {product.lastPrice.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.stock > 20
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                  {product.description}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaPencil size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  );
}
