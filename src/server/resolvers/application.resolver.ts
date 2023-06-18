import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { Application } from "@prisma/client";
import {
  validateData,
  CreateApplicationValidator,
  UpdateApplicationValidator,
} from "@/validations";
import { ApplicationService } from "../services";

//
// Resolver for Application model
//
export const ApplicationResolver = {
  Query: {
    applications: async (_: any, { pagination }: Args, __: IGraphqlContext) => {
      return await ApplicationService.applications(pagination);
    },

    application: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await ApplicationService.application(id);
    },
  },

  Mutation: {
    createApplication: async (
      _: any,
      { data }: { data: Application },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreateApplicationValidator, data });
      return await ApplicationService.createApplication(data);
    },

    updateApplication: async (
      _: any,
      { id, data }: { id: number; data: Application },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateApplicationValidator, data });
      return ApplicationService.updateApplication(id, data);
    },

    deleteApplication: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await ApplicationService.deleteApplication(id);
    },
  },
};
