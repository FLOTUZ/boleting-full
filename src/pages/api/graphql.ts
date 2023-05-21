import "reflect-metadata";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";
import {
  Field,
  ID,
  ObjectType,
  Query,
  Resolver,
  buildSchema,
} from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id?: string;

  @Field(() => String)
  name?: string;
}

@Resolver(User)
export class UserResolver {
  constructor() {}
  @Query(() => User)
  async user() {
    return {
      id: "1",
      name: "John Doe",
    };
  }
}

const schema = await buildSchema({
  resolvers: [UserResolver],
});

const apolloServer = new ApolloServer({
  schema,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}
