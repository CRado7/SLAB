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
      recipeText
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
      recipeText
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

export const GET_ME = gql`
  query me {
    me {
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
