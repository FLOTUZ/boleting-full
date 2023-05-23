import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";

import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { DogResolver } from "./dogs/dog.resolver";

let plugins = [];
if (process.env.NODE_ENV === "production") {
  plugins = [
    ApolloServerPluginLandingPageProductionDefault({
      embed: true,
      graphRef: "myGraph@prod",
    }),
  ];
} else {
  plugins = [ApolloServerPluginLandingPageLocalDefault({ embed: true })];
}

const schema = await buildSchema({
  resolvers: [DogResolver],
});

export const apolloServer = new ApolloServer({ schema, plugins });
