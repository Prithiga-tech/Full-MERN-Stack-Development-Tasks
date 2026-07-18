// src/pages/Profile.jsx
// Lets the logged-in user update their name, bio, and optionally password.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Message from "../components/Message";

const Profile = () => {
  const { user, updateStoredUser, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const payload = { name: formData.name, bio: formData.bio };
      if (formData.password) payload.password = formData.password;

      const { data } = await api.put(`/users/${user.id}`, payload);
      updateStoredUser(data.user);
      setSuccess("Profile updated successfully");
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Delete your account permanently? This cannot be undone.")) return;

    try {
      await api.delete(`/users/${user.id}`);
      logout();
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete account");
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2>My Profile</h2>

        <Message type="error" text={error} />
        <Message type="success" text={success} />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" value={user?.email || ""} disabled />
            <small>Email cannot be changed</small>
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows="3"
              maxLength={300}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us a little about yourself"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <hr />

        <button className="btn btn-danger btn-full" onClick={handleDeleteAccount}>
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
