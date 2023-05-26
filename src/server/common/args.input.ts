import { Field, InputType } from "type-graphql";

@InputType()
export class Args {
  @Field(() => PaginationInput, { nullable: true })
  pagination: PaginationInput;
}

@InputType()
export class PaginationInput {
  @Field({ nullable: true })
  skip: number;

  @Field({ nullable: true })
  take: number;
}
