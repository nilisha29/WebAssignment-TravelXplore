import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import '../styles/Profile.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Profile = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [profilePic, setProfilePic] = useState('');
    const [profilePicFile, setProfilePicFile] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            const fetchProfile = async () => {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setProfilePic(`http://localhost:5000/${data.profilePic}`);
                    setFullName(data.fullName);
                    setEmail(data.email);
                    setPhone(data.phone);
                    setGender(data.gender);
                    setAddress(data.address);
                } else {
                    console.error(data.error);
                }
            };

            fetchProfile();
        }
    }, [isAuthenticated]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setProfilePic(URL.createObjectURL(file));
        setProfilePicFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        if (profilePicFile) {
            formData.append('profilePic', profilePicFile);
        }
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('gender', gender);
        formData.append('address', address);

        try {
            const response = await fetch('http://localhost:5000/users/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                setProfilePic(`http://localhost:5000/${result.profilePic}`);
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <>
            <Navbar />
            <div>
                <div className='profile-body'>
                    <div className="profile-container">
                        <h2>My Profile</h2>
                        <div className="profile-pic-container">
                            <img id="profile-pic" src={profilePic} alt="User Profile" />
                            <input type="file" id="file-input" accept="image/*" onChange={handleFileChange} />
                            <label htmlFor="file-input" className="upload-btn">Change Photo</label>
                        </div>
                        <form id="profile-form" onSubmit={handleSubmit}>
                            <label>Full Name:</label>
                            <input type="text" id="fullName" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            <label>Email:</label>
                            <input type="email" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label>Phone:</label>
                            <input type="text" id="phone" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <label>Gender:</label>
                            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <label>Address:</label>
                            <input type="text" id="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
                            <button type="submit" className="update-btn">Update Profile</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;