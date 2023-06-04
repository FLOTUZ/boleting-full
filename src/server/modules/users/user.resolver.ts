import * as argon2 from "argon2";
import { User } from "@prisma/client";

import { Args } from "../../common";
import { IGraphqlContext } from "../../common/graphql.context";
import { PrismaError } from "../../utils";

import {
  CreateUserSchema,
  UpdateRoleSchema,
  validateData,
} from "@/validations";
import { autorizedAbilities } from "@/server/autorization";

export const UserResolver = {
  Query: {
    users: async (
      _: any,
      { pagination }: Args,
      { id_user, prisma }: IGraphqlContext
    ) => {
      return await prisma.user.findMany({
        ...pagination,
        where: { deleted: false },
      });
    },

    currentUser: async (
      _: any,
      __: User,
      { id_user, prisma }: IGraphqlContext
    ) => {
      if (!id_user) return null;
      return await prisma.user.findUniqueOrThrow({ where: { id: id_user } });
    },
  },

  Mutation: {
    createUser: async (
      _: any,
      { data }: { data: User & { roles: number[] } },
      { id_organization, prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreateUserSchema, data });
      console.log(data);
      try {
        const hash = await argon2.hash(data.password);
        return await prisma.user.create({
          data: {
            ...data,
            password: hash,
            organizationId: id_organization!,
            roles: {
              connect: data.roles?.map((id) => ({ id })),
            },
          },
        });
      } catch (error: any) {
        console.log(error);
        throw PrismaError.handle(error);
      }
    },

    updateUser: async (
      _: any,
      { id, data }: { id: number; data: User },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateRoleSchema, data });
      return await prisma.user.update({ where: { id }, data });
    },

    deleteUser: async (_: any, { id }: User, { prisma }: IGraphqlContext) => {
      return await prisma.user.update({
        where: { id },
        data: { deleted: true },
      });
    },
  },

  User: {
    roles: async ({ id }: User, _: any, { prisma }: IGraphqlContext) => {
      return await prisma.role.findMany({
        where: { users: { some: { id } } },
      });
    },

    organization: async ({ id }: User, _: any, { prisma }: IGraphqlContext) => {
      return await prisma.organization.findFirst({
        where: { users: { some: { id } } },
      });
    },
  },
};
