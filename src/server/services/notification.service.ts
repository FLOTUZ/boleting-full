import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { Notification } from "@prisma/client";

//
// Service for Notification model
//
export const NotificationService = {
  async notifications(pagination?: Pagination) {
    return prisma.notification.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async notification(id: number) {
    return await prisma.notification.findUnique({ where: { id } });
  },

  async createNotification(data: Notification) {
    try {
      return await prisma.notification.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateNotification(id: number, data: Notification) {
    try {
      return await prisma.notification.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteNotification(id: number) {
    return await prisma.notification.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================
};
