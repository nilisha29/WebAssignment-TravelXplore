import React, { useState } from "react";
// import Kathmandu from "../../assets/images/Kathmandu.jpg";
import Kathmandu1 from "../../assets/images/kathmandudestination1.png";
import Kathmandu2 from "../../assets/images/kathmandudestination2.png";
import "../styles/Bangkok.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/private/Navbar";
import Footer from "../../components/private/Footer";

function KathmanduPage() {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/#flight-booking"); // Redirect to the booking section on the home page
    };
    return (
        <>
        <Navbar />

            <div className="bookKathmandu-body">
                {/* Book Now Button */}
                <button className="book-now-btn" onClick={handleBookNow}>
                    Book Now
                </button>

                <div className="images">
                <img src={Kathmandu1} alt="Kathmandu, Nepal" className="bookdestination-image" />
                <img src={Kathmandu2} alt="Kathmandu, Nepal" className="bookdestination-image" />
                </div>
                                
                <section className="bookdestination-details">
                {/* <div className="image-container"> */}
                    {/* <img src={Kathmandu1} alt="Kathmandu, Nepal" className="bookdestination-image" />
                    <img src={Kathmandu2} alt="Kathmandu, Nepal" className="bookdestination-image" /> */}
                    {/* </div> */}
                    <h2>Kathmandu, Nepal</h2>
                    <p>The Kathmandu route is a must-book for those looking to explore the rich culture, history, and adventure of Nepal. The flight fares start at US$ 750, and once in Kathmandu, visitors are surrounded by ancient temples, lively markets, and the stunning backdrop of the Himalayas. Kathmandu serves as the gateway to the Everest region and is a great starting point for treks to some of the world’s most famous mountain ranges. Its combination of spiritual sites and natural beauty makes it an unforgettable destination.</p>
                    <p>In addition to its captivating history and culture, Kathmandu offers an array of unique experiences for travelers. Visitors can explore the UNESCO World Heritage Sites, including Swayambhunath (Monkey Temple), Pashupatinath Temple, and Boudhanath Stupa, each providing a deep insight into the spiritual fabric of Nepal. The bustling streets of Thamel are perfect for shopping, dining, and soaking in the vibrant atmosphere, with a mix of traditional Nepali goods and modern boutiques. Whether you’re seeking tranquility or adventure, Kathmandu provides the perfect blend of both.</p> 
                    <p>For adventure enthusiasts, Kathmandu is the gateway to some of the world’s most iconic treks. The Annapurna Circuit and the Everest Base Camp trek start from here, offering breathtaking views of the Himalayas and an opportunity to immerse oneself in Nepal’s diverse culture and landscapes. Whether it’s a scenic flight over the Himalayas or an exhilarating trek through remote villages, Kathmandu provides countless opportunities for travelers looking to embrace both culture and adventure.</p>



                </section>

                <section className="bookflight-info">
    <h2>Flight Information</h2>
    <div className="bookflight-container">
        {/* Topics */}
        <div className="bookflight-topics">
            <p><strong>Price:</strong><br /></p>
            <p><strong>Booking:</strong><br /></p>
            <p><strong>Baggage Allowance:</strong><br /></p>
            <p><strong>Total Flights:</strong><br /></p>
            <p><strong>Airlines:</strong><br /></p>
        </div>

        {/* Flight Details */}
        <div className="bookflight-details">
        <p>US$ 150 per person (One-way)</p>
                            <p>Available for booking online.</p>
                            <p>20 kg for checked baggage and 7 kg for carry-on.</p>
                            <p>Multiple flights daily.</p>
                            <p>Yeti Airlines, Buddha Air, Nepal Airlines.</p>

        </div>
    </div>
</section>


            </div>
            <Footer />
        </>
    );
}

export default KathmanduPage;
