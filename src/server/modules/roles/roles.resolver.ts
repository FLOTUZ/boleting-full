import { IGraphqlContext } from "@/server/common/graphql.context";
import { PrismaError } from "@/server/utils";
import { Args } from "@/server/common";
import { Role } from "@prisma/client";
import {
  CreateRoleSchema,
  UpdateRoleSchema,
  validateData,
} from "@/validations";

export const RolesResolver = {
  Query: {
    roles: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return prisma.role.findMany({
        take: pagination?.take || 10,
        skip: pagination?.skip,
        orderBy: {
          id: "asc",
        },
      });
    },
  },
  Mutation: {
    createRole: async (
      _: any,
      { data }: { data: Role },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreateRoleSchema, data });
      try {
        return await prisma.role.create({ data });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },

    updateRole: async (
      _: any,
      { id, data }: { id: number; data: Role },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateRoleSchema, data });
      try {
        return await prisma.role.update({ where: { id }, data });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },
  },
};
