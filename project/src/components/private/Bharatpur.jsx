import React, { useState } from "react";
// import Bharatpur from "../../assets/images/bharatpur.jpg";
import Bharatpur1 from "../../assets/images/bharatpurdestination1.png";
import Bharatpur2 from "../../assets/images/bharatpurdestination2.png";
import "../styles/Bangkok.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function BharatpurPage() {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/#flight-booking"); // Redirect to the booking section on the home page
    };
    return (
        <>
            <Navbar />
            <div className="bookBharatpur-body">
                {/* Book Now Button */}
                <button className="book-now-btn" onClick={handleBookNow}>
                    Book Now
                </button>

                <div className="images">
                                <img src={Bharatpur1} alt="Bharatpur, Nepal" className="bookdestination-image" />
                                <img src={Bharatpur2} alt="Bharatpur, Nepal" className="bookdestination-image" />
                                </div>

                <section className="bookdestination-details">
                    {/* <img src={Bharatpur} alt="Bharatpur, Nepal" className="bookdestination-image" /> */}
                    <h2>Bharatpur, Nepal</h2>
                    <p>The Bharatpur route is a must-book for travelers seeking a perfect blend of nature, wildlife, and modern conveniences. With flight fares starting at US$ 150, Bharatpur serves as the gateway to Chitwan National Park, a UNESCO World Heritage Site known for its rich biodiversity. Located in the heart of Nepal’s lowlands, Bharatpur offers a warm climate, lush landscapes, and a relaxing escape from the hustle and bustle of city life.</p>
                    <p>One of the biggest attractions near Bharatpur is Chitwan National Park, home to the rare one-horned rhinoceros, Bengal tigers, elephants, and a diverse range of bird species. Visitors can enjoy thrilling jungle safaris, canoe rides on the Rapti River, and cultural experiences with the indigenous Tharu community. The park's serene surroundings make it an ideal destination for wildlife lovers and adventure seekers alike.</p>
                    <p>Beyond the national park, Bharatpur offers a mix of modern and traditional experiences. The city has a growing urban center with shopping malls, restaurants, and cultural sites like Devghat, a sacred Hindu pilgrimage site where the Gandaki River meets the Trishuli. Whether you're looking for a wildlife adventure, cultural exploration, or a peaceful retreat, Bharatpur provides a refreshing travel experience in Nepal’s Terai region.</p>
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
                            <p>US$ 120 per person (One-way)</p>
                            <p>Available for booking online.</p>
                            <p>15 kg for checked baggage and 5 kg for carry-on.</p>
                            <p>Multiple flights daily.</p>
                            <p>Buddha Air, Yeti Airlines, Nepal Airlines.</p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default BharatpurPage;