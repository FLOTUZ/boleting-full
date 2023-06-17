import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { PrismaError } from "@/server/utils";
import { PaymentCard } from "@prisma/client";
import {
  validateData,
  CreatePaymentCardValidator,
  UpdatePaymentCardValidator,
} from "@/validations";

/*
 * Resolver de PaymentCard
 */
export const PaymentCardResolver = {
  Query: {
    paymentCards: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      const rows = await prisma.paymentCard.findMany({
        skip: pagination?.skip,
        take: pagination?.take,
        where: { deleted: false },
      });
      return rows;
    },

    payment_card: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.paymentCard.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createPaymentCard: async (
      _: any,
      { data }: { data: PaymentCard },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreatePaymentCardValidator, data });
      try {
        return await prisma.paymentCard.create({
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    updatePaymentCard: async (
      _: any,
      { id, data }: { id: number; data: PaymentCard },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdatePaymentCardValidator, data });
      try {
        return await prisma.paymentCard.update({
          where: { id },
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    deletePaymentCard: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.paymentCard.update({
        where: { id },
        data: {
          deletedAt: new Date(),
          deleted: true,
        },
      });
    },
  },
};
