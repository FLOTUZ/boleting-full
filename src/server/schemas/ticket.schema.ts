import { gql } from "graphql-tag";
export const TicketSchema = gql`
  input CreateTicketInput {
    note: String
    serial_number: String!
    price: Decimal!
    is_paid: Boolean!
    is_used: Boolean
    service_charge: Decimal!
    eventId: Int!
    access_typeId: Int
    owner_typeId: Int
    buy_cartId: Int!
  }

  input UpdateTicketInput {
    note: String
    serial_number: String
    price: Decimal
    is_paid: Boolean
    is_used: Boolean
    service_charge: Decimal
    eventId: Int
    access_typeId: Int
    owner_typeId: Int
    buy_cartId: Int
  }

  type Ticket {
    id: Int!
    note: String
    serial_number: String!
    price: Decimal!
    is_paid: Boolean!
    is_used: Boolean
    service_charge: Decimal!
    eventId: Int!
    access_typeId: Int
    owner_typeId: Int
    buy_cartId: Int!
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    event: Event!
    access_type: AccessType
    ticket_type: OwnerType
    buy_cart: BuyCart!
  }

  type Query {
    ticket(id: Int!): Ticket
    tickets(pagination: Pagination): [Ticket!]
    selled_tickets_by_event(event_id: Int!, pagination: Pagination): [Ticket!]
  }

  type Mutation {
    createTicket(input: CreateTicketInput!): Ticket
    updateTicket(id: Int!, data: UpdateTicketInput!): Ticket
    deleteTicket(id: Int!): Ticket
  }
`;
