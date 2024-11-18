import express from "express";
import { 
    updateDoctor, 
    deleteDoctor, 
    getAllDoctor, 
    getSingleDoctor,
    getDoctorProfile, 
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from './review.js';

const router = express.Router();

// Nested route for reviews
router.use("/:doctorId/reviews", reviewRouter);

// Routes
router.get("/:id", getSingleDoctor); // Get a single doctor
router.get("/", getAllDoctor); // Get all doctors
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor); // Update doctor (only for doctors)
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor); // Delete doctor (only for doctors)
router.get("/profile/me", authenticate, restrict(['doctor']), getDoctorProfile);

export default router;
