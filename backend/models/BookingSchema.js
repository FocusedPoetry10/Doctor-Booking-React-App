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
            type: Number, // Ensures numeric ticket price
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "cancelled"], // Defined allowed statuses
            default: "pending", // Default status
        },
        isPaid: {
            type: Boolean,
            default: true, // Default to true assuming payment is made
        },
    },
    { timestamps: true } // Automatically handles createdAt and updatedAt fields
);

// Middleware to populate related fields on query
bookingSchema.pre(/^find/, function (next) {
    this.populate("user", "name email").populate({
        path: "doctor",
        select: "name bio photo", // Populate only relevant doctor fields
    });
    next();
});

export default mongoose.model("Booking", bookingSchema);
