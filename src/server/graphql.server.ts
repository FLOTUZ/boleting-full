import { ApolloServer } from "@apollo/server";
import { apolloPlugins } from "./plugins";
import { UserSchema } from "./users/user.schema";
import { ScalarsSchema } from "./common/scalars";
import { ArgsSchema } from "./common";
import { UserResolver } from "./users/user.resolver";

export const apolloServer = new ApolloServer({
  typeDefs: [ScalarsSchema, ArgsSchema, UserSchema],
  resolvers: [UserResolver],
  plugins: apolloPlugins,
});
