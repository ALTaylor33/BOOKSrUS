const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const express = require('express');
const jwt = require('jsonwebtoken');

// Import your GraphQL type definitions and resolvers
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

// Create a function to get the user from the token
function getUser(token) {
  try {
    if (token) {
      return jwt.verify(token, secret);
    }
    return null;
  } catch (err) {
    throw new AuthenticationError('Invalid or expired token');
  }
}

// Create the Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Get the token from the request headers
    const token = req.headers.authorization || '';

    // Get the user from the token
    const user = getUser(token);

    // Add the user object to the context so it's accessible in resolvers
    return { user };
  },
});

// Create an Express app
const app = express();

// Apply the Apollo Server middleware to the Express app
server.applyMiddleware({ app });

module.exports = app;