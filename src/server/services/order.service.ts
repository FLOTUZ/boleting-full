import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { Order } from "@prisma/client";

//
// Service for Order model
//
export const OrderService = {
  async orders(pagination?: Pagination) {
    return prisma.order.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async order(id: number) {
    return await prisma.order.findUnique({ where: { id } });
  },

  async createOrder(data: Order) {
    try {
      return await prisma.order.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateOrder(id: number, data: Order) {
    try {
      return await prisma.order.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteOrder(id: number) {
    return await prisma.order.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================
};
