import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { Ticket } from "@prisma/client";
import {
  validateData,
  CreateTicketValidator,
  UpdateTicketValidator,
} from "@/validations";
import { TicketService } from "../services";

//
// Resolver for Ticket model
//
export const TicketResolver = {
  Query: {
    tickets: async (_: any, { pagination }: Args, __: IGraphqlContext) => {
      return await TicketService.tickets(pagination);
    },

    ticket: async (_: any, { id }: { id: number }, __: IGraphqlContext) => {
      return await TicketService.ticket(id);
    },

    selled_tickets_by_event: async (
      _: any,
      { pagination }: Args,
      { event_id }: { event_id: number },
      __: IGraphqlContext
    ) => {
      return await TicketService.selledTicketsByEvent(event_id, pagination);
    },
  },

  Mutation: {
    createTicket: async (
      _: any,
      { data }: { data: Ticket },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreateTicketValidator, data });
      return await TicketService.createTicket(data);
    },

    updateTicket: async (
      _: any,
      { id, data }: { id: number; data: Ticket },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateTicketValidator, data });
      return TicketService.updateTicket(id, data);
    },

    deleteTicket: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await TicketService.deleteTicket(id);
    },
  },
};
