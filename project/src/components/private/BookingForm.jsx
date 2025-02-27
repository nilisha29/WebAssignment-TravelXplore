import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/BookingForm.css"; 
import Navbar from "./Navbar";
import Footer from "./Footer";

function BookingForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        nationality: "",
        mobile: "",
        documentType: '',
        documentFile: null
    });

    const [initialData] = useState(location.state || {});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            documentFile: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        for (const key in initialData) {
            data.append(key, initialData[key]);
        }

        try {
            const response = await fetch('http://localhost:5000/booking/create', {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                navigate("/"); // Redirect to home after submission
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error('Error submitting booking form:', error);
            alert('Failed to submit booking form');
        }
    };

    return (
        <>
            <Navbar />
            <div className="booking-form-container">
                <h2>Flight Booking Submission</h2>
                <form onSubmit={handleSubmit}>
                    <label>Full Name:</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label>Nationality:</label>
                    <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required />

                    <label>Mobile Number:</label>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />

                    <label htmlFor="documentType">Upload your Citizenship / Pan Card / National Identification Card</label>
                    <select id="documentType" name="documentType" value={formData.documentType} onChange={handleChange} required>
                        <option value="">Choose a document</option>
                        <option value="citizenship">Citizenship</option>
                        <option value="pan-card">Pan Card</option>
                        <option value="national-identification-card">National Identification Card</option>
                    </select>
                    <input type="file" name="documentFile" onChange={handleFileChange} accept=".jpg, .png, .webp, .jpeg" required />

                    <button type="submit">Submit</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default BookingForm;