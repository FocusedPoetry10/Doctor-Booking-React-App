import { useState } from 'react';
import avatar from "../../assets/data/Images/avatar-icon.png";
import { formateDate } from "../../../utils/formateDate.js"; // Fixed the typo here
import { AiFillStar } from 'react-icons/ai';
import FeedbackForm from "./FeedbackForm";

const Feedback = () => {
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);

    // Dummy review data (replace with dynamic data)
    const reviews = [
        {
            userName: "Ali Ahmed",
            date: "12-11-2024",
            rating: 5,
            review: "Good services, highly recommended👍"
        },
        {
            userName: "Sarah Khan",
            date: "10-11-2024",
            rating: 4,
            review: "Great experience, but can be improved."
        }
    ];

    return (
        <div>
            <div className="mb-[50px]">
                <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
                    All reviews (272)
                </h4>

                {/* Loop over reviews to render each */}
                {reviews.map((review, index) => (
                    <div key={index} className="flex justify-between gap-10 mb-[30px]">
                        <div className="flex gap-3">
                            <figure className="w-10 h-10 rounded-full">
                                <img className="w-full" src={avatar} alt="User Avatar" />
                            </figure>

                            <div>
                                <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                                    {review.userName}
                                </h5>
                                <p className="text-[14px] leading-6 text-textColor">
                                    {formateDate(review.date)} {/* Fixed function name */}
                                </p>
                                <p className="text__para mt-3 font-medium text-[15px]">
                                    {review.review}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-1 items-center">
                            {/* Render dynamic stars based on rating */}
                            {[...Array(5)].map((_, index) => (
                                <AiFillStar
                                    key={index}
                                    color={index < review.rating ? "#0067FF" : "#d3d3d3"}
                                    className="text-[18px]"
                                />
                            ))}
                        </div>
                    </div>
                ))}

                {/* Button to toggle feedback form */}
                {!showFeedbackForm ? (
                    <div className="text-center">
                        <button className="btn" onClick={() => setShowFeedbackForm(true)}>
                            Give Feedback
                        </button>
                    </div>
                ) : (
                    <FeedbackForm />
                )}
            </div>
        </div>
    );
};

export default Feedback;
