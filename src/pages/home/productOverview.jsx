import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { FaTruck, FaCheckCircle, FaLock, FaGlobeAsia } from "react-icons/fa";

export default function ProductOverview() {

    const params = useParams();
    const productId = params.id;
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); // "loading", "found", "notfound"

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
            .then((res) => {
                if (res.data == null) {
                    setStatus("notfound");
                } else {
                    setProduct(res.data);
                    setStatus("found");
                }
            });
    }, []);

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#f9fafb] px-6 py-10">

            
            {/* LOADING */}
{status === "loading" && (
  <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-5 bg-[#f9fafb]">
    
    <div className="relative">
     <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-b-rose-400"></div>
    </div>

    <p className="text-gray-600 text-sm tracking-wide">
      Loading product details, please wait...
    </p>
  </div>
)}


           {/* NOT FOUND */}
{status === "notfound" && (
  <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f9fafb] px-4">

    <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center space-y-4">

      <div className="flex justify-center">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-rose-100 text-rose-500 text-3xl">
          😕
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800">
        Product Not Found
      </h2>

      <p className="text-gray-500 text-sm leading-relaxed">
        Sorry, the product you are looking for doesn’t exist,  
        or it may have been removed from our store.
      </p>

      <button
        onClick={() => window.history.back()}
        className="mt-4 inline-block bg-rose-400 hover:bg-rose-600 text-white px-6 py-2 rounded-xl text-sm font-semibold transition"
      >
        Go Back
      </button>

    </div>
  </div>
)}


            {/* FOUND */}
            {status === "found" && (
                <div className="w-full bg-white rounded-3xl shadow-xl p-8">

                    <div className="w-full flex flex-col lg:flex-row gap-10">

                        {/* LEFT – IMAGE */}
                        <div className="lg:w-[45%] w-full">
                            <ImageSlider images={product.images} />
                        </div>

                        {/* RIGHT – DETAILS */}
                        <div className="lg:w-[55%] w-full flex flex-col gap-4">

                            <h1 className="text-3xl font-bold text-gray-800">
                                {product.productName}
                            </h1>

                            <h2 className="text-2xl font-medium text-gray-500">
                                {product.altNames.join(" | ")}
                            </h2>

                            {/* PRICE */}
                            <div className="text-2xl text-gray-700 flex items-center gap-3">
                                {product.price > product.lastPrice && (
                                    <span className="line-through text-red-400 text-lg">
                                        LKR {product.price}
                                    </span>
                                )}
                                <span className="font-bold text-gray-800">
                                    LKR {product.lastPrice}
                                </span>
                            </div>

                            {/* DESCRIPTION */}
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>

                            {/* BUTTONS */}
                            <h1 className=" text-gray-600 text-sm">Shipping calculated at checkout.</h1>
                            <div className="flex flex-col gap-3 mb-6">
                            <button className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition cursor-pointer">
                                Add to cart
                            </button>

                            <button className="w-full bg-rose-200 hover:bg-rose-300 py-3 rounded-lg font-semibold transition cursor-pointer">
                                Buy it now
                                
                            </button>
                        </div>

                            {/* INFO SECTION */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                                    <FaTruck className="text-gray-500 text-xl" />
                                    <span className="text-sm text-gray-700">
                                        Delivery Charge LKR 350
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                                    <FaCheckCircle className="text-gray-500 text-xl" />
                                    <span className="text-sm text-gray-700">
                                        Guaranteed 100% Authentic Products
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                                    <FaGlobeAsia className="text-gray-500text-xl" />
                                    <span className="text-sm text-gray-700">
                                        Imported from South Korea
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                                    <FaLock className="text-gray-500 text-xl" />
                                    <span className="text-sm text-gray-700">
                                        Secure Payments
                                    </span>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
