import { useState } from "react";
import PropTypes from "prop-types"; // Add PropTypes for better type safety
import avatar from "../../assets/data/Images/avatar-icon.png";
import { formateDate } from "../../../utils/formateDate.js"; // Ensure this matches your utility function's name
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

const Feedback = ({ reviews = [], totalRating = 0 }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({totalRating})
        </h4>

        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="flex justify-between gap-10 mb-[30px]">
              <div className="flex gap-3">
                <figure className="w-10 h-10 rounded-full">
                  <img
                    className="w-full rounded-full"
                    src={review?.user?.photo || avatar} // Fallback to avatar if photo is missing
                    alt={`${review?.user?.name || "User"}'s avatar`}
                  />
                </figure>

                <div>
                  <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                    {review?.user?.name || "Anonymous"}
                  </h5>
                  <p className="text-[14px] leading-6 text-textColor">
                    {review?.createdAt ? formateDate(review.createdAt) : "Invalid date"}
                  </p>
                  <p className="text__para mt-3 font-medium text-[15px]">
                    {review?.reviewText || "No review text available."}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 items-center">
                {[...Array(5)].map((_, starIndex) => (
                  <AiFillStar
                    key={starIndex}
                    color={starIndex < (review?.rating || 0) ? "#0067FF" : "#d3d3d3"}
                    className="text-[18px]"
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-[16px] leading-6 text-textColor">
            Be the first to review!
          </p>
        )}

        {!showFeedbackForm && (
          <div className="text-center">
            <button 
              className="btn" 
              onClick={() => setShowFeedbackForm(true)} 
              disabled={showFeedbackForm} // Disable button once form is visible
            >
              Give Feedback
            </button>
          </div>
        )}

        {showFeedbackForm && <FeedbackForm />}
      </div>
    </div>
  );
};

Feedback.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string,
        photo: PropTypes.string,
      }),
      createdAt: PropTypes.string,
      reviewText: PropTypes.string,
      rating: PropTypes.number,
    })
  ),
  totalRating: PropTypes.number,
};

export default Feedback;
