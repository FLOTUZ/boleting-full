import { AuthenticationError } from "@/server/utils";
import { User, UserClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export const jwtVerifier = (token: string) => {
  try {
    const res = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      email: string;
      type: "USER" | "CLIENT";
      organizationId?: number;
    };

    return res;
  } catch (error) {
    throw new AuthenticationError("Invalid token");
  }
};
