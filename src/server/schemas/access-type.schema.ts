import { gql } from "graphql-tag";

export const AccessTypeSchema = gql`
  input CreateAccessTypeInput {
    name: String!
    description: String
    enter_and_exit_option: Boolean
    price: Decimal!
    eventId: Int!
  }

  input UpdateAccessTypeInput {
    name: String
    description: String
    enter_and_exit_option: Boolean
    price: Decimal
    available_tickets_count: Int
    deleted: Boolean
  }

  type AccessType {
    id: Int!
    name: String!
    description: String
    enter_and_exit_option: Boolean!
    price: Decimal!
    available_tickets_count: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: Boolean!
    deletedAt: DateTime
    eventId: Int!
    event: Event!
    tickets: [Ticket!]!
    orders: [Order!]!
  }

  type Query {
    accessTypes(pagination: Pagination): [AccessType!]!
    accessType(id: Int!): AccessType!
    accessTypesByEventId(eventId: Int!): [AccessType!]!
    courtesyAccessTypes(eventId: Int!): [AccessType!]!
  }

  type Mutation {
    createAccessType(data: CreateAccessTypeInput!): AccessType!
    updateAccessType(id: Int!, data: UpdateAccessTypeInput!): AccessType!
    deleteAccessType(id: Int!): AccessType!
  }
`;
