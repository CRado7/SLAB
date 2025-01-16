import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import SLAB from "../assets/SLAB-LOGO.svg";
import "../styles/HomePage.css";
import LoginPopup from "../components/LoginPopup";
import SignupPopup from "../components/SignupPopup";

function HomePage() {

  return (
    <div className="home-container">
      <div className="landing-page">
        <img src={SLAB} alt="SLAB" className="home-logo" />
      </div>

      {/* Recipe List visible to all users */}
      <h1>All Recipes</h1>
      <div className="recipe-list-container">
        <RecipeList />
      </div>
    </div>
  );
}

export default HomePage;
