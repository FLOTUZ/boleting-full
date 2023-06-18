import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { UserClient } from "@prisma/client";
import {
  validateData,
  CreateUserClientValidator,
  UpdateUserClientValidator,
} from "@/validations";
import { UserClientService } from "../services";

//
// Resolver for UserClient model
//
export const UserClientResolver = {
  Query: {
    userClients: async (_: any, { pagination }: Args, __: IGraphqlContext) => {
      return await UserClientService.userClients(pagination);
    },

    userClient: async (_: any, { id }: { id: number }, __: IGraphqlContext) => {
      return await UserClientService.userClient(id);
    },
  },

  Mutation: {
    createUserClient: async (
      _: any,
      { data }: { data: UserClient },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreateUserClientValidator, data });
      return await UserClientService.createUserClient(data);
    },

    updateUserClient: async (
      _: any,
      { id, data }: { id: number; data: UserClient },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateUserClientValidator, data });
      return UserClientService.updateUserClient(id, data);
    },

    deleteUserClient: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await UserClientService.deleteUserClient(id);
    },
  },
};
