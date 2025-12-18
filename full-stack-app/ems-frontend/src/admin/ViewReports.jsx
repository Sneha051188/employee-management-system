import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.css';
import '../animations.css';

const ViewReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    fetchReports();
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

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/reports');
      setReports(response.data);
      setLoading(false);
    } catch (err) {
      showToast('✗ Error loading reports: ' + (err.response?.data?.message || err.message), 'error');
      setLoading(false);
    }
  };

  const getReportIcon = (type) => {
    const icons = {
      'Attendance': '📊',
      'Payroll': '💰',
      'Performance': '🎯',
      'Leave': '📋',
      'Department': '🏢',
      'Financial': '💵',
      'Employee': '👥',
      'Monthly': '📅',
      'Quarterly': '📈',
      'Annual': '📆'
    };
    return icons[type] || '📄';
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.description && report.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'All' || report.reportType === filterType;
    return matchesSearch && matchesType;
  });

  const reportTypes = ['All', ...new Set(reports.map(r => r.reportType))];

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading-container animate-fadeIn">
          <div className="spinner-large"></div>
          <p>Loading reports...</p>
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
          <h1>📑 Company Reports</h1>
          <p className="header-subtitle">View and analyze company reports</p>
        </div>
      </div>

      <div className="content-container animate-fadeIn stagger-1">
        {/* Search and Filter Section */}
        {reports.length > 0 && (
          <div className="filter-section animate-fadeIn stagger-2">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search reports by type or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-box">
              <label htmlFor="type-filter">Report Type:</label>
              <select
                id="type-filter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                {reportTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="results-count">
              Showing <strong>{filteredReports.length}</strong> of <strong>{reports.length}</strong> reports
            </div>
          </div>
        )}

        {/* Empty States */}
        {filteredReports.length === 0 && reports.length === 0 && (
          <div className="empty-state animate-fadeIn stagger-3">
            <div className="empty-icon">📭</div>
            <h3>No Reports Available</h3>
            <p>There are currently no reports to display.</p>
          </div>
        )}

        {filteredReports.length === 0 && reports.length > 0 && (
          <div className="empty-state animate-fadeIn stagger-3">
            <div className="empty-icon">🔍</div>
            <h3>No Matching Reports</h3>
            <p>Try adjusting your search or filter criteria.</p>
            <button className="primary-btn" onClick={() => {
              setSearchTerm('');
              setFilterType('All');
            }}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Reports Grid */}
        {filteredReports.length > 0 && (
          <div className="reports-grid animate-fadeIn stagger-3">
            {filteredReports.map((report, index) => (
              <div 
                key={report.id} 
                className="report-card animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="report-header">
                  <div className="report-icon-wrapper">
                    <span className="report-icon">{getReportIcon(report.reportType)}</span>
                  </div>
                  <div className="report-title-section">
                    <h3 className="report-title">{report.reportType}</h3>
                    <span className="report-date">
                      <span className="date-icon">📅</span>
                      {new Date(report.createdDate).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                
                {report.description && (
                  <p className="report-description">{report.description}</p>
                )}
                
                <div className="report-actions">
                  <button 
                    className="view-btn"
                    onClick={() => showToast('📄 Report viewing feature coming soon!', 'info')}
                    title="View report details"
                  >
                    <span className="btn-icon">👁️</span> View
                  </button>
                  <button 
                    className="download-btn"
                    onClick={() => showToast('⬇️ Report download feature coming soon!', 'info')}
                    title="Download report"
                  >
                    <span className="btn-icon">⬇️</span> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReports;
