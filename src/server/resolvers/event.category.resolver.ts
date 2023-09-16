import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { EventCategory } from "@prisma/client";
import {
  validateData,
  CreateEventCategoryValidator,
  UpdateEventCategoryValidator,
} from "@/validations";
import {
  EventCategoryService,
  EventService,
  EventSubCategoryService,
} from "../services";

//
// Resolver for  model
//
export const EventCategoryResolver = {
  Query: {
    eventCategories: async (
      _: any,
      { pagination }: Args,
      __: IGraphqlContext
    ) => {
      return await EventCategoryService.eventCategories(pagination);
    },

    eventCategory: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await EventCategoryService.eventCategory(id);
    },
  },

  Mutation: {
    createEventCategory: async (
      _: any,
      { data }: { data: EventCategory & { sub_categories: number[] } },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreateEventCategoryValidator, data });

      return await EventCategoryService.createEventCategory(data);
    },

    updateEventCategory: async (
      _: any,
      {
        id,
        data,
      }: { id: number; data: EventCategory & { sub_categories: number[] } },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateEventCategoryValidator, data });
      return await EventCategoryService.updateEventCategory(id, data);
    },

    deleteEventCategory: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await EventCategoryService.deleteEventCategory(id);
    },
  },

  EventCategory: {
    sub_categories: async (
      { id }: EventCategory,
      _: any,
      __: IGraphqlContext
    ) => {
      return await EventSubCategoryService.subCategoriesByCategoryEventParentId(
        id
      );
    },

    events_count: async (
      { id }: EventCategory,
      _: any,
      __: IGraphqlContext
    ) => {
      return await EventService.eventsCountByCategory(id);
    },

    sub_categories_count: async (
      { id }: EventCategory,
      _: any,
      __: IGraphqlContext
    ) => {
      return await EventSubCategoryService.subCategoriesCountByCategory(id);
    },
  },
};
