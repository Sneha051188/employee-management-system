import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.css';
import '../animations.css';

const ManageLeaves = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    fetchLeaves();
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

  const fetchLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/leave');
      setLeaves(response.data);
      setLoading(false);
    } catch (err) {
      showToast('✗ Error loading leave requests: ' + (err.response?.data?.message || err.message), 'error');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const leave = leaves.find(l => l.id === id);
      const updatedLeave = { ...leave, status };
      await axios.put(`http://localhost:8081/api/leave/${id}`, updatedLeave);
      showToast(`✓ Leave request ${status.toLowerCase()} successfully!`, 'success');
      fetchLeaves();
    } catch (err) {
      showToast('✗ Error updating leave status: ' + (err.response?.data?.message || err.message), 'error');
    }
  };

  const getStatusColor = (status) => {
    return status === 'Approved' ? '#28a745' : status === 'Rejected' ? '#dc3545' : '#ffc107';
  };

  const getStatusIcon = (status) => {
    return status === 'Approved' ? '✅' : status === 'Rejected' ? '❌' : '⏳';
  };

  const getLeaveTypeIcon = (type) => {
    const icons = {
      'Sick': '🤒',
      'Casual': '🌴',
      'Vacation': '✈️',
      'Personal': '👤',
      'Emergency': '🚨',
      'Medical': '🏥'
    };
    return icons[type] || '📋';
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const filteredLeaves = leaves.filter(leave => {
    const matchesSearch = 
      leave.employeeId.toString().includes(searchTerm.toLowerCase()) ||
      leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || leave.status === filterStatus;
    const matchesType = filterType === 'All' || leave.leaveType === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const leaveTypes = ['All', ...new Set(leaves.map(l => l.leaveType))];

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading-container animate-fadeIn">
          <div className="spinner-large"></div>
          <p>Loading leave requests...</p>
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
          <h1>📝 Leave Management</h1>
          <p className="header-subtitle">Review and manage employee leave requests</p>
        </div>
      </div>

      <div className="content-container animate-fadeIn stagger-1">
        {leaves.length > 0 && (
          <div className="filter-section animate-fadeIn stagger-2">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by employee ID or leave type..."
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
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="filter-box">
              <label htmlFor="type-filter">Type:</label>
              <select
                id="type-filter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                {leaveTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="results-count">
              Showing <strong>{filteredLeaves.length}</strong> of <strong>{leaves.length}</strong> requests
            </div>
          </div>
        )}
        {filteredLeaves.length === 0 && leaves.length === 0 && (
          <div className="empty-state animate-fadeIn stagger-3">
            <div className="empty-icon">📭</div>
            <h3>No Leave Requests</h3>
            <p>There are currently no leave requests to display.</p>
          </div>
        )}

        {filteredLeaves.length === 0 && leaves.length > 0 && (
          <div className="empty-state animate-fadeIn stagger-3">
            <div className="empty-icon">🔍</div>
            <h3>No Matching Requests</h3>
            <p>Try adjusting your search or filter criteria.</p>
            <button className="primary-btn" onClick={() => {
              setSearchTerm('');
              setFilterStatus('All');
              setFilterType('All');
            }}>
              Clear Filters
            </button>
          </div>
        )}

        {filteredLeaves.length > 0 && (
          <div className="table-container animate-fadeIn stagger-3">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaves.map((leave, index) => (
                  <tr 
                    key={leave.id} 
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td>
                      <span className="badge-id">#{leave.employeeId}</span>
                    </td>
                    <td>
                      <span className="leave-type">
                        <span className="type-icon">{getLeaveTypeIcon(leave.leaveType)}</span>
                        {leave.leaveType}
                      </span>
                    </td>
                    <td>{new Date(leave.startDate).toLocaleDateString('en-IN')}</td>
                    <td>{new Date(leave.endDate).toLocaleDateString('en-IN')}</td>
                    <td>
                      <span className="duration-badge">
                        {calculateDuration(leave.startDate, leave.endDate)} days
                      </span>
                    </td>
                    <td>
                      <span 
                        className={`status-badge status-${leave.status.toLowerCase()}`}
                      >
                        <span className="status-icon">{getStatusIcon(leave.status)}</span>
                        {leave.status}
                      </span>
                    </td>
                    <td className="actions">
                      {leave.status === 'Pending' ? (
                        <div className="action-buttons">
                          <button 
                            className="approve-btn" 
                            onClick={() => handleStatusUpdate(leave.id, 'Approved')}
                            title="Approve leave request"
                          >
                            <span className="btn-icon">✅</span> Approve
                          </button>
                          <button 
                            className="reject-btn" 
                            onClick={() => handleStatusUpdate(leave.id, 'Rejected')}
                            title="Reject leave request"
                          >
                            <span className="btn-icon">❌</span> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted">No actions</span>
                      )}
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

export default ManageLeaves;
