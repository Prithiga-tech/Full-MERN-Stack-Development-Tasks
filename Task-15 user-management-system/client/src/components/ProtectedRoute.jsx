// src/components/ProtectedRoute.jsx
// Wraps private pages. If there's no logged-in user, redirect to /login.

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // avoid flicker while session is restored

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
