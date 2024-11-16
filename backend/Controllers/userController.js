import mongoose from "mongoose";
import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid User ID" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedUser,
        });
    } catch (err) {
        console.error("Update User Error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to update user",
        });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid User ID" });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Successfully deleted",
        });
    } catch (err) {
        console.error("Delete User Error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
        });
    }
};

export const getSingleUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid User ID" });
    }

    try {
        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User found",
            data: user,
        });
    } catch (err) {
        console.error("Get Single User Error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user",
        });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const { query } = req.query;
        let users;

        if (query) {
            users = await User.find({
                isApproved: "approved",
                $or: [{ name: { $regex: query, $options: "i" } }],
            }).select("-password");
        } else {
            users = await User.find({ isApproved: "approved" }).select("-password");
        }

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users,
        });
    } catch (err) {
        console.error("Get All Users Error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve users",
        });
    }
};

export const getUserProfile = async (req, res) => {
    const { userId } = req;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid User ID" });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        const { password, ...rest } = user._doc;

        res
            .status(200)
            .json({ success: true, message: "Profile info retrieved", data: { ...rest } });
    } catch (err) {
        console.error("Get User Profile Error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve user profile",
        });
    }
};

export const getMyAppointments = async (req, res) => {
    try {
        // Step 1: Retrieve appointments from bookings for a specific user
        const bookings = await Booking.find({ user: req.userId });

        // Step 2: Extract doctor IDs from appointment bookings
        const doctorIds = bookings.map((el) => el.doctor);

        // Step 3: Retrieve doctors using doctor IDs
        const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select("-password");

        res.status(200).json({
            success: true,
            message: "Appointments retrieved successfully",
            data: doctors,
        });
    } catch (err) {
        console.error("Get My Appointments Error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve appointments",
        });
    }
};
