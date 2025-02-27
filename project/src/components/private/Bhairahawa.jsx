import React, { useState } from "react";
// import Bhairahawa from "../../assets/images/bhairahawa.jpg";
import Bhairahawa1 from "../../assets/images/bhairahawadestination1.png";
import Bhairahawa2 from "../../assets/images/bhairahawadestination2.png";
import "../styles/Bangkok.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function BhairahawaPage() {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/#flight-booking"); // Redirect to the booking section on the home page
    };
    return (
        <>
            <Navbar />
            <div className="bookBhairahawa-body">
                {/* Book Now Button */}
                <button className="book-now-btn" onClick={handleBookNow}>
                    Book Now
                </button>

                <div className="images">
                                                <img src={Bhairahawa1} alt="Bhairahawa, Nepal" className="bookdestination-image" />
                                                <img src={Bhairahawa2} alt="Bhairahawa, Nepal" className="bookdestination-image" />
                                                </div>
                <section className="bookdestination-details">
                    {/* <img src={Bhairahawa} alt="Bhairahawa, Nepal" className="bookdestination-image" /> */}
                    <h2>Bhairahawa, Nepal</h2>
                    <p>The Bhairahawa route is a must-book for travelers seeking to explore Nepal’s historical and spiritual treasures. With flight fares starting at US$ 125, Bhairahawa, also known as Siddharthanagar, serves as the gateway to **Lumbini**, the birthplace of Lord Buddha and a UNESCO World Heritage Site. This rapidly developing city offers a mix of cultural heritage, religious significance, and modern infrastructure, making it a key destination for both pilgrims and travelers.</p>
                    <p>The highlight of any trip to Bhairahawa is **Lumbini**, located just a short drive away. Visitors can explore the sacred Maya Devi Temple, the Ashoka Pillar, and the tranquil monastic zones built by Buddhist communities from around the world. The area provides a peaceful atmosphere for meditation, learning, and spiritual exploration, attracting thousands of visitors annually.</p>
                    <p>Beyond its spiritual importance, Bhairahawa is a thriving trade hub due to its proximity to the Indian border. The city offers a blend of traditional and modern experiences, with lively markets, local cuisine, and growing infrastructure, including the **Gautam Buddha International Airport**. Whether you are visiting for religious purposes, historical exploration, or as a transit point to western Nepal, Bhairahawa provides a convenient and culturally enriching experience.</p>
                </section>

                <section className="bookflight-info">
                    <h2>Flight Information</h2>
                    <div className="bookflight-container">
                        <div className="bookflight-topics">
                            <p><strong>Price:</strong></p>
                            <p><strong>Booking:</strong></p>
                            <p><strong>Baggage Allowance:</strong></p>
                            <p><strong>Total Flights:</strong></p>
                            <p><strong>Airlines:</strong></p>
                        </div>

                        <div className="bookflight-details">
                            <p>US$ 105 per person (One-way)</p>
                            <p>Available for booking online.</p>
                            <p>15 kg checked baggage, 5 kg carry-on.</p>
                            <p>Multiple flights daily.</p>
                            <p>Buddha Air, Yeti Airlines.</p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default BhairahawaPage;