import { prisma } from "@/server";

import { Args } from "../common";
import { PrismaError } from "../utils";

export const OrganizationService = {
  async userOrganizations(id_user: number) {
    return await prisma.organization.findMany({
      where: { users: { some: { id: id_user } } },
    });
  },
};
