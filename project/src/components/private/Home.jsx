import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Kathmandu from "../../assets/images/Kathmandu.jpg";
import Pokhara from "../../assets/images/pokhara.jpg";
import Lukla from "../../assets/images/lukla.jpg";
import Banner from "../../assets/images/bannertravel.jpg";
import Navbar from "../../components/private/Navbar";
import Footer from "../../components/private/Footer";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
    passengers: 1
  });

  const handleBook = () => {
    navigate("/destinations");
  };

  const handleSearchFlights = () => {
    navigate("/booking", { state: formData }); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <>
      <Navbar />
      <div>
        <section id="home" className="banner">
          <img src={Banner} alt="Travel Banner" className="banner-image" />
          <div className="banner-content">
            <h1>Explore the Country with TravelXplore</h1>
            <p>Your gateway to unforgettable journeys.</p>
          </div>
        </section>

        <section className="flight-booking">
          <h2>Book Your Flight</h2>
          <form className="booking-form">
            <div className="container">
              <div className="form-group">
                <label htmlFor="from">From:</label>
                <select id="from" name="from" value={formData.from} onChange={handleChange}>
                  <option value="">City or Airport</option>
                  <option value="Kathmandu">Kathmandu</option>
                  <option value="Pokhara">Pokhara</option>
                  <option value="Lukla">Lukla</option>
                  <option value="Biratnagar">Biratnagar</option>
                  <option value="Dhangadhi">Dhangadhi</option>
                  <option value="Tumlingtar">Tumlingtar</option>
                  <option value="Simikot">Simikot</option>
                  <option value="Bhairahawa">Bhairahawa</option>
                  <option value="Bharatpur">Bharatpur</option>
                  <option value="Janakpur">Janakpur</option>
                  <option value="Jomsom">Jomsom</option>
                  <option value="Nepalgunj">Nepalgunj</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="to">To:</label>
                <select id="to" name="to" value={formData.to} onChange={handleChange}>
                  <option value="">City or Airport</option>
                  <option value="Kathmandu">Kathmandu</option>
                  <option value="Pokhara">Pokhara</option>
                  <option value="Lukla">Lukla</option>
                  <option value="Biratnagar">Biratnagar</option>
                  <option value="Dhangadhi">Dhangadhi</option>
                  <option value="Tumlingtar">Tumlingtar</option>
                  <option value="Simikot">Simikot</option>
                  <option value="Bhairahawa">Bhairahawa</option>
                  <option value="Bharatpur">Bharatpur</option>
                  <option value="Janakpur">Janakpur</option>
                  <option value="Jomsom">Jomsom</option>
                  <option value="Nepalgunj">Nepalgunj</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="departure">Departure:</label>
                <input type="date" id="departure" name="departure" value={formData.departure} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="return">Return:</label>
                <input type="date" id="return" name="return" value={formData.return} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="passengers">Passengers:</label>
                <select id="passengers" name="passengers" value={formData.passengers} onChange={handleChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <button type="button" onClick={handleSearchFlights}>Book</button>
            </div>
          </form>
        </section>

        <section className="popular-destinations">
          <h2>Popular Destinations</h2>
          <div className="destinations-grid">
            <div className="destination">
              <img src={Kathmandu} alt="Kathmandu" />
              <h3>Kathmandu, Nepal</h3>
              <p>The capital city, cultural and historical hub.</p>
            </div>
            <div className="destination">
              <img src={Pokhara} alt="Pokhara" />
              <h3>Pokhara, Nepal</h3>
              <p>Gateway to Annapurna, lakeside paradise.</p>
            </div>
            <div className="destination">
              <img src={Lukla} alt="Lukla" />
              <h3>Lukla, Nepal</h3>
              <p>Entry point to Everest Base Camp.</p>
            </div>
          </div>
          <a onClick={handleBook} className="see-more-btn">See More</a>
        </section>

        <section id="why-travelxplore">
          <h2>Why TravelXplore?</h2>
          <div className="features-container">
            <div className="feature">
              <h3>Best Price Guarantee</h3>
              <p>We offer competitive prices with no hidden fees.</p>
            </div>
            <div className="feature">
              <h3>Easy & Fast Booking</h3>
              <p>Book flights in just a few clicks.</p>
            </div>
            <div className="feature">
              <h3>24/7 Customer Support</h3>
              <p>We are here to assist you anytime, anywhere.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;