const db = require('../config/connection');
const { User, Recipe } = require('../models'); // Update the import to use Recipe
const userSeeds = require('./userSeeds.json');
const recipeSeeds = require('./recipeSeeds.json'); // Change the file to recipeSeeds.json
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
      const { _id, recipeAuthor } = await Recipe.create(recipeSeeds[i]); // Use Recipe instead of Thought
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
