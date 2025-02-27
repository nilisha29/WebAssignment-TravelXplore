import React, { useState, useEffect } from "react";
import "../styles/Contact.css"; // Assuming you have a separate CSS file for styling
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Contact() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    if (location.state?.scrollToContact) {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      // Clear the state after scrolling
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setFormData({ fullName: '', email: '', message: '' });
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to submit contact form');
    }
  };

  return (
    <>
            <Navbar />
    <div>
      {/* <nav className="navbar">
        <div className="navbar-left">
          <img src="Images/logo.png" alt="Logo" className="logo" />
          <span className="brand-name">TravelXplore</span>
        </div>
        <div className="navbar-right">
          <a href="index.html" className="nav-link">Home</a>
          <a href="book.html" className="nav-link">Book</a>
          <a href="about.html" className="nav-link">About</a>
          <a href="contact.html" className="nav-link">Contact</a>
          <div className="profile-dropdown" onClick={toggleDropdown}>
            <img src="Images/image.png" alt="Profile" className="profile-icon" />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <a href="login.html">Login</a>
                <a href="register.html">Register</a>
              </div>
            )}
          </div>
        </div>
      </nav> */}
  
  <section id="contact" className="contact">
      <section className="contact-container">
        <h2>Contact Us</h2>

        <div className="contact-wrapper">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p><i className="fas fa-map-marker-alt"></i> Thamel, Kathmandu, Nepal</p>
            <p><i className="fas fa-phone-alt"></i> +977 1234567890</p>
            <p><i className="fas fa-envelope"></i> info@travelxplore.com</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Your Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
      </section>

      <div className="footer-space"></div>

      {/* <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>TravelXplore</h3>
            <p>Your trusted partner for Nepal adventures since 2024.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#book">Book</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>Kathmandu, Nepal</p>
            <p>Phone: +977 9807645782</p>
            <p>Email: info@TravelXplore.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 TravelXplore. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
    <Footer />
    </>
    
  );
}

export default Contact;
