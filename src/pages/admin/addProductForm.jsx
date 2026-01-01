import axios from "axios";
import { useState } from "react";
import uploadMediaToSupabase from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddProductForm() {
  const navigate = useNavigate();

  const [productId, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [price, setPrice] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");


    // Handle form submission with backend integration
    async function handleSubmit(e) {
        e.preventDefault();
        const altNames = alternativeNames.split(",")
        
        const promisesArray = [];
        for (let i = 0; i < imageFiles.length; i++) {
          promisesArray[i] =  uploadMediaToSupabase(imageFiles[i]);
        }

        const imgUrls = await Promise.all(promisesArray);

        const product = {
          productId: productId,
          productName: productName,
          alternativeNames: altNames,
          images: imgUrls,
          price: price,
          lastPrice: lastPrice,
          stock: stock,
          description: description,
        };

        const token = localStorage.getItem("token")

        try {

        await axios.post("http://localhost:5000/api/products", product, {
            headers: {
                Authorization: "Bearer " + token
            }})
            navigate("/admin/products");
            toast.success("Product added successfully");
        } catch (err) {
            toast.error("Error adding product");
            console.error("Error adding product:", err);
        }
    }


  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Add New Product
          </h1>
          <p className="text-gray-500 mt-1">
            Fill in the details below to add a new product
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center gap-2 text-sm font-semibold
                     text-gray-600 hover:text-gray-800 transition"
        >
          ← Back to Products
        </button>
      </div>

      {/* Form Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Product ID */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Product ID
            </label>
            <input
              type="text"
              placeholder="Product ID - BEAUTY004"
              className="border rounded-lg px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={productId}
            onChange={(e)=>{setProductID(e.target.value)}}
            />
          </div>

          {/* Product Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Insert Product Name"
              className="border rounded-lg px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={productName}
            onChange={(e)=>{setProductName(e.target.value)}}
            />
          </div>

          {/* Alternative Names */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Alternative Names
            </label>
            <input
              type="text"
              placeholder="Comma separated (e.g. Herbal Shampoo, Hair Care)"
              className="border rounded-lg px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={alternativeNames}
            onChange={(e)=>{setAlternativeNames(e.target.value)}}
            />
          </div>

          {/* Product Images */}
<div className="flex flex-col md:col-span-2">
  <label className="text-sm font-medium text-gray-700 mb-2">
    Product Images
  </label>

  <label
    htmlFor="imageUpload"
    className="flex flex-col items-center justify-center
               border-2 border-dashed border-gray-300
               rounded-lg p-6 cursor-pointer
               hover:border-blue-500 hover:bg-blue-50
               transition"
  >
    <svg
      className="w-10 h-10 text-gray-400 mb-2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 16V4m0 0L3 8m4-4l4 4m6 8v4m0 0l4-4m-4 4l-4-4"
      />
    </svg>

    <p className="text-sm text-gray-600">
      Click to upload 
    </p>
    <p className="text-xs text-gray-400 mt-1">
      Multiple images supported
    </p>

    <input
      id="imageUpload"
      type="file"
      className="hidden"
      multiple
      onChange={(e) => {
        setImageFiles(e.target.files);
      }}
    />
  </label>

  {/* Selected files count */}
  {imageFiles.length > 0 && (
    <p className="text-sm text-gray-500 mt-2">
      {imageFiles.length} image(s) selected
    </p>
  )}
</div>


          {/* Price */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Price (Rs)
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="border rounded-lg px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={price}
            onChange={(e)=>{setPrice(e.target.value)}}
            />
          </div>

          {/* Last Price */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Last Price (Rs)
            </label>
            <input
              type="number"
              placeholder="Enter last price"
              className="border rounded-lg px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={lastPrice}
            onChange={(e)=>{setLastPrice(e.target.value)}}
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              placeholder="Enter stock quantity"
              className="border rounded-lg px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={stock}
            onChange={(e)=>{setStock(e.target.value)}}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Enter product description"
              className="border rounded-lg px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={description}
              onChange={(e)=>{setDescription(e.target.value)}}
            />
          </div>

          {/* Actions */}
          <div className="md:col-span-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-5 py-2 rounded-lg border
                         text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700
                         text-white px-6 py-2 rounded-lg
                         font-semibold shadow transition"

                onClick={handleSubmit}
            >
              Add Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
