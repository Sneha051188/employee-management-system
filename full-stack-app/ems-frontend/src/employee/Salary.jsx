import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './employee.css';
import '../animations.css';

const Salary = () => {
  const navigate = useNavigate();
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

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
      const userData = JSON.parse(localStorage.getItem('user'));
      
      if (!userData || !userData.employeeId) {
        setError('Employee ID not found. Please login again.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:8081/api/payroll/employee/${userData.employeeId}`);
      setPayroll(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load payroll records: ' + (err.response?.data?.message || err.message));
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getSalaryStats = () => {
    if (payroll.length === 0) return null;
    
    const totalEarned = payroll.reduce((sum, p) => sum + (p.netSalary || 0), 0);
    const totalBonus = payroll.reduce((sum, p) => sum + (p.bonus || 0), 0);
    const totalDeductions = payroll.reduce((sum, p) => sum + (p.deductions || 0), 0);
    const avgSalary = totalEarned / payroll.length;
    const latestSalary = payroll.length > 0 ? payroll[0].netSalary : 0;
    
    return { totalEarned, totalBonus, totalDeductions, avgSalary, latestSalary };
  };

  const stats = getSalaryStats();

  if (loading) {
    return (
      <div className="employee-page">
        <div className="loading-container animate-fadeIn">
          <div className="spinner-large"></div>
          <p>Loading salary details...</p>
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
          <h1>💰 My Salary Details</h1>
          <p className="header-subtitle">View your salary and payroll history</p>
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

        {!error && stats && (
          <div className="stats-grid animate-fadeIn stagger-2">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}>💎</div>
              <div className="stat-content">
                <h3>Latest Salary</h3>
                <p className="stat-value" style={{ color: '#8B5CF6', fontSize: '1.4rem' }}>
                  {formatCurrency(stats.latestSalary)}
                </p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #22D3EE, #0EA5E9)' }}>💵</div>
              <div className="stat-content">
                <h3>Total Earned</h3>
                <p className="stat-value" style={{ color: '#0EA5E9', fontSize: '1.4rem' }}>
                  {formatCurrency(stats.totalEarned)}
                </p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>🎁</div>
              <div className="stat-content">
                <h3>Total Bonus</h3>
                <p className="stat-value" style={{ color: '#16A34A', fontSize: '1.4rem' }}>
                  {formatCurrency(stats.totalBonus)}
                </p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>📊</div>
              <div className="stat-content">
                <h3>Average Salary</h3>
                <p className="stat-value" style={{ color: '#D97706', fontSize: '1.4rem' }}>
                  {formatCurrency(stats.avgSalary)}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {!error && payroll.length === 0 && (
          <div className="empty-state animate-fadeIn stagger-3">
            <div className="empty-icon">📭</div>
            <h3>No Salary Records</h3>
            <p>You don't have any payroll records yet.</p>
          </div>
        )}

        {!error && payroll.length > 0 && (
          <div className="payroll-grid animate-fadeIn stagger-3">
            {payroll.map((record, index) => (
              <div 
                key={record.id} 
                className="payroll-card animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="payroll-header">
                  <span className="month-icon">📅</span>
                  <h3 className="payroll-month">{record.month}</h3>
                </div>
                
                <div className="payroll-details">
                  <div className="payroll-row">
                    <span className="row-label">
                      <span className="row-icon">💼</span>
                      Basic Salary:
                    </span>
                    <span className="amount basic-amount">{formatCurrency(record.basicSalary)}</span>
                  </div>
                  
                  <div className="payroll-row">
                    <span className="row-label">
                      <span className="row-icon">🎁</span>
                      Bonus:
                    </span>
                    <span className="amount bonus-amount">
                      <span className="amount-sign">+</span>
                      {formatCurrency(record.bonus || 0)}
                    </span>
                  </div>
                  
                  <div className="payroll-row">
                    <span className="row-label">
                      <span className="row-icon">📉</span>
                      Deductions:
                    </span>
                    <span className="amount deduction-amount">
                      <span className="amount-sign">-</span>
                      {formatCurrency(record.deductions || 0)}
                    </span>
                  </div>
                  
                  <div className="payroll-row total-row">
                    <span className="row-label">
                      <span className="row-icon">💎</span>
                      Net Salary:
                    </span>
                    <span className="amount net-salary">{formatCurrency(record.netSalary)}</span>
                  </div>
                </div>

                <button 
                  className="download-slip-btn"
                  onClick={() => showToast('💾 Payslip download feature coming soon!', 'info')}
                >
                  <span className="btn-icon">⬇️</span>
                  Download Payslip
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Salary;
