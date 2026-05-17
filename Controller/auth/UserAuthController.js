import User from "../../models/userSchema.js";
import UserOtp from "../../models/user-otp.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Update existing OTP or create new one
        await UserOtp.findOneAndUpdate(
            { email },
            { otp, createdAt: new Date() },
            { upsert: true, new: true }
        );

        // TODO: Actually send email here using nodemailer
        console.log(`OTP for ${email}: ${otp}`);

        res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const record = await UserOtp.findOne({ email, otp });

        if (!record) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }
        
        res.status(200).json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password, otp } = req.body;

        // Final verification check before registration
        const record = await UserOtp.findOne({ email, otp });
        if (!record) {
            return res.status(400).json({ error: "Please verify OTP first" });
        }

        const user = await User.create({ name, email, phone, password });
        
        // Delete OTP record after successful registration
        await UserOtp.deleteOne({ email });

        const token = generateToken(user._id);

        res.status(201).json({ 
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            },
            token 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = generateToken(user._id);
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            },
            token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};