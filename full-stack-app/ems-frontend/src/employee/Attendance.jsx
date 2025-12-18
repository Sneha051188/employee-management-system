import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './employee.css';
import '../animations.css';

const Attendance = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchAttendance();
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
  };

  const fetchAttendance = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      
      if (!userData || !userData.employeeId) {
        setError('Employee ID not found. Please login again.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:8081/api/attendance/employee/${userData.employeeId}`);
      setAttendance(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load attendance records: ' + (err.response?.data?.message || err.message));
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    return status === 'Present' ? '✅' : status === 'Late' ? '⏰' : '❌';
  };

  const getDayOfWeek = (dateString) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const getAttendanceStats = () => {
    const total = attendance.length;
    const present = attendance.filter(a => a.status === 'Present').length;
    const late = attendance.filter(a => a.status === 'Late').length;
    const absent = attendance.filter(a => a.status === 'Absent').length;
    const presentRate = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    return { total, present, late, absent, presentRate };
  };

  const stats = getAttendanceStats();

  if (loading) {
    return (
      <div className="employee-page">
        <div className="loading-container animate-fadeIn">
          <div className="spinner-large"></div>
          <p>Loading attendance records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-page">
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
          <h1>� My Attendance</h1>
          <p className="header-subtitle">Track your attendance records</p>
        </div>
        <div style={{ width: '140px' }}></div>
      </div>

      <div className="content-container animate-fadeIn stagger-1">
        {error && (
          <div className="error-container animate-shake">
            <div className="error-icon">⚠️</div>
            <h3>Error Loading Data</h3>
            <p>{error}</p>
            <button className="back-btn" onClick={() => navigate('/employee-dashboard')}>
              Go Back
            </button>
          </div>
        )}

        {!error && attendance.length > 0 && (
          <div className="stats-grid animate-fadeIn stagger-2">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>📈</div>
              <div className="stat-content">
                <h3>Total Records</h3>
                <p className="stat-value">{stats.total}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>✅</div>
              <div className="stat-content">
                <h3>Present</h3>
                <p className="stat-value" style={{ color: '#16A34A' }}>{stats.present}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>⏰</div>
              <div className="stat-content">
                <h3>Late</h3>
                <p className="stat-value" style={{ color: '#D97706' }}>{stats.late}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}>❌</div>
              <div className="stat-content">
                <h3>Absent</h3>
                <p className="stat-value" style={{ color: '#DC2626' }}>{stats.absent}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #22D3EE, #0EA5E9)' }}>📊</div>
              <div className="stat-content">
                <h3>Attendance Rate</h3>
                <p className="stat-value" style={{ color: '#6366F1' }}>{stats.presentRate}%</p>
              </div>
            </div>
          </div>
        )}
        
        {!error && attendance.length === 0 && (
          <div className="empty-state animate-fadeIn stagger-3">
            <div className="empty-icon">📭</div>
            <h3>No Attendance Records</h3>
            <p>You don't have any attendance records yet.</p>
          </div>
        )}

        {!error && attendance.length > 0 && (
          <div className="table-container animate-fadeIn stagger-3">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record, index) => (
                  <tr 
                    key={record.id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="date-cell">
                      <span className="date-display">
                        {new Date(record.date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                    <td>
                      <span className="day-badge">
                        {getDayOfWeek(record.date)}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge status-${record.status.toLowerCase()}`}>
                        <span className="status-icon">{getStatusIcon(record.status)}</span>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;

