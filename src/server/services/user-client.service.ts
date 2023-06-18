import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { UserClient } from "@prisma/client";

//
// Service for UserClient model
//
export const UserClientService = {
  async userClients(pagination?: Pagination) {
    return prisma.userClient.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async userClient(id: number) {
    return await prisma.userClient.findUnique({ where: { id } });
  },

  async createUserClient(data: UserClient) {
    try {
      return await prisma.userClient.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateUserClient(id: number, data: UserClient) {
    try {
      return await prisma.userClient.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteUserClient(id: number) {
    return await prisma.userClient.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================
};
