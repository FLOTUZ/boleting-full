import { Field, InputType } from "type-graphql";
import { UserEntity } from "../user.entity";

@InputType()
export class CreateUserInput implements Partial<UserEntity> {
  @Field(() => String, { nullable: true })
  name!: string;

  @Field(() => String, { nullable: true })
  email!: string;

  @Field(() => String, { nullable: true })
  password!: string;
}
