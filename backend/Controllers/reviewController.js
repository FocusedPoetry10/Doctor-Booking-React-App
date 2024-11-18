import Review from '../models/ReviewSchema.js';
import Doctor from '../models/DoctorSchema.js';

// Get all reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});
        
        res.status(200).json({ success: true, message: "Successful", data: reviews });
    } catch (err) {
        console.error('Get All Reviews Error:', err);
        res.status(404).json({ success: false, message: "Not found" });
    }
};

// Create review
export const createReview = async (req, res) => {
    try {
        // Check if doctor ID and user ID are present
        const doctorId = req.body.doctor || req.params.doctorId;
        const userId = req.body.user || req.userId;

        if (!doctorId || !userId) {
            return res.status(400).json({ success: false, message: "Doctor and User IDs are required" });
        }

        // Validate required fields
        const { rating, reviewText } = req.body;
        if (!rating || !reviewText) {
            return res.status(400).json({ success: false, message: "Rating and Review Text are required" });
        }

        // Create a new review
        const newReview = new Review({
            rating,
            reviewText,
            doctor: doctorId,
            user: userId,
        });

        // Save review and update doctor's reviews
        const savedReview = await newReview.save();

        await Doctor.findByIdAndUpdate(doctorId, {
            $push: { reviews: savedReview._id },
        });

        res.status(200).json({ success: true, message: "Review Submitted", data: savedReview });
    } catch (err) {
        console.error('Create Review Error:', err);
        res.status(500).json({ success: false, message: "Failed to submit review" });
    }
};
