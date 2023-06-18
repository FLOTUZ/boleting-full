import * as argon2 from "argon2";
import { prisma } from "@/server";
import { User } from "@prisma/client";

import { Pagination } from "../common";
import { PrismaError } from "../utils";

export const UserService = {
  async getAllUsers(pagination?: Pagination) {
    return await prisma.user.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async currentUser(id_user: number) {
    return await prisma.user.findUniqueOrThrow({ where: { id: id_user } });
  },

  async createUser({
    data,
    id_organization,
  }: {
    data: User & { roles: number[] };
    id_organization: number;
  }) {
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

  async updateUser({ id, data }: { id: number; data: User }) {
    return await prisma.user.update({ where: { id }, data });
  },

  async deleteUser(id: number) {
    try {
      return await prisma.user.delete({ where: { id } });
    } catch (error: any) {
      throw PrismaError.handle(error);
    }
  },
};
