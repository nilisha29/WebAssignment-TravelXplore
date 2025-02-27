import React, { useState } from "react";
// import Pokhara from "../../assets/images/pokhara.jpg";
import Pokhara1 from "../../assets/images/pokharadestination1.png";
import Pokhara2 from "../../assets/images/pokharadestination2.png";
import "../styles/Bangkok.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/private/Navbar";
import Footer from "../../components/private/Footer";

function PokharaPage() {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/#flight-booking"); // Redirect to the booking section on the home page
    };
    return (
        <>
         <Navbar />
 
            <div className="bookPokhara-body">
                {/* Book Now Button */}
                <button className="book-now-btn" onClick={handleBookNow}>
                    Book Now
                </button>

                <div className="images">
                <img src={Pokhara1} alt="Pokhara, Nepal" className="bookdestination-image" />
                <img src={Pokhara2} alt="Pokhara, Nepal" className="bookdestination-image" />
                                </div>

                <section className="bookdestination-details">
                {/* <div className="image-container"> */}
                    {/* <img src={Pokhara1} alt="Pokhara, Nepal" className="bookdestination-image" />
                    <img src={Pokhara2} alt="Pokhara, Nepal" className="bookdestination-image" /> */}
                    {/* </div> */}
                    <h2>Pokhara, Nepal</h2>
                    <p>The Pokhara flight route is one of the most scenic and popular domestic routes in Nepal. Flights start at US$ 750, and the 25-minute journey offers breathtaking views of the Annapurna Mountain range. Pokhara is a nature lover’s paradise, known for its serene lakes, picturesque mountains, and adventure activities such as trekking, paragliding, and boating. The city is also the gateway for treks to the Annapurna Circuit, making it a top destination for adventure seekers.</p>
                    <p>In addition to its natural beauty, Pokhara is also famous for its tranquil atmosphere and outdoor activities. Visitors can enjoy a relaxing boat ride on the serene Phewa Lake, surrounded by the stunning views of the Himalayas. For those seeking more adventure, Pokhara offers opportunities for paragliding, where you can soar above the lakes and valleys, taking in panoramic views of the region. Whether you’re exploring caves like the Gupteshwor Cave or hiking to the Peace Pagoda, Pokhara is a haven for those looking to connect with nature and embrace adventure.</p> 
                    <p>Pokhara is also home to a vibrant local culture, with its lively markets, traditional Newari architecture, and local restaurants serving delicious Nepali cuisine. The lakeside area is a popular spot for tourists to relax, dine, and shop, offering a variety of international and local options. Whether you're seeking a peaceful retreat or an action-packed adventure, Pokhara offers a balance of natural beauty, cultural charm, and thrilling experiences that make it a must-visit destination in Nepal.</p>
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
        <p>US$ 100 per person (One-way)</p>
                            <p>Available for booking online.</p>
                            <p>15 kg for checked baggage and 5 kg for carry-on.</p>
                            <p>Frequent flights throughout the day.</p>
                            <p>Yeti Airlines, Buddha Air, Nepal Airlines.</p>

        </div>
    </div>
</section>


            </div>
            <Footer />
            
        </>
    );
}

export default PokharaPage;
