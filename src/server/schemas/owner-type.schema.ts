import { gql } from "graphql-tag";

export const OwnerTypeSchema = gql`
  input CreateOwnerTypeInput {
    name: String!
    description: String
    eventId: Int!
  }

  input UpdateOwnerTypeInput {
    name: String
    description: String
    eventId: Int
    deleted: Boolean
  }

  type OwnerType {
    id: ID!
    name: String!
    description: String
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    organizationId: Int!
    eventId: Int!
    event: Event!
    tickets: [Ticket!]
  }

  type Query {
    ownerTypes(pagination: Pagination): [OwnerType!]!
    ownerType(id: Int!): OwnerType
    ownerTypeByEvent(eventId: Int!): [OwnerType!]!
  }

  type Mutation {
    createOwnerType(data: CreateOwnerTypeInput!): OwnerType!
    updateOwnerType(id: Int!, data: UpdateOwnerTypeInput!): OwnerType
    deleteOwnerType(id: Int!): OwnerType
  }
`;
