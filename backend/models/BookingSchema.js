import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        doctor: {
            type: mongoose.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        ticketPrice: {
            type: Number,  // Changed to Number for numeric value
            required: true,
        },
        appointmentDate: {
            type: Date,
            required: true,
        },
        status: {  // Corrected typo from "statues" to "status"
            type: String,
            enum: ["pending", "approved", "cancelled"],
            default: "pending",
        },
        isPaid: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
