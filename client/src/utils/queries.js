import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query users {
    users {
      _id
      username
      email
      recipes {
        _id
        recipeText
        recipeAuthor
        createdAt
      }
      savedRecipes {
        _id
        recipeText
        recipeAuthor
        createdAt
      }
    }
  }
`;

export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      recipes {
        _id
        recipeText
        recipeAuthor
        createdAt
      }
      savedRecipes {
        _id
        recipeText
        recipeAuthor
        createdAt
      }
    }
  }
`;

export const GET_RECIPES = gql`
  query recipes($username: String) {
    recipes(username: $username) {
      _id
      recipePicture
      recipeTitle
      recipeIngredients
      recipeInstructions
      recipeAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const GET_RECIPE = gql`
  query recipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      _id
      recipePicture
      recipeTitle
      recipeIngredients
      recipeInstructions
      recipeAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const GET_SAVED_RECIPES = gql`
  query getSavedRecipes {
    me {
      _id
      savedRecipes {
        _id
        recipePicture
        recipeAuthor
        recipeTitle
        recipeInstructions
        recipeIngredients
        createdAt
      }
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      recipes {
        _id
        recipeTitle
        recipeIngredients
        recipeInstructions
        recipeAuthor
        createdAt
      }
      savedRecipes {
        _id
        recipeTitle
        recipeIngredients
        recipeInstructions
        recipeAuthor
        createdAt
      }
    }
  }
`;
