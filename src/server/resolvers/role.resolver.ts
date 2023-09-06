import { Args, IGraphqlContext, PaginatedList } from "@/server/common";
import { Role } from "@prisma/client";
import {
  CreateRoleSchema,
  UpdateRoleSchema,
  validateData,
} from "@/validations";
import {
  AbilityService,
  OrganizationService,
  RoleService,
  UserService,
} from "../services";

export const RolesResolver = {
  Query: {
    roles: async (
      _: any,
      { pagination }: Args,
      { id_organization }: IGraphqlContext
    ) => {
      return (await RoleService.roles(
        pagination,
        id_organization!
      )) as PaginatedList<Role>;
    },

    role: async (_: any, { id }: { id: number }, __: IGraphqlContext) => {
      return await RoleService.role(id);
    },
  },

  Mutation: {
    createRole: async (
      _: any,
      { data }: { data: Role & { abilities: number[] } },
      { id_organization }: IGraphqlContext
    ) => {
      await validateData({ schema: CreateRoleSchema, data });
      return await RoleService.createRole(data, id_organization!);
    },

    updateRole: async (
      _: any,
      { id, data }: { id: number; data: Role & { abilities: number[] } },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateRoleSchema, data });
      return await RoleService.updateRole(id, data);
    },

    deleteRole: async (_: any, { id }: { id: number }, __: IGraphqlContext) => {
      return await RoleService.deleteRole(id);
    },

    removeUsersFromRole: async (
      _: any,
      { id, userIds }: { id: number; userIds: number[] },
      __: IGraphqlContext
    ) => {
      return await RoleService.removeUsersFromRole(id, userIds);
    },
  },

  Role: {
    users: async ({ id }: Role, _: any, __: IGraphqlContext) => {
      return await UserService.usersByRole(id);
    },
    abilities: async ({ id }: Role, _: any, __: IGraphqlContext) => {
      return await AbilityService.abilitiesByRole(id);
    },
    organization: async (
      { organizationId }: Role,
      _: any,
      __: IGraphqlContext
    ) => {
      return await OrganizationService.organization(organizationId);
    },
  },
};
