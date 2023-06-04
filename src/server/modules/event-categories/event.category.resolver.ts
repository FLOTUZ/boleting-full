import { Event, EventCategory } from "@prisma/client";

import { Args } from "../../common";
import { IGraphqlContext } from "../../common/graphql.context";
import { PrismaError } from "../../utils";

import { validateData } from "@/validations";
import {
  CreateEventCategorySchema,
  UpdateEventCategorySchema,
} from "@/validations";

export const EventCategoryResolver = {
  Query: {
    eventCategories: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      const rows = await prisma.eventCategory.findMany({
        skip: pagination?.skip,
        take: pagination?.take,
        where: { deleted: false },
      });

      return rows;
    },
    eventCategory: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.eventCategory.findUnique({ where: { id } });
    },
  },

  Mutation: {
    createEventCategory: async (
      _: any,
      { data }: { data: EventCategory & { sub_categories: number[] } },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreateEventCategorySchema, data });

      try {
        return await prisma.eventCategory.create({
          data: {
            ...data,
            sub_categories: {
              connect: data.sub_categories.map((id) => ({ id })),
            },
          },
        });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },

    updateEventCategory: async (
      _: any,
      {
        id,
        data,
      }: { id: number; data: EventCategory & { sub_categories: number[] } },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateEventCategorySchema, data });
      return await prisma.eventCategory.update({
        where: { id },
        data: {
          ...data,
          sub_categories: {
            connect: data.sub_categories.map((id) => ({ id })),
          },
        },
      });
    },

    deleteEventCategory: async (
      _: any,
      { id }: EventCategory,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.eventCategory.update({
        where: { id },
        data: { deleted: true },
      });
    },
  },

  EventCategory: {
    sub_category: async (
      { id }: EventCategory,
      _: any,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.eventSubCategory.findMany({
        where: { parent_event_categoryId: id },
      });
    },
  },
};
