import React, { useState } from 'react';
import './AdminLogin.css'; // Updated styles
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminEmail = 'admin@gmail.com'; // Hardcoded admin email
    const adminPassword = 'admin123'; // Hardcoded admin password

    if (
      credentials.email === adminEmail &&
      credentials.password === adminPassword
    ) {
      localStorage.setItem('adminLoggedIn', true); // Set login status
      navigate('/list'); // Redirect to Add page
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Admin Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
