import { IGraphqlContext } from "@/server";
import { Args } from "@/server/common";
import { Image } from "@prisma/client";
import {
  validateData,
  CreateImageValidator,
  UpdateImageValidator,
} from "@/validations";
import { ImageService } from "../services";

//
// Resolver for Image model
//
export const ImageResolver = {
  Query: {
    images: async (_: any, { pagination }: Args, __: IGraphqlContext) => {
      return await ImageService.images(pagination);
    },

    image: async (_: any, { id }: { id: string }, __: IGraphqlContext) => {
      return await ImageService.image(id);
    },
  },

  Mutation: {
    createImage: async (
      _: any,
      { data }: { data: Image },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: CreateImageValidator, data });
      return await ImageService.createImage(data);
    },

    updateImage: async (
      _: any,
      { id, data }: { id: string; data: Image },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateImageValidator, data });
      return ImageService.updateImage(id, data);
    },

    deleteImage: async (
      _: any,
      { id }: { id: string },
      __: IGraphqlContext
    ) => {
      return await ImageService.deleteImage(id);
    },
  },
};
