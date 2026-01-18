import express from "express";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
  approveBooking
} from "../controllers/bookingcontroller.js";
import authMiddleware,{adminOnly} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createbooking", authMiddleware, createBooking);
router.get("/mybookings", authMiddleware, getMyBookings);
router.delete("/:id", authMiddleware, cancelBooking);
router.put("/:id",authMiddleware,adminOnly,approveBooking);

export default router;