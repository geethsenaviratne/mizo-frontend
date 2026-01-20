import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userBlock, setUserBlock] = useState(null); // Track block status of users
  const [isBlockConfirmVisible, setIsBlockConfirmVisible] = useState(false);
  const [actionLoading, setActionLoading] = useState({});

  /**
   * useEffect - React hook that runs side effects (like API calls)
   * 
   * How this works:
   * 1. When component first loads, productsLoading = false
   * 2. Since productsLoading is false, the API call runs
   * 3. After getting data, we set productsLoading = true
   * 4. This prevents the API from being called again
   * 
   * [productsLoading] - dependency array:
   * - The effect runs whenever productsLoading changes
   * - First render: productsLoading is false → API runs → sets to true
   * - After that: productsLoading stays true → API doesn't run again
   */
  useEffect(() => {
    if (!usersLoading) {
      const token = localStorage.getItem("token");
      axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/users/all-users",
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((res) => {
          setUsers(res.data);
          setUsersLoading(true);
        })
        .catch(() => {
          setUsers([]);
          setUsersLoading(true);
        });
    }
  }, [usersLoading]);

  const navigate = useNavigate();

  // Open block/unblock modal
  function handleBlockClick(user) {
    setUserBlock(user);
    setIsBlockConfirmVisible(true);
  }

  // Close modal
  function handleBlockCancel() {
    setIsBlockConfirmVisible(false);
    setUserBlock(null);
  }

  // Block/unblock user
  function handleBlockToggle() {
    if (!userBlock) return;
    const email = userBlock.email;
    setActionLoading((prev) => ({ ...prev, [email]: true }));
    const token = localStorage.getItem("token");
    axios.put(
      import.meta.env.VITE_BACKEND_URL + `/api/users/block/` + email,
      { isBlocked: !userBlock.isBlocked },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        toast.success(
          userBlock.isBlocked ? "User unblocked successfully" : "User blocked successfully"
        );
        setIsBlockConfirmVisible(false);
        setUserBlock(null);
        setActionLoading((prev) => ({ ...prev, [email]: false }));
        setUsersLoading(false); // Refresh user list
      })
      .catch(() => {
        toast.error("Failed to update user block status");
        setActionLoading((prev) => ({ ...prev, [email]: false }));
      });
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500 mt-1">Manage all users in your system</p>
        </div>
        {/* Optionally, you can add a button to add a new user if needed */}
      </div>

      {!usersLoading ? (
        <div className="w-full h-full flex flex-col justify-center items-center gap-3">
          <div className="w-14 h-14 border-4 border-gray-200 border-t-rose-400 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full border-collapse">
            <thead className="bg-rose-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-right">First Name</th>
                <th className="px-4 py-3 text-right">Last Name</th>
                <th className="px-4 py-3 text-center">Role</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.email} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium">
                      <img
                        src={user.profilePicture || user.picture || "/user.png"}
                        alt={user.firstName || user.email}
                        className="w-10 h-10 rounded-full object-cover border"
                        onError={e => {
                          if (!e.target.src.includes('googleusercontent.com')) {
                            e.target.onerror = null;
                            e.target.src = "/user.png";
                          }
                        }}
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{user.email}</td>
                    <td className="px-4 py-3 text-right">{user.firstName}</td>
                    <td className="px-4 py-3 text-right">{user.lastName}</td>
                    <td className="px-4 py-3 text-center text-gray-500 flex items-center gap-1 justify-center">
                      {user.type === "admin" ? (
                        <>
                          <MdOutlineAdminPanelSettings className="text-rose-500" />
                          <span className="ml-1 font-semibold text-rose-500">Admin</span>
                        </>
                      ) : (
                        <>
                          <FaRegUser className="text-gray-500" />
                          <span className="ml-1 font-semibold text-gray-600">Customer</span>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-3">
                        <button
                          className={`px-3 py-1 rounded text-white text-xs font-semibold cursor-pointer ${user.isBlocked ? "bg-green-500 hover:bg-green-600" : "bg-rose-400 hover:bg-rose-500"}`}
                          onClick={() => handleBlockClick(user)}
                          disabled={actionLoading[user.email]}
                        >
                          {actionLoading[user.email]
                            ? (user.isBlocked ? "Unblocking..." : "Blocking...")
                            : user.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Block/Unblock Confirmation Modal */}
      {isBlockConfirmVisible && userBlock && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">{userBlock.isBlocked ? "Unblock" : "Block"} User</h2>
            <p className="mb-4 text-gray-600">Are you sure you want to {userBlock.isBlocked ? "unblock" : "block"} <span className="font-bold">{userBlock.email}</span>?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={handleBlockCancel}
                disabled={actionLoading[userBlock.email]}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded text-white ${userBlock.isBlocked ? "bg-green-500 hover:bg-green-600" : "bg-rose-400 hover:bg-rose-500"}`}
                onClick={handleBlockToggle}
                disabled={actionLoading[userBlock.email]}
              >
                {actionLoading[userBlock.email]
                  ? (userBlock.isBlocked ? "Unblocking..." : "Blocking...")
                  : userBlock.isBlocked ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsersPage;
