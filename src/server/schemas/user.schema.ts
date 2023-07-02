import { gql } from "graphql-tag";

export const UserSchema = gql`
  input CreateUserInput {
    email: String!
    name: String!
    password: String!
    last_name: String!
    roles: [Int!]
  }

  input UpdateUserInput {
    name: String
    last_name: String
    email: String
    password: String
    roles: [Int!]
  }

  type User {
    id: Int!
    name: String
    last_name: String
    email: String
    createdAt: DateTime
    updatedAt: DateTime
    deleted: Boolean
    deletedAt: DateTime
    roles: [Role!]
    organization: Organization
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
    # Staff assignment
    assignStaff(userId: Int!, eventId: Int!): User
    assignManyStaff(eventId: Int!, userIds: [Int!]!): [User]
    unassignStaff(userId: Int!, eventId: Int!): User
    unassignManyStaff(eventId: Int!, userIds: [Int!]!): [User]
  }
`;
