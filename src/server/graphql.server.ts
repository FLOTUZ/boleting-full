import { ApolloServer } from "@apollo/server";
import { apolloPlugins } from "./plugins";

import { ArgsSchema, ScalarsSchema } from "./common";

import { UserSchema } from "./modules/schemas";
import { UserResolver } from "./modules/resolvers";

export const apolloServer = new ApolloServer({
  typeDefs: [ScalarsSchema, ArgsSchema, UserSchema],
  resolvers: [UserResolver],
  plugins: apolloPlugins,
});
