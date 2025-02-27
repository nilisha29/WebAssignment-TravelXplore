import React, { useState } from "react";
// import Dhangadhi from "../../assets/images/dhangadhi.jpg";
import Dhangadhi1 from "../../assets/images/dhangadhidestination1.png";
import Dhangadhi2 from "../../assets/images/dhangadhidestination2.png";
import "../styles/Bangkok.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function DhangadhiPage() {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/#flight-booking"); // Redirect to the booking section on the home page
    };
    return (
        <>
            <Navbar />
            <div className="bookDhangadhi-body">
                {/* Book Now Button */}
                <button className="book-now-btn" onClick={handleBookNow}>
                    Book Now
                </button>

                <div className="images">
                                                <img src={Dhangadhi1} alt="Dhangadhi, Nepal" className="bookdestination-image" />
                                                <img src={Dhangadhi2} alt="Dhangadhi, Nepal" className="bookdestination-image" />
                                 </div>

                <section className="bookdestination-details">
                    {/* <img src={Dhangadhi} alt="Dhangadhi, Nepal" className="bookdestination-image" /> */}
                    <h2>Dhangadhi, Nepal</h2>
                    <p>The Dhangadhi route is a must-book for travelers looking to explore Nepal’s far western region, known for its untouched natural beauty and cultural richness. With flight fares starting at US$ 160, Dhangadhi serves as the gateway to breathtaking landscapes, wildlife reserves, and the unique traditions of western Nepal. As one of the largest cities in the region, it provides a perfect mix of urban amenities and rural charm.</p>
                    <p>One of the main attractions near Dhangadhi is **Shuklaphanta National Park**, home to the largest herd of swamp deer in Asia, as well as Bengal tigers, elephants, and over 400 bird species. Visitors can enjoy thrilling jungle safaris, birdwatching, and nature walks in this hidden gem of Nepal’s conservation efforts. The **Mahakali River**, flowing near the city, offers opportunities for fishing and scenic boat rides.</p>
                    <p>Beyond wildlife and nature, Dhangadhi is rich in cultural heritage. The **Aircraft Museum**, featuring decommissioned planes turned into an educational attraction, is a unique stop for visitors. Nearby, the **Ghodaghodi Lake** provides a serene environment for relaxation and exploration, with its deep ties to local mythology and biodiversity. Whether you’re seeking adventure, wildlife, or a peaceful retreat, Dhangadhi offers a fascinating travel experience in Nepal’s far west.</p>
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
                            <p>US$ 130 per person (One-way)</p>
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

export default DhangadhiPage;