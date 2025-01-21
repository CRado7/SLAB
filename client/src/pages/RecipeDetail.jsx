import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import AuthService from '../utils/auth'; 
import { GET_RECIPE } from '../utils/queries';
import { SAVE_RECIPE, UNSAVE_RECIPE } from '../utils/mutations';
import HOME from "../assets/SLAB-HOME.svg"
import '../styles/RecipeDetail.css';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: { recipeId },
  });

  const [saveRecipe] = useMutation(SAVE_RECIPE, {
    onCompleted: () => {
      setIsSaved(true);
      localStorage.setItem(`savedRecipe_${recipeId}`, 'true');
    },
    onError: (err) => console.error("Error saving recipe:", err),
  });

  const [unsaveRecipe] = useMutation(UNSAVE_RECIPE, {
    onCompleted: () => {
      setIsSaved(false);
      localStorage.removeItem(`savedRecipe_${recipeId}`);
    },
    onError: (err) => console.error("Error unsaving recipe:", err),
  });


  useEffect(() => {
    console.log(window.history.state);
  }, []);

  useEffect(() => {
    if (data && data.recipe) {
      setRecipe(data.recipe);
    }
    const savedStatus = localStorage.getItem(`savedRecipe_${recipeId}`);
    setIsSaved(savedStatus === 'true');
  }, [data, recipeId]);

  const isAuthenticated = AuthService.loggedIn();

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      console.log("User must be logged in to save recipes");
      return;
    }

    if (isSaved) {
      unsaveRecipe({ variables: { recipeId: recipe._id } });
    } else {
      saveRecipe({ variables: { recipeId: recipe._id } });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="home-container">
      <img src= {HOME} className="slab"></img>
 
      <div className="recipe-detail-container">
        {recipe ? (
          <>
            <div className="recipe-detail-image">
              <img src={recipe.recipePicture} alt={recipe.recipeTitle} />
            </div>

            <div className="recipe-detail-page">
              
              <h2>{recipe.recipeTitle}</h2>
              <p><strong>Author:</strong> {recipe.recipeAuthor}</p>
              <p><strong>Created At:</strong> {new Date(recipe.createdAt).toLocaleDateString()}</p>

              <h3>Ingredients:</h3>
              <ul>
                {Array.isArray(recipe.recipeIngredients)
                  ? recipe.recipeIngredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                    ))
                    : recipe.recipeIngredients.split(', ').map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                      ))}
              </ul>

              <h3>Instructions:</h3>
              <p className="instructions">{recipe.recipeInstructions}</p>

              <button
                className={`favorite-button ${isSaved ? 'saved' : ''}`}
                onClick={handleFavoriteClick}
                aria-label={isSaved ? 'Unfavorite' : 'Favorite'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={isSaved ? "red" : "none"}
                  stroke={isSaved ? "red" : "currentColor"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="heart-icon"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
              </button>
            </div>
          </>
        ) : (
          <p>Recipe not found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
