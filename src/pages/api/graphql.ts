import { NextApiRequest, NextApiResponse } from "next";
import { apolloServer } from "@/server/graphql.server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req: NextApiRequest, res: NextApiResponse) => {
    return { req, res };
  },
});
