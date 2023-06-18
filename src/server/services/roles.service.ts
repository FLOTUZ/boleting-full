import { prisma } from "@/server";

import { Args } from "../common";
import { PrismaError } from "../utils";

export const RoleService = {
  async getUserRoles(id_user: number) {
    return await prisma.role.findMany({
      where: { users: { some: { id: id_user } } },
    });
  },
};
