import { EventSubCategory } from "@prisma/client";

import { Args } from "../../common";
import { IGraphqlContext } from "../../common/graphql.context";
import { PrismaError } from "../../utils";

export const EventSubCategoryResolver = {
  Query: {
    eventsSubCategories: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      const rows = await prisma.eventSubCategory.findMany({
        ...pagination,
        where: { deleted: false },
      });

      return rows;
    },

    eventSubCategory: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.eventSubCategory.findUnique({
        where: { id },
      });
    },

    filteredByParentsEventSubCategories: async (
      _: any,
      { parentsIds }: { parentsIds: number[] },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.eventSubCategory.findMany({
        where: {
          parent_event_category: {
            id: {
              in: parentsIds,
            },
          },
        },
      });
    },
  },

  Mutation: {
    createEventSubCategories: async (
      _: any,
      { data }: { data: EventSubCategory },
      { prisma }: IGraphqlContext
    ) => {
      try {
        return await prisma.eventSubCategory.create({
          data: { ...data },
        });
      } catch (error: any) {
        console.log(error);
        throw PrismaError.handle(error);
      }
    },

    updateEventSubCategories: async (
      _: any,
      {
        id,
        data,
      }: {
        id: number;
        data: EventSubCategory;
      },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.eventSubCategory.update({
        where: { id },
        data: {
          ...data,
        },
      });
    },

    deleteEventSubCategories: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.eventSubCategory.update({
        where: { id },
        data: { deleted: true },
      });
    },
  },

  EventSubCategory: {
    parent_event_category: async (
      { id }: { id: number },
      _: any,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.eventCategory.findMany({
        where: { id },
      });
    },

    events: async (
      { id }: { id: number },
      _: any,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.event.findMany({
        where: { id },
      });
    },
  },
};
