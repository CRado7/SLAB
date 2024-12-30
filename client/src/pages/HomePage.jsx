import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import SLAB from "../assets/SLAB-LOGO.svg";
import "../styles/HomePage.css";
import Auth from "../utils/auth";
import LoginPopup from "../components/LoginPopup";
import SignupPopup from "../components/SignupPopup";

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isHomePopupOpen, setIsHomePopupOpen] = useState(false);

  useEffect(() => {
    // Check login status on component mount
    setIsLoggedIn(Auth.loggedIn());
  }, []);

  const closePopup = () => {
    setIsHomePopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsSignupPopupOpen(false);
  };

  const openSignupPopup = () => {
    setIsSignupPopupOpen(true);
    setIsLoginPopupOpen(false);
    setIsHomePopupOpen(false);
  };

  const openLoginPopup = () => {
    setIsLoginPopupOpen(true);
    setIsSignupPopupOpen(false);
    setIsHomePopupOpen(false);
  };

  return (
    <div className="home-container">
      <div className="landing-page">
        <img src={SLAB} alt="SLAB" className="home-logo" />
        {/* Show button only if the user is not logged in */}
        {!isLoggedIn && (
          <button
            onClick={() => setIsHomePopupOpen(true)}
          >
            View Recipes
          </button>
        )}
      </div>

      {/* Show RecipeList automatically if the user is logged in */}
      <h1>All Recipes</h1>
      {isLoggedIn && (
        <div className="recipe-list-container">
          <RecipeList />
        </div>
      )}

      {/* Popup for unauthorized access */}
      {isHomePopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <p>
              Please{" "}
              <span
                onClick={openLoginPopup}
                style={{ color: "blue", cursor: "pointer" }}
              >
                login
              </span>{" "}
              or{" "}
              <span
                onClick={openSignupPopup}
                style={{ color: "blue", cursor: "pointer" }}
              >
                signup
              </span>{" "}
              to view recipes.
            </p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Render Login or Signup Popup based on state */}
      {isLoginPopupOpen && (
        <LoginPopup showLogin={isLoginPopupOpen} onClose={closePopup} />
      )}
      {isSignupPopupOpen && (
        <SignupPopup showSignup={isSignupPopupOpen} onClose={closePopup} />
      )}
    </div>
  );
}

export default HomePage;
