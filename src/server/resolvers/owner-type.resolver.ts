import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { OwnerType } from "@prisma/client";
import {
  validateData,
  CreateOwnerTypeValidator,
  UpdateOwnerTypeValidator,
} from "@/validations";
import { OwnerTypeService } from "../services";

//
// Resolver for OwnerType model
//
export const OwnerTypeResolver = {
  Query: {
    ownerTypes: async (_: any, { pagination }: Args, __: IGraphqlContext) => {
      return await OwnerTypeService.ownerTypes(pagination);
    },

    ownerType: async (_: any, { id }: { id: number }, __: IGraphqlContext) => {
      return await OwnerTypeService.ownerType(id);
    },
  },

  Mutation: {
    createOwnerType: async (
      _: any,
      { data }: { data: OwnerType },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreateOwnerTypeValidator, data });
      return await OwnerTypeService.createOwnerType(data);
    },

    updateOwnerType: async (
      _: any,
      { id, data }: { id: number; data: OwnerType },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateOwnerTypeValidator, data });
      return OwnerTypeService.updateOwnerType(id, data);
    },

    deleteOwnerType: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await OwnerTypeService.deleteOwnerType(id);
    },
  },
};
