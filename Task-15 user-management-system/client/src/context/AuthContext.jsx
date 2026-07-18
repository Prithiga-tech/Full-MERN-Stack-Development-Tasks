// src/context/AuthContext.jsx
// Provides the current user and auth actions (login/register/logout)
// to the whole app via React Context, and persists the session in
// localStorage so a refresh doesn't log the user out.

import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // On first load, restore the session from localStorage (if any)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [token]);

  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    persistSession(data.token, data.user);
    return data;
  };

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    persistSession(data.token, data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const updateStoredUser = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const persistSession = (newToken, newUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, register, login, logout, updateStoredUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access in components: const { user } = useAuth();
export const useAuth = () => useContext(AuthContext);
