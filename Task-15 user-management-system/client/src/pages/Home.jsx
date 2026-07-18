// src/pages/Home.jsx

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="page-container home-hero">
      <h1>Welcome to the User Management System</h1>
      <p>
        A simple MERN stack app to register, log in, and manage your profile
        with secure JWT authentication.
      </p>

      {!user ? (
        <div className="hero-actions">
          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      ) : (
        <div className="hero-actions">
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
