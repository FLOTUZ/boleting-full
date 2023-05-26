import { ApolloServer } from "@apollo/server";
import { apolloPlugins } from "./plugins";
import { gql } from "graphql-tag";

const resolvers = {
  Query: {
    hello: () => {
      return "Hello world!";
    },
  },
};

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

export const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: apolloPlugins,
});
