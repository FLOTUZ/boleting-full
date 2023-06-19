import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { Ticket } from "@prisma/client";

//
// Service for Ticket model
//
export const TicketService = {
  async tickets(pagination?: Pagination) {
    return prisma.ticket.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async ticket(id: number) {
    return await prisma.ticket.findUnique({ where: { id } });
  },

  async createTicket(data: Ticket) {
    try {
      return await prisma.ticket.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateTicket(id: number, data: Ticket) {
    try {
      return await prisma.ticket.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteTicket(id: number) {
    return await prisma.ticket.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================

  async selled_tickets_by_event(event_id: number, pagination?: Pagination) {
    return await prisma.ticket.findMany({
      ...pagination,
      where: { event: { id: event_id } },
    });
  },
};
