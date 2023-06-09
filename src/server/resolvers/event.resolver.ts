import { Event } from "@prisma/client";

import { Args } from "../common";
import { IGraphqlContext } from "../common/graphql.context";
import { AuthenticationError } from "../utils";

import { validateData } from "@/validations";
import { CreateEventValidator, UpdateEventValidator } from "@/validations";
import {
  AccessTypeService,
  EventService,
  EventSubCategoryService,
  OwnerTypeService,
  TicketService,
  UserService,
} from "../services";

export const EventResolver = {
  Query: {
    events: async (
      _: any,
      { pagination }: Args,
      { id_organization }: IGraphqlContext
    ) => {
      return await EventService.events(pagination, id_organization!);
    },

    event: async (_: any, { id }: { id: number }, __: IGraphqlContext) => {
      return await EventService.event(id);
    },
  },

  Mutation: {
    createEvent: async (
      _: any,
      { data }: { data: Event & { sub_categories: number[] } },
      { id_user, id_organization }: IGraphqlContext
    ) => {
      if (!id_user) throw new AuthenticationError("User not authenticated");
      await validateData({ schema: CreateEventValidator, data });

      return await EventService.createEvent(id_user, id_organization!, data);
    },

    updateEvent: async (
      _: any,
      { id, data }: { id: number; data: Event & { sub_categories: number[] } },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateEventValidator, data: data });

      return await EventService.updateEvent(id, data);
    },

    deleteEvent: async (_: any, { id }: Event, __: IGraphqlContext) => {
      return await EventService.deleteEvent(id);
    },
  },

  Event: {
    createdBy: async ({ id }: Event, _: any, __: IGraphqlContext) => {
      return await EventService.createdBy(id);
    },

    sub_categories: async ({ id }: Event, _: any, __: IGraphqlContext) => {
      return await EventSubCategoryService.subCategoriesByCategoryEventId(id);
    },

    access_types: async ({ id }: Event, _: any, __: IGraphqlContext) => {
      return await AccessTypeService.accessTypesByEventId(id);
    },

    owner_types: async ({ id }: Event, _: any, __: IGraphqlContext) => {
      return await OwnerTypeService.ownerTypesOfEvent(id);
    },

    selled_tickets: async ({ id }: Event, _: any, __: IGraphqlContext) => {
      return await TicketService.selledTicketsByEvent(id);
    },

    staff: async ({ id }: Event, _: any, __: IGraphqlContext) => {
      return await UserService.staffByEvent(id);
    },
  },
};
