import React from "react";
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import patientAvatar from '../../assets/data/Images/patient-avatar.png';
import { HiStar } from 'react-icons/hi';

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
                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-[13px] shadow-lg border border-gray-200">
                        <div className="flex items-center gap-[13px]">
                            <img src={patientAvatar} alt="Patient Avatar" className="w-12 h-12 rounded-full" />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                                    Vishwa Moorthy
                                </h4>
                                <div className="flex items-center gap-[2px]">
                                    {[...Array(5)].map((_, index) => (
                                        <HiStar key={index} className="text-yellow-400 w-[18px] h-5" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-[16px] leading-7 mt-4 text-gray-700 font-[400]">
                            "I have taken medical services from them. They treat so well and they are providing the best medical services."
                        </p>
                    </div>                
                </SwiperSlide>
                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-[13px] shadow-lg border border-gray-200">
                        <div className="flex items-center gap-[13px]">
                            <img src={patientAvatar} alt="Patient Avatar" className="w-12 h-12 rounded-full" />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                                    Vishwa Moorthy
                                </h4>
                                <div className="flex items-center gap-[2px]">
                                    {[...Array(5)].map((_, index) => (
                                        <HiStar key={index} className="text-yellow-400 w-[18px] h-5" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-[16px] leading-7 mt-4 text-gray-700 font-[400]">
                            &ldquo;I have taken medical services from them. They treat so well and they are providing the best medical services.&rdquo;
                        </p>
                    </div>                
                </SwiperSlide>
                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-[13px] shadow-lg border border-gray-200">
                        <div className="flex items-center gap-[13px]">
                            <img src={patientAvatar} alt="Patient Avatar" className="w-12 h-12 rounded-full" />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                                    Vishwa Moorthy
                                </h4>
                                <div className="flex items-center gap-[2px]">
                                    {[...Array(5)].map((_, index) => (
                                        <HiStar key={index} className="text-yellow-400 w-[18px] h-5" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-[16px] leading-7 mt-4 text-gray-700 font-[400]">
                            &ldquo;I have taken medical services from them. They treat so well and they are providing the best medical services.&rdquo;
                        </p>
                    </div>                
                </SwiperSlide>
                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-[13px] shadow-lg border border-gray-200">
                        <div className="flex items-center gap-[13px]">
                            <img src={patientAvatar} alt="Patient Avatar" className="w-12 h-12 rounded-full" />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                                    Vishwa Moorthy
                                </h4>
                                <div className="flex items-center gap-[2px]">
                                    {[...Array(5)].map((_, index) => (
                                        <HiStar key={index} className="text-yellow-400 w-[18px] h-5" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-[16px] leading-7 mt-4 text-gray-700 font-[400]">
                            &ldquo;I have taken medical services from them. They treat so well and they are providing the best medical services.&rdquo;
                        </p>
                    </div>                
                </SwiperSlide>
                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-[13px] shadow-lg border border-gray-200">
                        <div className="flex items-center gap-[13px]">
                            <img src={patientAvatar} alt="Patient Avatar" className="w-12 h-12 rounded-full" />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                                    Vishwa Moorthy
                                </h4>
                                <div className="flex items-center gap-[2px]">
                                    {[...Array(5)].map((_, index) => (
                                        <HiStar key={index} className="text-yellow-400 w-[18px] h-5" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-[16px] leading-7 mt-4 text-gray-700 font-[400]">
                            &ldquo;I have taken medical services from them. They treat so well and they are providing the best medical services.&rdquo;
                        </p>
                    </div>                
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Testimonial;
