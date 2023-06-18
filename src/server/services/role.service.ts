import { prisma } from "@/server";
import { Role } from "@prisma/client";

import { Pagination } from "../common";
import { PrismaError } from "../utils";

export const RoleService = {
  async roles(pagination?: Pagination) {
    return prisma.role.findMany({
      take: pagination?.take || 10,
      skip: pagination?.skip,
      orderBy: {
        id: "asc",
      },
    });
  },

  async role(id: number) {
    return await prisma.role.findUnique({ where: { id } });
  },

  async createRole(data: Role) {
    try {
      return await prisma.role.create({ data });
    } catch (error: any) {
      throw PrismaError.handle(error);
    }
  },

  async updateRole(id: number, data: Role) {
    try {
      return await prisma.role.update({ where: { id }, data });
    } catch (error: any) {
      console.error(error);
      throw PrismaError.handle(error);
    }
  },

  async deleteRole(id: number) {
    return await prisma.role.delete({ where: { id } });
  },

  // ============================================================

  async getUserRoles(id_user: number) {
    return await prisma.role.findMany({
      where: { users: { some: { id: id_user } } },
    });
  },
};
