import React, { useState } from "react";
// import Tumlingtar from "../../assets/images/tumlingtar.jpg";
import Tumlingtar1 from "../../assets/images/tumlingtardestination1.png";
import Tumlingtar2 from "../../assets/images/tumlingtardestination2.png";
import "../styles/Bangkok.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function TumlingtarPage() {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/#flight-booking"); // Redirect to the booking section on the home page
    };
    return (
        <>
            <Navbar />
            <div className="bookTumlingtar-body">
                {/* Book Now Button */}
                <button className="book-now-btn" onClick={handleBookNow}>
                    Book Now
                </button>

                <div className="images">
                                <img src={Tumlingtar1} alt="Tumlingtar, Nepal" className="bookdestination-image" />
                                <img src={Tumlingtar2} alt="Tumlingtar, Nepal" className="bookdestination-image" />
                                </div>

                <section className="bookdestination-details">
                    {/* <img src={Tumlingtar} alt="Tumlingtar, Nepal" className="bookdestination-image" /> */}
                    <h2>Tumlingtar, Nepal</h2>
                    <p>The Tumlingtar route is a must-book for travelers looking to explore the eastern hills of Nepal and experience breathtaking natural landscapes. With flight fares starting at US$ 150, Tumlingtar is the gateway to **Makalu-Barun National Park**, one of Nepal’s most pristine and remote trekking regions. As the starting point for expeditions to **Mount Makalu**, the world’s fifth-highest peak, this destination is perfect for adventure seekers and nature enthusiasts.</p>
                    <p>Surrounded by lush green hills and the mighty Arun River, Tumlingtar offers a serene escape from city life. Visitors can enjoy scenic hikes, traditional village experiences, and views of the stunning Himalayan landscapes. The region is home to diverse ethnic communities, including Rai and Sherpa people, who offer warm hospitality and a glimpse into their rich cultural traditions.</p>
                    <p>Beyond trekking, Tumlingtar provides opportunities for **rafting and fishing** in the Arun River, making it an ideal spot for outdoor activities. The peaceful surroundings, traditional villages, and close proximity to untouched wilderness make Tumlingtar an excellent destination for travelers looking to explore Nepal’s hidden gems. Whether you're on a trekking expedition or simply looking for a quiet retreat in nature, Tumlingtar offers an unforgettable experience.</p>
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
                            <p>US$ 110 per person (One-way)</p>
                            <p>Available for booking online.</p>
                            <p>15 kg checked baggage, 5 kg carry-on.</p>
                            <p>Limited flights available.</p>
                            <p>Summit Air, Tara Air.</p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default TumlingtarPage;