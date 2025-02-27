import React, { useState } from "react";
// import Nepalgunj from "../../assets/images/nepalgunj.jpg";
import Nepalgunj1 from "../../assets/images/nepalgunjdestination1.png";
import Nepalgunj2 from "../../assets/images/nepalgunjdestination2.png";
import "../styles/Bangkok.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function NepalgunjPage() {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/#flight-booking"); // Redirect to the booking section on the home page
    };
    return (
        <>
            <Navbar />
            <div className="bookNepalgunj-body">
                {/* Book Now Button */}
                <button className="book-now-btn" onClick={handleBookNow}>
                    Book Now
                </button>

                <div className="images">
                                 <img src={Nepalgunj1} alt="Nepalgunj, Nepal" className="bookdestination-image" />
                                 <img src={Nepalgunj2} alt="Nepalgunj, Nepal" className="bookdestination-image" />
                            </div>
                <section className="bookdestination-details">
                    {/* <img src={Nepalgunj} alt="Nepalgunj, Nepal" className="bookdestination-image" /> */}
                    <h2>Nepalgunj, Nepal</h2>
                    <p>The Nepalgunj route is a must-book for travelers looking to explore the vibrant Terai region and access the remote western Himalayas. With flight fares starting at US$ 140, Nepalgunj serves as a crucial gateway to destinations like Rara Lake, Bardiya National Park, and the trekking routes of western Nepal. This bustling border city offers a unique blend of cultural diversity, trade, and adventure.</p>
                    <p>One of the major attractions near Nepalgunj is **Bardiya National Park**, a haven for wildlife enthusiasts. The park is home to Bengal tigers, one-horned rhinoceroses, elephants, and various bird species. Visitors can enjoy jungle safaris, river rafting, and Tharu cultural experiences, making it an ideal destination for nature lovers. The Karnali River, flowing nearby, offers excellent opportunities for fishing and adventure sports.</p>
                    <p>Beyond wildlife and adventure, Nepalgunj is a melting pot of cultures with strong influences from both Nepalese and Indian traditions. The bustling markets provide a variety of local and imported goods, while temples like Bageshwori Temple attract devotees and tourists alike. Whether you’re planning an expedition to the remote mountains or looking for an exciting blend of culture and nature, Nepalgunj is the perfect starting point for your journey.</p>
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

export default NepalgunjPage;