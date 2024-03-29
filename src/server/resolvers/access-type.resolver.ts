import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { AccessType } from "@prisma/client";
import {
  validateData,
  CreateAccessTypeValidator,
  UpdateAccessTypeValidator,
} from "@/validations";
import { AccessTypeService, EventService } from "../services";

//
// Resolver for AccessType model
//
export const AccessTypeResolver = {
  Query: {
    accessTypes: async (
      _: any,
      { pagination }: Args,
      { id_organization }: IGraphqlContext
    ) => {
      return await AccessTypeService.accessTypes(pagination, id_organization!);
    },

    accessType: async (_: any, { id }: { id: number }, __: IGraphqlContext) => {
      return await AccessTypeService.accessType(id);
    },

    accessTypesByEventId: async (
      _: any,
      { eventId }: { eventId: number },
      __: IGraphqlContext
    ) => {
      return await AccessTypeService.accessTypesByEventId(eventId);
    },
    courtesyAccessTypes: async (
      _: any,
      { eventId }: { eventId: number },
      __: IGraphqlContext
    ) => {
      return await AccessTypeService.courtesyAccessTypes(eventId);
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
  AccessType: {
    event: async ({ eventId }: AccessType, _: any, __: IGraphqlContext) => {
      return await EventService.event(eventId);
    },
  },
};
