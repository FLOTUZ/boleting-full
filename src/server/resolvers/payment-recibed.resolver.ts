import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { PaymentRecibed } from "@prisma/client";
import {
  validateData,
  CreatePaymentRecibedValidator,
  UpdatePaymentRecibedValidator,
} from "@/validations";
import { PaymentRecibedService } from "../services";

//
// Resolver for PaymentRecibed model
//
export const PaymentRecibedResolver = {
  Query: {
    paymentRecibeds: async (
      _: any,
      { pagination }: Args,
      __: IGraphqlContext
    ) => {
      return await PaymentRecibedService.paymentRecibeds(pagination);
    },

    paymentRecibed: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await PaymentRecibedService.paymentRecibed(id);
    },
  },

  Mutation: {
    createPaymentRecibed: async (
      _: any,
      { data }: { data: PaymentRecibed },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreatePaymentRecibedValidator, data });
      return await PaymentRecibedService.createPaymentRecibed(data);
    },

    updatePaymentRecibed: async (
      _: any,
      { id, data }: { id: number; data: PaymentRecibed },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdatePaymentRecibedValidator, data });
      return PaymentRecibedService.updatePaymentRecibed(id, data);
    },

    deletePaymentRecibed: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await PaymentRecibedService.deletePaymentRecibed(id);
    },
  },
};
