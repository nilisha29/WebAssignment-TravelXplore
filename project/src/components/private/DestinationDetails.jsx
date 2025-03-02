import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Bangkok.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const DestinationDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [destination, setDestination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDestinationDetails();
    }, [slug]);

    const fetchDestinationDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/destinations/${slug}`);
            setDestination(response.data);
            setLoading(false);
        } catch (err) {
            setError("Error fetching destination details");
            setLoading(false);
            console.error("Error fetching destination details:", err);
        }
    };

    const handleBookNow = () => {
        navigate("/#flight-booking");
    };

    if (loading) return <div className="loading">Loading destination details...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!destination) return <div className="error">Destination not found</div>;

    return (
        <>
            <Navbar />
            <div className="bookBharatpur-body">
                <button className="book-now-btn" onClick={handleBookNow}>
                    Book Now
                </button>

                <div className="images">
                    {destination.destinationDetailImages.image1?.url && (
                        <img 
                            src={`http://localhost:5000${destination.destinationDetailImages.image1.url}`}
                            alt={`${destination.name} view 1`} 
                            className="bookdestination-image" 
                        />
                    )}
                    {destination.destinationDetailImages.image2?.url && (
                        <img 
                            src={`http://localhost:5000${destination.destinationDetailImages.image2.url}`}
                            alt={`${destination.name} view 2`} 
                            className="bookdestination-image" 
                        />
                    )}
                </div>

                <section className="bookdestination-details">
                    <h2>{destination.name}, Nepal</h2>
                    {destination.detailedDescription.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
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
                            <p>US$ {destination.basePrice} </p>
                            <p>{destination.flightInformation.booking || "Available for booking online."}</p>
                            <p>{destination.flightInformation.baggageAllowance || "15 kg for checked baggage and 5 kg for carry-on."}</p>
                            <p>{destination.flightInformation.totalFlights || "Multiple flights daily."}</p>
                            <p>{destination.flightInformation.airlines || "Buddha Air, Yeti Airlines, Nepal Airlines."}</p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default DestinationDetails; 