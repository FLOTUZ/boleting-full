import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { Image } from "@prisma/client";

//
// Service for image model
//
export const ImageService = {
  async images(pagination?: Pagination) {
    return prisma.image.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async image(id: string) {
    return await prisma.image.findUnique({ where: { id } });
  },

  async createImage(data: Image) {
    try {
      return await prisma.image.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateImage(id: string, data: Image) {
    try {
      return await prisma.image.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteImage(id: string) {
    return await prisma.image.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================
};
