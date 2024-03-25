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

  async publishEvent(id: number, organizationId: number) {
    const event = await prisma.event.findUnique({ where: { id } });

    return await prisma.event.update({
      where: { id, organizationId },
      data: { is_published: event?.is_published ? false : true },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================

  async eventsByOrganization(id_organization: number) {
    return await prisma.event.findMany({
      where: { is_published: true, organizationId: id_organization },
    });
  },

  async eventsCountByCategory(id_category: number) {
    return await prisma.event.count({
      where: {
        event_sub_categories: { some: { id: id_category } },
        is_published: true,
      },
    });
  },

  async eventsByCategory(id_category: number) {
    return await prisma.event.findMany({
      where: { event_sub_categories: { some: { id: id_category } } },
    });
  },

  async eventsBySubCategory(subcategoryId: number) {
    return await prisma.event.findMany({
      where: {
        is_published: true,
        event_sub_categories: { some: { id: subcategoryId } },
      },
    });
  },

  async popular_events(pagination?: Pagination) {
    return await prisma.event.findMany({
      skip: pagination?.skip,
      take: pagination?.take,
      where: { is_published: true, deleted: false },
      orderBy: { selled_tickets: { _count: "desc" } },
    });
  },

  async searchEvents(query: string, pagination?: Pagination) {
    return await prisma.event.findMany({
      ...pagination,
      where: {
        is_published: true,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
    });
  },

  async currentEventsCount(organizationId: number) {
    // Returns the number of events that have not ended
    return await prisma.event.count({
      where: {
        organizationId,
        is_published: true,
        end_date: { gt: new Date() },
        deleted: false,
      },
    });
  },
};
