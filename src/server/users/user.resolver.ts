import { User } from "@prisma/client";
import { Args } from "../common";
import { IGraphqlContext } from "../graphql.context";

export const UserResolver = {
  Query: {
    users: async (
      _: any,
      { pagination }: Args,
      { id_user, prisma }: IGraphqlContext
    ) => {
      return await prisma.user.findMany({
        where: { deleted: false },
        ...pagination,
      });
    },
    currentUser: async (_: any, __: User, { id_user, db }: any) => {},
  },

  Mutation: {
    createUser: async (_: any, { data }: { data: User }) => {},
    updateUser: async (_: any, { id, data }: { id: number; data: User }) => {},
    deleteUser: async (_: any, { id }: User) => {},
  },
};
