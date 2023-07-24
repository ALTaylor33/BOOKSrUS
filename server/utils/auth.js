const jwt = require('jsonwebtoken');
const { ApolloError } = require('apollo-server-express'); // Import ApolloError for handling GraphQL errors

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) { // Update the function signature to take the `context` object
    // allows token to be sent via headers
    let token = req.headers.authorization || ''; // No need to check for token in query for GraphQL

    if (!token || !token.startsWith('Bearer ')) {
      throw new ApolloError('Authentication token must be provided in the format: "Bearer <token>"', 'UNAUTHORIZED');
    }

    token = token.split(' ')[1]; // Extract the token part after 'Bearer'

    if (!token) {
      throw new ApolloError('You have no token!', 'UNAUTHORIZED');
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; // Attach the user data to the `req` object
    } catch {
      throw new ApolloError('Invalid token!', 'UNAUTHORIZED');
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
