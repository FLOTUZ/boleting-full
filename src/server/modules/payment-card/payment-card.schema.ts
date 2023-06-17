import { gql } from "graphql-tag";
export const PaymentCardSchema = gql`
  input CreatePaymentCardInput {
    is_credit_card: Boolean!
    nick_name: String!
    owner_name: String!
    card_number: String!
    expiration_date: DateTime!
    country: String!
    is_default: Boolean!
    user_clientId: Int!
    payment_methodId: Int!
  }

  input UpdatePaymentCardInput {
    is_credit_card: Boolean
    nick_name: String
    owner_name: String
    card_number: String
    expiration_date: DateTime
    country: String
    is_default: Boolean
    user_clientId: Int
    payment_methodId: Int
  }

  type PaymentCard {
    id: Int!
    is_credit_card: Boolean!
    nick_name: String!
    owner_name: String!
    card_number: String!
    expiration_date: DateTime!
    country: String!
    is_default: Boolean!
    user_clientId: Int!
    payment_methodId: Int!
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    payment_method: PaymentMethod
    user_client: UserClient
  }

  type Query {
    paymentCards(pagination: Pagination): [PaymentCard!]!
    paymentCard(id: Int!): PaymentCard!
  }

  type Mutation {
    createPaymentCard(data: CreatePaymentCardInput!): PaymentCard!
    updatePaymentCard(id: Int!, data: UpdatePaymentCardInput!): PaymentCard!
    deletePaymentCard(id: Int!): PaymentCard!
  }
`;
