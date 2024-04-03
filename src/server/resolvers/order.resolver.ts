import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { AccessType, Order, PaymentMethodType } from "@prisma/client";
import {
  validateData,
  CreateOrderValidator,
  UpdateOrderValidator,
} from "@/validations";
import {
  AuthorizedDealerService,
  EventService,
  OrderService,
  PaymentMethodService,
  TicketService,
} from "../services";
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

    createOpenVenueOrder: async (
      _: any,
      {
        data,
      }: {
        data: Order & {
          eventId: number;
          payment_method: PaymentMethodType;
          access_typeId: number;
        };
      },
      { type, id_user }: IGraphqlContext
    ) => {
      if (type === "USER" || type == null || id_user == null)
        throw new AuthenticationError({
          message: "User not authenticated",
        });
      // await validateData({ schema: CreateOrderValidator, data });

      return await OrderService.createOpenVenueOrder(
        id_user,
        data.eventId,
        data.access_typeId,
        data.buyed_access_count
      );
    },
  },

  Mutation: {
    updateOrder: async (
      _: any,
      { id, data }: { id: number; data: Order },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateOrderValidator, data });
      return OrderService.updateOrder(id, data);
    },

    createFreeOrder: async (
      _: any,
      {
        data,
      }: {
        data: Order & {
          eventId: number;
          payment_method: PaymentMethodType;
          access_typeId: number;
        };
      },
      { type, id_user }: IGraphqlContext
    ) => {
      if (type === "USER" || type == null || id_user == null)
        throw new AuthenticationError({
          message: "User not authenticated",
        });

      return await OrderService.createFreeOrder(
        id_user,
        data.eventId,
        data.access_typeId
      );
    },

    deleteOrder: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await OrderService.deleteOrder(id);
    },
  },

  Order: {
    event: async ({ eventId }: Order, _: any, __: IGraphqlContext) => {
      return await EventService.event(eventId);
    },

    payment_method: async (
      { payment_methodId }: Order,
      _: any,
      __: IGraphqlContext
    ) => {
      return await PaymentMethodService.paymentMethod(payment_methodId!);
    },

    autorized_dealer: async (
      { authorized_dealerId }: Order,
      _: any,
      __: IGraphqlContext
    ) => {
      if (!authorized_dealerId) return null;
      return await AuthorizedDealerService.authorizedDealer(
        authorized_dealerId
      );
    },

    selled_tickets: async ({ id }: Order, _: any, __: IGraphqlContext) => {
      return await TicketService.selledTicketsByOrder(id);
    },
  },
};
