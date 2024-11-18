import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

// Reusable Success and Error Handler
const handleSuccess = (res, message, data = null) => {
    return res.status(200).json({ success: true, message, data });
};

const handleError = (res, message) => {
    return res.status(500).json({ success: false, message });
};

// Update Doctor
export const updateDoctor = async (req, res) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;

    // Validation: Check required fields
    if (!name || !email || !phone) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        handleSuccess(res, "Successfully updated", updatedDoctor);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: err.message });
        }
        console.error(`Error updating doctor with ID ${id}:`, err);
        handleError(res, "Failed to update");
    }
};

// Delete Doctor
export const deleteDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(id);

        if (!deletedDoctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        handleSuccess(res, "Successfully deleted");
    } catch (err) {
        console.error(`Error deleting doctor with ID ${id}:`, err);
        handleError(res, "Failed to delete");
    }
};

// Get Single Doctor
export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const doctor = await Doctor.findById(id)
            .populate("reviews")
            .select("-password");

        if (!doctor) {
            return res.status(404).json({ success: false, message: "No Doctor found" });
        }

        if (!doctor.reviews) {
            doctor.reviews = [];
        }

        handleSuccess(res, "Doctor found", doctor);
    } catch (err) {
        console.error(`Error fetching doctor with ID ${id}:`, err);
        handleError(res, "Failed to retrieve doctor");
    }
};

// Get All Doctors with Pagination and Search
export const getAllDoctor = async (req, res) => {
    try {
        const { query, page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        let doctors;

        if (query) {
            doctors = await Doctor.find({
                isApproved: 'approved',
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: 'i' } },
                ],
            })
                .skip(skip)
                .limit(limit)
                .select("-password");
        } else {
            doctors = await Doctor.find({ isApproved: "approved" })
                .skip(skip)
                .limit(limit)
                .select("-password");
        }

        handleSuccess(res, "Doctors found", doctors);
    } catch (err) {
        console.error('Error fetching doctors:', err);
        handleError(res, "Failed to retrieve doctors");
    }
};

// Get Doctor Profile (Logged in doctor)
export const getDoctorProfile = async (req, res) => {
    const doctorId = req.userId;

    try {
        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        const { password, ...rest } = doctor._doc;
        const appointments = await Booking.find({ doctor: doctorId });

        handleSuccess(res, "Profile info is getting", { ...rest, appointments });
    } catch (err) {
        console.error(`Error fetching profile for doctor ID ${doctorId}:`, err);
        handleError(res, "Something went wrong, cannot get profile");
    }
};
