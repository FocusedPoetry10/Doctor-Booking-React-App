import { useEffect, useRef, useContext } from "react";
import logo from "../../assets/data/Images/logo.png";
import userImg from "../../assets/data/Images/avatar-icon.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(AuthContext);

  // Sticky Header Logic
  const handleStickyHeader = () => {
    const isScrolled = document.body.scrollTop > 80 || document.documentElement.scrollTop > 80;
    if (headerRef.current) {
      headerRef.current.classList.toggle("sticky_header", isScrolled);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyHeader);
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  // Toggle Mobile Menu
  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("show__menu");
    }
  };

  return (
    <header ref={headerRef} className="header flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link to="/home">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="navigation" ref={menuRef}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500]"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div className="flex items-center gap-2">
                <Link
                  to={role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}
                  className="flex items-center"
                >
                  <figure className="w-[35px] h-[35px] rounded-full overflow-hidden cursor-pointer">
                    <img
                      src={user.photo || userImg}
                      className="w-full h-full object-cover"
                      alt={user.name || "User Avatar"}
                    />
                  </figure>
                  <h2 className="text-[16px] font-[500] text-textColor ml-2">{user.name}</h2>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
