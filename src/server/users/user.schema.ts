import { gql } from "graphql-tag";

export const UserSchema = gql`
  input CreateUserInput {
    email: String!
    name: String!
    password: String!
  }

  input UpdateUserInput {
    email: String!
    name: String!
    password: String!
  }

  type User {
    id: Int
    email: String
    name: String
    password: String
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime
    deleted: Boolean
  }

  type Query {
    users(pagination: Pagination): [User]
    user(id: Int!): User
    currentUser: User
  }

  type Mutation {
    createUser(data: CreateUserInput): User
    updateUser(id: Int!, data: UpdateUserInput): User
    deleteUser(id: Int!): User
  }
`;
