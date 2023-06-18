import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { Event } from "@prisma/client";

//
// Service for Event model
//
export const EventService = {
  async events(pagination?: Pagination) {
    return prisma.event.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async event(id: number) {
    return await prisma.event.findUnique({ where: { id } });
  },

  async createEvent(data: Event) {
    try {
      return await prisma.event.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateEvent(id: number, data: Event) {
    try {
      return await prisma.event.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteEvent(id: number) {
    return await prisma.event.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================

  async eventsByOrganization(id_organization: number) {
    return await prisma.event.findMany({
      where: { organizationId: id_organization },
    });
  },
};
