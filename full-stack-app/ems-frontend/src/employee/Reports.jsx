import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './employee.css';
import '../animations.css';

const Reports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

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

  useEffect(() => {
    filterReports();
  }, [reports, searchTerm, filterType]);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/reports');
      setReports(response.data);
      setFilteredReports(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load reports. Please try again later.');
      setLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = reports;

    if (filterType !== 'All') {
      filtered = filtered.filter(report => report.reportType === filterType);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(report =>
        report.reportType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredReports(filtered);
  };

  const getReportIcon = (type) => {
    const icons = {
      'Attendance': '📊',
      'Payroll': '💰',
      'Performance': '🎯',
      'Leave': '🌴',
      'Training': '📚',
      'Project': '💼',
      'Audit': '🔍',
      'Compliance': '✅',
      'Financial': '💵',
      'Other': '📄'
    };
    return icons[type] || '📄';
  };

  const handleViewReport = (reportId) => {
    showToast('Report viewer coming soon!', 'info');
  };

  const handleDownloadReport = (reportId) => {
    showToast('Report download coming soon!', 'info');
  };

  const reportTypes = ['All', ...new Set(reports.map(r => r.reportType))];

  if (loading) {
    return (
      <div className="employee-page">
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p>Loading reports...</p>
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
          <h1>📊 Performance Reports</h1>
          <p className="header-subtitle">View and download your reports</p>
        </div>
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

        {!error && reports.length > 0 && (
          <div className="search-filter-section animate-fadeIn stagger-2">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search reports by type or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {reportTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="results-count">
              {filteredReports.length} {filteredReports.length === 1 ? 'report' : 'reports'}
            </div>
          </div>
        )}
        
        {!error && reports.length === 0 && (
          <div className="empty-state animate-fadeIn stagger-3">
            <div className="empty-icon">📋</div>
            <h3>No Reports Available</h3>
            <p>You don't have any performance reports yet.</p>
          </div>
        )}

        {!error && reports.length > 0 && filteredReports.length === 0 && (
          <div className="empty-state animate-fadeIn stagger-3">
            <div className="empty-icon">🔍</div>
            <h3>No Reports Found</h3>
            <p>No reports match your search criteria. Try different keywords or filters.</p>
          </div>
        )}

        {!error && filteredReports.length > 0 && (
          <div className="reports-grid animate-fadeIn stagger-3">
            {filteredReports.map((report, index) => (
              <div 
                key={report.id} 
                className="report-card animate-scaleIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="report-icon-wrapper">
                  <span className="report-icon">{getReportIcon(report.reportType)}</span>
                </div>
                <div className="report-content">
                  <h3 className="report-title">{report.reportType}</h3>
                  <div className="report-date">
                    <span className="date-icon">📅</span>
                    {new Date(report.createdDate).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                  <p className="report-description">{report.description}</p>
                </div>
                <div className="report-actions">
                  <button 
                    className="view-btn"
                    onClick={() => handleViewReport(report.id)}
                  >
                    <span className="btn-icon">👁️</span>
                    View
                  </button>
                  <button 
                    className="download-btn"
                    onClick={() => handleDownloadReport(report.id)}
                  >
                    <span className="btn-icon">⬇️</span>
                    Download
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

export default Reports;
