import express from "express";
import authMiddleware, { adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/test", authMiddleware, adminOnly, (req, res) => {
  res.json({
    message: "Admin access granted ✅",
    user: req.user
  });
});

export default router;