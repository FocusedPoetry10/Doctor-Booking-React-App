import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation regex
    },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    phone: { 
      type: String, 
      required: false, 
      match: /^\+?[1-9]\d{1,14}$/, // Optional: Validate E.164 phone format
    },
    photo: { type: String },
    ticketPrice: { type: Number, min: 0 },
    role: {
      type: String,
      enum: ["doctor"], // Restricting to "doctor" role for specificity
      required: true,
    },
    specialization: { type: String, trim: true },
    qualifications: {
      type: [
        { 
          startingDate: { type: Date, required: true },
          endingDate: { type: Date, required: true },
          degree: { type: String, required: true, trim: true },
          university: { type: String, required: true, trim: true },
       },
      ],
      validate: [arrayLimit(5), "Exceeds the limit of 5 qualifications"], // Limit validation
    },
    experiences: {
      type: [
        {
          startingDate: { type: Date, required: true },
          endingDate: { type: Date, required: true },
          position: { type: String, required: true, trim: true },
          hospital: { type: String, required: true, trim: true },
        },
      ],
      validate: [arrayLimit(10), "Exceeds the limit of 10 experiences"], // Limit validation
    },
    bio: { 
      type: String, 
      maxLength: 250, // Increased length for better usability
    },
    about: { type: String, trim: true },
    timeSlots: {
      type: [
        {
          day: { type: String, required: true }, // E.g., "Monday"
          startingTime: { type: String, required: true }, // E.g., "09:00"
          endingTime: { type: String, required: true }, // E.g., "17:00"
        },
      ],
      default: [], // Default to an empty array if no time slots are set
    },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5, // Assuming ratings are on a scale of 0-5
    },
    totalRating: {
      type: Number,
      default: 0,
      min: 0,
    },
    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Custom validation for array limits:
function arrayLimit(limit) {
  return function (val) {
    return val.length <= limit;
  };
}

export default mongoose.model("Doctor", DoctorSchema);
