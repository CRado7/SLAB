import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Auth from '../utils/auth';

function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const username = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        {username && <span className="user-name">{username}</span>}
      </div>

      {/* Center Logo */}
      <div className="navbar-logo">
        <Link to="/SLAB"><img src="/path/to/logo.png" alt="Logo" /></Link>
      </div>

      {/* Right Section (Login/Signup or Logout/Favorites) */}
      <div className={`navbar-right ${dropdownOpen ? 'dropdown-open' : ''}`}>
        {Auth.loggedIn() ? (
          <>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="menu-button">☰</button>
            <div className="navbar-dropdown">
              <Link to="favorites" className="favorites-btn">Favorites</Link>
              <button onClick={logout} className="logout-btn">Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="login" className="login-btn">Login</Link>
            <Link to="signup" className="signup-btn">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
