import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { PrismaError } from "@/server/utils";
import { PaymentMethod } from "@prisma/client";
import {
  validateData,
  CreatePaymentMethodValidator,
  UpdatePaymentMethodValidator,
} from "@/validations";

/*
 * Resolver de PaymentMethod
 */
export const PaymentMethodResolver = {
  Query: {
    paymentMethods: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      const rows = await prisma.paymentMethod.findMany({
        skip: pagination?.skip,
        take: pagination?.take,
        where: { deleted: false },
      });
      return rows;
    },

    paymentMethod: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.paymentMethod.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createPaymentMethod: async (
      _: any,
      { data }: { data: PaymentMethod },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreatePaymentMethodValidator, data });
      try {
        return await prisma.paymentMethod.create({
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    updatePaymentMethod: async (
      _: any,
      { id, data }: { id: number; data: PaymentMethod },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdatePaymentMethodValidator, data });
      try {
        return await prisma.paymentMethod.update({
          where: { id },
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    deletePaymentMethod: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.paymentMethod.update({
        where: { id },
        data: {
          deletedAt: new Date(),
          deleted: true,
        },
      });
    },
  },
};
