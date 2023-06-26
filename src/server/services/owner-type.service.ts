import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { OwnerType } from "@prisma/client";

//
// Service for OwnerType model
//
export const OwnerTypeService = {
  async ownerTypes(pagination?: Pagination) {
    return prisma.ownerType.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async ownerType(id: number) {
    return await prisma.ownerType.findUnique({ where: { id } });
  },

  async createOwnerType(data: OwnerType) {
    try {
      return await prisma.ownerType.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateOwnerType(id: number, data: OwnerType) {
    try {
      return await prisma.ownerType.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteOwnerType(id: number) {
    return await prisma.ownerType.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================

  async ownerTypesOfEvent(eventId: number) {
    return await prisma.ownerType.findMany({
      where: { event: { id: eventId } },
    });
  },
};
