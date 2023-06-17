import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { PrismaError } from "@/server/utils";
import { PaymentRecibed } from "@prisma/client";
import {
  validateData,
  CreatePaymentRecibedValidator,
  UpdatePaymentRecibedValidator,
} from "@/validations";

/*
 * Resolver de PaymentRecibed
 */
export const PaymentRecibedResolver = {
  Query: {
    paymentRecibeds: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      const rows = await prisma.paymentRecibed.findMany({
        skip: pagination?.skip,
        take: pagination?.take,
        where: { deleted: false },
      });
      return rows;
    },

    payment_recibed: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.paymentRecibed.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createPaymentRecibed: async (
      _: any,
      { data }: { data: PaymentRecibed },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreatePaymentRecibedValidator, data });
      try {
        return await prisma.paymentRecibed.create({
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    updatePaymentRecibed: async (
      _: any,
      { id, data }: { id: number; data: PaymentRecibed },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdatePaymentRecibedValidator, data });
      try {
        return await prisma.paymentRecibed.update({
          where: { id },
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    deletePaymentRecibed: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.paymentRecibed.update({
        where: { id },
        data: {
          deletedAt: new Date(),
          deleted: true,
        },
      });
    },
  },
};
