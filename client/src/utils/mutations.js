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
  mutation addRecipe($recipeTitle: String!, $recipeIngredients: [String]!, $recipeInstructions: String!) {
    addRecipe(recipeTitle: $recipeTitle, recipeIngredients: $recipeIngredients, recipeInstructions: $recipeInstructions) {
      _id
      recipeTitle
      recipeIngredients
      recipeInstructions
      recipeAuthor
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($recipeId: ID!, $commentText: String!) {
    addComment(recipeId: $recipeId, commentText: $commentText) {
      _id
      recipeTitle
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
        recipeTitle
        createdAt
      }
    }
  }
`

export const UNSAVE_RECIPE = gql`
  mutation unsaveRecipe($recipeId: ID!) {
    unsaveRecipe(recipeId: $recipeId) {
      _id
      savedRecipes {
        _id
        recipeTitle
        createdAt
      }
    }
  }
`;


export const REMOVE_RECIPE = gql`
  mutation removeRecipe($recipeId: ID!) {
    removeRecipe(recipeId: $recipeId) {
      _id
      recipeTitle
    }
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation requestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password)
  }
`;
