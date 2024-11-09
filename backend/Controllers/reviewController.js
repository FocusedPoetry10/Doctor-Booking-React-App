import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Get all reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.status(200).json({ success: true, message: "Successful", data: reviews });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not Found" });
    }
};

// Create review
export const createReview = async (req, res) => {
    // Set doctor and user IDs if they are not in the request body
    req.body.doctor = req.body.doctor || req.params.doctorId;
    req.body.user = req.body.user || req.userId;

    // Create new review instance with request body data
    const newReview = new Review(req.body);

    try {
        // Save the review to the database
        const savedReview = await newReview.save();

        // Add the new review to the doctor's review list
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            req.body.doctor,
            { $push: { reviews: savedReview._id } },
            { new: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        // Recalculate average rating and total rating
        const allReviews = await Review.find({ doctor: req.body.doctor });
        const totalRatings = allReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRatings / allReviews.length;

        // Update doctor's rating fields
        updatedDoctor.averageRating = averageRating;
        updatedDoctor.totalRating = allReviews.length;
        await updatedDoctor.save();

        res.status(200).json({
            success: true,
            message: "Review Submitted",
            data: savedReview,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
