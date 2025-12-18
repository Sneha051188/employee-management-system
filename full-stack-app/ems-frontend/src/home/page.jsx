import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import "../animations.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});
  const [scrolled, setScrolled] = useState(false);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-wrapper">
      {/* Navigation Bar */}
      <nav className={`home-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <div className="nav-logo animate-fadeInLeft">
            <h2>
              <span className="logo-icon">⚡</span> EMS
            </h2>
          </div>
          <div className="nav-links animate-fadeInRight">
            <button 
              className="nav-btn login-nav-btn hover-lift" 
              onClick={() => navigate("/login")}
              aria-label="Login to your account"
            >
              Login
            </button>
            <button 
              className="nav-btn signup-nav-btn hover-lift" 
              onClick={() => navigate("/signup")}
              aria-label="Create new account"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title animate-fadeInDown">
            EMPLOYEE MANAGEMENT SYSTEM
          </h1>
          <p className="hero-subtitle animate-fadeInUp stagger-1">
            Streamline your workforce management with our comprehensive platform
          </p>
          <p className="hero-description animate-fadeInUp stagger-2">
            Manage employees, track attendance, process payroll, and boost productivity - all in one place
          </p>
          <div className="hero-buttons animate-fadeInUp stagger-3">
            <button 
              className="hero-btn primary-btn hover-lift" 
              onClick={() => navigate("/signup")}
              aria-label="Get started with EMS"
            >
              <span>Get Started</span>
              <span className="btn-arrow">→</span>
            </button>
            <button 
              className="hero-btn secondary-btn hover-lift" 
              onClick={() => navigate("/login")}
              aria-label="Login to existing account"
            >
              <span>Login</span>
            </button>
          </div>
        </div>
        <div className="scroll-indicator animate-bounce">
          <span>↓</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <h2 className="section-title" data-animate id="features-title">
          Why Choose Our EMS?
        </h2>
        <div className="features-grid">
          {[
            { icon: "👥", title: "Employee Management", desc: "Efficiently manage employee records, profiles, and organizational structure" },
            { icon: "📅", title: "Attendance Tracking", desc: "Monitor and track employee attendance with real-time reporting" },
            { icon: "💰", title: "Payroll Management", desc: "Automate salary processing and generate detailed payroll reports" },
            { icon: "📊", title: "Performance Analytics", desc: "Track employee performance with comprehensive analytics and insights" },
            { icon: "📝", title: "Leave Management", desc: "Streamline leave requests and approvals with automated workflows" },
            { icon: "🔒", title: "Secure & Reliable", desc: "Enterprise-grade security to protect your sensitive employee data" }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`feature-card hover-lift ${isVisible['features-title'] ? `animate-fadeInUp stagger-${index + 1}` : ''}`}
              data-animate
            >
              <div className="feature-icon animate-float">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section" id="benefits">
        <h2 className="section-title" data-animate id="benefits-title">
          Benefits for Your Organization
        </h2>
        <div className="benefits-container">
          {[
            { num: "01", title: "Increase Productivity", desc: "Automate routine HR tasks and focus on strategic initiatives" },
            { num: "02", title: "Reduce Costs", desc: "Minimize administrative overhead and optimize resource allocation" },
            { num: "03", title: "Improve Accuracy", desc: "Eliminate manual errors with automated data management" },
            { num: "04", title: "Better Decision Making", desc: "Access real-time insights and analytics for informed decisions" }
          ].map((benefit, index) => (
            <div 
              key={index}
              className={`benefit-item hover-lift ${isVisible['benefits-title'] ? `animate-fadeInLeft stagger-${index + 1}` : ''}`}
              data-animate
            >
              <div className="benefit-number">{benefit.num}</div>
              <div className="benefit-content">
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content animate-scaleIn">
          <h2>Ready to Transform Your HR Management?</h2>
          <p>Join hundreds of companies already using our Employee Management System</p>
          <div className="hero-buttons">
            <button 
              className="hero-btn primary-btn hover-lift animate-pulse" 
              onClick={() => navigate("/signup")}
              aria-label="Start free trial"
            >
              <span>Start Free Trial</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section footer-about">
            <h3 className="footer-logo"><span className="logo-icon">⚡</span> EMS</h3>
            <p>A modern, intuitive, and powerful solution for managing your most valuable asset—your people.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#benefits">Benefits</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Sign Up</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li><span className="contact-icon">📧</span> <a href="mailto:support@ems.com">support@ems.com</a></li>
              <li><span className="contact-icon">📞</span> <a href="tel:+15551234567">+1 (555) 123-4567</a></li>
            </ul>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="LinkedIn" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Employee Management System. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;