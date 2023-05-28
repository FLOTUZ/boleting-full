import { IGraphqlContext } from "@/server/common/graphql.context";
import { PrismaError } from "@/server/utils";
import { Args } from "@/server/common";
import { Role } from "@prisma/client";

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
      try {
        return await prisma.role.create({ data });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },
  },
};
