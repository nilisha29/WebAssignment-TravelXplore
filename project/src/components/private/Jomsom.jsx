import React, { useState } from "react";
// import Jomsom from "../../assets/images/jomsom.jpg";
import Jomsom1 from "../../assets/images/jomsomdestination1.png";
import Jomsom2 from "../../assets/images/jomsomdestination2.png";
import "../styles/Bangkok.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function JomsomPage() {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/#flight-booking"); // Redirect to the booking section on the home page
    };
    return (
        <>
            <Navbar />
            <div className="bookJomsom-body">
                {/* Book Now Button */}
                <button className="book-now-btn" onClick={handleBookNow}>
                    Book Now
                </button>

                <div className="images">
                                <img src={Jomsom1} alt="Jomsom, Nepal" className="bookdestination-image" />
                                <img src={Jomsom2} alt="Jomsom, Nepal" className="bookdestination-image" />
                                                 </div>
                <section className="bookdestination-details">
                {/* <div className="image-container"> */}
                    {/* <img src={Jomsom} alt="Jomsom, Nepal" className="bookdestination-image" /> */}
                    {/* </div> */}
                    <h2>Jomsom, Nepal</h2>
                    <p>The Jomsom route is a must-book for travelers seeking breathtaking mountain landscapes and a gateway to Nepal’s mystical Mustang region. With flight fares starting at US$ 170, Jomsom serves as the entry point to **Muktinath Temple**, the **Kali Gandaki Gorge**, and the famous **Annapurna Circuit trek**. This stunning Himalayan town offers a unique blend of Tibetan-influenced culture, adventure, and natural beauty.</p>
                    <p>One of the main attractions near Jomsom is **Muktinath Temple**, a sacred pilgrimage site for both Hindus and Buddhists. Nestled at an altitude of 3,800 meters, this temple is believed to grant salvation to those who visit. The nearby **Kali Gandaki River** is famous for its **Shaligram fossils**, considered sacred in Hinduism. The region’s breathtaking landscapes, with barren hills and snow-capped peaks, create a surreal, almost otherworldly experience. </p>
                    <p>Jomsom is also a hub for adventure enthusiasts. The **Lower Mustang region** is known for its dramatic scenery, ancient monasteries, and the unique culture of the Thakali people. Visitors can explore the picturesque **Marpha village**, famous for its apple orchards and locally brewed apple brandy. Whether you're trekking through the Annapurna region, exploring religious sites, or enjoying the unique mountain culture, Jomsom offers an unforgettable Himalayan experience.</p>    
                   
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
                            <p>US$ 125 per person (One-way)</p>
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

export default JomsomPage;