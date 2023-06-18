import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { PaymentMethod } from "@prisma/client";

//
// Service for PaymentMehod model
//
export const PaymentMethodService = {
  async paymentMethods(pagination?: Pagination) {
    return prisma.paymentMethod.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async paymentMethod(id: number) {
    return await prisma.paymentMethod.findUnique({ where: { id } });
  },

  async createPaymentMethod(data: PaymentMethod) {
    try {
      return await prisma.paymentMethod.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updatePaymentMethod(id: number, data: PaymentMethod) {
    try {
      return await prisma.paymentMethod.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deletePaymentMethod(id: number) {
    return await prisma.paymentMethod.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================
};
