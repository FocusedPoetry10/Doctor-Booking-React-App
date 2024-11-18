import { useState } from "react";
import { useParams } from "react-router-dom"; 
import starIcon from "../../assets/data/Images/Star.png";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { BASE_URL } from "./../../config";
import useFetchData from "./../../hooks/useFetchData";
import Loader from "../../Components/Loader/Loading";
import Error from "../../Components/Error/Error";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams(); // Extract the doctor ID from the route

  const { data: doctor, loading, error } = useFetchData(`${BASE_URL}/api/v1/doctors/${id}`);

  const {
    name = "Unknown Doctor",
    qualifications = [],
    experiences = [],
    timeSlots = [],
    reviews = [],
    bio = "No biography available.",
    about = "No additional details provided.",
    averageRating = 0,
    totalRating = 0,
    specialization = "General",
    ticketPrice = "N/A",
    photo = starIcon, // Use a default image if no photo provided
  } = doctor || {};

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {/* Loading and Error States */}
        {loading && <Loader />}
        {error && <Error />}

        {/* Main Content */}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            {/* Doctor Info Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={photo} alt={name} className="w-full h-auto rounded-md" />
                </figure>

                <div>
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {specialization}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">{name}</h3>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} alt="Star Icon" className="w-4 h-4" /> {averageRating}
                    </span>
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                      ({totalRating})
                    </span>
                  </div>
                  <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">{bio}</p>
                </div>
              </div>

              {/* Tab Section */}
              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={`py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold ${
                    tab === "about" && "border-b border-solid border-primaryColor"
                  }`}
                  aria-selected={tab === "about"}
                >
                  About
                </button>

                <button
                  onClick={() => setTab("feedback")}
                  className={`py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold ${
                    tab === "feedback" && "border-b border-solid border-primaryColor"
                  }`}
                  aria-selected={tab === "feedback"}
                >
                  Feedback
                </button>
              </div>

              {/* Tab Content */}
              <div className="mt-[50px]">
                {tab === "about" && (
                  <DoctorAbout
                    name={name}
                    about={about}
                    qualifications={qualifications}
                    experiences={experiences}
                  />
                )}
                {tab === "feedback" && <Feedback reviews={reviews} totalRating={totalRating} />}
              </div>
            </div>

            {/* Side Panel Section */}
            <div>
              <SidePanel 
                doctorId={doctor._id} 
                timeSlots={timeSlots} 
                ticketPrice={ticketPrice} 
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDetails;
