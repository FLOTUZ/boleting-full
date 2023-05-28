import { NextApiRequest, NextApiResponse } from "next";
import { apolloServer, prisma } from "@/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { AuthenticationError } from "@/server/utils";

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1];
    const user = token ? getUser(token) : null;

    if (!user) return { id_user: null, prisma, req, res };

    return { id_user: user.id, prisma, req, res };
  },
});

const getUser = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as User;
  } catch (error) {
    throw new AuthenticationError("Invalid token");
  }
};
