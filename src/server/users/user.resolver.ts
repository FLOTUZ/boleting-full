import { User } from "@prisma/client";
import { Args } from "../common";
import { IGraphqlContext } from "../graphql.context";
import { PrismaError } from "../utils/prisma.errors";

export const UserResolver = {
  Query: {
    users: async (
      _: any,
      { pagination }: Args,
      { id_user, prisma }: IGraphqlContext
    ) => {
      return await prisma.user.findMany({
        ...pagination,
        where: { deleted: false },
      });
    },

    currentUser: async (
      _: any,
      __: User,
      { id_user, prisma }: IGraphqlContext
    ) => {
      if (!id_user) return null;
      return await prisma.user.findUniqueOrThrow({ where: { id: id_user } });
    },
  },

  Mutation: {
    createUser: async (
      _: any,
      { data }: { data: User },
      { prisma }: IGraphqlContext
    ) => {
      try {
        return await prisma.user.create({ data });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },

    updateUser: async (
      _: any,
      { id, data }: { id: number; data: User },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.user.update({ where: { id }, data });
    },

    deleteUser: async (_: any, { id }: User, { prisma }: IGraphqlContext) => {
      return await prisma.user.update({
        where: { id },
        data: { deleted: true },
      });
    },
  },
};
