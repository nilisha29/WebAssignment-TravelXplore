import React, { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel';
import '../styles/ContactMessages.css'; 

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:5000/contact');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="contact-messages-container">
      <AdminPanel />
      <div className="contact-messages-main-content">
        <div className="contact-messages-body">
          <h2>User Messages</h2>
          <div className="messages-container">
            {messages.length === 0 ? (
              <p>No messages yet.</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="message">
                  <strong>Name:</strong> {msg.fullName} <br />
                  <strong>Email:</strong> {msg.email} <br />
                  <strong>Message:</strong> {msg.message}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMessages;