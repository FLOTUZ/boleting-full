import { Query, Arg, Mutation, Resolver } from "type-graphql";

import { UserEntity } from "./user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

import { UserService } from "./user.service";
import { Args } from "../common";

@Resolver(UserEntity)
export class UserResolver {
  service: UserService;
  constructor() {
    this.service = new UserService();
  }

  @Query(() => [UserEntity])
  async users(@Arg("args") args: Args) {
    return await this.service.findMany(args);
  }

  @Query(() => UserEntity, { nullable: true })
  async user(@Arg("id") id: number) {
    return await this.service.getUser(id);
  }

  @Mutation(() => UserEntity)
  async createUser(@Arg("data") data: CreateUserInput) {
    return await this.service.createUser(data);
  }

  @Mutation(() => UserEntity)
  async updateUser(@Arg("id") id: number, @Arg("data") data: UpdateUserInput) {
    return await this.service.updateUser(id, data);
  }

  @Mutation(() => UserEntity)
  async deleteUser(@Arg("id") id: number) {
    return await this.service.deleteUser(id);
  }
}
