import React, { useState } from "react";
// import Biratnagar from "../../assets/images/biratnagar.jpg";
import Biratnagar1 from "../../assets/images/biratnagardestination1.png";
import Biratnagar2 from "../../assets/images/biratnagardestination2.png";
import "../styles/Bangkok.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function BiratnagarPage() {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/#flight-booking"); // Redirect to the booking section on the home page
    };
    return (
        <>
            <Navbar />
            <div className="bookBiratnagar-body">
                {/* Book Now Button */}
                <button className="book-now-btn" onClick={handleBookNow}>
                    Book Now
                </button>

                 <div className="images">
                                <img src={Biratnagar1} alt="Biratnagar, Nepal" className="bookdestination-image" />
                                <img src={Biratnagar2} alt="Biratnagar, Nepal" className="bookdestination-image" />
                 </div>

                <section className="bookdestination-details">
                    {/* <img src={Biratnagar} alt="Biratnagar, Nepal" className="bookdestination-image" /> */}
                    <h2>Biratnagar, Nepal</h2>
                    <p>The Biratnagar route is a must-book for travelers looking to explore Nepal’s vibrant industrial hub and experience the unique charm of the eastern Terai region. With flight fares starting at US$ 120, Biratnagar is Nepal’s second-largest city and a gateway to both business opportunities and cultural heritage. Known for its bustling markets, diverse communities, and historical significance, the city offers a dynamic blend of modern development and traditional Nepali life.</p>
                    <p>While Biratnagar is primarily recognized as an economic center, it also has much to offer visitors. The nearby Koshi Tappu Wildlife Reserve is a paradise for bird watchers and nature lovers, home to rare species like the wild water buffalo and a variety of migratory birds. The city's local markets provide a glimpse into everyday life, with an array of fresh produce, textiles, and handicrafts that showcase the region’s rich culture.</p>
                    <p>Beyond its urban appeal, Biratnagar serves as a convenient starting point for travelers heading to the eastern hills and tea gardens of Ilam, where lush greenery and scenic landscapes await. Whether you’re visiting for business, exploring the cultural diversity, or venturing into the natural beauty of eastern Nepal, Biratnagar provides an intriguing and lively experience for all types of travelers.</p>
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
                            <p>US$ 135 per person (One-way)</p>
                            <p>Available for booking online.</p>
                            <p>15 kg checked baggage, 5 kg carry-on.</p>
                            <p>Multiple flights daily.</p>
                            <p>Buddha Air, Shree Airlines.</p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default BiratnagarPage;