import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { Notification } from "@prisma/client";
import {
  validateData,
  CreateNotificationValidator,
  UpdateNotificationValidator,
} from "@/validations";
import { NotificationService, UserService } from "../services";

//
// Resolver for Notification model
//
export const NotificationResolver = {
  Query: {
    notifications: async (
      _: any,
      { pagination }: Args,
      { id_user }: IGraphqlContext
    ) => {
      return await NotificationService.notifications(id_user!, pagination);
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

    clearNotifications: async (
      _: any,
      __: Args,
      { id_user }: IGraphqlContext
    ) => {
      return await NotificationService.clearNotifications(id_user!);
    },
  },

  Notification: {
    user: async (notification: Notification, _: any, __: IGraphqlContext) => {
      return notification.userId != null
        ? await UserService.getUserById(notification.userId)
        : null;
    },
  },
};
