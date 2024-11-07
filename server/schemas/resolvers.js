const { AuthenticationError } = require('apollo-server-express');
const { User, Recipe, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('recipes').populate('savedRecipes');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('recipes').populate('savedRecipes');
    },
    recipes: async (parent, { username }) => {
      const params = username ? { recipeAuthor: username } : {};
      return Recipe.find(params).sort({ createdAt: -1 });
    },
    recipe: async (parent, { recipeId }) => {
      return Recipe.findOne({ _id: recipeId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('recipes').populate('savedRecipes');
      }
      throw new AuthenticationError('Not logged in');
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addRecipe: async (parent, { recipeTitle, recipeIngredients, recipeInstructions }, context) => {
      if (context.user) {
        const recipe = await Recipe.create({
          recipeTitle,
          recipeIngredients,
          recipeInstructions,
          recipeAuthor: context.user.username,
        });

        await User.findByIdAndUpdate(
          context.user._id,
          { $push: { recipes: recipe._id } },
          { new: true }
        );

        return recipe;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { recipeId, commentText }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          commentText,
          commentAuthor: context.user.username,
        });

        return Recipe.findByIdAndUpdate(
          recipeId,
          { $push: { comments: comment } },
          { new: true }
        ).populate('comments');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    saveRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        console.log("User ID:", context.user._id);
        console.log("Recipe ID:", recipeId);
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { $addToSet: { savedRecipes: recipeId } },
            { new: true }
          ).populate('savedRecipes');
    
          console.log("Updated user with saved recipes:", updatedUser.savedRecipes);
          return updatedUser;
        } catch (err) {
          console.error("Error during saveRecipe mutation:", err);
          throw new Error("Failed to save recipe");
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    unsaveRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        // Pull the recipeId from the savedRecipes array
        return User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedRecipes: recipeId } }, // Remove recipeId from savedRecipes array
          { new: true }
        ).populate('savedRecipes');
      }
      throw new AuthenticationError('You need to be logged in!');
    },    
    removeRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        const recipe = await Recipe.findById(recipeId);

        if (recipe.recipeAuthor === context.user.username) {
          await Recipe.findByIdAndDelete(recipeId);
          await User.findByIdAndUpdate(
            context.user._id,
            { $pull: { recipes: recipeId, savedRecipes: recipeId } },
            { new: true }
          );

          return recipe;
        }
        throw new AuthenticationError('You can only delete your own recipes');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;
