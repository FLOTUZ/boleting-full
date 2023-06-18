import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

//
// Service for  model
//
export const AuthService = {
  async login(user: User, data: { email: string; password: string }) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        organizationId: user.organizationId,
      },
      process.env.JWT_SECRET as string
    );
  },
};
