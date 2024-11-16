import express from "express";
import { 
    updateUser, 
    deleteUser, 
    getAllUser, 
    getSingleUser,
    getUserProfile, 
    getMyAppointments
} from "../Controllers/userController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// Get single user (user can view their own data or an admin can access all users)
router.get('/:id', authenticate, restrict(['patient', 'admin']), getSingleUser);

// Get all users (Only admin should have access)
router.get('/', authenticate, restrict(['admin']), getAllUser);

// Update user (A user can only update their own data, admin can update anyone)
router.put('/:id', authenticate, restrict(['patient']), updateUser);

// Delete user (A user can only delete their own account, admin can delete anyone)
router.delete('/:id', authenticate, restrict(['patient']), deleteUser);

router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);

router.get("/appointments/my-appointments", authenticate, restrict(["patient"]), getMyAppointments);

export default router;
