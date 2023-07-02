import { User } from "@prisma/client";

import {
  CreateUserSchema,
  UpdateRoleSchema,
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

    currentUser: async (_: any, __: User, { id_user }: IGraphqlContext) => {
      if (!id_user) return null;
      return await UserService.currentUser(id_user);
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

      return await UserService.createUser({ data, id_organization });
    },

    updateUser: async (
      _: any,
      { id, data }: { id: number; data: User },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateRoleSchema, data });
      return await UserService.updateUser({ id, data });
    },

    deleteUser: async (_: any, { id }: User, __: IGraphqlContext) => {
      return await UserService.deleteUser(id);
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
