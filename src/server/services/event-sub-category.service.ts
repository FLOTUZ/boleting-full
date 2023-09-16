import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { EventSubCategory } from "@prisma/client";

//
// Service for EventSubCategory model
//
export const EventSubCategoryService = {
  async eventSubCategorys(pagination?: Pagination) {
    return prisma.eventSubCategory.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async eventSubCategory(id: number) {
    return await prisma.eventSubCategory.findUnique({ where: { id } });
  },

  async createEventSubCategory(data: EventSubCategory) {
    try {
      return await prisma.eventSubCategory.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateEventSubCategory(id: number, data: EventSubCategory) {
    try {
      return await prisma.eventSubCategory.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteEventSubCategory(id: number) {
    return await prisma.eventSubCategory.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================

  async subCategoriesByCategoryEventId(eventId: number) {
    return await prisma.eventSubCategory.findMany({
      where: { events: { some: { id: eventId } } },
    });
  },

  async subCategoriesByCategoryId(categoryId: number) {
    return await prisma.eventSubCategory.findMany({
      where: { event_categories: { some: { id: categoryId } } },
    });
  },

  async subCategoriesCountByCategory(categoryId: number) {
    return await prisma.eventSubCategory.count({
      where: { event_categories: { some: { id: categoryId } } },
    });
  },
};
