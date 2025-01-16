import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import Auth from '../utils/auth';
import RecipeModal from './RecipeModal';
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';
import SLAB from '../assets/SLAB-LOGO.svg';

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const username = Auth.loggedIn() ? Auth.getProfile().data.username : null;
  const navigate = useNavigate();

  useEffect(() => {
    const isAnyPopupOpen = isLoginPopupOpen || isSignupPopupOpen || isRecipeModalOpen;
    if (isAnyPopupOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isLoginPopupOpen, isSignupPopupOpen, isRecipeModalOpen]);

  useEffect(() => {
    const isResetPage = window.location.pathname.includes('/reset-password');
    
    if (!Auth.loggedIn() && !isResetPage) {
        console.log("Redirecting to home because not logged in and not on reset page.");
        navigate("/");
    }
}, [navigate]);


  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOpenLoginPopup = () => {
    setIsLoginPopupOpen(true);
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

  const handleOpenSignupPopup = () => {
    setIsSignupPopupOpen(true);
  };

  const handleCloseSignupPopup = () => {
    setIsSignupPopupOpen(false);
  };

  const handleOpenRecipeModal = () => {
    setIsRecipeModalOpen(true);
  };

  const handleCloseRecipeModal = () => {
    setIsRecipeModalOpen(false);
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={SLAB} alt="Logo" className="sidebar-logo" />
        </div>
        <div className="sidebar-menu">
          {Auth.loggedIn() ? (
            <>
              {username && <h1 className="user-name">{username}</h1>}
              <Link to="/" className="menu-item" onClick={() => setIsSidebarOpen(false)}>
                Home
              </Link>
              <button onClick={handleOpenRecipeModal} className="menu-item">
                Add Recipe
              </button>
              <Link to="/favorites" className="menu-item" onClick={() => setIsSidebarOpen(false)}>
                Favorites
              </Link>
              <button onClick={logout} className="menu-item">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={handleOpenLoginPopup} className="menu-item">
                Login
              </button>
              <button onClick={handleOpenSignupPopup} className="menu-item">
                Signup
              </button>
            </>
          )}
        </div>
      </aside>
      <button className="sidebar-toggle" onClick={handleSidebarToggle}>
        {isSidebarOpen ? 'Close' : 'Menu'}
      </button>

      {/* Modals */}
      {isRecipeModalOpen && (
        <RecipeModal isOpen={isRecipeModalOpen} onClose={handleCloseRecipeModal} />
      )}
      {isLoginPopupOpen && (
        <LoginPopup showLogin={isLoginPopupOpen} onClose={handleCloseLoginPopup} />
      )}
      {isSignupPopupOpen && (
        <SignupPopup showSignup={isSignupPopupOpen} onClose={handleCloseSignupPopup} />
      )}
    </>
  );
}

export default Navbar;
