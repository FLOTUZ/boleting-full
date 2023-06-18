import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { BuyCart } from "@prisma/client";

//
// Service for BuyCart model
//
export const BuyCartService = {
  async buyCarts(pagination?: Pagination) {
    return prisma.buyCart.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async buyCart(id: number) {
    return await prisma.buyCart.findUnique({ where: { id } });
  },

  async createBuyCart(data: BuyCart) {
    try {
      return await prisma.buyCart.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateBuyCart(id: number, data: BuyCart) {
    try {
      return await prisma.buyCart.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteBuyCart(id: number) {
    return await prisma.buyCart.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================
};
