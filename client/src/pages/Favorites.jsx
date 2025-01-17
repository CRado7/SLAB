import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SAVED_RECIPES } from '../utils/queries'; // GraphQL query to fetch saved recipes
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard'; // Import the RecipeCard component
import HOME from "../assets/SLAB-HOME.svg"

const Favorites = () => {
  const { loading, error, data } = useQuery(GET_SAVED_RECIPES); // Fetch saved recipes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="home-container">
      <img src= {HOME} className="slab"></img>
      <h3>Your Favorite Recipes</h3>
      <div className="recipe-list-container">
        {data.me.savedRecipes && data.me.savedRecipes.length > 0 ? (
          data.me.savedRecipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card-container">
              <Link to={`/recipes/${recipe._id}`}>
                <RecipeCard recipe={recipe} />
              </Link>
            </div>
          ))
        ) : (
          <p>No favorite recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
