import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { PaymentCard } from "@prisma/client";

//
// Service for PaymentCard model
//
export const PaymentCardService = {
  async paymentCards(pagination?: Pagination) {
    return prisma.paymentCard.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async paymentCard(id: number) {
    return await prisma.paymentCard.findUnique({ where: { id } });
  },

  async createPaymentCard(data: PaymentCard) {
    try {
      return await prisma.paymentCard.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updatePaymentCard(id: number, data: PaymentCard) {
    try {
      return await prisma.paymentCard.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deletePaymentCard(id: number) {
    return await prisma.paymentCard.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================
};
