import { Link } from "react-router-dom";
import { FaBoxOpen, FaUsers, FaClipboardList } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
	const [productCount, setProductCount] = useState("--");
	const [orderCount, setOrderCount] = useState("--");
	const [userCount, setUserCount] = useState("--");
	const [recentOrders, setRecentOrders] = useState([]);

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
			.then(res => setProductCount(res.data.length))
			.catch(() => setProductCount("--"));

		const token = localStorage.getItem("token");

		axios
			.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(res => {
				setOrderCount(res.data.length);
				// Sort by date descending and take latest 3
				const sorted = [...res.data].sort((a, b) => new Date(b.date) - new Date(a.date));
				setRecentOrders(sorted.slice(0, 3));
			})
			.catch(() => {
				setOrderCount("--");
				setRecentOrders([]);
			});

		axios
			.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all-users`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(res => setUserCount(res.data.length))
			.catch(() => setUserCount("--"));
	}, []);

	const stats = [
		{
			name: "Products",
			subtitle: "Beauty items in store",
			value: productCount,
			icon: <FaBoxOpen />,
			link: "/admin/products",
			gradient: "from-pink-400 to-rose-500",
		},
		{
			name: "Orders",
			subtitle: "Customer purchases",
			value: orderCount,
			icon: <FaClipboardList />,
			link: "/admin/orders",
			gradient: "from-emerald-400 to-green-500",
		},
		{
			name: "Customers",
			subtitle: "Registered users",
			value: userCount,
			icon: <FaUsers />,
			link: "/admin/users",
			gradient: "from-purple-400 to-indigo-500",
		},
	];

	const quickLinks = [
		{ name: "➕ Add Product", to: "/admin/products" },
		{ name: "📦 Manage Products", to: "/admin/products" },
		{ name: "🧾 View Orders", to: "/admin/orders" },
		{ name: "👥 User Management", to: "/admin/users" },
	];

	return (
		<div className="min-h-screen  p-6">
			<div className="max-w-7xl mx-auto">

				{/* Header */}
				<div className="mb-10">
					<h1 className="text-4xl font-extrabold text-[#1e3a5f]">
						Admin Dashboard
					</h1>
					<p className="text-gray-500 mt-2">
						Manage MIZO BEAUTY store operations at a glance 
					</p>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
					{stats.map(stat => (
						<Link
							key={stat.name}
							to={stat.link}
							className="group relative overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 p-8"
						>
							{/* Glow */}
							<div
								className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition bg-gradient-to-br ${stat.gradient}`}
							/>

							<div className="relative z-10 flex items-center gap-6">
								<div
									className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl bg-gradient-to-br ${stat.gradient}`}
								>
									{stat.icon}
								</div>

								<div>
									<p className="text-gray-500 text-sm">
										{stat.subtitle}
									</p>
									<h3 className="text-xl font-semibold text-[#1e3a5f]">
										{stat.name}
									</h3>
								</div>
							</div>

							<div className="relative z-10 mt-6 text-4xl font-extrabold text-[#1e3a5f]">
								{stat.value}
							</div>
						</Link>
					))}
				</div>

				{/* Quick Actions */}
				<div className="bg-white rounded-3xl shadow p-8 mb-12">
					<h2 className="text-2xl font-bold text-[#1e3a5f] mb-6 justify-center items-center flex">
						Quick Actions
					</h2>

					<div className="flex flex-wrap gap-4 justify-center items-center flex">
						{quickLinks.map(link => (
							<Link
								key={link.name}
								to={link.to}
								className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-100 to-pink-100 text-[#1e3a5f] font-medium hover:from-rose-200 hover:to-pink-200 transition shadow-sm"
							>
								{link.name}
							</Link>
						))}
					</div>
				</div>

				{/* Recent Orders */}
				<div className="bg-white rounded-3xl shadow p-8">
					<div className="flex items-center justify-between mb-3">
						<h2 className="text-2xl font-bold text-[#1e3a5f]">
							Recent Orders
						</h2>
						<Link to="/admin/orders" className="text-pink-600 hover:underline font-medium text-base">View All</Link>
					</div>
					{recentOrders.length === 0 ? (
						<p className="text-gray-400">No recent orders yet.</p>
					) : (
						<div className="overflow-x-auto">
							<table className="min-w-full text-sm">
								<thead>
									<tr className="text-left text-gray-500 border-b">
										<th className="py-2 pr-4">Order ID</th>
										<th className="py-2 pr-4">Customer</th>
										<th className="py-2 pr-4">Date</th>
										<th className="py-2 pr-4">Status</th>
									</tr>
								</thead>
								<tbody>
									{recentOrders.map(order => (
										<tr key={order.orderId} className="border-b last:border-b-0">
											<td className="py-2 pr-4 font-semibold">{order.orderId}</td>
											<td className="py-2 pr-4">{order.name}</td>
											<td className="py-2 pr-4">{order.date ? new Date(order.date).toLocaleString() : ''}</td>
											<td className="py-2 pr-4 capitalize">{order.status}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>

			</div>
		</div>
	);
}
