// src/pages/Dashboard.jsx
// Shows the list of all registered users. A user can only delete
// their own account (the backend enforces this too).

import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Message from "../components/Message";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this account? This cannot be undone.")) {
      return;
    }

    try {
      await api.delete(`/users/${id}`);
      setSuccess("Account deleted successfully");

      // If the user deleted their own account, log them out
      if (id === user.id) {
        setTimeout(() => logout(), 800);
        return;
      }

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="page-container">
      <h2>Dashboard</h2>
      <p className="subtitle">Welcome back, {user?.name}. Here are all registered users.</p>

      <Message type="error" text={error} />
      <Message type="success" text={success} />

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className={u._id === user.id ? "current-user-row" : ""}>
                  <td>
                    {u.name} {u._id === user.id && <span className="tag">You</span>}
                  </td>
                  <td>{u.email}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    {u._id === user.id && (
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u._id)}>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && <p>No users found.</p>}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
