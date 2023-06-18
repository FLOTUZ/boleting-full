import { Args, IGraphqlContext } from "@/server/common";
import { Role } from "@prisma/client";
import {
  CreateRoleSchema,
  UpdateRoleSchema,
  validateData,
} from "@/validations";
import { RoleService, UserService } from "../services";

export const RolesResolver = {
  Query: {
    roles: async (_: any, { pagination }: Args, __: IGraphqlContext) => {
      return await RoleService.roles(pagination);
    },

    role: async (_: any, { id }: { id: number }, __: IGraphqlContext) => {
      return await RoleService.role(id);
    },
  },

  Mutation: {
    createRole: async (
      _: any,
      { data }: { data: Role },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreateRoleSchema, data });
      await RoleService.createRole(data);
    },

    updateRole: async (
      _: any,
      { id, data }: { id: number; data: Role },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateRoleSchema, data });
      await RoleService.updateRole(id, data);
    },

    deleteRole: async (_: any, { id }: { id: number }, __: IGraphqlContext) => {
      return await RoleService.deleteRole(id);
    },
  },

  Role: {
    users: async ({ id }: Role, _: any, __: IGraphqlContext) => {
      return await UserService.usersByRole(id);
    },
  },
};
