import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { clearCart } from "../../utils/cartFunction";

const SHIPPING_FEE = 250;

// Checkout Item Card Component - displays product details
function CheckoutItemCard({ productId, qty }) {
    const [product, setProduct] = useState(null);
    const [loaded, setLoaded] = useState(false);

    // Category color mapping
    const categoryColors = {
        "SERUMS": "text-blue-600",
        "LIPS": "text-red-500",
        "FACE": "text-orange-500",
        "EYES": "text-purple-500",
        "SKINCARE": "text-green-500",
        "default": "text-accent"
    };

    useEffect(() => {
        if (!loaded) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
                .then((res) => {
                    if (res.data != null) {
                        setProduct(res.data);
                        setLoaded(true);
                    }
                })
                .catch((err) => {
                    console.error("Error fetching product:", err);
                });
        }
    }, [productId, loaded]);

    const getCategoryColor = (category) => {
        const upperCategory = category?.toUpperCase() || "";
        return categoryColors[upperCategory] || categoryColors["default"];
    };

    if (!loaded) {
        return (
            <div className="bg-[#FDF8F5] rounded-xl p-4 mb-4 w-full animate-pulse">
                <div className="flex items-center">
                    <div className="w-[80px] h-[80px] bg-gray-200 rounded-lg"></div>
                    <div className="ml-4 flex-1">
                        <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-5 bg-gray-200 rounded w-20"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FDF8F5] rounded-xl p-4 mb-3">
            <div className="flex items-center gap-4">
                {/* Product Image */}
                <img
                    src={product?.images?.[0]}
                    alt={product?.productName}
                    className="w-[80px] h-[80px] object-cover rounded-lg flex-shrink-0"
                />

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${getCategoryColor(product?.category)}`}>
                        {product?.category}
                    </span>
                    <h3 className="text-sm font-medium text-gray-800 mt-1 line-clamp-2">
                        {product?.productName}
                    </h3>
                    <p className="text-base font-bold text-gray-900 mt-1">
                        LKR {product?.lastPrice?.toFixed(2) || product?.price?.toFixed(2)}
                    </p>
                </div>

                {/* Quantity & Total */}
                <div className="text-right flex-shrink-0">
                    <span className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full">
                        Qty: {qty}
                    </span>
                    <p className="text-sm font-semibold text-gray-700 mt-2">
                        LKR {((product?.lastPrice || product?.price || 0) * qty).toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function ShippingPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Get cart items from location state (passed from cart page)
    const cart = location.state?.items || [];

    const [total, setTotal] = useState(0); // discounted total
    const [labeledTotal, setLabeledTotal] = useState(0); // original subtotal
    const [loading, setLoading] = useState(false);

    // User input fields
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    // Redirect if no items in cart
    useEffect(() => {
        if (!location.state?.items || location.state.items.length === 0) {
            toast.error("No items in cart to checkout");
            navigate("/cart");
        }
    }, [location.state, navigate]);

    // Fetch quote when cart changes
    useEffect(() => {
        if (cart.length > 0) {
            axios
                .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
                    orderdItems: cart, // Match the key used in cart.jsx
                })
                .then((res) => {
                    if (res.data.total != null) {
                        setTotal(res.data.total);
                        setLabeledTotal(res.data.labeledTotal);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Failed to fetch order quote");
                });
        }
    }, [cart]);

    // Validate phone number (Sri Lankan format)
    const validatePhone = (phone) => {
        const phoneRegex = /^(0[0-9]{9}|(\+94)[0-9]{9})$/;
        return phoneRegex.test(phone);
    };

    function createOrder() {
        // Validate all fields
        if (!name.trim()) {
            return toast.error("Please enter your name");
        }
        if (!address.trim()) {
            return toast.error("Please enter your delivery address");
        }
        if (!phone.trim()) {
            return toast.error("Please enter your phone number");
        }
        if (!validatePhone(phone)) {
            return toast.error("Please enter a valid phone number (e.g., 0771234567)");
        }

        const token = localStorage.getItem("token");
        if (!token) {
            return toast.error("Please login to proceed to checkout");
        }

        setLoading(true);

        axios
            .post(
                import.meta.env.VITE_BACKEND_URL + "/api/orders",
                {
                    orderdItems: cart,
                    name: name.trim(),
                    address: address.trim(),
                    phone: phone.trim(),
                },
                {
                    headers: { Authorization: "Bearer " + token },
                }
            )
            .then((res) => {
                console.log(res.data);
                toast.success("Order placed successfully!");
                clearCart(); // Clear the cart after successful order
                navigate("/"); // Navigate to home or orders page
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response?.data?.message || "Failed to place order");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // Calculation logic:
    // subtotal = labeledTotal
    // discount = labeledTotal - total
    // total = (labeledTotal - discount) + shipping = total + shipping
    const subtotal = labeledTotal;
    const discount = labeledTotal - total;
    const shipping = cart.length > 0 ? SHIPPING_FEE : 0;
    const finalTotal = total + shipping;

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#f9fafb] px-6 py-10">
            {/* HEADER */}
            <div className="max-w-6xl mx-auto flex items-center gap-4 mb-10">
                <span className="text-4xl">📦</span>
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
                    <p className="text-gray-500 mt-1">Complete your order details</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* LEFT SIDE - SHIPPING FORM */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl shadow-md p-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">
                            Shipping Information
                        </h2>

                        <div className="space-y-5">
                            {/* Name Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition"
                                />
                            </div>

                            {/* Address Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Delivery Address <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter your complete delivery address"
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition resize-none"
                                />
                            </div>

                            {/* Phone Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="0771234567"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Format: 0771234567 or +94771234567
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ORDER ITEMS SUMMARY */}
                    <div className="bg-white rounded-3xl shadow-md p-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">
                            Order Items ({cart.length})
                        </h2>
                        <div className="space-y-2">
                            {cart.map((item, index) => (
                                <CheckoutItemCard
                                    key={index}
                                    productId={item.productId}
                                    qty={item.qty}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - ORDER SUMMARY */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl shadow-md p-6 sticky top-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">
                            Order Summary
                        </h2>

                        <div className="space-y-4 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>LKR {subtotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span> LKR {discount.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>
                                    LKR {shipping.toFixed(2)}
                                </span>
                            </div>

                            <hr />

                            <div className="flex justify-between text-lg font-bold text-gray-800">
                                <span>Total</span>
                                <span>LKR {finalTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={createOrder}
                            disabled={loading || cart.length === 0}
                            className="w-full mt-6 bg-rose-300 hover:bg-rose-400 text-black font-semibold py-3 rounded-xl transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                        >
                            {loading ? "Processing..." : "Place Order"}
                        </button>

                        <button
                            onClick={() => navigate("/cart")}
                            className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition"
                        >
                            Back to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
            