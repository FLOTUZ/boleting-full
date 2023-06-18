import { Event } from "@prisma/client";

import { Args } from "../common";
import { IGraphqlContext } from "../common/graphql.context";
import { AuthenticationError, PrismaError } from "../utils";

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
      { data }: { data: Event & { sub_categories: number[] } },
      { id_user, id_organization, prisma }: IGraphqlContext
    ) => {
      if (!id_user) throw new AuthenticationError("User not authenticated");
      await validateData({ schema: CreateEventSchema, data });

      try {
        return await prisma.event.create({
          data: {
            ...data,
            userId: id_user,
            organizationId: id_organization!,
            sub_categories: {
              connect: data.sub_categories?.map((id) => ({ id })),
            },
          },
        });
      } catch (error: any) {
        console.log(error);
        throw PrismaError.handle(error);
      }
    },

    updateEvent: async (
      _: any,
      { id, data }: { id: number; data: Event & { sub_categories: number[] } },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateEventSchema, data: data });
      return await prisma.event.update({
        where: { id },
        data: {
          ...data,
          sub_categories: {
            connect: data.sub_categories?.map((id) => ({ id })),
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
    createdBy: async ({ id }: Event, _: any, { prisma }: IGraphqlContext) => {
      return await prisma.event.findUnique({ where: { id } }).createdBy();
    },

    sub_categories: async (
      { id }: Event,
      _: any,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.eventSubCategory.findMany({
        where: { events: { some: { id } } },
      });
    },

    access_types: async (
      { id }: Event,
      _: any,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.accessType.findMany({
        where: { event: { id } },
      });
    },

    owner_types: async ({ id }: Event, _: any, { prisma }: IGraphqlContext) => {
      return await prisma.ownerType.findMany({
        where: { event: { id } },
      });
    },
  },
};
