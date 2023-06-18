import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { Mail } from "@prisma/client";

//
// Service for Mail model
//
export const MailService = {
  async mails(pagination?: Pagination) {
    return prisma.mail.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async mail(id: number) {
    return await prisma.mail.findUnique({ where: { id } });
  },

  async createMail(data: Mail) {
    try {
      return await prisma.mail.create({ data: { ...data } });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async updateMail(id: number, data: Mail) {
    try {
      return await prisma.mail.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteMail(id: number) {
    return await prisma.mail.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================
};
