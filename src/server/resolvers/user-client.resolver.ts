import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { UserClient } from "@prisma/client";
import {
  validateData,
  CreateUserClientValidator,
  UpdateUserClientValidator,
} from "@/validations";
import { OrderService, UserClientService } from "../services";
import { AuthenticationError } from "../utils";

//
// Resolver for UserClient model
//
export const UserClientResolver = {
  Query: {
    userClientIsAuthenticated: async (
      _: any,
      __: any,
      { id_user }: IGraphqlContext
    ) => {
      return id_user !== null;
    },
    userClients: async (_: any, { pagination }: Args, __: IGraphqlContext) => {
      return await UserClientService.userClients(pagination);
    },

    userClient: async (
      _: any,
      { id }: { id: number },
      { id_user }: IGraphqlContext
    ) => {
      if (id_user === null) throw new AuthenticationError();
      return await UserClientService.userClient(id);
    },

    currentClientOrders: async (
      _: any,
      __: any,
      { id_user }: IGraphqlContext
    ) => {
      if (id_user === null) throw new AuthenticationError();
      return await OrderService.currentClientOrders(id_user!);
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
