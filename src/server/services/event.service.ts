import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { Event } from "@prisma/client";

//
// Service for Event model
//
export const EventService = {
  async events(pagination?: Pagination, id_organization?: number) {
    return await prisma.event.findMany({
      skip: pagination?.skip,
      take: pagination?.take,
      where: { deleted: false, organizationId: id_organization },
    });
  },

  async event(id: number) {
    return await prisma.event.findUnique({ where: { id } });
  },

  async createEvent(
    id_user: number,
    id_organization: number,
    data: Event & { event_sub_categories: number[] }
  ) {
    try {
      return await prisma.event.create({
        data: {
          ...data,
          userId: id_user,
          organizationId: id_organization!,
          event_sub_categories: {
            connect: data.event_sub_categories?.map((id) => ({ id })),
          },
        },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateEvent(
    id: number,
    data: Event & { event_sub_categories: number[] }
  ) {
    try {
      return await prisma.event.update({
        where: { id },
        data: {
          ...data,
          event_sub_categories: {
            set: data.event_sub_categories?.map((id) => ({ id })),
          },
        },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteEvent(id: number) {
    return await prisma.event.update({
      where: { id },
      data: { deleted: true },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================

  async createdBy(eventId: number) {
    return await prisma.event
      .findUnique({ where: { id: eventId } })
      .createdBy();
  },

  async eventsByOrganization(id_organization: number) {
    return await prisma.event.findMany({
      where: { organizationId: id_organization },
    });
  },

  async eventsCountByCategory(id_category: number) {
    return await prisma.event.count({
      where: { event_sub_categories: { some: { id: id_category } } },
    });
  },

  async eventsByCategory(id_category: number) {
    return await prisma.event.findMany({
      where: { event_sub_categories: { some: { id: id_category } } },
    });
  },

  async eventsBySubCategory(subcategoryId: number) {
    return await prisma.event.findMany({
      where: { event_sub_categories: { some: { id: subcategoryId } } },
    });
  },

  async popular_events(pagination?: Pagination) {
    return await prisma.event.findMany({
      skip: pagination?.skip,
      take: pagination?.take,
      where: { deleted: false },
      orderBy: { selled_tickets: { _count: "desc" } },
    });
  },
};
