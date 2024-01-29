import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { AuthorizedDealer } from "@prisma/client";

//
// Service for AutorizedDealer model
//
export const AuthorizedDealerService = {
  async authorizedDealers(pagination?: Pagination) {
    return prisma.authorizedDealer.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async authorizedDealer(id: number) {
    return await prisma.authorizedDealer.findUnique({ where: { id } });
  },

  async createAuthorizedDealer(data: AuthorizedDealer) {
    try {
      return await prisma.authorizedDealer.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateAuthorizedDealer(id: number, data: AuthorizedDealer) {
    try {
      return await prisma.authorizedDealer.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteAuthorizedDealer(id: number) {
    return await prisma.authorizedDealer.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================
};
