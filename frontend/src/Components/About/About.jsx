// Import necessary modules and assets
// import React from "react";
import aboutImg from "../../assets/data/Images/about.png";
import aboutCardImg from "../../assets/data/Images/about-card.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-[130px] xl:gap-0">

          {/* ====== About Image Section ====== */}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={aboutImg} alt="About Us - Main Visual" className="w-full h-auto" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
              <img src={aboutCardImg} alt="Recognition Card" className="w-full h-auto" />
            </div>
          </div>

          {/* ====== About Content Section ====== */}
          <article className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">Proud to be one of the nation’s best</h2>
            <p className="text__para">
              For 30 years in a row, U.S. News & World Report has recognized us as one of the best public hospitals in the nation and #1 in Texas.
            </p>
            <p className="text__para mt-6">
              Our best is something we strive for each day, caring for our patients—not looking back at what we accomplished, but towards what we can do tomorrow. Providing the best.
            </p>
            <Link to="/">
              <button className="btn-primary mt-4">Learn More</button>
            </Link>
          </article>

        </div>
      </div>
    </section>
  );
};

export default About;
