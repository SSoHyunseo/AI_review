import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [userMessage, setUserMessage] = useState('');
  const [adminMessage, setAdminMessage] = useState('');
  const navigate = useNavigate();

  const handleUserFunction = async () => {
    try {
      const response = await api.get('/user/profile');
      setUserMessage(response.data);
      setAdminMessage('');
    } catch (error) {
      setUserMessage('User access denied.');
      console.error('User access error:', error.response?.data || error.message);
    }
  };

  const handleAdminFunction = async () => {
    try {
      const response = await api.get('/admin/dashboard');
      setAdminMessage(response.data);
      setUserMessage('');
    } catch (error) {
      setAdminMessage('Admin access denied.');
      console.error('Admin access error:', error.response?.data || error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="button-group">
        <button onClick={handleUserFunction}>일반 사용자 기능 확인</button>
        <button onClick={handleAdminFunction}>관리자 전용 기능 확인</button>
      </div>
      <div className="message-box">
        {userMessage && <p className="user-message">{userMessage}</p>}
        {adminMessage && <p className="admin-message">{adminMessage}</p>}
      </div>
      <button onClick={handleLogout} className="logout-button">로그인</button>
    </div>
  );
}

export default Dashboard;