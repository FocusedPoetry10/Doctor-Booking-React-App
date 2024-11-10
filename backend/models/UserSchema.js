import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
        },
        password: {
            type: String,
            required: true,
        },
        name: { type: String, required: true },
        phone: {
            type: String,
            match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
        },
        photo: { type: String },
        role: {
            type: String,
            enum: ["patient", "admin"],
            default: "patient",
        },
        gender: {
            type: String,
            enum: ["male", "female", "queer", "other"],
        },
        bloodType: { type: String },
        appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
        isDeleted: { type: Boolean, default: false }, // For soft deletion
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

// Pre-save hook for hashing passwords if needed
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    // Hash password logic here if using bcrypt or similar library
    next();
});

export default mongoose.model("User", UserSchema);
