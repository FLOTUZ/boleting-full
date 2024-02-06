import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError, UnauthorizedError } from "../utils";
import { Ticket } from "@prisma/client";

import { v4 as uuidv4 } from "uuid";

//
// Service for Ticket model
//
export const TicketService = {
  async tickets(pagination?: Pagination) {
    return prisma.ticket.findMany({
      ...pagination,
      where: { deleted: false },
      orderBy: { createdAt: "desc" },
    });
  },

  async ticket(id: number) {
    return await prisma.ticket.findUnique({ where: { id } });
  },

  async courtecyTickets(pagination?: Pagination, eventId?: number) {
    return await prisma.ticket.findMany({
      ...pagination,
      where: {
        eventId,
        access_type: { is_courtesy: true },
        deleted: false,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async createTicket(data: Ticket) {
    try {
      return await prisma.ticket.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async createCourtesyTicket(userId: number, data: Ticket) {
    // Verify if user belongs to organization of event

    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
      include: { organization: true, createdBy: true },
    });

    if (event?.createdBy?.id !== userId) {
      throw new UnauthorizedError(
        "You are not authorized to create a courtesy ticket for this event"
      );
    }

    try {
      return await prisma.ticket.create({
        data: {
          ...data,
          serial_number: uuidv4(),
        },
      });
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

  async selledTicketsByEvent(event_id: number, pagination?: Pagination) {
    return await prisma.ticket.findMany({
      ...pagination,
      where: { event: { id: event_id } },
    });
  },

  async selledTicketsByOrder(order_id: number, pagination?: Pagination) {
    return await prisma.ticket.findMany({
      ...pagination,
      where: { order: { id: order_id } },
    });
  },

  async courtecyTicket(id: number) {
    return await prisma.ticket.findUnique({ where: { id } });
  },
};
