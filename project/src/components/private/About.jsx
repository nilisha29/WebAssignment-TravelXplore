// import React from "react";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AboutImage from "../../assets/images/aboutus.png"; 
import "../styles/About.css"; 
import Navbar from "../../components/private/Navbar"; 
import Footer from "../../components/private/Footer";

function AboutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollToContact) {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      // Clear the state after scrolling
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);
  return (
    <>
    <Navbar />

      <section className="about-container">
        {/* About Image */}
        <div className="about-image-container">
          <img src={AboutImage} alt="About TravelXplore" className="about-image" />
        </div>

        {/* About Us Content */}
        <h2>About TravelXplore</h2>
        <p>
          TravelXplore is a division of Xplore Adventures Pvt. Ltd., a trusted travel agency based in Kathmandu, Nepal.
          We specialize in domestic and international flight bookings. As a travel agent, we accept online bookings for flights,
          serving both individual and group travelers.
        </p>

        {/* Mission Section */}
        <h3>Our Mission</h3>
        <p>Our mission is to provide quality and excellent travel services to customers promptly and efficiently.</p>

        {/* Services Section */}
        <h3>Our Services</h3>
        <div className="services">
          <div className="service-box">
            <h4>✈️ Flight Ticketing</h4>
            <p>We offer domestic flight ticket booking.</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <h3>Why Choose TravelXplore?</h3>
        <ul className="features-list">
          <li>🌍 Online booking system with real-time updates</li>
          <li>💼 Experienced and professional staff</li>
          <li>💰 Competitive pricing with special discounts</li>
          <li>🕒 Last-minute booking availability</li>
          <li>🤝 Commitment to social responsibility</li>
        </ul>

        {/* Company Info */}
        <h3>Company Information</h3>
        <div className="company-info">
          <p><strong>Company Name:</strong> Xplore Adventures Pvt. Ltd.</p>
          <p><strong>Type:</strong> Private Limited</p>
          <p><strong>Business Type:</strong> Travel Agency & Tour Operator</p>
          <p><strong>Location:</strong> Kathmandu, Nepal</p>
          <p><strong>Contact:</strong> +977 9856745673</p>
          <p><strong>Email:</strong> info@travelxplore.com</p>
        </div>
        </section>
        <Footer />
        </>
  );
}

export default AboutPage;
