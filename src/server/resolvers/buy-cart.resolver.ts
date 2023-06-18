import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { BuyCart } from "@prisma/client";
import {
  validateData,
  CreateBuyCartValidator,
  UpdateBuyCartValidator,
} from "@/validations";
import { BuyCartService } from "../services";

//
// Resolver for BuyCart model
//
export const BuyCartResolver = {
  Query: {
    buyCarts: async (_: any, { pagination }: Args, __: IGraphqlContext) => {
      return await BuyCartService.buyCarts(pagination);
    },

    buyCart: async (_: any, { id }: { id: number }, __: IGraphqlContext) => {
      return await BuyCartService.buyCart(id);
    },
  },

  Mutation: {
    createBuyCart: async (
      _: any,
      { data }: { data: BuyCart },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreateBuyCartValidator, data });
      return await BuyCartService.createBuyCart(data);
    },

    updateBuyCart: async (
      _: any,
      { id, data }: { id: number; data: BuyCart },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateBuyCartValidator, data });
      return BuyCartService.updateBuyCart(id, data);
    },

    deleteBuyCart: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await BuyCartService.deleteBuyCart(id);
    },
  },
};
