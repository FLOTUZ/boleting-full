import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { Notification } from "@prisma/client";

//
// Service for Notification model
//
export const NotificationService = {
  async notifications(userId: number, pagination?: Pagination) {
    return prisma.notification.findMany({
      ...(pagination ? { ...pagination } : { take: 20 }),
      where: { deleted: false, userId },
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

  async clearNotifications(userId?: number) {
    try {
      await prisma.notification.deleteMany({
        where: { userId },
      });

      return true;
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  // ======================= FOR ANOTHER RESOLVERS =======================
};
