import { NextApiResponse, NextApiRequest } from "next";

export interface IGraphqlContext {
  id_user?: number | null;
  id_organization?: number | null;
  type?: "USER" | "CLIENT" | null;
  req: NextApiRequest | null;
  res: NextApiResponse | null;
}
