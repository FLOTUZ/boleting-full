import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { PrismaError } from "@/server/utils";
import { ActivityLog } from "@prisma/client";
import {
  validateData,
  CreateActivityLogValidator,
  UpdateActivityLogValidator,
} from "@/validations";

/*
 * Resolver de ActivityLog
 */
export const ActivityLogResolver = {
  Query: {
    activityLogs: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      const rows = await prisma.activityLog.findMany({
        skip: pagination?.skip,
        take: pagination?.take,
        where: { deleted: false },
      });
      return rows;
    },

    activity_log: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.activityLog.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createActivityLog: async (
      _: any,
      { data }: { data: ActivityLog },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreateActivityLogValidator, data });
      try {
        return await prisma.activityLog.create({
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    updateActivityLog: async (
      _: any,
      { id, data }: { id: number; data: ActivityLog },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateActivityLogValidator, data });
      try {
        return await prisma.activityLog.update({
          where: { id },
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    deleteActivityLog: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.activityLog.update({
        where: { id },
        data: {
          deletedAt: new Date(),
          deleted: true,
        },
      });
    },
  },
};
