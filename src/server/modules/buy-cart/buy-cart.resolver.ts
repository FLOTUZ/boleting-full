import { IGraphqlContext } from "@/server/common/graphql.context";
import { PrismaError } from "@/server/utils";
import { Args } from "@/server/common";
import { BuyCart } from "@prisma/client";
import {
  CreateBuyCartSchema,
  UpdateBuyCartSchema,
  validateData,
} from "@/validations";

export const BuyCartResolver = {
  Query: {
    buyCarts: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return prisma.buyCart.findMany({
        take: pagination?.take || 10,
        skip: pagination?.skip,
        orderBy: {
          id: "asc",
        },
      });
    },

    buyCart: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.buyCart.findUnique({ where: { id } });
    },
  },

  Mutation: {
    createBuyCart: async (
      _: any,
      { data }: { data: BuyCart },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreateBuyCartSchema, data });
      try {
        return await prisma.buyCart.create({ data });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },

    updateBuyCart: async (
      _: any,

      { id, data }: { id: number; data: BuyCart },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateBuyCartSchema, data });
      try {
        return await prisma.buyCart.update({ where: { id }, data });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },

    deleteBuyCart: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      try {
        return await prisma.buyCart.delete({ where: { id } });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },
  },
};
