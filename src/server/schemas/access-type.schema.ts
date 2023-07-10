import { gql } from "graphql-tag";

export const AccessTypeSchema = gql`
  input CreateAccessTypeInput {
    name: String!
    description: String
    enter_and_exit_option: Boolean
    userId: Int!
    organizationId: Int!
    eventId: Int!
  }

  input UpdateAccessTypeInput {
    name: String
    description: String
    enter_and_exit_option: Boolean
    userId: Int
    organizationId: Int
    eventId: Int
    deleted: Boolean
  }

  type AccessType {
    id: ID!
    name: String!
    description: String!
    enter_and_exit_option: Boolean!
    userId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: Boolean!
    deletedAt: DateTime
    organizationId: Int!
    eventId: Int!
    event: Event!
    tickets: [Ticket!]!
    organization: Organization!
  }

  type Query {
    accessTypes(pagination: Pagination): [AccessType!]!
    accessType(id: Int!): AccessType!
    accessTypesByEventId(eventId: Int!): [AccessType!]!
  }

  type Mutation {
    createAccessType(data: CreateAccessTypeInput!): AccessType!
    updateAccessType(id: Int!, data: UpdateAccessTypeInput!): AccessType!
    deleteAccessType(id: Int!): AccessType!
  }
`;
