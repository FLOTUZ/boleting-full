import { User } from "@prisma/client";
import { IGraphqlContext } from "../../common/graphql.context";
import { AuthenticationError, NotFoundError } from "@/server/utils";

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
      { prisma }: IGraphqlContext
    ) => {
      const user: User | null = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (!user) throw new NotFoundError("User not found");

      if (user.password !== data.password)
        throw new AuthenticationError("Invalid password");

      return user;
    },
  },
};
