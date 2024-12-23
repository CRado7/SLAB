import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../utils/mutations'; // Adjust the path to where your mutation file is
import CloudinaryUploader from './CloudinaryUploader'; // Adjust the path to your CloudinaryUploader component
import '../styles/RecipeModal.css';

function RecipeModal({ isOpen, onClose, onSubmit }) {
  const [ingredients, setIngredients] = useState(['']);
  const [recipeName, setRecipeName] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [imageUrls, setImageUrls] = useState([]); // State to store uploaded image URLs
  const [addRecipe, { loading, error }] = useMutation(ADD_RECIPE);

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleDeleteIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleUploadComplete = (urls) => {
    setImageUrls(urls); // Update the state with uploaded image URLs
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const recipeTitle = recipeName;
    const ingredientsArray = ingredients.filter(ingredient => ingredient.trim() !== '');
    const instructions = recipeInstructions.trim();

    if (imageUrls.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    try {
      console.log('Submitting recipe data:', { recipeTitle, ingredientsArray, instructions, recipePicture: imageUrls[0], });

      await addRecipe({
        variables: {
          recipeTitle,
          recipeIngredients: ingredientsArray,
          recipeInstructions: instructions,
          recipePicture: imageUrls[0],
        },
      });
      onClose();
      onSubmit(recipeTitle, ingredientsArray, instructions, imageUrls);
    } catch (err) {
      console.error('Error adding recipe:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="recipe-modal" onClick={onClose}>
      <div className="recipe-modal-content" onClick={(e) => e.stopPropagation()}>
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
                  onClick={() => handleDeleteIngredient(index)}
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

          <label>
            Upload Images:
            <CloudinaryUploader
              onUploadComplete={handleUploadComplete}
              uploadPreset="my_unsigned_preset" // Replace with your Cloudinary upload preset
              cloudName="dwp2h5cak"   
              folderPath="SLAB/Recipe Pictures"    // Replace with your Cloudinary cloud name
            />
          </label>

          <button type="submit" disabled={loading}>Post Recipe</button>
        </form>

        {error && <p>Error adding recipe: {error.message}</p>}
      </div>
    </div>
  );
}

export default RecipeModal;
