import { IGraphqlContext } from "@/server/common/graphql.context";
import { PrismaError } from "@/server/utils";
import { Args } from "@/server/common";
import { AccessType } from "@prisma/client";
import {
  CreateAccessTypeSchema,
  UpdateAccessTypeSchema,
  validateData,
} from "@/validations";

export const AccessTypeResolver = {
  Query: {
    accessTypes: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return prisma.accessType.findMany({
        take: pagination?.take || 10,
        skip: pagination?.skip,
        orderBy: {
          id: "asc",
        },
      });
    },

    accessType: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.accessType.findUnique({ where: { id } });
    },
  },

  Mutation: {
    createAccessType: async (
      _: any,
      { data }: { data: AccessType },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreateAccessTypeSchema, data });
      try {
        return await prisma.accessType.create({ data });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },

    updateAccessType: async (
      _: any,

      { id, data }: { id: number; data: AccessType },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateAccessTypeSchema, data });
      try {
        return await prisma.accessType.update({ where: { id }, data });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },

    deleteAccessType: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      try {
        return await prisma.accessType.delete({ where: { id } });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },
  },
};
