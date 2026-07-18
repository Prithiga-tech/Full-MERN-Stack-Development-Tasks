// server.js
// Entry point for the Express application.

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Allow the deployed frontend (and local dev server) to call this API.
// CLIENT_URL can be a comma-separated list, e.g.
// "http://localhost:5173,https://your-app.vercel.app"
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like Postman or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json()); // parse JSON request bodies

// Simple health check route - useful for Render/uptime checks
app.get("/", (req, res) => {
  res.status(200).json({ message: "User Management API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// 404 + error handlers must be registered last
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
