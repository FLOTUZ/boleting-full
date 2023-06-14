import { IGraphqlContext } from "@/server/common/graphql.context";
import { PrismaError } from "@/server/utils";
import { Args } from "@/server/common";
import { OwnerType } from "@prisma/client";
import {
  CreateOwnerTypeSchema,
  UpdateOwnerTypeSchema,
  validateData,
} from "@/validations";

export const OwnerTypeResolver = {
  Query: {
    ownerTypes: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return prisma.ownerType.findMany({
        take: pagination?.take || 10,
        skip: pagination?.skip,
        orderBy: {
          id: "asc",
        },
      });
    },

    ownerType: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.ownerType.findUnique({ where: { id } });
    },
  },

  Mutation: {
    createOwnerType: async (
      _: any,
      { data }: { data: OwnerType },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreateOwnerTypeSchema, data });
      try {
        return await prisma.ownerType.create({ data });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },

    updateOwnerType: async (
      _: any,

      { id, data }: { id: number; data: OwnerType },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateOwnerTypeSchema, data });
      try {
        return await prisma.ownerType.update({ where: { id }, data });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },

    deleteOwnerType: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      try {
        return await prisma.ownerType.delete({ where: { id } });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },
  },
};
