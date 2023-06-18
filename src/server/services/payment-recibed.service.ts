import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { PaymentRecibed } from "@prisma/client";

//
// Service for PaymentRecibed model
//
export const PaymentRecibedService = {
  async paymentRecibeds(pagination?: Pagination) {
    return prisma.paymentRecibed.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async paymentRecibed(id: number) {
    return await prisma.paymentRecibed.findUnique({ where: { id } });
  },

  async createPaymentRecibed(data: PaymentRecibed) {
    try {
      return await prisma.paymentRecibed.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updatePaymentRecibed(id: number, data: PaymentRecibed) {
    try {
      return await prisma.paymentRecibed.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deletePaymentRecibed(id: number) {
    return await prisma.paymentRecibed.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================
};
