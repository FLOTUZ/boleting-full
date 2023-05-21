import type { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";

const apolloServer = new ApolloServer({});

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
