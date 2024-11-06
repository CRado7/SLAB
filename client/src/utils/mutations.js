import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation addRecipe($recipeTitle: String!, $recipeIngredients: [String]!) {
    addRecipe(recipeTitle: $recipeTitle, recipeIngredients: $recipeIngredients) {
      _id
      recipeTitle
      recipeIngredients
      recipeAuthor
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($recipeId: ID!, $commentText: String!) {
    addComment(recipeId: $recipeId, commentText: $commentText) {
      _id
      recipeText
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const SAVE_RECIPE = gql`
  mutation saveRecipe($recipeId: ID!) {
    saveRecipe(recipeId: $recipeId) {
      _id
      savedRecipes {
        _id
        recipeText
        createdAt
      }
    }
  }
`;

export const REMOVE_RECIPE = gql`
  mutation removeRecipe($recipeId: ID!) {
    removeRecipe(recipeId: $recipeId) {
      _id
      recipeText
    }
  }
`;
