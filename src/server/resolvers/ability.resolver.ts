import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { Ability } from "@prisma/client";
import {
  validateData,
  CreateAbilityValidator,
  UpdateAbilityValidator,
} from "@/validations";
import { AbilityService } from "../services";

//
// Resolver for Ability model
//
export const AbilityResolver = {
  Query: {
    abilitys: async (_: any, { pagination }: Args, __: IGraphqlContext) => {
      return await AbilityService.abilitys(pagination);
    },

    ability: async (_: any, { id }: { id: number }, __: IGraphqlContext) => {
      return await AbilityService.ability(id);
    },
  },

  Mutation: {
    createAbility: async (
      _: any,
      { data }: { data: Ability },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreateAbilityValidator, data });
      return await AbilityService.createAbility(data);
    },

    updateAbility: async (
      _: any,
      { id, data }: { id: number; data: Ability },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateAbilityValidator, data });
      return AbilityService.updateAbility(id, data);
    },

    deleteAbility: async (
      _: any,
      { id }: { id: number },
      __: IGraphqlContext
    ) => {
      return await AbilityService.deleteAbility(id);
    },
  },
};
