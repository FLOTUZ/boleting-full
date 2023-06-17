import { gql } from "graphql-tag";

export const BuyCartSchema = gql`
  input CreateBuyCartInput {
    user_clientId: Int!
    payment_methodId: Int!
    selled_tickets: [Int!]!
  }

  input UpdateBuyCartInput {
    total_price: Decimal
    user_clientId: Int
    is_paid: Boolean
    payment_methodId: Int
    selled_tickets: [Int!]
    deleted: Boolean
  }

  type BuyCart {
    id: ID!
    total_price: Decimal!
    user_clientId: Int!
    is_paid: Boolean!
    payment_methodId: Int!
    recibed_paymentId: Int!
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    user_client: UserClient!
    selled_tickets: [Ticket!]
    payment_method: PaymentMethod!
    recibed_payment: PaymentRecibed!
  }

  type Query {
    buyCarts(pagination: Pagination): [BuyCart!]!
    buyCart(id: ID!): BuyCart
  }

  type Mutation {
    createBuyCart(data: CreateBuyCartInput!): BuyCart!
    updateBuyCart(id: ID!, data: UpdateBuyCartInput!): BuyCart
    deleteBuyCart(id: ID!): BuyCart
  }
`;
