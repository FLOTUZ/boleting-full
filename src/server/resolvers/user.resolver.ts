import { User } from "@prisma/client";

import {
  CreateUserSchema,
  UpdateUserSchema,
  validateData,
} from "@/validations";

import { Args, IGraphqlContext } from "../common";
import { OrganizationService, RoleService, UserService } from "../services";
import { UnauthorizedError } from "../utils";

export const UserResolver = {
  Query: {
    users: async (
      _: any,
      { pagination }: Args,
      { id_organization }: IGraphqlContext
    ) => {
      if (id_organization === null)
        throw new UnauthorizedError("Unauthorized organization");
      return await UserService.getAllUsers(pagination, id_organization!);
    },

    user: async (_: any, { id }: User, __: IGraphqlContext) => {
      return await UserService.getUserById(id);
    },

    currentUser: async (_: any, __: User, { id_user }: IGraphqlContext) => {
      if (!id_user) return null;
      return await UserService.currentUser(id_user);
    },

    availableStaff: async (
      _: any,
      { eventId }: { eventId: number },
      { id_organization }: IGraphqlContext
    ) => {
      return await UserService.availableStaff(eventId, id_organization!);
    },
  },

  Mutation: {
    createUser: async (
      _: any,
      { data }: { data: User & { roles: number[] } },
      { id_organization }: IGraphqlContext
    ) => {
      await validateData({ schema: CreateUserSchema, data });

      if (id_organization === null)
        throw new UnauthorizedError("Unauthorized organization");

      return await UserService.createUser({
        data,
        id_organization: id_organization!,
      });
    },

    updateUser: async (
      _: any,
      { id, data }: { id: number; data: User & { roles: number[] } },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateUserSchema, data });
      return await UserService.updateUser({ id, data, roles: data.roles });
    },

    deleteUser: async (_: any, { id }: User, __: IGraphqlContext) => {
      return await UserService.deleteUser(id);
    },

    assignStaff: async (
      _: any,
      { userId, eventId }: { userId: number; eventId: number },
      { id_organization }: IGraphqlContext
    ) => {
      return await UserService.assignStaff(userId, eventId, id_organization!);
    },

    assignManyStaff: async (
      _: any,
      { eventId, userIds }: { eventId: number; userIds: number[] },
      { id_organization }: IGraphqlContext
    ) => {
      return await UserService.assignManyStaff(
        eventId,
        userIds,
        id_organization!
      );
    },

    unassignStaff: async (
      _: any,
      { userId, eventId }: { userId: number; eventId: number },
      __: IGraphqlContext
    ) => {
      return await UserService.unassignStaff(userId, eventId);
    },

    unassignManyStaff: async (
      _: any,
      { eventId, userIds }: { eventId: number; userIds: number[] },
      __: IGraphqlContext
    ) => {
      return await UserService.unassignManyStaff(eventId, userIds);
    },
  },

  User: {
    roles: async ({ id }: User, _: any, __: IGraphqlContext) => {
      return await RoleService.getUserRoles(id);
    },

    organization: async ({ id }: User, _: any, __: IGraphqlContext) => {
      return await OrganizationService.userOrganizations(id);
    },
  },
};
