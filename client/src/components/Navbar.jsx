import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import Auth from '../utils/auth';
import RecipeModal from './RecipeModal'; // Import the RecipeModal component

import SLAB from '../assets/SLAB-LOGO.svg';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const username = Auth.loggedIn() ? Auth.getProfile().data.username : null;
  const navigate = useNavigate();

  // Redirect to homepage if not logged in
  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate("/");
    }
  }, []);

  // Handle scrolling for showing/hiding navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > prevScrollY && !hidden) {
        setHidden(true);
      } else if (window.scrollY < prevScrollY && hidden) {
        setHidden(false);
      }
      setPrevScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY, hidden]);

  // Detect window resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
      if (window.innerWidth > 1000) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Disable scrolling when the modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Revert to normal scrolling
    }
  
    return () => {
      document.body.style.overflow = ''; // Ensure cleanup on unmount
    };
  }, [isModalOpen]);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    setDropdownOpen(false);
  };

  const handleAddPostClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSubmitRecipe = (recipeName, ingredients) => {
    console.log("Recipe Posted:", recipeName, ingredients);
  };

  return (
    <nav className={`navbar ${hidden ? 'navbar-hidden' : ''}`}>
      <div className="navbar-left">
        {username && <span className="user-name">{username}</span>}
      </div>

      <div className="navbar-logo">
        <Link to="/"><img src={SLAB} alt="Logo" /></Link>
      </div>

      <div className={`navbar-right ${dropdownOpen ? 'dropdown-open' : ''}`}>
        {Auth.loggedIn() ? (
          <>
            {isMobile && (
              <button onClick={toggleDropdown} className="menu-button">☰</button>
            )}
            <div className="navbar-dropdown">
              <button onClick={handleAddPostClick} className="add-post-btn">Add Post</button>
              <Link to="/favorites" className="favorites-btn" onClick={() => setDropdownOpen(false)}>
                Favorites
              </Link>
              <button onClick={logout} className="logout-btn">Logout</button>
            </div>
          </>
        ) : (
          <>
            {isMobile && (
              <button onClick={toggleDropdown} className="menu-button">☰</button>
            )}
            <div className="navbar-dropdown">
              <Link to="/login" className="login-btn" onClick={() => setDropdownOpen(false)}>Login</Link>
              <Link to="/signup" className="signup-btn" onClick={() => setDropdownOpen(false)}>Signup</Link>
            </div>
          </>
        )}
      </div>

      <RecipeModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSubmit={handleSubmitRecipe} 
      />
    </nav>
  );
}

export default Navbar;
