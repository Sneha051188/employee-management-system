import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './employee.css';
import '../animations.css';

const Leaves = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    leaveType: 'Sick',
    startDate: '',
    endDate: '',
    status: 'Pending',
    employeeId: null
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.employeeId) {
      setEmployeeId(userData.employeeId);
      setFormData(prev => ({ ...prev, employeeId: userData.employeeId }));
    }
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
      const userData = JSON.parse(localStorage.getItem('user'));
      
      if (!userData || !userData.employeeId) {
        setError('Employee ID not found. Please login again.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:8081/api/leave/employee/${userData.employeeId}`);
      setLeaves(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load leave records: ' + (err.response?.data?.message || err.message));
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.startDate) {
      errors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      errors.endDate = 'End date is required';
    }
    
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end < start) {
        errors.endDate = 'End date must be after start date';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('✗ Please fix the errors in the form', 'error');
      return;
    }
    
    setSubmitting(true);
    try {
      await axios.post('http://localhost:8081/api/leave', formData);
      showToast('✓ Leave request submitted successfully!', 'success');
      setShowForm(false);
      setFormData({
        leaveType: 'Sick',
        startDate: '',
        endDate: '',
        status: 'Pending',
        employeeId
      });
      setFormErrors({});
      fetchLeaves();
    } catch (err) {
      showToast('✗ Failed to submit leave request: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return '#28a745';
      case 'rejected':
        return '#dc3545';
      case 'pending':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  };

  const getStatusIcon = (status) => {
    return status === 'Approved' ? '✅' : status === 'Rejected' ? '❌' : '⏳';
  };

  const getLeaveTypeIcon = (type) => {
    const icons = {
      'Sick': '🤒',
      'Casual': '🌴',
      'Earned': '✈️',
      'Vacation': '🏖️',
      'Personal': '👤'
    };
    return icons[type] || '📋';
  };

  const getLeaveStats = () => {
    const pending = leaves.filter(l => l.status === 'Pending').length;
    const approved = leaves.filter(l => l.status === 'Approved').length;
    const rejected = leaves.filter(l => l.status === 'Rejected').length;
    const totalDays = leaves
      .filter(l => l.status === 'Approved')
      .reduce((sum, l) => sum + calculateDuration(l.startDate, l.endDate), 0);
    return { pending, approved, rejected, totalDays };
  };

  const stats = getLeaveStats();

  if (loading) {
    return (
      <div className="employee-page">
        <div className="loading-container animate-fadeIn">
          <div className="spinner-large"></div>
          <p>Loading leave records...</p>
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
          <h1>📝 Leave Management</h1>
          <p className="header-subtitle">Apply for leaves and track your requests</p>
        </div>
        <button className="primary-btn" onClick={() => {
          setShowForm(!showForm);
          setFormErrors({});
        }}>
          <span className="btn-icon">{showForm ? '✕' : '+'}</span>
          {showForm ? 'Cancel' : 'Apply for Leave'}
        </button>
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

        {!error && leaves.length > 0 && (
          <div className="stats-grid animate-fadeIn stagger-2">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>⏳</div>
              <div className="stat-content">
                <h3>Pending</h3>
                <p className="stat-value" style={{ color: '#D97706' }}>{stats.pending}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>✅</div>
              <div className="stat-content">
                <h3>Approved</h3>
                <p className="stat-value" style={{ color: '#16A34A' }}>{stats.approved}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}>❌</div>
              <div className="stat-content">
                <h3>Rejected</h3>
                <p className="stat-value" style={{ color: '#DC2626' }}>{stats.rejected}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>📊</div>
              <div className="stat-content">
                <h3>Days Taken</h3>
                <p className="stat-value" style={{ color: '#6366F1' }}>{stats.totalDays}</p>
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <div className="form-container animate-scaleIn stagger-3">
            <h2 className="form-title">
              <span className="form-icon">📝</span>
              Apply for Leave
            </h2>
            
            <div className="input-group">
              <label htmlFor="leaveType">
                Leave Type <span className="required">*</span>
              </label>
              <select
                id="leaveType"
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                disabled={submitting}
                className="select-input"
              >
                <option value="Sick">🤒 Sick Leave</option>
                <option value="Casual">🌴 Casual Leave</option>
                <option value="Earned">✈️ Earned Leave</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="startDate">
                Start Date <span className="required">*</span>
              </label>
              <input
                id="startDate"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={formErrors.startDate ? 'error' : ''}
                disabled={submitting}
              />
              {formErrors.startDate && <span className="field-error">{formErrors.startDate}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="endDate">
                End Date <span className="required">*</span>
              </label>
              <input
                id="endDate"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={formErrors.endDate ? 'error' : ''}
                disabled={submitting}
              />
              {formErrors.endDate && <span className="field-error">{formErrors.endDate}</span>}
            </div>

            {formData.startDate && formData.endDate && !formErrors.endDate && (
              <div className="duration-info">
                📅 Duration: <strong>{calculateDuration(formData.startDate, formData.endDate)} days</strong>
              </div>
            )}

            <div className="button-group">
              <button 
                className="submit-btn" 
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <><span className="spinner-small"></span> Submitting...</>
                ) : (
                  <><span className="btn-icon">📤</span> Submit Request</>
                )}
              </button>
              <button 
                className="cancel-btn" 
                onClick={() => {
                  setShowForm(false);
                  setFormErrors({});
                }}
                disabled={submitting}
              >
                <span className="btn-icon">✕</span> Cancel
              </button>
            </div>
          </div>
        )}

        {!error && !showForm && leaves.length === 0 && (
          <div className="empty-state animate-fadeIn stagger-4">
            <div className="empty-icon">📭</div>
            <h3>No Leave Records</h3>
            <p>You haven't applied for any leaves yet.</p>
            <button className="primary-btn" onClick={() => setShowForm(true)}>
              <span className="btn-icon">+</span> Apply for Leave
            </button>
          </div>
        )}

        {!error && !showForm && leaves.length > 0 && (
          <div className="table-container animate-fadeIn stagger-4">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave, index) => (
                  <tr 
                    key={leave.id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td>
                      <span className="leave-type-badge">
                        <span className="type-icon">{getLeaveTypeIcon(leave.leaveType)}</span>
                        {leave.leaveType}
                      </span>
                    </td>
                    <td className="date-cell">
                      {new Date(leave.startDate).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="date-cell">
                      {new Date(leave.endDate).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td>
                      <span className="duration-badge">
                        {calculateDuration(leave.startDate, leave.endDate)} days
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge status-${leave.status.toLowerCase()}`}>
                        <span className="status-icon">{getStatusIcon(leave.status)}</span>
                        {leave.status}
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

export default Leaves;
