import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  // Toggle body overflow when modal state changes
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to reset scroll on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalOpen]);

  const handleCardClick = () => {
    if (!Auth.loggedIn()) {
      setModalOpen(true); // Show login prompt if not logged in
    } else {
      navigate(`/recipes/${recipe._id}`); // Navigate to recipe detail page if logged in
    }
  };

  const handleCloseModal = (event) => {
    event.stopPropagation(); // Prevent click from bubbling up to the card
    setModalOpen(false); // Close modal
  };

  return (
    <div className="recipe-card" onClick={handleCardClick}>
      <h3>{recipe.recipeTitle}</h3>
      <p>Author: {recipe.recipeAuthor}</p>
      <p>Created At: {new Date(recipe.createdAt).toLocaleDateString()}</p>

      {/* Modal for not logged in */}
      {modalOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <p>You need to be logged in to check these tasty bites out!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
