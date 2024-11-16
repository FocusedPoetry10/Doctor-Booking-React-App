import React from "react";
import heroImg01 from "../assets/data/Images/hero-img01.png";
import heroImg02 from "../assets/data/Images/hero-img02.png";
import heroImg03 from "../assets/data/Images/hero-img03.png";
import icon01 from "../assets/data/Images/icon01.png";
import icon02 from "../assets/data/Images/icon02.png";
import icon03 from "../assets/data/Images/icon03.png";
import featureImg from "../assets/data/Images/feature-img.png";
import faqImg from "../assets/data/Images/faq-img.png";
import videoIcon from "../assets/data/Images/video-icon.png";
import avatarIcon from "../assets/data/Images/avatar-icon.png";
import { Link } from 'react-router-dom';
import { BsArrowRight } from "react-icons/bs";
import About from "../Components/About/About";
import ServiceList from "../Components/Services/ServiceList";
import DoctorList from "../Components/Doctors/DoctorList";
import FaqList from "../Components/Faq/FaqList";
import Testimonial from "../Components/Testimonial/Testimonial";

const Home = () => {
    return(
    <>
    {/* ======== hero section ======== */}
    <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
            <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
           
                {/* ====== hero section content ======== */}
                <div>
                    <div className="lg:w-[570px]">
                        <h1 className="text-[36px] leading-[46px] text-headingcolor font-[800] md:text-[60px] md:leading-[70px]">
                            We help patients live a healthy, longer life.
                        </h1>
                        <p className="text-[18px] leading-[30px] font-[400] text-textcolor mt-[18px]">
                            Welcome to Medicare—your health, just a tap away! Find top doctors, book appointments instantly, and get the care you need with ease. Start your journey to better health now!
                        </p>
                        <button className="btn">Request an Appointment</button>
                    </div>
                    
                    {/* ===== hero counter ====== */}
                    <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                        <div>
                            <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                                30+
                            </h2>
                            <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                            <p className="text__para">Years of Experience</p>
                        </div>
                        <div>
                            <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                                15+
                            </h2>
                            <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                            <p className="text__para">Clinic Locations</p>
                        </div>
                        <div>
                            <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                                100%
                            </h2>
                            <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                            <p className="text__para">Patient Satisfaction</p>
                        </div>
                    </div>
                </div>

                {/* ====== hero images ======== */}
                <div className="flex gap-[30px] justify-end">
                    <div>
                        <img className="w-full" src={heroImg01} alt="Hero Image 1" />
                    </div>
                    <div className="mt-[30px]">
                        <img src={heroImg02} alt="Hero Image 2" className="w-full mb-[30px]" />
                        <img src={heroImg03} alt="Hero Image 3" className="w-full" />
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* ====== hero section end ======== */}

    {/* ====== Services Section ======= */}
    <section>
        <div className="container">
            <div className="lg:w-[470px] mx-auto">
                <h2 className="heading text-center">Providing the best medical services</h2>
                <p className="text__para text-center">
                    World-class care for everyone. Our health system offers unmatched, expert health care.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
                <div className="py-[30px] px-5">
                    <div className="flex items-center justify-center">
                        <img src={icon01} alt="Find a Doctor" />
                    </div>
                    <div className="mt-[30px]">
                        <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">Find a Doctor</h2>
                        <p className="text-[16px] leading-7 text-Color font-[400] mt-4 text-center">
                            World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.
                        </p>
                        <Link to='/doctors' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                            <BsArrowRight className="group-hover:text-white w-6 h-5" />
                        </Link>
                    </div>
                </div>

                <div className="py-[30px] px-5">
                    <div className="flex items-center justify-center">
                        <img src={icon02} alt="Find a Location" />
                    </div>
                    <div className="mt-[30px]">
                        <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">Find a Location</h2>
                        <p className="text-[16px] leading-7 text-Color font-[400] mt-4 text-center">
                            World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.
                        </p>
                        <Link to='/locations' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                            <BsArrowRight className="group-hover:text-white w-6 h-5" />
                        </Link>
                    </div>
                </div>

                <div className="py-[30px] px-5">
                    <div className="flex items-center justify-center">
                        <img src={icon03} alt="Book Appointment" />
                    </div>
                    <div className="mt-[30px]">
                        <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">Book Appointment</h2>
                        <p className="text-[16px] leading-7 text-Color font-[400] mt-4 text-center">
                            World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.
                        </p>
                        <Link to='/appointments' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                            <BsArrowRight className="group-hover:text-white w-6 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* ====== Services Section End ======= */}

    <About />

    {/* ====== Feature Section ===== */}
    <section>
        <div className="container">
            <div className="flex items-center justify-between flex-col lg:flex-row">
                <div className="xl:w-[670px]">
                    <h2 className="heading">Get virtual treatment anytime.</h2>
                    <ul className="pl-4">
                        <li className="text__para">1. Schedule the appointment directly.</li>
                        <li className="text__para">2. Search for your physician here, and contact their office.</li>
                        <li className="text__para">3. View our physicians who are accepting new patients, use the online scheduling tool to select an appointment time.</li>
                    </ul>
                    <Link to="/">
                        <button className="btn">Learn More</button>
                    </Link>
                </div>
                <div>
                    <img src={featureImg} alt="Feature Image" />
                </div>
            </div>
        </div>
    </section>
    {/* ====== Feature Section End ===== */}

    <DoctorList />

    <FaqList />
    
    <Testimonial />
    </>
    );
};

export default Home;
