import { gql } from "graphql-tag";

export const OrganizationSchema = gql`
  input CreateOrganizationInput {
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: Boolean!
    deletedAt: DateTime!
    events: [Int!]
    users: [Int!]
  }

  input UpdateOrganizationInput {
    name: String
    createdAt: DateTime
    updatedAt: DateTime
    deleted: Boolean
    deletedAt: DateTime
    events: [Int!]
    users: [Int!]
  }

  type Organization {
    id: ID!
    name: String
    createdAt: DateTime
    updatedAt: DateTime
    deleted: Boolean
    deletedAt: DateTime
    events: Event
    users: User
  }

  type Query {
    organizations(pagination: Pagination): [Organization]
    organization(id: Int!): Organization
  }

  type Mutation {
    createOrganization(data: CreateOrganizationInput!): Organization
    updateOrganization(id: Int!, data: UpdateOrganizationInput!): Organization
    deleteOrganization(id: Int!): Organization
  }
`;
