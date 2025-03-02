import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Footer.css"; // Import the separate CSS file

function Footer() {
  const navigate = useNavigate();

    const handleHome =() => {
        navigate('/Home');
    }
    const handleDestination =() => {
        navigate('/destinations');
    }
    const handleAbout =() => {
        navigate('/About');
    }
    // const handlesignin =() => {
    //     navigate('/signin');
    // }
    const handleContact =() => {
        navigate('/Contact');
    }
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-section">
          <h3>TravelXplore</h3>
          <p>Your trusted partner for online flight booking since 2025.</p>
        </div>

        <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a onClick={handleHome}>Home</a></li>
                    <li><a onClick={handleDestination}>Destinations</a></li>
                    <li><a onClick={handleAbout}>About</a></li>
                    <li><a onClick={handleContact}>Contact</a></li>
                </ul>
            </div>

        {/* Middle Section - Quick Links */}
        {/* <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#book">Book</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div> */}

        {/* Right Section - Contact Info */}
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>Kathmandu, Nepal</p>
          <p>Phone: +977 9807645782</p>
          <p>Email: <a href="mailto:info@TravelXplore.com">info@TravelXplore.com</a></p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>© 2025 TravelXplore. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
