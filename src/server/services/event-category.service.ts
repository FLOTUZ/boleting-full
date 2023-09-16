import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { EventCategory } from "@prisma/client";

//
// Service for EventCategory model
//
export const EventCategoryService = {
  async eventCategories(pagination?: Pagination) {
    return prisma.eventCategory.findMany({
      ...pagination,
      where: { deleted: false },
      orderBy: { id: "desc" },
    });
  },

  async eventCategory(id: number) {
    return await prisma.eventCategory.findUnique({ where: { id } });
  },

  async createEventCategory(
    data: EventCategory & { sub_categories: number[] }
  ) {
    try {
      return await prisma.eventCategory.create({
        data: {
          ...data,
          sub_categories: {
            connect: data.sub_categories.map((id: number) => ({ id })),
          },
        },
      });
    } catch (error: any) {
      throw PrismaError.handle(error);
    }
  },

  async updateEventCategory(
    id: number,
    data: EventCategory & { sub_categories: number[] }
  ) {
    return await prisma.eventCategory.update({
      where: { id },
      data: {
        ...data,
        sub_categories: {
          set: data.sub_categories.map((id: number) => ({ id })),
        },
      },
    });
  },

  async deleteEventCategory(id: number) {
    return await prisma.eventCategory.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================
};
