const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    recipes: [Recipe]!
    savedRecipes: [Recipe]!
  }

  type Recipe {
    _id: ID
    recipeText: String
    recipeAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    recipes(username: String): [Recipe]
    recipe(recipeId: ID!): Recipe
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(recipeText: String!): Recipe
    addComment(recipeId: ID!, commentText: String!): Recipe
    saveRecipe(recipeId: ID!): User
    removeRecipe(recipeId: ID!): Recipe
  }
`;

module.exports = typeDefs;
