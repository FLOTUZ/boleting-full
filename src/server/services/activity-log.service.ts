import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { ActivityLog } from "@prisma/client";

//
// Service for ActivityLog model
//
export const ActivityLogService = {
  async activityLogs(pagination?: Pagination) {
    return prisma.activityLog.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async activityLog(id: number) {
    return await prisma.activityLog.findUnique({ where: { id } });
  },

  async createActivityLog(data: ActivityLog) {
    try {
      return await prisma.activityLog.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateActivityLog(id: number, data: ActivityLog) {
    try {
      return await prisma.activityLog.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteActivityLog(id: number) {
    return await prisma.activityLog.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================
};
