import { PrismaClient } from "@prisma/client";
import { prismaRepository } from "../../server/prisma.repository";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { Args } from "../common";

export class UserService {
  private db: PrismaClient;
  constructor() {
    this.db = prismaRepository;
  }

  async findMany({ pagination }: Args) {
    return await this.db.user.findMany({
      skip: pagination?.skip,
      take: pagination?.take,
    });
  }

  async getUser(id: number) {
    return await this.db.user.findUniqueOrThrow({ where: { id } });
  }

  async createUser(data: CreateUserInput) {
    try {
      return await this.db.user.create({ data: { ...data } });
    } catch ({ message }: any) {
      throw new Error(message);
    }
  }

  async updateUser(id: number, data: UpdateUserInput) {
    return await this.db.user.update({
      data,
      where: { id },
    });
  }

  async deleteUser(id: number) {
    return await this.db.user.delete({ where: { id } });
  }
}
