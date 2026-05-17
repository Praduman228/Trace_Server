import mongoose from "mongoose";

const userOtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // 5 minutes
    }
} , {timestamps:true});

const UserOtp = mongoose.model("UserOtp", userOtpSchema);
export default UserOtp;