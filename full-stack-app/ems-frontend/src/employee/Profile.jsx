import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './employee.css';
import '../animations.css';

const Profile = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchEmployeeProfile();
  }, []);

  // Auto-hide toast
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const fetchEmployeeProfile = async () => {
    try {
      // Get logged in user data from localStorage
      const userData = JSON.parse(localStorage.getItem('user'));
      
      if (!userData || !userData.employeeId) {
        setError('Employee ID not found. Please login again.');
        setLoading(false);
        return;
      }

      // Fetch employee data using the employeeId from login
      const response = await axios.get(`http://localhost:8081/api/employees/${userData.employeeId}`);
      setEmployee(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load profile. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="employee-page">
        <div className="loading-container animate-fadeIn">
          <div className="spinner-large"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="employee-page">
        <div className="error-container animate-fadeIn">
          <div className="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p className="error-message">{error}</p>
          <button 
            className="primary-btn" 
            onClick={() => navigate('/employee-dashboard')}
          >
            <span className="btn-icon">←</span>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const profileStats = [
    {
      label: 'Employee ID',
      value: `#${employee?.id}`,
      icon: '🆔'
    },
    {
      label: 'Department',
      value: employee?.department?.name || 'Not Assigned',
      icon: '🏢'
    },
    {
      label: 'Position',
      value: employee?.role || 'Employee',
      icon: '💼'
    },
    {
      label: 'Joining Date',
      value: employee?.dateOfJoining ? new Date(employee.dateOfJoining).toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }) : 'N/A',
      icon: '📅'
    }
  ];

  return (
    <div className="employee-page">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast toast-${toast.type} animate-slideInRight`} role="alert">
          {toast.message}
        </div>
      )}

      <div className="page-header animate-fadeIn">
        <button className="back-btn" onClick={() => navigate('/employee-dashboard')}>
          <span className="back-arrow">←</span> Back to Dashboard
        </button>
        <div className="header-content">
          <h1>👤 My Profile</h1>
          <p className="header-subtitle">View and manage your personal information</p>
        </div>
        <div style={{ width: '140px' }}></div> {/* Spacer for layout */}
      </div>

      <div className="profile-container animate-fadeIn stagger-1">
        <div className="profile-card animate-scaleIn">
          <div className="profile-header">
            <div className="profile-avatar-large">
              <span className="avatar-initials">
                {employee?.firstName?.charAt(0)}{employee?.lastName?.charAt(0)}
              </span>
              <div className="avatar-status"></div>
            </div>
            <h2 className="profile-name">{employee?.firstName} {employee?.lastName}</h2>
            <p className="profile-role">{employee?.role || 'Employee'}</p>
            <p className="profile-email">
              <span className="email-icon">📧</span>
              {employee?.email}
            </p>
          </div>

          <div className="profile-stats-grid animate-fadeIn stagger-2">
            {profileStats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="profile-details animate-fadeIn stagger-3">
            <h3 className="section-title">
              <span className="section-icon">ℹ️</span>
              Additional Information
            </h3>
            
            <div className="detail-row">
              <span className="detail-label">
                <span className="label-icon">💰</span>
                Salary:
              </span>
              <span className="detail-value salary-value">
                {employee?.salary ? `₹${Number(employee.salary).toLocaleString('en-IN')}` : 'Not disclosed'}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">
                <span className="label-icon">📊</span>
                Status:
              </span>
              <span className="detail-value">
                <span className="status-badge active">Active</span>
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">
                <span className="label-icon">🏢</span>
                Department ID:
              </span>
              <span className="detail-value">
                {employee?.departmentId || 'N/A'}
              </span>
            </div>
          </div>

          <div className="profile-actions animate-fadeIn stagger-4">
            <button className="action-btn update-btn" onClick={() => showToast('Profile update feature coming soon!', 'info')}>
              <span className="btn-icon">✏️</span>
              Update Profile
            </button>
            <button className="action-btn settings-btn" onClick={() => showToast('Settings feature coming soon!', 'info')}>
              <span className="btn-icon">⚙️</span>
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
