import "reflect-metadata";
import type { NextApiRequest, NextApiResponse } from "next";

import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import {
  Field,
  ID,
  ObjectType,
  Query,
  Resolver,
  buildSchema,
} from "type-graphql";

@ObjectType()
export class Dog {
  @Field(() => ID)
  name?: string;
}

@Resolver(Dog)
export class DogResolver {
  @Query(() => [Dog])
  async dogs() {
    return [{ name: "test" }, { name: "test2" }];
  }
}

const schema = await buildSchema({
  resolvers: [DogResolver],
});

export const apolloServer = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  introspection: true,
});

export const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
