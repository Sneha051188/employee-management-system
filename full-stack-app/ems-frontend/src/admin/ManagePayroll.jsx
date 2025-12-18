import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.css';
import '../animations.css';

const ManagePayroll = () => {
  const navigate = useNavigate();
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState('All');

  useEffect(() => {
    fetchPayroll();
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

  const fetchPayroll = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/payroll');
      setPayroll(response.data);
      setLoading(false);
    } catch (err) {
      showToast('✗ Error loading payroll records: ' + (err.response?.data?.message || err.message), 'error');
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getPayrollStats = () => {
    const totalBasic = filteredPayroll.reduce((sum, p) => sum + (p.basicSalary || 0), 0);
    const totalBonus = filteredPayroll.reduce((sum, p) => sum + (p.bonus || 0), 0);
    const totalDeductions = filteredPayroll.reduce((sum, p) => sum + (p.deductions || 0), 0);
    const totalNet = filteredPayroll.reduce((sum, p) => sum + (p.netSalary || 0), 0);
    const avgSalary = filteredPayroll.length > 0 ? totalNet / filteredPayroll.length : 0;
    return { totalBasic, totalBonus, totalDeductions, totalNet, avgSalary };
  };

  const filteredPayroll = payroll.filter(record => {
    const matchesSearch = record.employeeId.toString().includes(searchTerm.toLowerCase());
    const matchesMonth = filterMonth === 'All' || record.month === filterMonth;
    return matchesSearch && matchesMonth;
  });

  const uniqueMonths = ['All', ...new Set(payroll.map(p => p.month))];
  const stats = getPayrollStats();

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading-container animate-fadeIn">
          <div className="spinner-large"></div>
          <p>Loading payroll records...</p>
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
          <h1>💰 Payroll Management</h1>
          <p className="header-subtitle">Manage employee salary and payroll records</p>
        </div>
      </div>

      <div className="content-container animate-fadeIn stagger-1">
        {/* Payroll Statistics */}
        {filteredPayroll.length > 0 && (
          <div className="stats-grid animate-fadeIn stagger-2">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>💼</div>
              <div className="stat-content">
                <h3>Total Records</h3>
                <p className="stat-value">{filteredPayroll.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #22D3EE, #0EA5E9)' }}>💵</div>
              <div className="stat-content">
                <h3>Total Basic Salary</h3>
                <p className="stat-value" style={{ color: '#0EA5E9', fontSize: '1.3rem' }}>
                  {formatCurrency(stats.totalBasic)}
                </p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>🎁</div>
              <div className="stat-content">
                <h3>Total Bonus</h3>
                <p className="stat-value" style={{ color: '#16A34A', fontSize: '1.3rem' }}>
                  {formatCurrency(stats.totalBonus)}
                </p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}>📉</div>
              <div className="stat-content">
                <h3>Total Deductions</h3>
                <p className="stat-value" style={{ color: '#DC2626', fontSize: '1.3rem' }}>
                  {formatCurrency(stats.totalDeductions)}
                </p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}>💎</div>
              <div className="stat-content">
                <h3>Total Net Salary</h3>
                <p className="stat-value" style={{ color: '#8B5CF6', fontSize: '1.3rem' }}>
                  {formatCurrency(stats.totalNet)}
                </p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>📊</div>
              <div className="stat-content">
                <h3>Average Salary</h3>
                <p className="stat-value" style={{ color: '#D97706', fontSize: '1.3rem' }}>
                  {formatCurrency(stats.avgSalary)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
        {payroll.length > 0 && (
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
              <label htmlFor="month-filter">Month:</label>
              <select
                id="month-filter"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="filter-select"
              >
                {uniqueMonths.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div className="results-count">
              Showing <strong>{filteredPayroll.length}</strong> of <strong>{payroll.length}</strong> records
            </div>
          </div>
        )}
        {/* Empty States */}
        {filteredPayroll.length === 0 && payroll.length === 0 && (
          <div className="empty-state animate-fadeIn stagger-4">
            <div className="empty-icon">📭</div>
            <h3>No Payroll Records</h3>
            <p>There are currently no payroll records to display.</p>
          </div>
        )}

        {filteredPayroll.length === 0 && payroll.length > 0 && (
          <div className="empty-state animate-fadeIn stagger-4">
            <div className="empty-icon">🔍</div>
            <h3>No Matching Records</h3>
            <p>Try adjusting your search or filter criteria.</p>
            <button className="primary-btn" onClick={() => {
              setSearchTerm('');
              setFilterMonth('All');
            }}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Payroll Table */}
        {filteredPayroll.length > 0 && (
          <div className="table-container animate-fadeIn stagger-4">
            <table className="data-table payroll-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Month</th>
                  <th>Basic Salary</th>
                  <th>Bonus</th>
                  <th>Deductions</th>
                  <th>Net Salary</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayroll.map((record, index) => (
                  <tr 
                    key={record.id} 
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td>
                      <span className="badge-id">#{record.employeeId}</span>
                    </td>
                    <td>
                      <span className="month-badge">
                        📅 {record.month}
                      </span>
                    </td>
                    <td>
                      <span className="amount basic-amount">
                        {formatCurrency(record.basicSalary)}
                      </span>
                    </td>
                    <td>
                      <span className="amount bonus-amount">
                        <span className="amount-icon">+</span>
                        {formatCurrency(record.bonus || 0)}
                      </span>
                    </td>
                    <td>
                      <span className="amount deduction-amount">
                        <span className="amount-icon">-</span>
                        {formatCurrency(record.deductions || 0)}
                      </span>
                    </td>
                    <td>
                      <span className="amount net-amount">
                        {formatCurrency(record.netSalary)}
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

export default ManagePayroll;
