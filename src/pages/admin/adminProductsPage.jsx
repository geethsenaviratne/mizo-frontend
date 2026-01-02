import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPencil, FaPlus } from "react-icons/fa6";
import toast from "react-hot-toast";


export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  /**
   * useEffect - React hook that runs side effects (like API calls)
   * 
   * How this works:
   * 1. When component first loads, productsLoading = false
   * 2. Since productsLoading is false, the API call runs
   * 3. After getting data, we set productsLoading = true
   * 4. This prevents the API from being called again
   * 
   * [productsLoading] - dependency array:
   * - The effect runs whenever productsLoading changes
   * - First render: productsLoading is false → API runs → sets to true
   * - After that: productsLoading stays true → API doesn't run again
   */
  useEffect(() => {
    if (!productsLoading) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
      .then((res) => {
        setProducts(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Error fetching products");
      })
      .finally(() => {
        setProductsLoading(true);
      });
    }
    
  }, [productsLoading]); // [] = this use for run only once when component loads (useeffect)

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

 
  <Link to="/admin/products/addProduct" className="flex items-center gap-2  bg-rose-400 hover:bg-rose-500
               text-white px-5 py-2 rounded-lg shadow
               transition duration-200">
    <FaPlus size={14} />
    <span className="text-sm font-semibold">Add Product</span>
  </Link>
</div>


     
      {
        productsLoading?  
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full border-collapse">
          <thead className="bg-rose-100 text-gray-700 text-sm uppercase">
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
                    <button className="text-red-600 hover:text-red-800"
                    onClick={() => {
                        const token = localStorage.getItem("token");
                        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${product.productId}`, {
                          headers: { Authorization: "Bearer " + token } }
                        )

                        .then((res) => {
                          console.log(res.data);
                          toast.success("Product deleted successfully");
                          setProductsLoading(false); // Trigger re-fetch after successful delete
                        })
                        .catch((err) => {
                          console.error(err);
                          toast.error("Error deleting product");
                        });
                      }}>
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
      </div>:
        
        <div className="w-full h-full flex flex-col justify-center items-center gap-3">
  <div className="w-14 h-14 border-4 border-gray-200 border-t-rose-400 rounded-full animate-spin"></div>
  <p className="text-sm text-gray-500">Loading...</p>
</div>


      }
      
    </div>
  );
}
