import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./adminDashboard.css";
import "../animations.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    pendingLeaves: 0,
    attendanceRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState({});
  const [userName, setUserName] = useState("Admin");

  // Get user name from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.name) {
      setUserName(user.name);
    }
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.dataset.card]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('[data-card]');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch employees count
      const employeesResponse = await axios.get('http://localhost:8081/api/employees');
      const totalEmployees = employeesResponse.data.length;

      // Fetch departments count
      const departmentsResponse = await axios.get('http://localhost:8081/api/departments');
      const totalDepartments = departmentsResponse.data.length;

      // Fetch pending leaves count
      const leavesResponse = await axios.get('http://localhost:8081/api/leave');
      const pendingLeaves = leavesResponse.data.filter(leave => leave.status === 'Pending').length;

      // Calculate attendance rate
      const attendanceResponse = await axios.get('http://localhost:8081/api/attendance');
      const totalRecords = attendanceResponse.data.length;
      const presentRecords = attendanceResponse.data.filter(att => att.status === 'Present').length;
      const attendanceRate = totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : 0;

      setStats({
        totalEmployees,
        totalDepartments,
        pendingLeaves,
        attendanceRate
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('user');
      navigate("/login");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const managementCards = [
    {
      id: 'employees',
      icon: '👥',
      title: 'Manage Employees',
      description: 'Add, edit, or remove employee records',
      path: '/admin/employees',
      color: '#6366F1'
    },
    {
      id: 'departments',
      icon: '🏢',
      title: 'Departments',
      description: 'Organize and manage departments',
      path: '/admin/departments',
      color: '#22D3EE'
    },
    {
      id: 'attendance',
      icon: '📅',
      title: 'Attendance',
      description: 'Monitor employee attendance',
      path: '/admin/attendance',
      color: '#10B981'
    },
    {
      id: 'leaves',
      icon: '💼',
      title: 'Leave Management',
      description: 'Approve or reject leave requests',
      path: '/admin/leaves',
      color: '#F59E0B'
    },
    {
      id: 'payroll',
      icon: '💰',
      title: 'Payroll',
      description: 'Manage salary and payments',
      path: '/admin/payroll',
      color: '#8B5CF6'
    },
    {
      id: 'reports',
      icon: '📊',
      title: 'Reports',
      description: 'Generate and view reports',
      path: '/admin/reports',
      color: '#EC4899'
    }
  ];

  const statsData = [
    {
      value: loading ? '...' : stats.totalEmployees,
      label: 'Total Employees',
      icon: '👥',
      color: '#6366F1'
    },
    {
      value: loading ? '...' : stats.totalDepartments,
      label: 'Departments',
      icon: '🏢',
      color: '#22D3EE'
    },
    {
      value: loading ? '...' : stats.pendingLeaves,
      label: 'Pending Requests',
      icon: '💼',
      color: '#F59E0B'
    },
    {
      value: loading ? '...' : `${stats.attendanceRate}%`,
      label: 'Attendance Rate',
      icon: '📊',
      color: '#10B981'
    }
  ];

  return (
    <div className="dashboard-wrapper">
      <nav className="dashboard-nav animate-slideInDown">
        <div className="nav-brand">
          <span className="nav-logo">⚡</span>
          <h2>Admin Dashboard</h2>
        </div>
        <div className="nav-user">
          <span className="user-greeting">Welcome, <strong>{userName}</strong></span>
          <button 
            className="logout-btn" 
            onClick={handleLogout}
            aria-label="Logout from dashboard"
          >
            <span className="logout-icon">🚪</span>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-container">
        <div className="dashboard-header animate-fadeIn stagger-1">
          <h1>Company Admin Panel</h1>
          <p>Manage employees and company operations</p>
        </div>

        <div className="dashboard-stats animate-fadeIn stagger-2">
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className={`stat-card ${loading ? 'loading' : ''}`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                '--stat-color': stat.color 
              }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          {managementCards.map((card, index) => (
            <div 
              key={card.id}
              className={`dashboard-card ${isVisible[card.id] ? 'animate-fadeInUp' : ''}`}
              data-card={card.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-icon" style={{ '--card-color': card.color }}>
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <button 
                className="card-btn" 
                onClick={() => handleNavigation(card.path)}
                aria-label={`Navigate to ${card.title}`}
              >
                Manage
                <span className="btn-arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
