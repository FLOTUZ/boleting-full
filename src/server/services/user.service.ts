import * as argon2 from "argon2";
import { prisma } from "@/server";
import { User } from "@prisma/client";

import { Pagination } from "../common";
import { NotFoundError, PrismaError, UnauthorizedError } from "../utils";

export const UserService = {
  async getAllUsers(pagination?: Pagination, id_organization?: number) {
    return await prisma.user.findMany({
      ...pagination,
      where: { deleted: false, organizationId: id_organization },
    });
  },

  async getUserById(id: number) {
    return await prisma.user.findUnique({ where: { id } });
  },

  async currentUser(id_user: number) {
    return await prisma.user.findUniqueOrThrow({ where: { id: id_user } });
  },

  async createUser({
    data,
    id_organization,
  }: {
    data: User & { roles: number[] };
    id_organization: number;
  }) {
    try {
      const hash = await argon2.hash(data.password);
      return await prisma.user.create({
        data: {
          ...data,
          password: hash,
          organizationId: id_organization!,
          roles: {
            connect: data.roles?.map((id) => ({ id })),
          },
        },
      });
    } catch (error: any) {
      console.error(error);
      throw PrismaError.handle(error);
    }
  },

  async updateUser({ id, data }: { id: number; data: User }) {
    return await prisma.user.update({ where: { id }, data });
  },

  async deleteUser(id: number) {
    try {
      return await prisma.user.delete({ where: { id } });
    } catch (error: any) {
      throw PrismaError.handle(error);
    }
  },

  async assignStaff(userId: number, eventId: number, organizationId: number) {
    const users = await prisma.user.findUnique({
      where: { id: userId },
      include: { organization: true },
    });

    // Check if user to assign exists
    if (!users) throw new NotFoundError("User to assign not found");

    // Check if user belongs to organization of event
    if (users.organizationId !== organizationId) {
      throw new UnauthorizedError(
        "This user does not belong to organization of event"
      );
    }

    // Check if user to assign belongs to the same organization
    if (users.organizationId !== organizationId) {
      throw new UnauthorizedError(
        "No permission to assign staff to this organization"
      );
    }

    return await prisma.user.update({
      where: { id: userId },
      data: { staff_of_events: { connect: { id: eventId } } },
    });
  },

  async assignManyStaff(
    eventId: number,
    userIds: number[],
    organizationId: number
  ) {
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      include: { organization: true },
    });

    // Check if all users in list to assign exist
    if (users.length !== userIds.length)
      throw new NotFoundError("Some user in list to assign not found");

    // Check if all users in list to assign belong to the same organization
    if (users.some((u) => u.organizationId !== organizationId)) {
      throw new UnauthorizedError(
        "No permission to assign staff to this organization"
      );
    }

    // Assign staff to event
    const assignedUsers: Promise<User>[] = userIds.map(async (userId) => {
      return await prisma.user.update({
        where: { id: userId },
        data: { staff_of_events: { connect: { id: eventId } } },
      });
    });

    return await Promise.all(assignedUsers);
  },

  async unassignStaff(userId: number, eventId: number) {
    return await prisma.user.update({
      where: { id: userId },
      data: { staff_of_events: { disconnect: { id: eventId } } },
    });
  },

  async unassignManyStaff(eventId: number, userIds: number[]) {
    const result: Promise<User>[] = userIds.map(
      async (userId) =>
        await prisma.user.update({
          where: { id: userId },
          data: { staff_of_events: { disconnect: { id: eventId } } },
        })
    );

    return await Promise.all(result);
  },

  // ============================================================

  async findUserByEmail(email: string) {
    try {
      return await prisma.user.findUnique({
        where: { email: email },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async usersByRole(role_id: number) {
    return await prisma.user.findMany({
      where: { roles: { some: { id: role_id } } },
    });
  },

  async usersByOrganization(id_organization: number) {
    return await prisma.user.findMany({
      where: { organizationId: id_organization },
    });
  },

  async staffByEvent(id_event: number) {
    return await prisma.user.findMany({
      where: { staff_of_events: { some: { id: id_event } } },
    });
  },
};
