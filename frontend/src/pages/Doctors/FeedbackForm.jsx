import { useState } from 'react';
import { AiFillStar } from "react-icons/ai";

const FeedbackForm = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        // Handle form submission logic here (e.g., send data to server)
        console.log("Review submitted:", { rating, reviewText });

        // Optionally reset the form
        setRating(0);
        setReviewText("");
        setHover(0);  // Reset hover state on form submit
    }

    return (
        <form onSubmit={handleSubmitReview}>
            {/* Rating Section */}
            <div>
                <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
                    How would you rate the overall experience?*
                </h3>

                <div className="flex gap-2">
                    {[...Array(5)].map((_, index) => {
                        index += 1; // Make sure the index starts from 1

                        return (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Rate ${index} stars`}
                                className={`${
                                    index <= (hover || rating)
                                        ? "text-yellowColor"
                                        : "text-gray-400"
                                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                                onClick={() => setRating(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}
                                onDoubleClick={() => {
                                    setHover(0);
                                    setRating(0);
                                }}
                            >
                                <AiFillStar />
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Feedback Text Section */}
            <div className="mt-[30px]">
                <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
                    Share your feedback or suggestions*
                </h3>

                <textarea
                    className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
                    rows="5"
                    placeholder="Write your message"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
                <button type="submit" className="btn">
                    Submit Feedback
                </button>
            </div>
        </form>
    );
};

export default FeedbackForm;
