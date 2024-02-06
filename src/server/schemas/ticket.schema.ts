import { gql } from "graphql-tag";
export const TicketSchema = gql`
  input CreateTicketInput {
    note: String
    serial_number: String!
    is_used: Boolean
    eventId: Int!
    access_typeId: Int
    order_id: Int
  }

  input CreateCourtessyTicketInput {
    note: String!
    eventId: Int!
    access_typeId: Int!
  }

  input UpdateTicketInput {
    note: String
    serial_number: String
    is_used: Boolean
    eventId: Int
    access_typeId: Int
    order_id: Int
  }

  type Ticket {
    id: Int!
    note: String
    serial_number: String!
    is_used: Boolean!
    eventId: Int!
    access_typeId: Int
    order_id: Int!
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    event: Event!
    access_type: AccessType
    order: Order
  }

  type Query {
    ticket(id: Int!): Ticket
    tickets(pagination: Pagination): [Ticket!]
    courtecy_tickets(eventId: Int!, pagination: Pagination): [Ticket!]
    courtecy_ticket(id: Int!): Ticket
    selled_tickets_by_event(event_id: Int!, pagination: Pagination): [Ticket!]
  }

  type Mutation {
    createTicket(input: CreateTicketInput!): Ticket
    createCourtesyTicket(data: CreateCourtessyTicketInput!): Ticket
    updateTicket(id: Int!, data: UpdateTicketInput!): Ticket
    deleteTicket(id: Int!): Ticket
  }
`;
