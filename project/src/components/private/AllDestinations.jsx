import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Destinations.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AuthContext } from "../../context/AuthContext.jsx";
import ReactStars from "react-rating-stars-component";

const AllDestinations = () => {
  const [reviews, setReviews] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destinationsRes, reviewsRes] = await Promise.all([
          axios.get("http://localhost:5000/destinations"),
          axios.get("http://localhost:5000/reviews"),
        ]);
        setDestinations(destinationsRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        setError("Error fetching data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading destinations...</div>;
  if (error) return <div className="error">{error}</div>;

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/reviews",
        {
          destinationId: selectedDestination,
          userId: userId,
          comment: reviewText,
          rating: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setReviews([...reviews, response.data]);
      setReviewText("");
      setRating(0);
      setSelectedDestination("");
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  const handleReviewDelete = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  const handleReviewEdit = async (reviewId, newComment, newRating) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/reviews/${reviewId}`,
        {
          comment: newComment,
          rating: newRating,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setReviews(reviews.map((review) => (review.id === reviewId ? response.data : review)));
    } catch (err) {
      console.error("Error editing review:", err);
    }
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return (
    <>
      <Navbar />
      <div className="book-container">
        <h2 className="destination-heading">Find Your Next Adventure</h2>
        <div className="destinations-grid">
          {destinations.map((destination) => (
            <div className="destination" key={destination.urlSlug}>
              <img src={`http://localhost:5000${destination.mainImage}`} alt={destination.name} />
              <h3>{destination.name}</h3>
              <p>{destination.shortDescription}</p>
              <span className="price">Price: ${destination.basePrice}</span>
              <button className="book-btn" onClick={() => navigate(`/destination/${destination.urlSlug}`)}>
                View Details
              </button>
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
            {destinations.map((destination) => (
              <option key={destination.name} value={destination.name}>
                {destination.name}
              </option>
            ))}
          </select>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here"
            required
          />
          <div className="rating">
            <ReactStars key={rating} count={5} value={rating} onChange={ratingChanged} size={24} activeColor="#ffd700" />
          </div>
          <button type="submit">Submit Review</button>
        </form>
        <div className="review-list">
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to leave a review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review">
                <p>{review.comment}</p>
                <div className="rating">
                  <ReactStars count={5} value={review.rating} size={24} edit={false} activeColor="#ffd700" />
                </div>
                {review.userId === parseInt(userId) && (
                  <div className="review-actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleReviewEdit(review.id, prompt("Edit your review:", review.comment), prompt("Edit your rating:", review.rating))}
                    >
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleReviewDelete(review.id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AllDestinations;
