import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
    "pending",
    "preparing",
    "paused",
    "delivered",
    "completed",
    "cancelled",
];

export default function AdminOrderPage() {
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [mode, setMode] = useState("view"); // view | manage
    const [status, setStatus] = useState("");
    const [notes, setNotes] = useState("");

    const token = localStorage.getItem("token");

    const fetchOrders = () => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setOrders(res.data))
            .catch(() => toast.error("Error fetching orders"))
            .finally(() => setOrdersLoading(false));
    };

    useEffect(() => {
        if (!token) {
            setOrdersLoading(false);
            return;
        }
        fetchOrders();
    }, []);

    const calculateTotal = (items) =>
        items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const openView = (order) => {
        setSelectedOrder(order);
        setMode("view");
    };

    const openManage = (order) => {
        setSelectedOrder(order);
        setMode("manage");
        setStatus(order.status);
        setNotes(order.notes || "");
    };

    const updateOrder = () => {
        axios
            .put(
                import.meta.env.VITE_BACKEND_URL +
                    `/api/orders/${selectedOrder.orderId}`,
                { status, notes },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => {
                toast.success("Order updated successfully");
                setSelectedOrder(null);
                fetchOrders();
            })
            .catch(() => toast.error("Failed to update order"));
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4">
            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <h1 className="text-3xl font-bold text-gray-800 mb-1 mt-6">Orders Management</h1>
                <p className="text-gray-500 mb-8">Manage and track all customer orders in your system</p>

                {/* LOADING */}
                {ordersLoading && (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin h-12 w-12 rounded-full border-4 border-gray-200 border-b-rose-400"></div>
                    </div>
                )}

                {/* EMPTY */}
                {!ordersLoading && orders.length === 0 && (
                    <div className="bg-white p-10 rounded-xl text-center shadow">
                        No orders found
                    </div>
                )}

                {/* ORDERS TABLE */}
                {!ordersLoading && (
                    <div className="bg-white rounded-2xl shadow overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-rose-50">
                                    <th className="px-4 py-3 text-left text-sm font-extrabold text-gray-700 tracking-wide uppercase">ORDER ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-extrabold text-gray-700 tracking-wide uppercase">CUSTOMER</th>
                                    <th className="px-4 py-3 text-left text-sm font-extrabold text-gray-700 tracking-wide uppercase">DATE</th>
                                    <th className="px-4 py-3 text-left text-sm font-extrabold text-gray-700 tracking-wide uppercase">STATUS</th>
                                    <th className="px-4 py-3 text-left text-sm font-extrabold text-gray-700 tracking-wide uppercase">TOTAL (LKR)</th>
                                    <th className="px-4 py-3 text-left text-sm font-extrabold text-gray-700 tracking-wide uppercase">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.orderId} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 font-semibold whitespace-nowrap">{order.orderId}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{order.name}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                                                    ${
                                                        order.status === "completed"
                                                            ? "bg-green-100 text-green-700"
                                                            : order.status === "preparing"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : order.status === "cancelled"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-gray-100 text-gray-700"
                                                    }
                                                `}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-bold text-rose-600 whitespace-nowrap">{calculateTotal(order.orderdItems).toFixed(2)}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openView(order)}
                                                    className="px-3 py-1 border rounded hover:bg-gray-50 text-xs"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => openManage(order)}
                                                    className="px-3 py-1 bg-rose-500 text-white rounded hover:bg-rose-600 text-xs"
                                                >
                                                    Manage
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* ================= MODAL ================= */}
            {selectedOrder && (
                <div
                    className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
                    onClick={() => setSelectedOrder(null)}
                >
                    <div
                        className="bg-white max-w-3xl w-full rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* HEADER */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">
                                {mode === "view"
                                    ? "Order Details"
                                    : "Manage Order"}
                            </h2>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* ORDER INFO */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                            <p><strong>Status:</strong> {selectedOrder.status}</p>
                            <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleString()}</p>
                            <p><strong>Name:</strong> {selectedOrder.name}</p>
                            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                            <p className="md:col-span-2">
                                <strong>Address:</strong> {selectedOrder.address}
                            </p>
                            {mode === "view" && selectedOrder.notes && (
                                <p className="md:col-span-2">
                                    <strong>Notes:</strong>
                                    <span className="block bg-rose-50 rounded p-2 border border-rose-100 mt-1 text-gray-700 whitespace-pre-line">{selectedOrder.notes}</span>
                                </p>
                            )}
                        </div>

                        {/* PRODUCTS */}
                        <h3 className="font-semibold mb-3">Products</h3>
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
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            LKR {item.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="font-semibold">
                                        LKR {(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* TOTAL */}
                        <div className="mt-6 text-right text-lg font-bold text-rose-600">
                            Total: LKR{" "}
                            {calculateTotal(selectedOrder.orderdItems).toFixed(2)}
                        </div>

                        {/* ADMIN CONTROLS */}
                        {mode === "manage" && (
                            <div className="mt-8 border-t pt-6">
                                <h3 className="font-semibold mb-3">
                                    Admin Controls
                                </h3>

                                <label className="block text-sm font-medium mb-1">
                                    Status
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value)
                                    }
                                    className="w-full border rounded px-3 py-2 mb-4"
                                >
                                    {STATUS_OPTIONS.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>

                                <label className="block text-sm font-medium mb-1">
                                    Notes
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) =>
                                        setNotes(e.target.value)
                                    }
                                    rows="4"
                                    className="w-full border rounded px-3 py-2"
                                />

                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        onClick={() =>
                                            setSelectedOrder(null)
                                        }
                                        className="px-4 py-2 border rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={updateOrder}
                                        className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
