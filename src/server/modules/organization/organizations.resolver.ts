import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { PrismaError } from "@/server/utils";
import { Organization, Event } from "@prisma/client";

export const OrganizationResolver = {
  Query: {
    organizations: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.organization.findMany({
        ...pagination,
        where: { deleted: false },
      });
    },

    organization: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.organization.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createOrganization: async (
      _: any,
      { data }: { data: Organization },
      { prisma }: IGraphqlContext
    ) => {
      try {
        return await prisma.organization.create({
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    updateOrganization: async (
      _: any,
      { id, data }: { id: number; data: Organization },
      { prisma }: IGraphqlContext
    ) => {
      try {
        return await prisma.organization.update({
          where: { id },
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    deleteOrganization: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.organization.update({
        where: { id },
        data: {
          deletedAt: new Date(),
          deleted: true,
        },
      });
    },
  },

  Organization: {
    events: async (
      { id }: Organization,
      _: any,
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.event.findMany({
        where: { organizationId: id },
      });
    },

    users: async ({ id }: Event, _: any, { prisma }: IGraphqlContext) => {
      return await prisma.user.findMany({
        where: { organizationId: id },
      });
    },
  },
};
