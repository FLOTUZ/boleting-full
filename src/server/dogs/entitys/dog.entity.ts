import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class DogEntity {
  @Field(() => ID)
  name?: string;
}
