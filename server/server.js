const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Initialize Apollo Server and apply it as middleware
const startApolloServer = async () => {
  await server.start();

  app.use(
    cors({
      origin: 'http://localhost:3000', // Replace with your frontend's origin
      credentials: true, // Allow cookies to be sent
    })
  );

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Middleware to handle GraphQL requests
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  // Serve the frontend files from the 'dist' directory
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Connect to the database and start the Express server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
