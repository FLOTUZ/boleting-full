import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { Mail } from "@prisma/client";
import {
  validateData,
  CreateMailValidator,
  UpdateMailValidator,
} from "@/validations";
import { MailService } from "../services";

//
// Resolver for Mail model
//
export const MailResolver = {
  Query: {
    mails: async (_: any, { pagination }: Args, __: IGraphqlContext) => {
      return await MailService.mails(pagination);
    },

    mail: async (_: any, { id }: { id: number }, __: IGraphqlContext) => {
      return await MailService.mail(id);
    },
  },
  Mutation: {
    createMail: async (
      _: any,
      { data }: { data: Mail },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreateMailValidator, data });
      return await MailService.createMail(data);
    },

    updateMail: async (
      _: any,
      { id, data }: { id: number; data: Mail },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateMailValidator, data });
      return MailService.updateMail(id, data);
    },

    deleteMail: async (_: any, { id }: { id: number }, __: IGraphqlContext) => {
      return await MailService.deleteMail(id);
    },
  },
};
