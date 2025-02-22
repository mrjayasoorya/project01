// src/graphql/schema.ts
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String
  }
`;

export const resolvers = {
    Query: {
      hello: () => 'Hello from GraphQL!',
    },
  };