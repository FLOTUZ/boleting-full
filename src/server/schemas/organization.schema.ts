import { gql } from "graphql-tag";

export const OrganizationSchema = gql`
  input CreateOrganizationInput {
    name: String!
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
    events: [Event!]
    users: [User!]
    roles: [Role!]
    current_events_count: Int
  }

  type Query {
    organizations(pagination: Pagination): [Organization]
    organization(id: Int!): Organization
    searchOrganizations(query: String!, pagination: Pagination): [Organization]
  }

  type Mutation {
    createOrganization(data: CreateOrganizationInput!): Organization
    updateOrganization(id: Int!, data: UpdateOrganizationInput!): Organization
    deleteOrganization(id: Int!): Organization
  }
`;
