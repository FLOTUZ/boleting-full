import { NextApiRequest, NextApiResponse } from "next";
import { apolloServer, prisma } from "@/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req: NextApiRequest, res: NextApiResponse) => {
    return { id_user: 1, prisma, req, res };
  },
});
