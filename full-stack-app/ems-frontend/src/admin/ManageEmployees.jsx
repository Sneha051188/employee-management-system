import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.css';
import '../animations.css';

const ManageEmployees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    departmentId: '',
    role: '',
    salary: '',
    dateOfJoining: ''
  });

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/employees');
      setEmployees(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Failed to load employees. Please check if the backend is running.');
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/departments');
      setDepartments(response.data);
    } catch (err) {
      console.error('Error fetching departments:', err);
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (formData.salary && formData.salary < 0) {
      errors.salary = 'Salary cannot be negative';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast('Please fix the form errors', 'error');
      return;
    }
    
    setSubmitting(true);
    try {
      if (editingEmployee) {
        await axios.put(`http://localhost:8081/api/employees/${editingEmployee.id}`, formData);
        showToast('✓ Employee updated successfully!', 'success');
      } else {
        await axios.post('http://localhost:8081/api/employees', formData);
        showToast('✓ Employee added successfully!', 'success');
      }
      setShowForm(false);
      setEditingEmployee(null);
      resetForm();
      fetchEmployees();
    } catch (err) {
      showToast('✗ Failed to save employee: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      departmentId: employee.departmentId || '',
      role: employee.role || '',
      salary: employee.salary || '',
      dateOfJoining: employee.dateOfJoining || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
      try {
        await axios.delete(`http://localhost:8081/api/employees/${id}`);
        showToast('✓ Employee deleted successfully!', 'success');
        fetchEmployees();
      } catch (err) {
        showToast('✗ Failed to delete employee: ' + (err.response?.data?.message || err.message), 'error');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      departmentId: '',
      role: '',
      salary: '',
      dateOfJoining: ''
    });
    setFormErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Filter employees based on search and department
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !filterDepartment || emp.departmentId?.toString() === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading-container animate-fadeIn">
          <div className="spinner-large"></div>
          <p>Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Toast Notification */}
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
          <h1>👥 Manage Employees</h1>
          <p className="header-subtitle">Add, edit, or remove employee records</p>
        </div>
        <button className="primary-btn" onClick={() => {
          setShowForm(!showForm);
          setEditingEmployee(null);
          resetForm();
        }}>
          <span className="btn-icon">{showForm ? '✕' : '+'}</span>
          {showForm ? 'Cancel' : 'Add Employee'}
        </button>
      </div>

      <div className="content-container animate-fadeIn stagger-1">
        {error && (
          <div className="error-banner animate-shake">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {/* Search and Filter Section */}
        {!showForm && employees.length > 0 && (
          <div className="filter-section animate-fadeIn stagger-2">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-box">
              <label htmlFor="dept-filter">Department:</label>
              <select
                id="dept-filter"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="filter-select"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
            <div className="results-count">
              Showing <strong>{filteredEmployees.length}</strong> of <strong>{employees.length}</strong> employees
            </div>
          </div>
        )}

        {showForm && (
          <div className="form-container animate-slideInDown">
            <h3 className="form-title">
              <span className="form-icon">{editingEmployee ? '✏️' : '➕'}</span>
              {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            </h3>
            <form onSubmit={handleSubmit} className="employee-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={formErrors.firstName ? 'error' : ''}
                    required
                  />
                  {formErrors.firstName && (
                    <span className="field-error">{formErrors.firstName}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={formErrors.lastName ? 'error' : ''}
                    required
                  />
                  {formErrors.lastName && (
                    <span className="field-error">{formErrors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={formErrors.email ? 'error' : ''}
                    required
                  />
                  {formErrors.email && (
                    <span className="field-error">{formErrors.email}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="departmentId">Department</label>
                  <select 
                    id="departmentId"
                    name="departmentId" 
                    value={formData.departmentId} 
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <input
                    id="role"
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="salary">Salary</label>
                  <input
                    id="salary"
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className={formErrors.salary ? 'error' : ''}
                    placeholder="0.00"
                  />
                  {formErrors.salary && (
                    <span className="field-error">{formErrors.salary}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="dateOfJoining">Date of Joining</label>
                <input
                  id="dateOfJoining"
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleChange}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="spinner-small"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">💾</span>
                      {editingEmployee ? 'Update Employee' : 'Add Employee'}
                    </>
                  )}
                </button>
                <button type="button" className="cancel-btn" onClick={() => {
                  setShowForm(false);
                  setEditingEmployee(null);
                  resetForm();
                }}>
                  <span className="btn-icon">✕</span>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {employees.length === 0 ? (
          <div className="empty-state animate-fadeIn">
            <div className="empty-icon">📭</div>
            <h3>No employees found</h3>
            <p>Add your first employee to get started!</p>
            <button className="primary-btn" onClick={() => {
              setShowForm(true);
              setEditingEmployee(null);
              resetForm();
            }}>
              <span className="btn-icon">+</span>
              Add First Employee
            </button>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="empty-state animate-fadeIn">
            <div className="empty-icon">🔍</div>
            <h3>No matching employees</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button className="secondary-btn" onClick={() => {
              setSearchTerm('');
              setFilterDepartment('');
            }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="table-container animate-fadeIn stagger-3">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee, index) => (
                  <tr key={employee.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.05}s` }}>
                    <td><span className="badge-id">#{employee.id}</span></td>
                    <td className="employee-name">
                      <div className="name-avatar">{employee.firstName[0]}{employee.lastName[0]}</div>
                      <span>{employee.firstName} {employee.lastName}</span>
                    </td>
                    <td className="employee-email">{employee.email}</td>
                    <td>
                      {employee.departmentName ? (
                        <span className="badge-department">{employee.departmentName}</span>
                      ) : (
                        <span className="badge-na">N/A</span>
                      )}
                    </td>
                    <td>{employee.role || <span className="text-muted">N/A</span>}</td>
                    <td className="employee-salary">
                      {employee.salary ? `₹${employee.salary.toFixed(2)}` : <span className="text-muted">N/A</span>}
                    </td>
                    <td className="actions">
                      <button 
                        className="edit-btn" 
                        onClick={() => handleEdit(employee)}
                        title="Edit employee"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDelete(employee.id)}
                        title="Delete employee"
                      >
                        🗑️ Delete
                      </button>
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

export default ManageEmployees;
