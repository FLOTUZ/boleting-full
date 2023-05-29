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
import { autorizedRoles } from "@/server/autorization/role-based.autorization";

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
      await autorizedRoles({
        authorized_roles: [],
        id_user,
        prisma,
      });

      if (!id_user) return null;
      return await prisma.user.findUniqueOrThrow({ where: { id: id_user } });
    },
  },

  Mutation: {
    createUser: async (
      _: any,
      { data }: { data: User & { role: number[] } },
      { prisma }: IGraphqlContext
    ) => {
      await validateData({ schema: CreateUserSchema, data });

      try {
        const hash = await argon2.hash(data.password);
        return await prisma.user.create({
          data: {
            ...data,
            password: hash,
            roles: {
              connect: data.role?.map((id) => ({ id })),
            },
          },
        });
      } catch (error: any) {
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
  },
};
