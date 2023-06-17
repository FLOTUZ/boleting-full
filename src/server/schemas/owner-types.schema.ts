import { gql } from "graphql-tag";

export const OwnerTypeSchema = gql`
  input CreateOwnerTypeInput {
    name: String!
    description: String
    userId: Int!
    eventId: Int!
    organizationId: Int!
  }

  input UpdateOwnerTypeInput {
    name: String
    description: String
    userId: Int
    eventId: Int
    organizationId: Int
    deleted: Boolean
  }

  type OwnerType {
    id: ID!
    name: String!
    description: String
    userId: Int!
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    organizationId: Int!
    eventId: Int!
    event: Event!
    organization: Organization!
    tickets: [Ticket!]
  }

  type Query {
    ownerTypes(pagination: Pagination): [OwnerType!]!
    ownerType(id: ID!): OwnerType
  }

  type Mutation {
    createOwnerType(data: CreateOwnerTypeInput!): OwnerType!
    updateOwnerType(id: ID!, data: UpdateOwnerTypeInput!): OwnerType
    deleteOwnerType(id: ID!): OwnerType
  }
`;
