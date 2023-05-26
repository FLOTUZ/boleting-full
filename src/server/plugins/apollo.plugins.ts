import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";

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

export const apolloPlugins = plugins;
