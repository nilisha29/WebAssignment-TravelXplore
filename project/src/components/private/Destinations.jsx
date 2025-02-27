import React from "react";
import "../styles/Destinations.css";
import Navbar from "./Navbar";
import Footer from "./Footer";


import kathmanduImage from "../../assets/images/kathmandu.jpg";
import pokharaImage from "../../assets/images/pokhara.jpg";
import luklaImage from "../../assets/images/lukla.jpg";
import bharatpurImage from "../../assets/images/bharatpur.jpg";
import biratnagarImage from "../../assets/images/biratnagar.jpg";
import janakpurImage from "../../assets/images/janakpur.jpg";
import nepalgunjImage from "../../assets/images/nepalgunj.jpg";
import bhairahawaImage from "../../assets/images/bhairahawa.jpg";
import dhangadhiImage from "../../assets/images/dhangadhi.jpg";
import tumlingtarImage from "../../assets/images/tumlingtar.jpg";
import jomsomImage from "../../assets/images/jomsom.jpg";
import simikotImage from "../../assets/images/simikot.jpg";



const destinations = [
  { name: "Kathmandu", desc: "The capital city, cultural and historical hub.", price: "Price:$120", image: kathmanduImage, link: "kathmandu" },
  { name: "Pokhara", desc: "Gateway to Annapurna, lakeside paradise.", price: "Price:$100", image: pokharaImage, link: "pokhara" },
  { name: "Lukla", desc: "Entry point to Everest Base Camp.", price: "Price:$150", image: luklaImage, link: "lukla" },
  { name: "Bharatpur", desc: "Near Chitwan National Park for jungle safaris.", price: "Price:$90", image: bharatpurImage, link: "bharatpur" },
  { name: "Biratnagar", desc: "Industrial city with cultural significance.", price: "Price:$110", image: biratnagarImage, link: "biratnagar" },
  { name: "Janakpur", desc: "Religious and historical city, birthplace of Sita.", price: "Price:$95", image: janakpurImage, link: "janakpur" },
  { name: "Nepalgunj", desc: "Gateway to Bardiya National Park and remote western regions.", price: "Price:$130", image: nepalgunjImage, link: "nepalgunj" },
  { name: "Bhairahawa", desc: "Near Lumbini, the birthplace of Buddha.", price: "Price:$105", image: bhairahawaImage, link: "bhairahawa" },
  { name: "Dhangadhi", desc: "Entry point to the far-western region.", price: "Price:$140", image: dhangadhiImage, link: "dhangadhi" },
  { name: "Tumlingtar", desc: "Access to Makalu-Barun National Park.", price: "Price:$125", image: tumlingtarImage, link: "tumlingtar" },
  { name: "Jomsom", desc: "Beautiful Mustang region with unique landscapes.", price: "Price:$160", image: jomsomImage, link: "jomsom" },
  { name: "Simikot", desc: "Gateway to Mount Kailash pilgrimage.", price: "Price:$180", image: simikotImage, link: "simikot" },
];


const Destinations = () => {
  return (
    <>
            <Navbar />
    <div>

      <div className="book-container">
      <h2 className="destination-heading">Find Your Next Adventure</h2>
      {/* <h1 className="destination-heading">Explore Popular Destinations</h1>
      <p className="destination-subheading">
        Discover amazing places and plan your next adventure.
      </p> */}
        {/* <h2>Choose Your Destination</h2> */}
        <div className="destinations-grid">
          {destinations.map((destination, index) => (
            <div className="destination" key={index}>
              <img src={destination.image} alt={destination.name} />
              <h3>{destination.name}</h3>
              <p>{destination.desc}</p>
              <span className="price">{destination.price}</span>
              <button className="book-btn" onClick={() => window.location.href = `/${destination.link}`}>View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
     <Footer />
     </>
  );
};

export default Destinations;
