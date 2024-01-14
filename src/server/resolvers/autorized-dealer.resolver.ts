import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { AuthorizedDealer } from "@prisma/client";
import {
  validateData,
  CreateAuthorizedDealerValidator,
  UpdateAuthorizedDealerValidator,
} from "@/validations";
import { AuthorizedDealerService } from "../services";

//
// Resolver for AutorizedDealer model
//
export const AuthorizedDealerResolver = {
  Query: {
    authorizedDealers: async (
      _: any,
      { pagination }: Args,
      __: IGraphqlContext
    ) => {
      return await AuthorizedDealerService.authorizedDealers(pagination);
    },

    authorizedDealer: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await AuthorizedDealerService.authorizedDealer(id);
    },
  },

  Mutation: {
    createAuthorizedDealer: async (
      _: any,
      { data }: { data: AuthorizedDealer },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreateAuthorizedDealerValidator, data });
      return await AuthorizedDealerService.createAuthorizedDealer(data);
    },

    updateAuthorizedDealer: async (
      _: any,
      { id, data }: { id: number; data: AuthorizedDealer },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateAuthorizedDealerValidator, data });
      return AuthorizedDealerService.updateAuthorizedDealer(id, data);
    },

    deleteAuthorizedDealer: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await AuthorizedDealerService.deleteAuthorizedDealer(id);
    },
  },
};
