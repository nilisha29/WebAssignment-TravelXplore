import React, { useState } from "react";
// import Lukla from "../../assets/images/lukla.jpg";
import Lukla1 from "../../assets/images/lukladestination1.png";
import Lukla2 from "../../assets/images/lukladestination2.png";
import "../styles/Bangkok.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/private/Navbar";
import Footer from "../../components/private/Footer";


function LuklaPage() {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/#flight-booking"); // Redirect to the booking section on the home page
    };
    return (
        <>
            <Navbar />
            <div className="bookLukla-body">
                {/* Book Now Button */}
                <button className="book-now-btn" onClick={handleBookNow}>
                    Book Now
                </button>

                <div className="images">
                                <img src={Lukla1} alt="Lukla, Nepal" className="bookdestination-image" />
                                <img src={Lukla2} alt="Lukla, Nepal" className="bookdestination-image" />
                                </div>
                <section className="bookdestination-details">
                    {/* <img src={Lukla} alt="Lukla, Nepal" className="bookdestination-image" /> */}
                    <h2>Lukla, Nepal</h2>
                    <p>The Lukla route is a must-book for adventurers seeking the ultimate gateway to the Everest region. With flight fares starting at US$ 400, Lukla is the starting point for the legendary Everest Base Camp trek and offers stunning views of the Himalayas right from the moment you land. Known for its thrilling airport, perched at 2,860 meters, Lukla welcomes trekkers, mountaineers, and nature enthusiasts eager to explore the heart of the Khumbu region.</p>
                    <p>Beyond being a transit hub for Everest expeditions, Lukla itself is a fascinating destination. The town features traditional Sherpa villages, monasteries, and breathtaking mountain scenery. Visitors can experience the rich Sherpa culture, enjoy warm hospitality, and explore nearby trails leading to charming settlements like Phakding and Namche Bazaar. Whether it’s sipping butter tea in a cozy lodge or witnessing yaks carrying supplies through rugged trails, Lukla offers a glimpse into high-altitude life in Nepal.</p>
                    <p>For thrill-seekers, Lukla is not just about trekking—it’s about adventure from the moment you arrive. The short but scenic flight from Kathmandu provides an unforgettable aerial view of the Himalayas, setting the stage for an incredible journey ahead. From here, trekkers can embark on their journey to Everest Base Camp, Gokyo Lakes, or other stunning routes. Whether you’re chasing breathtaking landscapes or an adrenaline-filled adventure, Lukla is the perfect gateway to the world’s highest peaks.</p>
            
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
                            <p>US$ 180 per person (One-way)</p>
                            <p>Limited availability, book in advance.</p>
                            <p>10 kg for checked baggage and 5 kg for carry-on.</p>
                            <p>Few flights per day, weather-dependent.</p>
                            <p>Tara Air, Summit Air.</p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default LuklaPage;
