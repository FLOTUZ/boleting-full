import { gql } from "graphql-tag";

export const UserSchema = gql`
  input CreateUserInput {
    email: String!
    name: String!
    password: String!
    last_name: String!
    role: [Int!]
  }

  input UpdateUserInput {
    name: String
    last_name: String
    email: String
    password: String
    role: [Int!]
  }

  type User {
    id: Int!
    name: String
    last_name: String
    email: String
    password: String
    createdAt: DateTime
    updatedAt: DateTime
    deleted: Boolean
    deletedAt: DateTime
    role: [Role!]
  }

  type Query {
    users(pagination: Pagination): [User]
    user(id: Int!): User
    currentUser: User
  }

  type Mutation {
    createUser(data: CreateUserInput!): User
    updateUser(id: Int!, data: UpdateUserInput!): User
    deleteUser(id: Int!): User
  }
`;
