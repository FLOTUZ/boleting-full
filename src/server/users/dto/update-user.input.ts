import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  password: string;
}
