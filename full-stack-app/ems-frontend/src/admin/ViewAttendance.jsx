import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.css';
import '../animations.css';

const ViewAttendance = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDate, setFilterDate] = useState('');

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
      const response = await axios.get('http://localhost:8081/api/attendance');
      setAttendance(response.data);
      setLoading(false);
    } catch (err) {
      showToast('✗ Error loading attendance records: ' + (err.response?.data?.message || err.message), 'error');
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    return status === 'Present' ? '#28a745' : status === 'Late' ? '#ffc107' : '#dc3545';
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
    const total = filteredAttendance.length;
    const present = filteredAttendance.filter(a => a.status === 'Present').length;
    const late = filteredAttendance.filter(a => a.status === 'Late').length;
    const absent = filteredAttendance.filter(a => a.status === 'Absent').length;
    const presentRate = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    return { total, present, late, absent, presentRate };
  };

  const filteredAttendance = attendance.filter(record => {
    const matchesSearch = record.employeeId.toString().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || record.status === filterStatus;
    const matchesDate = !filterDate || record.date === filterDate;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const stats = getAttendanceStats();

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading-container animate-fadeIn">
          <div className="spinner-large"></div>
          <p>Loading attendance records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {toast.show && (
        <div className={`toast toast-${toast.type} animate-slideInRight`} role="alert">
          {toast.message}
        </div>
      )}

      <div className="page-header animate-fadeIn">
        <button className="back-btn" onClick={() => navigate('/admin-dashboard')}>
          <span className="back-arrow">←</span> Back to Dashboard
        </button>
        <div className="header-content">
          <h1>📊 Attendance Records</h1>
          <p className="header-subtitle">Track and monitor employee attendance</p>
        </div>
      </div>

      <div className="content-container animate-fadeIn stagger-1">
        {/* Attendance Statistics */}
        {filteredAttendance.length > 0 && (
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

        {/* Search and Filter Section */}
        {attendance.length > 0 && (
          <div className="filter-section animate-fadeIn stagger-3">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by employee ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-box">
              <label htmlFor="status-filter">Status:</label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="All">All Status</option>
                <option value="Present">Present</option>
                <option value="Late">Late</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
            <div className="filter-box">
              <label htmlFor="date-filter">Date:</label>
              <input
                id="date-filter"
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="filter-select"
              />
            </div>
            <div className="results-count">
              Showing <strong>{filteredAttendance.length}</strong> of <strong>{attendance.length}</strong> records
            </div>
          </div>
        )}
        {/* Empty States */}
        {filteredAttendance.length === 0 && attendance.length === 0 && (
          <div className="empty-state animate-fadeIn stagger-4">
            <div className="empty-icon">📭</div>
            <h3>No Attendance Records</h3>
            <p>There are currently no attendance records to display.</p>
          </div>
        )}

        {filteredAttendance.length === 0 && attendance.length > 0 && (
          <div className="empty-state animate-fadeIn stagger-4">
            <div className="empty-icon">🔍</div>
            <h3>No Matching Records</h3>
            <p>Try adjusting your search or filter criteria.</p>
            <button className="primary-btn" onClick={() => {
              setSearchTerm('');
              setFilterStatus('All');
              setFilterDate('');
            }}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Attendance Table */}
        {filteredAttendance.length > 0 && (
          <div className="table-container animate-fadeIn stagger-4">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.map((record, index) => (
                  <tr 
                    key={record.id} 
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td>
                      <span className="badge-id">#{record.employeeId}</span>
                    </td>
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

export default ViewAttendance;
