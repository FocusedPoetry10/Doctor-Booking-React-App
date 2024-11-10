import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
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
        reviewText: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
    },
    { timestamps: true }
);

// Pre-hook for populating user details before each find query
reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name photo",
    });
    next();
});

// Calculate average rating and total ratings
reviewSchema.statics.calcAverageRatings = async function (doctorId) {
    const stats = await this.aggregate([
        { $match: { doctor: doctorId } },
        {
            $group: {
                _id: "$doctor",
                numOfRating: { $sum: 1 },
                avgRating: { $avg: "$rating" },
            },
        },
    ]);

    if (stats.length > 0) {
        await mongoose.model("Doctor").findByIdAndUpdate(doctorId, {
            totalRating: stats[0].numOfRating,
            averageRating: stats[0].avgRating,
        });
    } else {
        await mongoose.model("Doctor").findByIdAndUpdate(doctorId, {
            totalRating: 0,
            averageRating: 0,
        });
    }
};

// Update ratings after saving a review
reviewSchema.post("save", function () {
    this.constructor.calcAverageRatings(this.doctor);
});

// Update ratings after deleting a review
reviewSchema.post("remove", function () {
    this.constructor.calcAverageRatings(this.doctor);
});

export default mongoose.model("Review", reviewSchema);
