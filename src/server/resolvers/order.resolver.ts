import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { Order } from "@prisma/client";
import {
  validateData,
  CreateOrderValidator,
  UpdateOrderValidator,
} from "@/validations";
import { OrderService } from "../services";

//
// Resolver for Order model
//
export const OrderResolver = {
  Query: {
    orders: async (_: any, { pagination }: Args, __: IGraphqlContext) => {
      return await OrderService.orders(pagination);
    },

    order: async (_: any, { id }: { id: number }, __: IGraphqlContext) => {
      return await OrderService.order(id);
    },
  },

  Mutation: {
    createOrder: async (
      _: any,
      { data }: { data: Order },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreateOrderValidator, data });
      return await OrderService.createOrder(data);
    },

    updateOrder: async (
      _: any,
      { id, data }: { id: number; data: Order },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateOrderValidator, data });
      return OrderService.updateOrder(id, data);
    },

    deleteOrder: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await OrderService.deleteOrder(id);
    },
  },
};
