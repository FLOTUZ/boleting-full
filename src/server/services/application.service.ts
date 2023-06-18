import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { Application } from "@prisma/client";

//
// Service for Application model
//
export const ApplicationService = {
  async applications(pagination?: Pagination) {
    return prisma.application.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async application(id: number) {
    return await prisma.application.findUnique({ where: { id } });
  },

  async createApplication(data: Application) {
    try {
      return await prisma.application.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateApplication(id: number, data: Application) {
    try {
      return await prisma.application.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteApplication(id: number) {
    return await prisma.application.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================
};
