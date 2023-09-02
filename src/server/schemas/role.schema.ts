import { gql } from "graphql-tag";

export const RoleSchema = gql`
  input CreateRoleInput {
    name: String!
    description: String!
    abilities: [Int!]!
  }

  input UpdateRoleInput {
    name: String
    description: String
  }

  type Role {
    id: Int!
    name: String!
    description: String
    createdAt: DateTime
    updatedAt: DateTime
    deleted: Boolean
    deletedAt: DateTime
    users: [User!]
    abilities: [Ability!]
  }

  type Query {
    roles(pagination: Pagination): [Role!]
    role(id: Int!): Role
  }

  type Mutation {
    createRole(data: CreateRoleInput!): Role
    updateRole(id: Int!, data: UpdateRoleInput!): Role
    deleteRole(id: Int!): Role
  }
`;
