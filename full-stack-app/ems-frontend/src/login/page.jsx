import React, { useState, useEffect } from "react";
import "./login.css";
import "../animations.css";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  // Auto-hide message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Real-time validation
  const validateField = (name, value) => {
    const errors = { ...formErrors };
    
    switch (name) {
      case 'email':
        if (!value) {
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = 'Email is invalid';
        } else {
          delete errors.email;
        }
        break;
      case 'password':
        if (!value) {
          errors.password = 'Password is required';
        } else if (value.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        } else {
          delete errors.password;
        }
        break;
      default:
        break;
    }
    
    setFormErrors(errors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation check
    if (Object.keys(formErrors).length > 0) {
      setMessage("Please fix the errors before submitting");
      return;
    }
    
    setLoading(true);
    setMessage("");
    
    try {
      const res = await login({ email, password });
      
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      
      setMessage("✓ Login successful! Redirecting...");
      
      // Redirect based on userType from response
      setTimeout(() => {
        if (res.data.userType === "employee") {
          navigate("/employee-dashboard");
        } else {
          navigate("/admin-dashboard");
        }
      }, 1000);
    } catch (err) {
      setMessage(
        "✗ " + (err?.response?.data?.message || "Login failed. Please check your credentials.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <h1 className="system-title animate-fadeInDown">
        <span className="logo-icon">⚡</span> EMPLOYEE MANAGEMENT SYSTEM
      </h1>
      <div className="auth-container animate-fadeInUp">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to your account</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className={`auth-input ${formErrors.email ? 'error' : ''}`}
                required
                value={email}
                onChange={handleInputChange}
                onBlur={(e) => validateField('email', e.target.value)}
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? "email-error" : undefined}
              />
            </div>
            {formErrors.email && (
              <span id="email-error" className="error-message animate-fadeIn">{formErrors.email}</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`auth-input ${formErrors.password ? 'error' : ''}`}
                required
                value={password}
                onChange={handleInputChange}
                onBlur={(e) => validateField('password', e.target.value)}
                aria-invalid={!!formErrors.password}
                aria-describedby={formErrors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {formErrors.password && (
              <span id="password-error" className="error-message animate-fadeIn">{formErrors.password}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="auth-btn hover-lift" 
            disabled={loading || Object.keys(formErrors).length > 0}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                <span>Logging In...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <span className="btn-arrow">→</span>
              </>
            )}
          </button>
        </form>

        {message && (
          <div 
            className={`message-box animate-fadeIn ${message.includes('✓') ? 'success' : 'error'}`}
            role="alert"
          >
            {message}
          </div>
        )}

        <p className="auth-link">
          Don't have an account? <a href="/signup" className="smooth-color">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;