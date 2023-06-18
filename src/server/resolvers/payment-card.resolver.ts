import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { PaymentCard } from "@prisma/client";
import {
  validateData,
  CreatePaymentCardValidator,
  UpdatePaymentCardValidator,
} from "@/validations";
import { PaymentCardService } from "../services";

//
// Resolver for PaymentCard model
//
export const PaymentCardResolver = {
  Query: {
    paymentCards: async (_: any, { pagination }: Args, __: IGraphqlContext) => {
      return await PaymentCardService.paymentCards(pagination);
    },

    paymentCard: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await PaymentCardService.paymentCard(id);
    },
  },

  Mutation: {
    createPaymentCard: async (
      _: any,
      { data }: { data: PaymentCard },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreatePaymentCardValidator, data });
      return await PaymentCardService.createPaymentCard(data);
    },

    updatePaymentCard: async (
      _: any,
      { id, data }: { id: number; data: PaymentCard },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdatePaymentCardValidator, data });
      return PaymentCardService.updatePaymentCard(id, data);
    },

    deletePaymentCard: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await PaymentCardService.deletePaymentCard(id);
    },
  },
};
