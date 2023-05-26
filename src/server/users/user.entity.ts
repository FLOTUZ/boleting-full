import { User } from "@prisma/client";
import { Field, ID, InterfaceType, ObjectType } from "type-graphql";

@ObjectType()
export class UserEntity implements User {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => Date, { description: "Role created at" })
  createdAt: Date;

  @Field(() => String, { description: "Role updated at" })
  updatedAt: Date;

  @Field(() => Boolean, { description: "Role is deleted" })
  deleted: boolean;

  @Field(() => Date, { description: "Role deleted at", nullable: true })
  deletedAt: Date | null;

  constructor(init: Partial<User>) {
    Object.assign(this, init);
  }
}
