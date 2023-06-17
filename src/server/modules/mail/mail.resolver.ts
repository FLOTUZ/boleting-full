import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { PrismaError } from "@/server/utils";
import { Mail } from "@prisma/client";
import {
  validateData,
  CreateMailValidator,
  UpdateMailValidator,
} from "@/validations";

/*
 * Resolver de Mail
 */
export const MailResolver = {
  Query: {
    mails: async (
      _: any,
      { pagination }: Args,
      { prisma }: IGraphqlContext
    ) => {
      const rows = await prisma.mail.findMany({
        skip: pagination?.skip,
        take: pagination?.take,
        where: { deleted: false },
      });
      return rows;
    },

    Mail: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.mail.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createMail: async (
      _: any,
      { data }: { data: Mail },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreateMailValidator, data });
      try {
        return await prisma.mail.create({
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    updateMail: async (
      _: any,
      { id, data }: { id: number; data: Mail },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateMailValidator, data });
      try {
        return await prisma.mail.update({
          where: { id },
          data: { ...data },
        });
      } catch (error) {
        throw PrismaError.handle(error);
      }
    },

    deleteMail: async (
      _: any,
      { id }: { id: number },
      { prisma }: IGraphqlContext
    ) => {
      return await prisma.mail.update({
        where: { id },
        data: {
          deletedAt: new Date(),
          deleted: true,
        },
      });
    },
  },
};
