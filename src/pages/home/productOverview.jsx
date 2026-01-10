import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { FaTruck, FaCheckCircle, FaLock, FaGlobeAsia } from "react-icons/fa";
import { addToCart } from "../../utils/cartFunction";
import toast from "react-hot-toast";

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

    function onAddtoCart() { 
      addToCart(product.productId, 1);
      toast.success(product.productId + " Added to cart 🛒");
    }

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#f9fafb] px-6 ">

            
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

    {/* TOP SECTION: IMAGE + DETAILS */}
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

        <h2 className="text-xl font-medium text-gray-500">
          {product.altNames.join(" | ")}
        </h2>

        {/* PRICE */}
        <div className="text-2xl flex items-center gap-3">
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

        <p className="text-sm text-gray-500">
          Shipping calculated at checkout.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col gap-3">
          <button onClick={onAddtoCart} className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition cursor-pointer">
            Add to cart
          </button>

          <button className="w-full bg-rose-200 hover:bg-rose-300 py-3 rounded-lg font-semibold transition cursor-pointer">
            Buy it now
          </button>
        </div>

        {/* ICON INFO */}
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
            <FaGlobeAsia className="text-gray-500 text-xl" />
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

    {/* 🔽 FULL-WIDTH SHIPPING INFO */}
    <div className="mt-12 border-t pt-8">

      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Shipping Information
      </h3>

      <div className="space-y-6 text-sm text-gray-600 leading-relaxed max-w-4xl">

        <div>
          <h4 className="font-semibold text-gray-800 mb-1">
            Order Processing Time
          </h4>
          <p>
            Delivery could take between <span className="font-medium">1–3 working days</span> excluding
            weekends and public holidays from the day of dispatch depending on
            the payment method you choose.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-1">
            Same Day Delivery (Within Colombo & Suburbs Only)
          </h4>
          <p>
            Same-day delivery is available for selected Colombo and suburb areas.
            Orders must be placed before <span className="font-medium">3:00 PM</span>.
          </p>
          
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-1">
            Delivery Charges
          </h4>
          <p>Standard Delivery Charge: <span className="font-medium">LKR 350.00</span></p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-1">
            Shipping Notifications
          </h4>
          <p>
            A confirmation email with tracking details will be sent after placing your order.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-1">
            International Shipping
          </h4>
          <p>Currently, we do not offer international shipping.</p>
        </div>

      </div>
    </div>

  </div>
)}


        </div>
    );
}
