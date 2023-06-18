import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { AccessType } from "@prisma/client";
import {
  validateData,
  CreateAccessTypeValidator,
  UpdateAccessTypeValidator,
} from "@/validations";
import { AccessTypeService } from "../services/access-type.service";

//
// Resolver for AccessType model
//
export const AccessTypeResolver = {
  Query: {
    accessTypes: async (_: any, { pagination }: Args, __: IGraphqlContext) => {
      return await AccessTypeService.accessTypes(pagination);
    },

    accessType: async (_: any, { id }: { id: number }, __: IGraphqlContext) => {
      return await AccessTypeService.accessType(id);
    },
  },

  Mutation: {
    createAccessType: async (
      _: any,
      { data }: { data: AccessType },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreateAccessTypeValidator, data });
      return await AccessTypeService.createAccessType(data);
    },

    updateAccessType: async (
      _: any,
      { id, data }: { id: number; data: AccessType },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateAccessTypeValidator, data });
      return AccessTypeService.updateAccessType(id, data);
    },

    deleteAccessType: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await AccessTypeService.deleteAccessType(id);
    },
  },
};
