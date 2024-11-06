// src/components/RecipeList.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_RECIPES } from '../utils/queries'; // Adjust this path as needed
import RecipeCard from './RecipeCard'; // Import the RecipeCard component

const RecipeList = ({ isLoggedIn }) => {
  const { loading, error, data } = useQuery(GET_RECIPES); // Use Apollo Client to fetch recipes

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p>Error: {error.message}</p>; // Show error state

  return (
    <div className="recipe-list">
      {data.recipes.map(recipe => (
        <RecipeCard key={recipe._id} recipe={recipe} isLoggedIn={isLoggedIn} />
      ))}
    </div>
  );
};

export default RecipeList;
