import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        doctor: {
            type: mongoose.Types.ObjectId,
            ref: "Doctor",
            required: true, // Ensures a doctor ID is always provided
        },

        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true, // Ensures a user ID is always provided
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



reviewSchema.statics.calcAverageRatings = async function(doctorId) {

    // this points the current review
    const stats = await this.aggregate([{
        $match:{doctor:doctorId}
    },
{
    $group: {
        _id: '$doctor',
        numOfRating:{$sum:1},
        avgRating:{$avg:'$rating'}
    },
},
]);

console.log(stats)

};

reviewSchema.post('save', function(){

    this.constructor.calcAverageRatings(this.doctor);
});

export default mongoose.model("Review", reviewSchema);
