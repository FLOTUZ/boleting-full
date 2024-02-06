import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { AccessType } from "@prisma/client";

//
// Service for AccessType model
//
export const AccessTypeService = {
  async accessTypes(pagination?: Pagination, eventId?: number) {
    return prisma.accessType.findMany({
      ...pagination,
      where: { deleted: false, eventId },
      orderBy: { id: "asc" },
    });
  },

  async accessType(id: number) {
    return await prisma.accessType.findUnique({ where: { id } });
  },

  async courtesyAccessTypes(eventId: number) {
    return await prisma.accessType.findMany({
      where: { eventId, is_courtesy: true },
      orderBy: { id: "asc" },
    });
  },

  async createAccessType(data: AccessType) {
    try {
      return await prisma.accessType.create({
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateAccessType(id: number, data: AccessType) {
    try {
      return await prisma.accessType.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteAccessType(id: number) {
    return await prisma.accessType.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================

  async accessTypesByEventId(eventId: number) {
    return await prisma.accessType.findMany({
      where: { event: { id: eventId } },
      orderBy: { id: "asc" },
    });
  },
};
