import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { PaymentMethod } from "@prisma/client";
import {
  validateData,
  CreatePaymentMethodValidator,
  UpdatePaymentMethodValidator,
} from "@/validations";
import { PaymentMethodService } from "../services";

//
// Resolver for PatmentMethod model
//
export const PaymentMethodResolver = {
  Query: {
    paymentMethods: async (
      _: any,
      { pagination }: Args,
      __: IGraphqlContext
    ) => {
      return await PaymentMethodService.paymentMethods(pagination);
    },

    paymentMethod: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await PaymentMethodService.paymentMethod(id);
    },
  },

  Mutation: {
    createPaymentMethod: async (
      _: any,
      { data }: { data: PaymentMethod },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreatePaymentMethodValidator, data });
      return await PaymentMethodService.createPaymentMethod(data);
    },

    updatePaymentMethod: async (
      _: any,
      { id, data }: { id: number; data: PaymentMethod },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdatePaymentMethodValidator, data });
      return PaymentMethodService.updatePaymentMethod(id, data);
    },

    deletePaymentMethod: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await PaymentMethodService.deletePaymentMethod(id);
    },
  },
};
