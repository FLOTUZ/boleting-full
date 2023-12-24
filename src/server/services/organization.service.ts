import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { Organization } from "@prisma/client";

//
// Service for organization model
//
export const OrganizationService = {
  async organizations(pagination?: Pagination) {
    return prisma.organization.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async organization(id: number) {
    return await prisma.organization.findUnique({ where: { id } });
  },

  async createOrganization(data: Organization) {
    try {
      return await prisma.organization.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateOrganization(id: number, data: Organization) {
    try {
      return await prisma.organization.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteOrganization(id: number) {
    return await prisma.organization.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================

  async userOrganizations(id_user: number) {
    return await prisma.organization.findMany({
      where: { users: { some: { id: id_user } } },
    });
  },

  async searchOrganizations(query: string, pagination?: Pagination) {
    return prisma.organization.findMany({
      ...pagination,
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          {
            events: {
              some: { name: { contains: query, mode: "insensitive" } },
            },
          },
        ],
      },
    });
  },
};
