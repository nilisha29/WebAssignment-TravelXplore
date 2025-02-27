import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import '../styles/ProfileChange.css';

function Dropdown() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
  
    <div className="dropdown-container" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faUser} />
      </button>
      {isDropdownVisible && (
        <ul className="dropdown-menu">
          <li onClick={handleProfile}> My Profile</li>
          {/* <li onClick={handleSignin}>My Bookings</li> */}
          <li onClick={handleLogout}>Logout</li>
        </ul>
      )}
    </div>
    
  );
}

export default Dropdown;