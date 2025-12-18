import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './employee.css';
import '../animations.css';

const Announcements = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  // Demo announcements - in production, fetch from backend
  const announcements = [
    {
      id: 1,
      title: 'Company Holiday - Diwali',
      date: '2025-10-20',
      message: 'The office will be closed for Diwali celebration on October 25-27, 2025.',
      priority: 'high',
      category: 'Holiday'
    },
    {
      id: 2,
      title: 'New Health Insurance Policy',
      date: '2025-10-15',
      message: 'We are pleased to announce enhanced health insurance coverage for all employees starting November 1st.',
      priority: 'medium',
      category: 'Benefits'
    },
    {
      id: 3,
      title: 'Performance Review Cycle',
      date: '2025-10-10',
      message: 'The annual performance review cycle will begin on November 1st. Please ensure your self-assessments are completed by October 31st.',
      priority: 'high',
      category: 'HR'
    },
    {
      id: 4,
      title: 'Team Building Event',
      date: '2025-10-05',
      message: 'Join us for a fun team building event on November 15th at the company retreat center. RSVP by November 1st.',
      priority: 'low',
      category: 'Event'
    },
    {
      id: 5,
      title: 'New Parking Policy',
      date: '2025-09-28',
      message: 'Updated parking guidelines are now in effect. Please review the employee handbook for details.',
      priority: 'medium',
      category: 'Facilities'
    }
  ];

  useEffect(() => {
    filterAnnouncements();
  }, [searchTerm]);

  const filterAnnouncements = () => {
    if (searchTerm.trim()) {
      const filtered = announcements.filter(announcement =>
        announcement.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAnnouncements(filtered);
    } else {
      setFilteredAnnouncements(announcements);
    }
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      'high': '🔴',
      'medium': '🟡',
      'low': '🟢'
    };
    return icons[priority] || '🔵';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Holiday': '🎉',
      'Benefits': '💼',
      'HR': '👥',
      'Event': '🎊',
      'Facilities': '🏢',
      'Training': '📚',
      'Policy': '📋',
      'Other': '📢'
    };
    return icons[category] || '📢';
  };

  const getTimeDifference = (dateString) => {
    const today = new Date();
    const announcementDate = new Date(dateString);
    const diffTime = Math.abs(today - announcementDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const handleMarkAsRead = (id) => {
    showToast('Marked as read!', 'success');
  };

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
          <h1>📢 Company Announcements</h1>
          <p className="header-subtitle">Stay updated with company news and events</p>
        </div>
      </div>

      <div className="content-container animate-fadeIn stagger-1">
        {announcements.length > 0 && (
          <div className="search-filter-section animate-fadeIn stagger-2">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search announcements by title, category, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="results-count">
              {filteredAnnouncements.length} {filteredAnnouncements.length === 1 ? 'announcement' : 'announcements'}
            </div>
          </div>
        )}

        {announcements.length === 0 && (
          <div className="empty-state animate-fadeIn stagger-3">
            <div className="empty-icon">📭</div>
            <h3>No Announcements</h3>
            <p>There are no company announcements at this time.</p>
          </div>
        )}

        {announcements.length > 0 && filteredAnnouncements.length === 0 && (
          <div className="empty-state animate-fadeIn stagger-3">
            <div className="empty-icon">🔍</div>
            <h3>No Announcements Found</h3>
            <p>No announcements match your search criteria. Try different keywords.</p>
          </div>
        )}

        {filteredAnnouncements.length > 0 && (
          <div className="announcements-list animate-fadeIn stagger-3">
            {filteredAnnouncements.map((announcement, index) => (
              <div 
                key={announcement.id} 
                className="announcement-card animate-slideInLeft"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="announcement-sidebar">
                  <div className="priority-indicator">
                    <span className="priority-icon">{getPriorityIcon(announcement.priority)}</span>
                  </div>
                  <div className="category-badge">
                    <span className="category-icon">{getCategoryIcon(announcement.category)}</span>
                    <span className="category-name">{announcement.category}</span>
                  </div>
                </div>
                <div className="announcement-content">
                  <div className="announcement-header">
                    <h3 className="announcement-title">{announcement.title}</h3>
                    <div className="announcement-meta">
                      <span className="announcement-date">
                        <span className="date-icon">📅</span>
                        {new Date(announcement.date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="announcement-time">{getTimeDifference(announcement.date)}</span>
                    </div>
                  </div>
                  <p className="announcement-message">{announcement.message}</p>
                  <div className="announcement-actions">
                    <button 
                      className="mark-read-btn"
                      onClick={() => handleMarkAsRead(announcement.id)}
                    >
                      <span className="btn-icon">✓</span>
                      Mark as Read
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
