const { gql } = require('apollo-server-express');

// Define your GraphQL type definitions using SDL (Schema Definition Language)
const typeDefs = gql`
  type Book {
    _id: ID!
    title: String!
    authors: [String]
    description: String
    image: String
  }

  type Query {
    books: [Book]
    book(_id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, authors: [String], description: String, image: String): Book
    deleteBook(_id: ID!): Book
  }
`;

module.exports = { typeDefs };