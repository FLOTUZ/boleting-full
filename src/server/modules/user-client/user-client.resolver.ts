import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { PrismaError } from "@/server/utils";
import { UserClient } from "@prisma/client";
import {
  validateData,
  CreateUserClientValidator,
  UpdateUserClientValidator,
} from "@/validations";

/*
 * Resolver de UserClient
 */
export const UserClientResolver = {
  Query: {
    userClients: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      const rows = await prisma.userClient.findMany({
        skip: pagination?.skip,
        take: pagination?.take,
        where: { deleted: false },
      });
      return rows;
    },

    user_client: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.userClient.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createUserClient: async (
      _: any,
      { data }: { data: UserClient },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreateUserClientValidator, data });
      try {
        return await prisma.userClient.create({
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    updateUserClient: async (
      _: any,
      { id, data }: { id: number; data: UserClient },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateUserClientValidator, data });
      try {
        return await prisma.userClient.update({
          where: { id },
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    deleteUserClient: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.userClient.update({
        where: { id },
        data: {
          deletedAt: new Date(),
          deleted: true,
        },
      });
    },
  },
};
