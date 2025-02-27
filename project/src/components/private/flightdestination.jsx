import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Destinations.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext.jsx';
import ReactStars from "react-rating-stars-component";

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
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId'); // Get user ID from local storage

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/reviews');
        setReviews(response.data);
        setLoading(false); // Set loading to false after fetching reviews
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/reviews', {
        destinationId: selectedDestination,
        userId: userId,
        comment: reviewText,
        rating: rating
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setReviews([...reviews, response.data]);
      setReviewText('');
      setRating(0);
      setSelectedDestination(''); // Reset the selected destination
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  const handleReviewDelete = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${reviewId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  const handleReviewEdit = async (reviewId, newComment, newRating) => {
    try {
      const response = await axios.put(`http://localhost:5000/reviews/${reviewId}`, {
        comment: newComment,
        rating: newRating
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setReviews(reviews.map(review => review.id === reviewId ? response.data : review));
    } catch (err) {
      console.error('Error editing review:', err);
    }
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <div>
        <div className="book-container">
          <h2 className="destination-heading">Find Your Next Adventure</h2>
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
        <section className="reviews">
          <h2>Reviews</h2>
          <p>Leave a review for this destination:</p>
          <form onSubmit={handleReviewSubmit}>
            <select value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)} required>
              <option value="">Select a destination</option>
              {destinations.map(destination => (
                <option key={destination.name} value={destination.name}>{destination.name}</option>
              ))}
            </select>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here"
              required
            />
            <div className="rating">
              <ReactStars
                key={rating} // Add key prop to force re-render
                count={5}
                value={rating} // Controlled by the rating state
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
            </div>
            <button type="submit">Submit Review</button>
          </form>
          <div className="review-list">
            {reviews.length === 0 ? (
              <p>No reviews yet. Be the first to leave a review!</p>
            ) : (
              reviews.map(review => {
                console.log('Review userId:', review.userId); // Log the userId from the review
                return (
                  <div key={review.id} className="review">
                    <p>{review.comment}</p>
                    <div className="rating">
                      <ReactStars
                        count={5}
                        value={review.rating}
                        size={24}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    {review.userId === parseInt(userId) && (
                      <div className="review-actions">
                        <button className="btn-edit" onClick={() => handleReviewEdit(review.id, prompt('Edit your review:', review.comment), prompt('Edit your rating:', review.rating))}>Edit</button>
                        <button className="btn-delete" onClick={() => handleReviewDelete(review.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Destinations;