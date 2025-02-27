import React, { useEffect, useState } from 'react';
import AdminPanel from './AdminPanel';
import '../styles/ManageReviews.css'; // Import the new CSS file

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5000/reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      alert('You are not authorized to perform this action.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.error('Failed to delete review:', response.status, response.statusText);
        alert('Failed to delete review');
        return;
      }

      alert('Review deleted successfully');
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('An error occurred while deleting the review.');
    }
  };

  return (
    <div className="manage-reviews-container">
      <AdminPanel />
      <div className="manage-reviews-main-content">
        <header>
          <h1>Manage Reviews</h1>
        </header>

        <section id="manage-reviews">
          {reviews.length > 0 ? (
            <table className="manage-reviews-table">
              <thead>
                <tr>
                  <th>Review ID</th>
                  <th>Flight ID</th>
                  <th>User ID</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id}>
                    <td>{review.id}</td>
                    <td>{review.packageId}</td>
                    <td>{review.userId}</td>
                    <td>{review.rating}</td>
                    <td>{review.comment}</td>
                    <td>
                      <button className="manage-reviews-btn-danger" onClick={() => handleDelete(review.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No reviews available.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ManageReviews;