import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { DogEntity } from "./entitys/dog.entity";

@Resolver(DogEntity)
export class DogResolver {
  @Query(() => [DogEntity])
  async dogs(): Promise<DogEntity[]> {
    return [{ name: "test" }, { name: "test2" }];
  }
}
