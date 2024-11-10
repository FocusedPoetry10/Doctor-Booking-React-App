import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  ticketPrice: { type: Number },
  role: {
    type: String,
    enum: ["doctor"],  // Restricting to "doctor" role for specificity
    required: true,
  },
  // Fields for doctors only
  specialization: { type: String },
  qualifications: {
    type: [{ type: String }],
  },
  experiences: {
    type: [{ type: String }],
  },
  bio: { type: String, maxLength: 50 },
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
});

export default mongoose.model("Doctor", DoctorSchema);
