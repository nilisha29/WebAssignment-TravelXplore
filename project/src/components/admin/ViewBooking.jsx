import React, { useEffect, useState } from 'react';
import AdminPanel from './AdminPanel';
import "../styles/ViewBooking.css";

const ViewBooking = () => {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookings'); 
        const data = await response.json();
        setBookingData(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="view-booking-container">
      <AdminPanel />
      <div className="view-booking-main-content">
        <header>
          <h1>Booking Details</h1>
        </header>

        <section id="view-booking">
          {bookingData.length > 0 ? (
            <div className="table-wrapper">
              <table className="booking-details">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Nationality</th>
                    <th>Mobile</th>
                    <th>Document Type</th>
                    <th>Document</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Departure</th>
                    <th>Return</th>
                    <th>Passengers</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingData.map((booking, index) => {
                    const imageUrl = `http://localhost:5000/${booking.documentFile.replace(/\\/g, '/')}`;
                    return (
                      <tr key={index}>
                        <td>{booking.fullName}</td>
                        <td>{booking.email}</td>
                        <td>{booking.nationality}</td>
                        <td>{booking.mobile}</td>
                        <td>{booking.documentType}</td>
                        <td>
                          <a
                            id="document-link"
                            href={imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Document
                          </a>
                        </td>
                        <td>{booking.from}</td>
                        <td>{booking.to}</td>
                        <td>{new Date(booking.departure).toLocaleDateString()}</td>
                        <td>{booking.return ? new Date(booking.return).toLocaleDateString() : 'N/A'}</td>
                        <td>{booking.passengers}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No booking details available.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ViewBooking;