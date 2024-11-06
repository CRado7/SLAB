const { Schema, model } = require('mongoose');

// Comment schema for nested comments on a recipe
const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    commentAuthor: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Getter to format the date in a readable way
      get: timestamp => new Date(timestamp).toLocaleDateString()
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// Recipe schema
const recipeSchema = new Schema(
  {
    recipeText: {
      type: String,
      required: 'You need to provide a recipe!',
      minlength: 1,
      maxlength: 1000
    },
    recipeAuthor: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Getter to format the date in a readable way
      get: timestamp => new Date(timestamp).toLocaleDateString()
    },
    comments: [commentSchema] // Embedded comments
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
