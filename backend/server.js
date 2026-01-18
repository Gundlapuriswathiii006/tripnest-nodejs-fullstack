import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"

dotenv.config();

const app = express();

// connect DB
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
// routes
app.use("/api/users", userRoutes);
app.use("/api/trips",tripRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/admin",adminRoutes);

// test route
app.get("/", (req, res) => {
  res.send("TripNest Backend Running Successfully");
});

// server start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//POST/api/users/register
//http://localhost:4000/api/users/register 
//http://localhost:4000/api/trips/create
//http://localhost:4000/api/bookings/create