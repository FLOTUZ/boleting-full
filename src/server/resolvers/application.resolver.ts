import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { PrismaError } from "@/server/utils";
import { Application } from "@prisma/client";
import {
  validateData,
  CreateApplicationValidator,
  UpdateApplicationValidator,
} from "@/validations";

/*
 * Resolver de Application
 */
export const ApplicationResolver = {
  Query: {
    applications: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      const rows = await prisma.application.findMany({
        skip: pagination?.skip,
        take: pagination?.take,
        where: { deleted: false },
      });
      return rows;
    },

    application: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.application.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createApplication: async (
      _: any,
      { data }: { data: Application },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreateApplicationValidator, data });
      try {
        return await prisma.application.create({
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    updateApplication: async (
      _: any,
      { id, data }: { id: number; data: Application },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateApplicationValidator, data });
      try {
        return await prisma.application.update({
          where: { id },
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    deleteApplication: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.application.update({
        where: { id },
        data: {
          deletedAt: new Date(),
          deleted: true,
        },
      });
    },
  },
};
