import * as argon from "argon2";
import jwt from "jsonwebtoken";

import { User } from "@prisma/client";
import { IGraphqlContext } from "../../common/graphql.context";
import { AuthenticationError, NotFoundError } from "@/server/utils";
import { LoginSchema, validateData } from "@/validations";

interface ILogin {
  email: string;
  password: string;
}

export const AuthResolver = {
  Mutation: {
    login: async (
      _: any,
      {
        data,
      }: {
        data: ILogin;
      },
      { res, prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: LoginSchema, data });
      const user: User | null = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (!user) throw new NotFoundError("User not found");

      const passwordIsValid = await argon.verify(user.password, data.password);

      if (!passwordIsValid) throw new AuthenticationError("Invalid password");

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          organizationId: user.organizationId,
        },
        process.env.JWT_SECRET as string
      );

      res?.setHeader("Authorization", `Bearer ${token}`);

      return {
        user,
        accessToken: `Bearer ${token}`,
      };
    },
  },
};
