import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn'); // Remove login status from localStorage
    navigate('/'); // Redirect to the home page (login page)
  }

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" />
      <button className='logout-btn' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
