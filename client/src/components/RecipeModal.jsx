import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../utils/mutations'; // Adjust the path to where your mutation file is

function RecipeModal({ isOpen, onClose, onSubmit }) {
  const [ingredients, setIngredients] = useState(['']); // Initial state with one empty ingredient field
  const [recipeName, setRecipeName] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState(''); // New state for instructions
  const [addRecipe, { loading, error }] = useMutation(ADD_RECIPE); // Set up the mutation

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value; // Update the specific ingredient
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']); // Add an empty string to create a new ingredient field
  };

  const handleDeleteIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index); // Remove the ingredient at the specified index
    setIngredients(newIngredients);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const recipeTitle = recipeName;
    const ingredientsArray = ingredients.filter(ingredient => ingredient.trim() !== ''); // Remove empty ingredients
    const instructions = recipeInstructions.trim(); // Get recipe instructions

    try {
        console.log('Submitting recipe data:', { recipeTitle, ingredientsArray, instructions });

      await addRecipe({
        variables: { recipeTitle, recipeIngredients: ingredientsArray, recipeInstructions: instructions }, // Pass the recipeName, ingredients array, and instructions
      });
      onClose(); // Close the modal after submission
      onSubmit(recipeTitle, ingredientsArray, instructions); // Optionally, call onSubmit if needed
    } catch (err) {
      console.error('Error adding recipe:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add a New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Recipe Name:
            <input
              type="text"
              name="recipeName"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              required
            />
          </label>

          <label>
            Ingredients:
            {ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-input">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e)}
                  placeholder={`Ingredient ${index + 1}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => handleDeleteIngredient(index)} // Delete the ingredient at this index
                  className="delete-ingredient-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </label>
          
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>

          <label>
            Instructions:
            <textarea
              name="recipeInstructions"
              value={recipeInstructions}
              onChange={(e) => setRecipeInstructions(e.target.value)}
              placeholder="Enter the recipe instructions"
              required
            />
          </label>

          <button type="submit" disabled={loading}>Post Recipe</button>
        </form>
        
        {error && <p>Error adding recipe: {error.message}</p>} {/* Display error message if any */}
      </div>
    </div>
  );
}

export default RecipeModal;
