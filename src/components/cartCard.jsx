import axios from "axios";
import { useState, useEffect } from "react";
import { deleteItem, addToCart, saveCart, loadCart } from "../utils/cartFunction";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

export function CartCard(props) {
    const productId = props.productId;
    const initialQty = props.qty;
    const onCartUpdate = props.onCartUpdate;

    const [product, setProduct] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [quantity, setQuantity] = useState(initialQty);

    // Sync quantity when props change (e.g., when navigating back to cart)
    useEffect(() => {
        setQuantity(initialQty);
    }, [initialQty]);

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
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
                .then((res) => {
                    if (res.data != null) {
                        setProduct(res.data);
                        setLoaded(true);
                    } else {
                        deleteItem(productId);
                    }
                })
                .catch((err) => {
                    console.error("Error fetching product data for CartCard:", err);
                });
        }
    }, []);

    const handleIncrement = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        updateCartQuantity(newQty);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQty = quantity - 1;
            setQuantity(newQty);
            updateCartQuantity(newQty);
        }
    };

    const updateCartQuantity = (newQty) => {
        const cart = loadCart();
        const index = cart.findIndex((item) => item.productId === productId);
        if (index !== -1) {
            cart[index].qty = newQty;
            saveCart(cart);
            if (onCartUpdate) onCartUpdate();
        }
    };

    const handleDelete = () => {
        const cart = loadCart();
        const index = cart.findIndex((item) => item.productId === productId);
        if (index !== -1) {
            cart.splice(index, 1);
            saveCart(cart);
            if (onCartUpdate) onCartUpdate();
        }
    };

    const getCategoryColor = (category) => {
        const upperCategory = category?.toUpperCase() || "";
        return categoryColors[upperCategory] || categoryColors["default"];
    };

    if (!loaded) {
        return (
            <div className="bg-[#FDF8F5] rounded-xl p-4 mb-4 w-full animate-pulse">
                <div className="flex items-center">
                    <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg"></div>
                    <div className="ml-4 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                        <div className="h-5 bg-gray-200 rounded w-40 mb-3"></div>
                        <div className="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FDF8F5] rounded-xl p-5 mb-4 w-full">
            <div className="flex items-center justify-between">
                {/* Left Section - Image and Product Info */}
                <div className="flex items-center">
                    <img
                        src={product?.images?.[0]}
                        alt={product?.productName}
                        className="w-[100px] h-[100px] object-cover rounded-lg"
                    />
                    <div className="ml-5">
                        <span className={`text-xs font-semibold uppercase tracking-wider ${getCategoryColor(product?.category)}`}>
                            {product?.category}
                        </span>
                        <h3 className="text-lg font-medium text-gray-800 mt-1">
                            {product?.productName}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                            ID: {productId}
                        </p>
                        <p className="text-xl font-bold text-gray-900 mt-2">
                            LKR.{product?.lastPrice?.toFixed(2) || product?.price?.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Total: <span className="font-semibold text-gray-700">LKR.{((product?.lastPrice || product?.price || 0) * quantity).toFixed(2)}</span>
                        </p>
                    </div>
                </div>

                {/* Right Section - Quantity Controls and Delete */}
                <div className="flex items-center gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-gray-100 rounded-lg">
                        <button
                            onClick={handleDecrement}
                            className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-l-lg transition-colors"
                        >
                            <FaMinus size={12} />
                        </button>
                        <span className="w-10 text-center font-medium text-gray-800">
                            {quantity}
                        </span>
                        <button
                            onClick={handleIncrement}
                            className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-r-lg transition-colors"
                        >
                            <FaPlus size={12} />
                        </button>
                    </div>

                    {/* Delete Button */}
                    <button
                        onClick={handleDelete}
                        className="w-9 h-9 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <FaTrash size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}