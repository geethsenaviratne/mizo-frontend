import { useEffect, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadCart } from "../../utils/cartFunction";
import { CartCard } from "../../components/cartCard";
import axios from "axios";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";

const SHIPPING_FEE = 250;

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [labeledTotal, setLabeledTotal] = useState(0);
    const location = useLocation();

    const navigate = useNavigate();

    const fetchQuote = useCallback(() => {
        const currentCart = loadCart();
        setCart(currentCart);

        if (currentCart.length > 0) {
            axios
                .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
                    orderdItems: currentCart,
                })
                .then((res) => {
                    setTotal(res.data.total);
                    setLabeledTotal(res.data.labeledTotal);
                });
        } else {
            setTotal(0);
            setLabeledTotal(0);
        }
    }, []);

    useEffect(() => {
        fetchQuote();
    }, [location]);

    useEffect(() => {
        const handleCartChange = () => fetchQuote();

        window.addEventListener("cartUpdated", handleCartChange);
        window.addEventListener("focus", handleCartChange);

        return () => {
            window.removeEventListener("cartUpdated", handleCartChange);
            window.removeEventListener("focus", handleCartChange);
        };
    }, [fetchQuote]);

    function onOrderCheckoutClick() {
        navigate("/shipping" , {
            state: { 
                items: loadCart()
            }
        })
    }

    const discount = labeledTotal - total;
    const finalTotal = total + (cart.length > 0 ? SHIPPING_FEE : 0);

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#f9fafb] px-6 ">
            {/* HEADER */}
            <div className="max-w-6xl mx-auto flex items-center gap-4 mb-10">
                <span className="text-4xl">🛒</span>
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">Your Cart</h1>
                    <p className="text-gray-500 mt-1">Review and complete your beauty collection</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-6">
                    {cart.length === 0 ? (
                        <div className="bg-white rounded-3xl shadow-md py-20 flex flex-col items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center mb-6">
                                <FaShoppingCart className="text-3xl text-rose-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Your cart is empty
                            </h2>
                            <p className="text-gray-500 text-sm mt-2 text-center max-w-sm">
                                Looks like you haven’t added anything yet.
                                Discover our premium beauty products.
                            </p>
                            <button
                                onClick={() => window.history.back()}
                                className="mt-6 px-6 py-3 bg-rose-300 hover:bg-rose-400 rounded-xl font-semibold transition"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <CartCard
                                key={item.productId}
                                productId={item.productId}
                                qty={item.qty}
                                onCartUpdate={fetchQuote}
                            />
                        ))
                    )}
                </div>

                {/* RIGHT SIDE - ORDER SUMMARY & SHIPPING INFO */}
                <div className="space-y-6">
                    {/* ORDER SUMMARY */}
                    <div className="bg-white rounded-3xl shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">
                            Order Summary
                        </h2>

                        <div className="space-y-4 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>LKR {labeledTotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span> LKR {discount.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>
                                    LKR{" "}
                                    {cart.length > 0
                                        ? SHIPPING_FEE.toFixed(2)
                                        : "0.00"}
                                </span>
                            </div>

                            <hr />

                            <div className="flex justify-between text-lg font-bold text-gray-800">
                                <span>Total</span>
                                <span>LKR {finalTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={onOrderCheckoutClick}
                            disabled={cart.length === 0}
                            className="w-full mt-6 bg-rose-300 hover:bg-rose-400 text-black font-semibold py-3 rounded-xl transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                        >
                            Proceed to Checkout
                        </button>

                        <div className="mt-4 text-xs text-gray-500 space-y-2">
                            <p>✔ Free returns within 30 days</p>
                            <p>✔ Secure checkout with SSL encryption</p>
                        </div>
                    </div>

                    {/* SHIPPING INFORMATION */}
                    <div className="bg-white rounded-3xl shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Shipping Information
                        </h2>

                        <div className="space-y-5 text-sm text-gray-600">
                            {/* Order Processing Time */}
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-1">Order Processing Time</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    Delivery could take between 1–3 working days excluding weekends and public holidays from the day of dispatch depending on the payment method you choose.
                                </p>
                            </div>

                            {/* Same Day Delivery */}
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-1">Same Day Delivery (Within Colombo & Suburbs Only)</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    Same-day delivery is available for selected Colombo and suburb areas. Orders must be placed before 3:00 PM.
                                </p>
                            </div>

                            {/* Delivery Charges */}
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-1">Delivery Charges</h3>
                                <p className="text-gray-500">
                                    Standard Delivery Charge: <span className="font-medium text-gray-700">LKR 350.00</span>
                                </p>
                            </div>

                            {/* Shipping Notifications */}
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-1">Shipping Notifications</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    A confirmation email with tracking details will be sent after placing your order.
                                </p>
                            </div>

                            {/* International Shipping */}
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-1">International Shipping</h3>
                                <p className="text-gray-500">
                                    Currently, we do not offer international shipping.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
