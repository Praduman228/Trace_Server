import express from "express";
import { sendOtp, registerUser, verifyOtp, loginUser } from "../Controller/auth/UserAuthController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route example
router.get("/profile", auth, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
});

export default router;