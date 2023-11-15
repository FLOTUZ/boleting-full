import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { Organization } from "@prisma/client";
import { OrganizationService, UserService, EventService } from "../services";

import { autorizedAbilities } from "../autorization";

export const OrganizationResolver = {
  Query: {
    organizations: async (
      _: any,
      { pagination }: Args,
      { id_user }: IGraphqlContext
    ) => {
      await autorizedAbilities({
        authorized_abilities: ["read:organizations"],
        id_user: id_user!,
      });
      return await OrganizationService.organizations(pagination);
    },

    organization: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await OrganizationService.organization(id);
    },
  },
  Mutation: {
    createOrganization: async (
      _: any,
      { data }: { data: Organization },
      __: IGraphqlContext
    ) => {
      return await OrganizationService.createOrganization(data);
    },

    updateOrganization: async (
      _: any,
      { id, data }: { id: number; data: Organization },
      __: IGraphqlContext
    ) => {
      return await OrganizationService.updateOrganization(id, data);
    },

    deleteOrganization: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await OrganizationService.deleteOrganization(id);
    },
  },

  Organization: {
    events: async ({ id }: Organization, _: any, __: IGraphqlContext) => {
      return await EventService.eventsByOrganization(id);
    },

    users: async ({ id }: Organization, _: any, __: IGraphqlContext) => {
      return await UserService.usersByOrganization(id);
    },
  },
};
