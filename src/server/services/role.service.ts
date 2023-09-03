import { prisma } from "@/server";
import { Role } from "@prisma/client";

import { Pagination } from "../common";
import { PrismaError } from "../utils";

export const RoleService = {
  async roles(pagination?: Pagination) {
    const page = pagination?.skip! / pagination?.take! + 1;

    const [count, data] = await Promise.all([
      prisma.role.count(),
      prisma.role.findMany({
        skip: pagination?.skip,
        take: pagination?.take,
        orderBy: {
          id: "asc",
        },
      }),
    ]);

    const pages = Math.ceil(count / pagination?.take!);
    const nextPage = pagination?.skip! + pagination?.take!;
    const prevPage = pagination?.skip! - pagination?.take!;

    return {
      pagination: {
        take: pagination?.take,
        skip: pagination?.skip,
        nextPage: nextPage < count ? nextPage : null,
        prevPage: prevPage >= 0 ? prevPage : null,
        pages,
        count,
      },
      count,
      data,
    };
  },

  async role(id: number) {
    return await prisma.role.findUnique({ where: { id } });
  },

  async createRole(data: Role & { abilities: number[] }) {
    try {
      return await prisma.role.create({
        data: {
          ...data,
          abilities: {
            connect: data.abilities.map((id) => ({ id })),
          },
        },
      });
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
