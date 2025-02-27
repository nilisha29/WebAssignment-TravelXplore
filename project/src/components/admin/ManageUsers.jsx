import React, { useEffect, useState } from 'react';
import AdminPanel from './AdminPanel';
import '../styles/ManageUsers.css'; 

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        alert('You are not authorized to perform this action.');
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          console.error('Unexpected response format:', data);
          alert(data.error);
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      alert('You are not authorized to perform this action.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.error('Failed to delete user:', response.status, response.statusText);
        alert('Failed to delete user');
        return;
      }

      alert('User deleted successfully');
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting the user.');
    }
  };

  return (
    <div className="manage-users-container">
      <AdminPanel />
      <div className="manage-users-main-content">
        <h1>Manage Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>UserID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn-btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;