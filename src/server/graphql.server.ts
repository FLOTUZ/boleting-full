import { ApolloServer } from "@apollo/server";
import { apolloPlugins } from "./plugins";

import { ArgsSchema, ScalarsSchema } from "./common";

import { UserSchema, AuthSchema } from "./modules/schemas";
import { UserResolver, AuthResolver } from "./modules/resolvers";

export const apolloServer = new ApolloServer({
  typeDefs: [ArgsSchema, ScalarsSchema, AuthSchema, UserSchema],
  resolvers: [AuthResolver, UserResolver],
  plugins: apolloPlugins,
});
