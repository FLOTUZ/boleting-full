import { NextApiRequest, NextApiResponse } from "next";
import { apolloServer } from "@/server";

import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { jwtVerifier } from "@/utils/jwt-verifier.util";

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req: NextApiRequest, res: NextApiResponse) => {
    req.headers.authorization == null;
    const token = req.headers.authorization?.split(" ")[1];

    const user = token ? jwtVerifier(token) : null;

    if (user == null)
      return { id_user: null, id_organization: null, type: null, req, res };

    return {
      id_user: user!.id,
      type: user!.type,
      id_organization: user!.organizationId ?? null,
      req,
      res,
    };
  },
});
