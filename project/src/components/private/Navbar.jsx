import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Import CSS specific to the Navbar
import Logo from "../../assets/images/logo.png";
import ProfileImage from "../../assets/images/image.png";
import { AuthContext } from "../../context/AuthContext.jsx";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  console.log('isAuthenticated:', isAuthenticated);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    console.log('dropdownOpen:', !dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={Logo} alt="Logo" className="navbar-logo" />
        <span className="navbar-brand-name">TravelXplore</span>
      </div>

      <div className="navbar-right">
        <Link to="/" className="navbar-nav-link">Home</Link>
        <Link to="/destinations" className="navbar-nav-link">Destinations</Link>
        <Link to="/about" className="navbar-nav-link">About</Link>
        <Link to="/contact" className="navbar-nav-link">Contact</Link>

        <div className="navbar-profile-dropdown" onClick={toggleDropdown} ref={dropdownRef}>
          <img src={ProfileImage} alt="Profile" className="navbar-profile-icon" />
          {dropdownOpen && (
            <div className="navbar-dropdown-menu">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="navbar-dropdown-link">My Profile</Link>
                  <button onClick={logout} className="navbar-dropdown-button">Log Out</button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="navbar-dropdown-link">Login</Link>
                  <Link to="/signup" className="navbar-dropdown-link">Register</Link>
                </>
              )}
                    </div>
          )}
                </div>
            </div>
    </nav>
    );
};

export default Navbar;