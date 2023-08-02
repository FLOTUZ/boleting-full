import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { Ticket } from "@prisma/client";
import {
  validateData,
  CreateTicketValidator,
  UpdateTicketValidator,
  CreateCourtesyTicketValidator,
} from "@/validations";
import {
  AccessTypeService,
  OwnerTypeService,
  TicketService,
} from "../services";
import { autorizedAbilities } from "../autorization";

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

    courtecy_tickets: async (
      _: any,
      {
        event_id,
        pagination,
      }: { event_id: number; pagination: Args["pagination"] },
      { id_user }: IGraphqlContext
    ) => {
      await autorizedAbilities({
        id_user,
        authorized_abilities: ["read:courtesy-ticket"],
      });

      return await TicketService.courtecyTickets(pagination, event_id);
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

    createCourtesyTicket: async (
      _: any,
      { data }: { data: Ticket },
      { id_user }: IGraphqlContext
    ) => {
      await autorizedAbilities({
        id_user,
        authorized_abilities: ["create:courtesy-ticket"],
      });
      await validateData({ schema: CreateCourtesyTicketValidator, data });
      return await TicketService.createCourtesyTicket(id_user!, data);
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

  Ticket: {
    access_type: async (ticket: Ticket, _: any, __: IGraphqlContext) => {
      return await AccessTypeService.accessType(ticket.eventId);
    },

    ticket_type: async (ticket: Ticket, _: any, __: IGraphqlContext) => {
      return await OwnerTypeService.ownerType(ticket.eventId);
    },
  },
};
