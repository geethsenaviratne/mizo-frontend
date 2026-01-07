import axios from "axios";
import { useState} from "react";
import uploadMediaToSupabase from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditProductForm() {
 
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state.product;
  const altNames = product.altNames.join(",");
  
    if (product == null) {
      navigate("/admin/products");
    }
 
  const [productId, setProductID] = useState(product.productId);
  const [productName, setProductName] = useState(product.productName);
  const [alternativeNames, setAlternativeNames] = useState(altNames);
  const [imageFiles, setImageFiles] = useState([]);
  const [price, setPrice] = useState(product.price);
  const [lastPrice, setLastPrice] = useState(product.lastPrice);
  const [stock, setStock] = useState(product.stock);
  const [description, setDescription] = useState(product.description);

  async function handleSubmit(e) {
    e.preventDefault();

    const altNames = alternativeNames.split(",");

    const promisesArray = [];
    let imgUrls = product.images;

    if (imageFiles.length > 0) {

    for (let i = 0; i < imageFiles.length; i++) {
      promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);
    }

     imgUrls = await Promise.all(promisesArray);
      }

   const productData = {
      productId,
      productName,
      alternativeNames: altNames,
      images: imgUrls,
      price,
      lastPrice,
      stock,
      description,
    };

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/products/" + product.productId,
        productData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error("Failed to update product");
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-white p-8">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Edit Product Form
          </h1>
          <p className="text-gray-500">
            Update beauty products to your store
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/products")}
          className="text-sm font-medium text-gray-600 hover:text-rose-500 transition"
        >
          ← Back to Products
        </button>
      </div>

      {/* FORM CARD */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Product ID */}
          <Input
          disabled
            label="Product ID"
            placeholder="Enter Product ID"
            value={productId}
            onChange={(e) => setProductID(e.target.value)}
          />

          {/* Product Name */}
          <Input
            label="Product Name"
            placeholder="Insert Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          {/* Alternative Names */}
          <Input
            label="Alternative Names"
            placeholder="Comma separated (Herbal Shampoo, Hair Care)"
            value={alternativeNames}
            onChange={(e) => setAlternativeNames(e.target.value)}
          />

          {/* IMAGE UPLOAD */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>

            <label
              htmlFor="imageUpload"
              className="flex flex-col items-center justify-center
                         border-2 border-dashed border-rose-300
                         rounded-xl p-8 cursor-pointer
                         hover:bg-rose-50 transition"
            >
              <span className="text-rose-400 text-4xl mb-2">⬆️</span>
              <p className="text-sm text-gray-600">
                Click to upload images
              </p>
              <p className="text-xs text-gray-400">
                Multiple images supported
              </p>

              <input
                id="imageUpload"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => setImageFiles(e.target.files)}
              />
            </label>

            {imageFiles.length > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {imageFiles.length} image(s) selected
              </p>
            )}
          </div>

          {/* Price */}
          <Input
            label="Price (Rs)"
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* Last Price */}
          <Input
            label="Last Price (Rs)"
            type="number"
            placeholder="Enter last price"
            value={lastPrice}
            onChange={(e) => setLastPrice(e.target.value)}
          />

          {/* Stock */}
          <Input
            label="Stock Quantity"
            type="number"
            placeholder="Enter stock quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Enter product description"
              className="w-full border rounded-lg px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* ACTIONS */}
          <div className="md:col-span-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-6 py-2 rounded-lg border
                         text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg
                         bg-rose-400 hover:bg-rose-500
                         text-white font-semibold shadow transition"
            >
              Update Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

/* REUSABLE INPUT */
function Input({ label, type = "text", ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        {...props}
        className="w-full border rounded-lg px-4 py-3
                   focus:outline-none focus:ring-2 focus:ring-rose-300"
      />
    </div>
  );
}
