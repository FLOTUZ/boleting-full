import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { Notification } from "@prisma/client";
import {
  validateData,
  CreateNotificationValidator,
  UpdateNotificationValidator,
} from "@/validations";
import { NotificationService } from "../services";

//
// Resolver for Notification model
//
export const NotificationResolver = {
  Query: {
    notifications: async (
      _: any,
      { pagination }: Args,
      __: IGraphqlContext
    ) => {
      return await NotificationService.notifications(pagination);
    },

    notification: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await NotificationService.notification(id);
    },
  },

  Mutation: {
    createNotification: async (
      _: any,
      { data }: { data: Notification },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreateNotificationValidator, data });
      return await NotificationService.createNotification(data);
    },

    updateNotification: async (
      _: any,
      { id, data }: { id: number; data: Notification },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateNotificationValidator, data });
      return NotificationService.updateNotification(id, data);
    },

    deleteNotification: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await NotificationService.deleteNotification(id);
    },
  },
};
