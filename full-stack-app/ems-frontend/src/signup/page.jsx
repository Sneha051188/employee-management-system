import React, { useState, useEffect } from "react";
import "./signup.css";
import "../animations.css";

import { signup } from "../api";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [userType, setUserType] = useState("employee");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Real-time validation
  const validateField = (field, value) => {
    let error = "";
    
    switch(field) {
      case "name":
        if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      case "email":
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "password":
        if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;
      case "confirmPassword":
        if (value !== password) {
          error = "Passwords do not match";
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleInputChange = (field, value) => {
    // Update state
    switch(field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
    
    // Validate field
    const error = validateField(field, value);
    setFormErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submit
    const errors = {
      name: validateField("name", name),
      email: validateField("email", email),
      password: validateField("password", password),
      confirmPassword: validateField("confirmPassword", confirmPassword)
    };
    
    setFormErrors(errors);
    
    // Check if there are any errors
    if (Object.values(errors).some(error => error)) {
      setMessage("✗ Please fix the errors before submitting");
      return;
    }
    
    setLoading(true);
    setMessage("");
    try {
      const res = await signup({
        name,
        email,
        password,
        userType,
      });
      setMessage("✓ Signup successful! Redirecting to login...");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(
        "✗ " + (err?.response?.data?.message || "Signup failed. Please try again.")
      );
    }
    setLoading(false);
  };

  const hasErrors = Object.values(formErrors).some(error => error);

  return (
    <div className="auth-bg">
      <h1 className="system-title animate-fadeIn">
        <span className="logo-icon">⚡</span>
        EMPLOYEE MANAGEMENT SYSTEM
      </h1>
      <div className="auth-container animate-fadeIn stagger-1">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join our platform today</p>

        <div className="user-type-selector animate-fadeIn stagger-2">
          <p className="selector-label">I am a:</p>
          <div className="radio-group">
            <label className={`radio-card ${userType === "employee" ? "active" : ""}`}>
              <input
                type="radio"
                name="userType"
                value="employee"
                checked={userType === "employee"}
                onChange={(e) => setUserType(e.target.value)}
                aria-label="Sign up as employee"
              />
              <span className="radio-icon">👤</span>
              <span className="radio-text">Employee</span>
            </label>
            <label className={`radio-card ${userType === "company" ? "active" : ""}`}>
              <input
                type="radio"
                name="userType"
                value="company"
                checked={userType === "company"}
                onChange={(e) => setUserType(e.target.value)}
                aria-label="Sign up as admin/company"
              />
              <span className="radio-icon">🏢</span>
              <span className="radio-text">Admin</span>
            </label>
          </div>
        </div>

        <form className="auth-form animate-fadeIn stagger-3" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="signup-name" className="input-label">Full Name</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                id="signup-name"
                type="text"
                placeholder="Enter your full name"
                className={`auth-input ${formErrors.name ? "error" : ""}`}
                required
                value={name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                aria-invalid={!!formErrors.name}
                aria-describedby={formErrors.name ? "name-error" : undefined}
              />
            </div>
            {formErrors.name && (
              <span className="error-message" id="name-error" role="alert">
                {formErrors.name}
              </span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="signup-email" className="input-label">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                className={`auth-input ${formErrors.email ? "error" : ""}`}
                required
                value={email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? "email-error" : undefined}
              />
            </div>
            {formErrors.email && (
              <span className="error-message" id="email-error" role="alert">
                {formErrors.email}
              </span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="signup-password" className="input-label">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className={`auth-input ${formErrors.password ? "error" : ""}`}
                required
                value={password}
                onChange={(e) => handleInputChange("password", e.target.value)}
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
              <span className="error-message" id="password-error" role="alert">
                {formErrors.password}
              </span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="signup-confirm-password" className="input-label">Confirm Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className={`auth-input ${formErrors.confirmPassword ? "error" : ""}`}
                required
                value={confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                aria-invalid={!!formErrors.confirmPassword}
                aria-describedby={formErrors.confirmPassword ? "confirm-password-error" : undefined}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {formErrors.confirmPassword && (
              <span className="error-message" id="confirm-password-error" role="alert">
                {formErrors.confirmPassword}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            className="auth-btn" 
            disabled={loading || hasErrors}
            aria-label="Create account"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              <>
                Sign Up
                <span className="btn-arrow">→</span>
              </>
            )}
          </button>
        </form>

        {message && (
          <div 
            className={`message-box ${message.includes("✓") ? "success" : "error"} animate-fadeIn`}
            role="alert"
            aria-live="polite"
          >
            {message}
          </div>
        )}

        <p className="auth-link">
          Already have an account? 
          <a href="/login" className="smooth-color">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
