import React from 'react';
import AdminPanel from './AdminPanel';
import '../styles/Dashboard.css'; 
import Admin from '../../assets/images/logintravel.jpg';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <AdminPanel />
      <div className="dashboard-main-content">
        <div className="dashboard-body">
          <h1>Admin Dashboard</h1>
          <p>Manage destinations, users, bookings, and contact messages.</p>
             <img src={Admin} alt="admindashboard" className="dashboard-image" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;