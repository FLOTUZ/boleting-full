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
    abilities: [Int!]
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
    organizationId: Int!
    organization: Organization!
  }

  type PaginatedRole {
    pagination: PaginationResponse
    count: Int!
    data: [Role!]
  }

  type Query {
    roles(pagination: Pagination): PaginatedRole
    role(id: Int!): Role
  }

  type Mutation {
    createRole(data: CreateRoleInput!): Role
    updateRole(id: Int!, data: UpdateRoleInput!): Role
    deleteRole(id: Int!): Role
  }
`;
