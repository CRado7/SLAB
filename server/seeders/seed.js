const db = require('../config/connection');
const { User, Recipe } = require('../models');
const userSeeds = require('./userSeeds.json');
const recipeSeeds = require('./recipeSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    // Clean previous collections
    await cleanDB('Recipe', 'recipes');
    await cleanDB('User', 'users');

    // Seed User data
    await User.create(userSeeds);

    // Seed Recipe data and update the User with recipe references
    for (let i = 0; i < recipeSeeds.length; i++) {
      const recipe = recipeSeeds[i];

      // Ensure that recipeIngredients is an array (this step may be redundant if your JSON is correctly formatted)
      if (!Array.isArray(recipe.recipeIngredients)) {
        console.error('recipeIngredients is not an array:', recipe.recipeIngredients);
        continue; // Skip this entry if recipeIngredients is not an array
      }

      // Create the recipe and associate with the user
      const { _id, recipeAuthor } = await Recipe.create(recipe);

      const user = await User.findOneAndUpdate(
        { username: recipeAuthor },
        {
          $addToSet: { // Add the new recipe to the user's recipes array
            recipes: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('All done!');
  process.exit(0);
});
