import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../private/Navbar";
import Footer from "../private/Footer";
import loginImage from "../../assets/images/logintravel.jpg";
import '../styles/SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        navigate('/signin');
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Failed to sign up');
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-body">
        <div className="signup-container">
        <div className="right">
            <h2>Sign Up</h2>
            <p>Create an account to explore more!</p>
            <img src={loginImage} alt="signup" />
          </div>
          <div className="left">
            <h2>Sign Up</h2>
            <div className="input-box">
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="input-box">
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="input-box">
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </div>
            <button className="btn" onClick={handleSubmit}>SIGN UP</button>
            <p style={{ color: 'white', marginTop: '10px' }}>
              Already have an account? <a onClick={() => navigate('/signin')} style={{ color: 'white', textDecoration: 'underline' }}>Sign In</a>
            </p>
          </div>
          
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;