import { gql } from "graphql-tag";

export const OrderSchema = gql`
  input CreateOrderInput {
    user_clientId: Int!
    payment_methodId: Int!
    selled_tickets: [Int!]!
  }

  input UpdateOrderInput {
    total_price: Decimal
    user_clientId: Int
    is_paid: Boolean
    payment_methodId: Int
    selled_tickets: [Int!]
    deleted: Boolean
  }

  type Order {
    id: ID!
    total_price: Decimal!
    user_clientId: Int!
    is_paid: Boolean!
    payment_methodId: Int!
    authorized_dealerId: Int
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    user_client: UserClient!
    selled_tickets: [Ticket!]
    payment_method: PaymentMethod!
    autorized_dealer: AuthorizedDealer
  }

  type Query {
    orders(pagination: Pagination): [Order!]!
    order(id: ID!): Order
  }

  type Mutation {
    createOrder(data: CreateOrderInput!): Order!
    updateOrder(id: ID!, data: UpdateOrderInput!): Order
    deleteOrder(id: ID!): Order
  }
`;
