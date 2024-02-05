import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { AccessType, Order } from "@prisma/client";
import {
  validateData,
  CreateOrderValidator,
  UpdateOrderValidator,
} from "@/validations";
import { OrderService } from "../services";
import { AuthenticationError } from "../utils";

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
    createOpenVenueOrder: async (
      _: any,
      { data }: { data: Order & { eventId: number; access_typeId: number } },
      { type, id_user }: IGraphqlContext
    ) => {
      if (type === "USER" || type == null || id_user == null)
        throw new AuthenticationError("User not authenticated");
      // await validateData({ schema: CreateOrderValidator, data });

      return await OrderService.createOpenVenueOrder(
        id_user,
        data.eventId,
        data.access_typeId,
        data.payment_methodId,
        data.buyed_access_count
      );
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
