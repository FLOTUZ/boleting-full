import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { EventSubCategory } from "@prisma/client";
import {
  validateData,
  CreateEventSubCategoryValidator,
  UpdateEventSubCategoryValidator,
} from "@/validations";
import { EventSubCategoryService } from "../services";

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
};
