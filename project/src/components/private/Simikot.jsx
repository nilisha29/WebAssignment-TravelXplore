import React, { useState } from "react";
// import Simikot from "../../assets/images/simikot.jpg";
// import Tumlingtar from "../../assets/images/tumlingtar.jpg";
import Simikot1 from "../../assets/images/simikotdestination1.png";
import Simikot2 from "../../assets/images/simikotdestination2.png";
import "../styles/Bangkok.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function SimikotPage() {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/#flight-booking"); // Redirect to the booking section on the home page
    };

    return (
        <>
            <Navbar />
            <div className="bookSimikot-body">
                {/* Book Now Button */}
                <button className="book-now-btn" onClick={handleBookNow}>
                    Book Now
                </button>

                <div className="images">
                <img src={Simikot1} alt="Simikot, Nepal" className="bookdestination-image" />
                 <img src={Simikot2} alt="Simikot, Nepal" className="bookdestination-image" />
    </div>
                <section className="bookdestination-details">
                    {/* <img src={Simikot} alt="Simikot, Nepal" className="bookdestination-image" /> */}
                    <h2>Simikot, Nepal</h2>
                    <p>The Simikot route is a must-book for travelers looking to venture into the remote and rugged landscapes of Nepal’s far western region. With flight fares starting at US$ 200, Simikot serves as the gateway to **Humla** and the starting point for treks into **Kailash** and the **Tibetan Plateau**. This small, high-altitude town offers an off-the-beaten-path experience for those seeking adventure and cultural immersion in one of Nepal’s most untouched areas.</p>
                    <p>Simikot is renowned for its proximity to **Mount Kailash**, one of the most sacred mountains in the world, which attracts Hindu, Buddhist, and Tibetan pilgrims. The **Karnali River** valley, with its dramatic landscapes and remote villages, offers a unique experience for trekkers and explorers looking for an adventurous escape. The journey to Simikot itself is an unforgettable experience, with views of the towering peaks of the **Himalayas** and the Tibetan Plateau.</p>
                    <p>In addition to its spiritual significance, Simikot is also a gateway to the rugged beauty of the **Kailash Manasarovar** region, known for its remote monasteries, unique Tibetan culture, and pristine natural surroundings. Visitors can explore the local villages, interact with indigenous communities, and witness the traditional lifestyles of the people who live in these isolated mountain regions. Whether you're trekking to Kailash or simply exploring the serenity of Humla, Simikot offers an extraordinary journey for adventurers and cultural enthusiasts alike.</p>
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
                            <p>US$ 150 per person (One-way)</p>
                            <p>Available for booking online.</p>
                            <p>10 kg checked baggage, 5 kg carry-on.</p>
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

export default SimikotPage;