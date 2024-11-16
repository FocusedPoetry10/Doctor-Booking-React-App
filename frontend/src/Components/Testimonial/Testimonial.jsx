// import React from "react";
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import patientAvatar from '../../assets/data/Images/patient-avatar.png';
import { HiStar } from 'react-icons/hi';

// Testimonial Data (can be dynamic)
const testimonials = [
  {
    name: "Vishwa Moorthy",
    rating: 5,
    text: "I have taken medical services from them. They treat so well and they are providing the best medical services.",
    avatar: patientAvatar
  },
  {
    name: "Vineeth Kumar",
    rating: 4,
    text: "Excellent care and the staff are very professional. Highly recommend!",
    avatar: patientAvatar
  },
  {
    name: "Shanttoosh",
    rating: 5,
    text: "The best experience I've had. They genuinely care about patients' well-being.",
    avatar: patientAvatar
  },
  // Add more testimonials as needed
];

const Testimonial = () => {
  return (
    <div className="mt-[30px] lg:mt-[55px]">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="py-[30px] px-5 rounded-[13px] shadow-lg border border-gray-200">
              <div className="flex items-center gap-[13px]">
                <img src={testimonial.avatar} alt="Patient Avatar" className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-[2px]">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <HiStar key={index} className="text-yellow-400 w-[18px] h-5" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[16px] leading-7 mt-4 text-gray-700 font-[400]">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
