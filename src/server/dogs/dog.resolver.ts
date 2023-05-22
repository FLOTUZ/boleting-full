import { Resolver, Query } from "type-graphql";
import { DogEntity } from "./entitys/dog.entity";

@Resolver(DogEntity)
export class DogResolver {
  @Query(() => [DogEntity])
  async dogs() {
    return [{ name: "test" }, { name: "test2" }];
  }
}
