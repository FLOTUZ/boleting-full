import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { PrismaError } from "@/server/utils";
import { Notification } from "@prisma/client";
import {
  validateData,
  CreateNotificationValidator,
  UpdateNotificationValidator,
} from "@/validations";

/*
 * Resolver de Notification
 */
export const NotificationResolver = {
  Query: {
    notifications: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      const rows = await prisma.notification.findMany({
        skip: pagination?.skip,
        take: pagination?.take,
        where: { deleted: false },
      });
      return rows;
    },

    Notification: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.notification.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createNotification: async (
      _: any,
      { data }: { data: Notification },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreateNotificationValidator, data });
      try {
        return await prisma.notification.create({
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    updateNotification: async (
      _: any,
      { id, data }: { id: number; data: Notification },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateNotificationValidator, data });
      try {
        return await prisma.notification.update({
          where: { id },
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    deleteNotification: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.notification.update({
        where: { id },
        data: {
          deletedAt: new Date(),
          deleted: true,
        },
      });
    },
  },
};
