import User from "../models/UserSchema.js";

export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedUser,
        });
    } catch (err) {
        console.error('Update User Error:', err);
        res.status(500).json({
            success: false,
            message: "Failed to update",
        });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Successfully deleted",
        });
    } catch (err) {
        console.error('Delete User Error:', err);
        res.status(500).json({
            success: false,
            message: "Failed to delete",
        });
    }
};

export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User found",
            data: user,
        });
    } catch (err) {
        console.error('Get Single User Error:', err);
        res.status(404).json({
            success: false,
            message: "No user found",
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
                $or: [
                    { name: { $regex: query, $options: "i" } },
                ],
            }).select("-password");
        } else {
            users = await User.find({ isApproved: "approved" }).select("-password");
        }

        res.status(200).json({
            success: true,
            message: "Users found",
            data: users,
        });
    } catch (err) {
        console.error('Get All Users Error:', err);
        res.status(404).json({
            success: false,
            message: "Not found",
        });
    }
};
