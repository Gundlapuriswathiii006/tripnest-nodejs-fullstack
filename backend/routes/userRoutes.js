import express from "express";
import { registerUser,loginUser,getProfile} from "../controllers/usercontroller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
/*router.get("/profile", authMiddleware, (req,res) => {
    res.json({
        message:"Access granted",
        userId: req.user,
    });
});*/
router.get("/profile",authMiddleware,getProfile);

export default router;
