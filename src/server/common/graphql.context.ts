import { PrismaClient } from "@prisma/client";
import { NextApiResponse, NextApiRequest } from "next";

export interface IGraphqlContext {
  id_user: number | null;
  id_organization: number | null;
  req: NextApiRequest | null;
  res: NextApiResponse | null;
  prisma: PrismaClient;
}
