import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./employeeDashboard.css";
import "../animations.css";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});
  const [userName, setUserName] = useState("Employee");

  // Get user name from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.name) {
      setUserName(user.name);
    }
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

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('user');
      navigate("/login");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const dashboardCards = [
    {
      id: 'profile',
      icon: '👤',
      title: 'My Profile',
      description: 'View and update your personal information',
      path: '/employee/profile',
      color: '#6366F1'
    },
    {
      id: 'attendance',
      icon: '📅',
      title: 'Attendance',
      description: 'Check your attendance records',
      path: '/employee/attendance',
      color: '#22D3EE'
    },
    {
      id: 'salary',
      icon: '💰',
      title: 'Salary',
      description: 'View your salary details',
      path: '/employee/salary',
      color: '#10B981'
    },
    {
      id: 'leaves',
      icon: '📝',
      title: 'Leave Requests',
      description: 'Apply for leave and check status',
      path: '/employee/leaves',
      color: '#F59E0B'
    },
    {
      id: 'reports',
      icon: '📊',
      title: 'Performance',
      description: 'View your performance reports',
      path: '/employee/reports',
      color: '#8B5CF6'
    },
    {
      id: 'announcements',
      icon: '📢',
      title: 'Announcements',
      description: 'Check company announcements',
      path: '/employee/announcements',
      color: '#EF4444'
    }
  ];

  return (
    <div className="dashboard-wrapper">
      <nav className="dashboard-nav animate-slideInDown">
        <div className="nav-brand">
          <span className="nav-logo">⚡</span>
          <h2>Employee Dashboard</h2>
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

      <main className="dashboard-container">
        <header className="dashboard-header animate-fadeIn stagger-1">
          <h1>Welcome to Your Dashboard</h1>
          <p>Manage your profile and view your information</p>
        </header>

        <section className="dashboard-grid">
          {dashboardCards.map((card, index) => (
            <div 
              key={card.id}
              className={`dashboard-card ${isVisible[card.id] ? 'animate-fadeInUp' : ''}`}
              data-card={card.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-icon-wrapper">
                <div className="card-icon" style={{ background: `linear-gradient(135deg, ${card.color}99, ${card.color})` }}>
                  {card.icon}
                </div>
              </div>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <button 
                  className="card-btn" 
                  onClick={() => handleNavigation(card.path)}
                  aria-label={`Navigate to ${card.title}`}
                  style={{ '--card-color-dark': card.color, '--card-color-light': `${card.color}99` }}
                >
                  <span>View Details</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
