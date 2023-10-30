import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { EventSubCategory } from "@prisma/client";
import {
  validateData,
  CreateEventSubCategoryValidator,
  UpdateEventSubCategoryValidator,
} from "@/validations";
import { EventCategoryService, EventSubCategoryService } from "../services";

//
// Resolver for EventSubCategory model
//
export const EventSubCategoryResolver = {
  Query: {
    eventSubCategories: async (
      _: any,
      { pagination }: Args,
      __: IGraphqlContext
    ) => {
      return await EventSubCategoryService.eventSubCategorys(pagination);
    },

    eventSubCategory: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await EventSubCategoryService.eventSubCategory(id);
    },

    eventSubCategoriesByCategory: async (
      _: any,
      { categoryId }: { categoryId: number },
      __: IGraphqlContext
    ) => {
      return await EventSubCategoryService.eventSubCategoriesByCategoryId(
        categoryId
      );
    },
  },

  Mutation: {
    createEventSubCategory: async (
      _: any,
      { data }: { data: EventSubCategory },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreateEventSubCategoryValidator, data });
      return await EventSubCategoryService.createEventSubCategory(data);
    },

    updateEventSubCategory: async (
      _: any,
      { id, data }: { id: number; data: EventSubCategory },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateEventSubCategoryValidator, data });
      return EventSubCategoryService.updateEventSubCategory(id, data);
    },

    deleteEventSubCategory: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await EventSubCategoryService.deleteEventSubCategory(id);
    },
  },

  EventSubCategory: {
    event_category: async (
      { event_categoryId }: EventSubCategory,
      _: any,
      __: IGraphqlContext
    ) => {
      return await EventCategoryService.eventCategory(event_categoryId);
    },
  },
};
