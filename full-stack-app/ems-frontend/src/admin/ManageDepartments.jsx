import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.css';
import '../animations.css';

const ManageDepartments = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    head: ''
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ show: false, message: '', type: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/departments');
      setDepartments(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load departments.');
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Department name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast('Please fix the form errors', 'error');
      return;
    }
    
    setSubmitting(true);
    try {
      if (editingDept) {
        await axios.put(`http://localhost:8081/api/departments/${editingDept.id}`, formData);
        showToast('✓ Department updated successfully!', 'success');
      } else {
        await axios.post('http://localhost:8081/api/departments', formData);
        showToast('✓ Department added successfully!', 'success');
      }
      setShowForm(false);
      setEditingDept(null);
      setFormData({ name: '', description: '', head: '' });
      setFormErrors({});
      fetchDepartments();
    } catch (err) {
      showToast('✗ Error: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (dept) => {
    setEditingDept(dept);
    setFormData({ name: dept.name, description: dept.description || '', head: dept.head || '' });
    setFormErrors({});
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department? This action cannot be undone.')) {
      try {
        await axios.delete(`http://localhost:8081/api/departments/${id}`);
        showToast('✓ Department deleted successfully!', 'success');
        fetchDepartments();
      } catch (err) {
        showToast('✗ Error deleting: ' + (err.response?.data?.message || err.message), 'error');
      }
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: '' });
    }
  };

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dept.description && dept.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (dept.head && dept.head.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading-container animate-fadeIn">
          <div className="spinner-large"></div>
          <p>Loading departments...</p>
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
          <h1>🏢 Manage Departments</h1>
          <p className="header-subtitle">Organize and manage company departments</p>
        </div>
        <button className="primary-btn" onClick={() => {
          setShowForm(!showForm);
          setEditingDept(null);
          setFormData({ name: '', description: '', head: '' });
          setFormErrors({});
        }}>
          <span className="btn-icon">{showForm ? '✕' : '+'}</span>
          {showForm ? 'Cancel' : 'Add Department'}
        </button>
      </div>

      <div className="content-container animate-fadeIn stagger-1">
        {error && (
          <div className="error-banner animate-shake">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {!showForm && departments.length > 0 && (
          <div className="filter-section animate-fadeIn stagger-2">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="results-count">
              Showing <strong>{filteredDepartments.length}</strong> of <strong>{departments.length}</strong> departments
            </div>
          </div>
        )}

        {showForm && (
          <div className="form-container animate-scaleIn stagger-3">
            <h2 className="form-title">
              <span className="form-icon">{editingDept ? '✏️' : '➕'}</span>
              {editingDept ? 'Edit Department' : 'Add New Department'}
            </h2>
            
            <div className="input-group">
              <label htmlFor="dept-name">
                Department Name <span className="required">*</span>
              </label>
              <input
                id="dept-name"
                type="text"
                placeholder="e.g., Human Resources"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={formErrors.name ? 'error' : ''}
                disabled={submitting}
              />
              {formErrors.name && <span className="field-error">{formErrors.name}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="dept-description">Description</label>
              <textarea
                id="dept-description"
                placeholder="Brief description of the department..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                disabled={submitting}
                rows="3"
              />
            </div>

            <div className="input-group">
              <label htmlFor="dept-head">Department Head</label>
              <input
                id="dept-head"
                type="text"
                placeholder="Name of department head"
                value={formData.head}
                onChange={(e) => handleChange('head', e.target.value)}
                disabled={submitting}
              />
            </div>

            <div className="button-group">
              <button 
                className="submit-btn" 
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <><span className="spinner-small"></span> {editingDept ? 'Updating...' : 'Creating...'}</>
                ) : (
                  <><span className="btn-icon">💾</span> {editingDept ? 'Update Department' : 'Create Department'}</>
                )}
              </button>
              <button 
                className="cancel-btn" 
                onClick={() => {
                  setShowForm(false);
                  setEditingDept(null);
                  setFormData({ name: '', description: '', head: '' });
                  setFormErrors({});
                }}
                disabled={submitting}
              >
                <span className="btn-icon">✕</span> Cancel
              </button>
            </div>
          </div>
        )}

        {!showForm && filteredDepartments.length === 0 && departments.length === 0 && (
          <div className="empty-state animate-fadeIn stagger-4">
            <div className="empty-icon">📭</div>
            <h3>No Departments Yet</h3>
            <p>Start by adding your first department to organize your company structure.</p>
            <button className="primary-btn" onClick={() => {
              setShowForm(true);
              setFormErrors({});
            }}>
              <span className="btn-icon">+</span> Add First Department
            </button>
          </div>
        )}

        {!showForm && filteredDepartments.length === 0 && departments.length > 0 && (
          <div className="empty-state animate-fadeIn stagger-4">
            <div className="empty-icon">🔍</div>
            <h3>No Matching Departments</h3>
            <p>Try adjusting your search terms.</p>
            <button className="primary-btn" onClick={() => setSearchTerm('')}>
              Clear Search
            </button>
          </div>
        )}

        {!showForm && filteredDepartments.length > 0 && (
          <div className="departments-grid animate-fadeIn stagger-4">
            {filteredDepartments.map((dept, index) => (
              <div 
                key={dept.id} 
                className="department-card animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-header">
                  <div className="dept-icon">🏢</div>
                  <h3 className="dept-name">{dept.name}</h3>
                </div>
                
                <div className="card-body">
                  {dept.description && (
                    <p className="dept-description">{dept.description}</p>
                  )}
                  
                  <div className="dept-info">
                    <span className="info-label">👤 Department Head:</span>
                    <span className="info-value">{dept.head || 'Not assigned'}</span>
                  </div>
                </div>
                
                <div className="card-actions">
                  <button 
                    className="edit-btn" 
                    onClick={() => handleEdit(dept)}
                    title="Edit department"
                  >
                    <span className="btn-icon">✏️</span> Edit
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(dept.id)}
                    title="Delete department"
                  >
                    <span className="btn-icon">🗑️</span> Delete
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

export default ManageDepartments;
