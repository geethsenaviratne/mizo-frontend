import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setOrdersLoading(false);
            return;
        }

        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setOrders(res.data);
            })
            .catch(() => {
                toast.error("Error fetching orders. Please try again later.");
            })
            .finally(() => {
                setOrdersLoading(false);
            });
    }, []);

    const calculateTotal = (items) => {
        return items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4">
            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    Your Orders
                </h1>
                <p className="text-center text-gray-500 mb-10">
                    View and track your recent purchases
                </p>

                {/* LOADING */}
                {ordersLoading && (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin h-12 w-12 rounded-full border-4 border-gray-200 border-b-rose-400"></div>
                    </div>
                )}

                {/* EMPTY STATE */}
                {!ordersLoading && orders.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            No Orders Yet 🛒
                        </h2>
                        <p className="text-gray-500">
                            You haven’t placed any orders yet.
                        </p>
                    </div>
                )}

                {/* ORDERS LIST */}
                {!ordersLoading && orders.length > 0 && (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order.orderId}
                                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:shadow-2xl transition-shadow duration-300"
                            >
                                {/* LEFT */}
                                <div className="space-y-2 flex-1">
                                    <div className="flex gap-2">
                                        <span className="text-sm text-gray-500">Order ID</span>
                                        <span className="font-semibold">{order.orderId}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-sm text-gray-500">Customer</span>
                                        <span>{order.name}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-sm text-gray-500">Date</span>
                                        <span>{new Date(order.date).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {/* ITEMS PREVIEW */}
                                <div className="flex-1">
                                    <div className="text-sm text-gray-500 mb-2">Items</div>
                                    <div className="flex flex-wrap gap-3">
                                        {order.orderdItems.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 shadow-sm"
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                                <div>
                                                    <div className="text-sm font-medium">{item.name}</div>
                                                    <div className="text-xs text-gray-500">
                                                        Qty: {item.quantity}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* RIGHT */}
                                <div className="flex flex-col items-end gap-3">
                                    <span
                                        className={`px-4 py-1 rounded-full text-sm font-semibold capitalize
                                            ${
                                                order.status === "preparing"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : order.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-700"
                                            }
                                        `}
                                    >
                                        {order.status}
                                    </span>

                                    <p className="text-lg font-bold text-rose-600">
                                        LKR {calculateTotal(order.orderdItems).toFixed(2)}
                                    </p>

                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="mt-2 px-4 py-1 bg-rose-500 text-white rounded hover:bg-rose-600 transition"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* MODAL */}
            {selectedOrder && (
                <div
                    className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
                    onClick={() => setSelectedOrder(null)}
                >
                    <div
                        className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Order Details</h2>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* ORDER INFO */}
                        <div className="space-y-2 text-sm mb-6">
                            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                            <p><strong>Status:</strong> {selectedOrder.status}</p>
                            <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleString()}</p>
                            <p><strong>Name:</strong> {selectedOrder.name}</p>
                            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                            <p><strong>Address:</strong> {selectedOrder.address}</p>
                            {selectedOrder.notes && (
                                <p><strong>Notes:</strong> {selectedOrder.notes}</p>
                            )}
                        </div>

                        {/* PRODUCTS */}
                        <div className="space-y-4">
                            {selectedOrder.orderdItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 border rounded-lg p-3"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <div className="font-semibold">{item.name}</div>
                                        <div className="text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </div>
                                    </div>
                                    <div className="font-semibold">
                                        LKR {(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* TOTAL */}
                        <div className="mt-6 flex justify-end text-lg font-bold text-rose-600">
                            Total: LKR {calculateTotal(selectedOrder.orderdItems).toFixed(2)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
