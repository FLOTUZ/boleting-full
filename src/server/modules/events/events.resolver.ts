import { Event } from "@prisma/client";

import { Args } from "../../common";
import { IGraphqlContext } from "../../common/graphql.context";
import { PrismaError } from "../../utils";

import { validateData } from "@/validations";
import { CreateEventSchema, UpdateEventSchema } from "@/validations";

export const EventResolver = {
  Query: {
    events: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      const rows = await prisma.event.findMany({
        skip: pagination?.skip,
        take: pagination?.take,
        where: { deleted: false },
      });

      return rows;
    },
    event: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.event.findUnique({ where: { id } });
    },
  },

  Mutation: {
    createEvent: async (
      _: any,
      { data }: { data: Event & { categories: number[] } },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreateEventSchema, data });

      try {
        return await prisma.event.create({
          data: {
            ...data,
            event_categories: {
              connect: data.categories?.map((id) => ({ id })),
            },
          },
        });
      } catch (error: any) {
        throw PrismaError.handle(error);
      }
    },

    updateEvent: async (
      _: any,
      { id, data }: { id: number; data: Event & { categories: number[] } },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateEventSchema, data });
      return await prisma.event.update({
        where: { id },
        data: {
          ...data,
          event_categories: {
            connect: data.categories?.map((id) => ({ id })),
          },
        },
      });
    },

    deleteEvent: async (_: any, { id }: Event, { prisma }: IGraphqlContext) => {
      return await prisma.event.update({
        where: { id },
        data: { deleted: true },
      });
    },
  },

  Event: {
    host: async ({ id }: Event, _: any, { prisma }: IGraphqlContext) => {
      return await prisma.event.findUnique({ where: { id } }).host();
    },
  },
};
