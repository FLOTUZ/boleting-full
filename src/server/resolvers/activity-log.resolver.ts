import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { ActivityLog } from "@prisma/client";
import {
  validateData,
  CreateActivityLogValidator,
  UpdateActivityLogValidator,
} from "@/validations";
import { ActivityLogService } from "../services/activity-log.service";

//
// Resolver for ActivityLog model
//
export const ActivityLogResolver = {
  Query: {
    activityLogs: async (_: any, { pagination }: Args, __: IGraphqlContext) => {
      return await ActivityLogService.activityLogs(pagination);
    },

    activityLog: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await ActivityLogService.activityLog(id);
    },
  },

  Mutation: {
    createActivityLog: async (
      _: any,
      { data }: { data: ActivityLog },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreateActivityLogValidator, data });
      return await ActivityLogService.createActivityLog(data);
    },

    updateActivityLog: async (
      _: any,
      { id, data }: { id: number; data: ActivityLog },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateActivityLogValidator, data });
      return ActivityLogService.updateActivityLog(id, data);
    },

    deleteActivityLog: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await ActivityLogService.deleteActivityLog(id);
    },
  },
};
