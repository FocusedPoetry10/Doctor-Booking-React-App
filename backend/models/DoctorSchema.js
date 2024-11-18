import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { 
      type: String,  // Changed to String to allow formats like +1234567890
      required: false, 
    },
    photo: { type: String },
    ticketPrice: { type: Number },
    role: {
      type: String,
      enum: ["doctor"],  // Restricting to "doctor" role for specificity
      required: true,
    },
    // Fields for doctors only
    specialization: { type: String, required: false },
    qualifications: {
      type: [{ type: String }],
      validate: [arrayLimit, '{PATH} exceeds the limit of 5 qualifications'], // Example validation for array length
    },
    experiences: {
      type: [{ type: String }],
      validate: [arrayLimit, '{PATH} exceeds the limit of 10 experiences'], // Example validation for array length
    },
    bio: { 
      type: String, 
      maxLength: 50, 
    },
    about: { type: String },
    timeSlots: {
      type: [{ type: String }],
      default: [],  // Default to empty array if time slots aren’t set
    },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  },
  { timestamps: true }  // Adding createdAt and updatedAt timestamps for record tracking
);

// Custom validation for arrays (optional):
function arrayLimit(val) {
  return val.length <= 5;
}

export default mongoose.model("Doctor", DoctorSchema);
