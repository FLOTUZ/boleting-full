import "reflect-metadata";
import { apolloServer } from "@/server/graphql.server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res }),
});
