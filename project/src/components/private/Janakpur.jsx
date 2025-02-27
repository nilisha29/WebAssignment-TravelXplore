import React, { useState } from "react";
// import Janakpur from "../../assets/images/janakpur.jpg";
import Janakpur1 from "../../assets/images/janakpurdestination1.png";
import Janakpur2 from "../../assets/images/janakpurdestination2.png";
import "../styles/Bangkok.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function JanakpurPage() {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/#flight-booking"); // Redirect to the booking section on the home page
    };
    return (
        <>
            <Navbar />
            <div className="bookJanakpur-body">
                {/* Book Now Button */}
                <button className="book-now-btn" onClick={handleBookNow}>
                    Book Now
                </button>

                <div className="images">
                                                <img src={Janakpur1} alt="Janakpur, Nepal" className="bookdestination-image" />
                                                <img src={Janakpur2} alt="Janakpur, Nepal" className="bookdestination-image" />
                                 </div>

                <section className="bookdestination-details">
                    {/* <img src={Janakpur} alt="Janakpur, Nepal" className="bookdestination-image" /> */}
                    <h2>Janakpur, Nepal</h2>
                    <p>The Janakpur route is a must-book for travelers seeking a journey into Nepal’s rich cultural and spiritual heritage. With flight fares starting at US$ 130, Janakpur is renowned as the birthplace of Goddess Sita and a sacred pilgrimage site for Hindus. This vibrant city is filled with ancient temples, religious festivities, and a deep-rooted connection to the epic Ramayana, making it a fascinating destination for history enthusiasts and spiritual seekers alike.</p>
                    <p>One of Janakpur’s biggest attractions is the stunning **Janaki Mandir**, an architectural masterpiece dedicated to Goddess Sita. This grand temple, built in a blend of Mughal and Rajput styles, attracts thousands of pilgrims and tourists each year. The city is also home to other sacred sites, including Ram Mandir, Vivah Mandap, and the ancient ponds associated with Hindu mythology, offering visitors a spiritual and historical experience like no other.</p>
                    <p>Beyond its religious significance, Janakpur is a lively city known for its Mithila art and cultural traditions. Visitors can explore colorful Madhubani paintings, taste authentic Maithili cuisine, and experience vibrant festivals such as **Vivah Panchami**, which reenacts the legendary wedding of Lord Ram and Goddess Sita. Whether you're drawn to its deep spiritual history, artistic heritage, or warm local hospitality, Janakpur provides an unforgettable cultural experience in Nepal’s Terai region.</p>
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
                            <p>US$ 95 per person (One-way)</p>
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

export default JanakpurPage;
