import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { Ability } from "@prisma/client";

//
// Service for Ability model
//
export const AbilityService = {
  async abilitys(pagination?: Pagination) {
    return prisma.ability.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async ability(id: number) {
    return await prisma.ability.findUnique({ where: { id } });
  },

  async createAbility(data: Ability) {
    try {
      return await prisma.ability.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateAbility(id: number, data: Ability) {
    try {
      return await prisma.ability.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteAbility(id: number) {
    return await prisma.ability.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================

  async abilitiesByRole(roleId: number) {
    return await prisma.ability.findMany({
      where: { role: { some: { id: roleId } } },
    });
  },
};
