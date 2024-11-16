import { Link } from "react-router-dom";
import logo from "../../assets/data/Images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import { AiFillGithub, AiOutlineInstagram } from "react-icons/ai";

const socialLinks = [
  {
    path: "https://github.com/VishwaMoorthy12/",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
    label: "GitHub",
  },
  {
    path: "https://www.instagram.com/this.is_vichu/",
    icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />,
    label: "Instagram",
  },
  {
    path: "https://www.linkedin.com/in/vishwa-moorthy-s-0006492a0/",
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />,
    label: "LinkedIn",
  },
];

const quickLinks01 = [
  { path: "/home", display: "Home" },
  { path: "/", display: "About Us" },
  { path: "/services", display: "Services" },
  { path: "/", display: "Blog" },
];

const quickLinks02 = [
  { path: "/find-a-doctor", display: "Find a Doctor" },
  { path: "/", display: "Request an Appointment" },
  { path: "/", display: "Find a Location" },
  { path: "/", display: "Get an Opinion" },
];

const quickLinks03 = [
  { path: "/", display: "Donate" },
  { path: "/contact", display: "Contact Us" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 bg-gray-100">
      <div className="container">
        <div className="flex flex-col md:flex-row flex-wrap gap-[30px] justify-between">
          {/* Logo and Copyright Section */}
          <div>
            <img src={logo} alt="Company Logo" className="mb-4" />
            <p className="text-[16px] leading-7 font-[400] text-textColor">
              Copyright © {year} developed by Vishwa Moorthy. All rights reserved.
            </p>

            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link) => (
                <a
                  href={link.path}
                  key={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Quick Links
            </h2>
            <ul>
              {quickLinks01.map((item) => (
                <li key={item.path} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor hover:underline"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* I want to Section */}
          <nav>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              I want to:
            </h2>
            <ul>
              {quickLinks02.map((item) => (
                <li key={item.path} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor hover:underline"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support Section */}
          <nav>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Support
            </h2>
            <ul>
              {quickLinks03.map((item) => (
                <li key={item.path} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor hover:underline"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
