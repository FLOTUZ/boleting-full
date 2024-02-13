import { gql } from "graphql-tag";

export const OrderSchema = gql`
  input CreateOpenVenueOrderInput {
    eventId: Int!
    buyed_access_count: Int!
    access_typeId: Int!
    payment_methodId: Int
  }

  input UpdateOrderInput {
    total_price: Decimal
    user_clientId: Int
    is_paid: Boolean
    buyed_access_count: Int
    payment_methodId: Int
    access_typeId: Int
    selled_tickets: [Int!]
    deleted: Boolean
  }

  type Order {
    id: Int!
    individual_price: Decimal
    total_price: Decimal!
    user_clientId: Int!
    is_paid: Boolean!
    payment_methodId: Int
    authorized_dealerId: Int
    buyed_access_count: Int!
    eventId: Int
    access_typeId: Int
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    event: Event
    user_client: UserClient!
    selled_tickets: [Ticket!]
    payment_method: PaymentMethod
    autorized_dealer: AuthorizedDealer
    access_type: AccessType
  }

  type Query {
    orders(pagination: Pagination): [Order!]!
    order(id: Int!): Order
    createOpenVenueOrder(data: CreateOpenVenueOrderInput!): String!
  }

  type Mutation {
    updateOrder(id: ID!, data: UpdateOrderInput!): Order
    deleteOrder(id: ID!): Order
  }
`;
