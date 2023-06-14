import { IGraphqlContext } from "@/server/common/graphql.context";
import { PrismaError } from "@/server/utils";
import { Args } from "@/server/common";
import { Ticket } from "@prisma/client";
import {
  validateData,
  CreateTicketSchema,
  UpdateTicketSchema,
} from "@/validations";

export const TicketsResolver = {
  Query: {
    tickets: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return prisma.ticket.findMany({
        take: pagination?.take || 10,
        skip: pagination?.skip,
        orderBy: {
          id: "asc",
        },
      });
    },

    ticket: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return prisma.ticket.findUnique({ where: { id } });
    },
  },

  Mutation: {
    createTicket: async (
      _: any,
      { data }: { data: Ticket },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreateTicketSchema, data });
      try {
        return await prisma.ticket.create({ data });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },

    updateTicket: async (
      _: any,
      { id, data }: { id: number; data: Ticket },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateTicketSchema, data });
      try {
        return await prisma.ticket.update({ where: { id }, data });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },

    deleteTicket: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      try {
        return await prisma.ticket.delete({ where: { id } });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },
  },
};
