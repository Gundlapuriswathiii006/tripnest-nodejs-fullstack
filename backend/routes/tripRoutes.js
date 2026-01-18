import express from "express";
import { createTrip,getMyTrips, getTripById,updateTrip ,deleteTrip} from "../controllers/tripcontroller.js";
import authMiddleware,{adminOnly} from "../middleware/authMiddleware.js";

const router = express.Router();

// protected route
router.post("/create", authMiddleware,adminOnly, createTrip);
router.get("/my-trips",authMiddleware,getMyTrips);
router.get("/:id",authMiddleware,getTripById);
router.delete("/:id",authMiddleware,adminOnly,deleteTrip)
router.put("/:id",authMiddleware,adminOnly,updateTrip);

export default router;