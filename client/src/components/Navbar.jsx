// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Auth from '../utils/auth';
import RecipeModal from './RecipeModal'; // Import the RecipeModal component

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const handleAddPostClick = () => {
    setIsModalOpen(true); // Open the add post modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleSubmitRecipe = (recipeName, ingredients) => {
    // Handle the form submission (sending data to the server, etc.)
    console.log("Recipe Posted:", recipeName, ingredients);
    // You can add logic to save the recipe or perform further actions
  };

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

      {/* Right Section (Add Post, Login/Signup or Logout/Favorites) */}
      <div className={`navbar-right ${dropdownOpen ? 'dropdown-open' : ''}`}>
        {Auth.loggedIn() ? (
          <>
            <button onClick={handleAddPostClick} className="add-post-btn">Add a Post</button>
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

      {/* Modal for Add Post Form */}
      <RecipeModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSubmit={handleSubmitRecipe} 
      />
    </nav>
  );
}

export default Navbar;

