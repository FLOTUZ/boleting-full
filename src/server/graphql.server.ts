import { ApolloServer } from "@apollo/server";
import { apolloPlugins } from "./plugins";

import { ArgsSchema, ScalarsSchema } from "./common";

import * as schemas from "./modules/schemas";
import * as resolvers from "./modules/resolvers";

export const apolloServer = new ApolloServer({
  typeDefs: [ArgsSchema, ScalarsSchema, ...Object.values(schemas)],
  resolvers: [...Object.values(resolvers)],
  plugins: apolloPlugins,
});
