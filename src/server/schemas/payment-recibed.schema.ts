import { gql } from "graphql-tag";
export const PaymentRecibedSchema = gql`
  input CreatePaymentRecibedInput {
    payment_date: DateTime!
    payment_amount: Decimal!
    is_confirmed: Boolean!
    is_refunded: Boolean!
    authorized_dealerId: Int
  }

  input UpdatePaymentRecibedInput {
    payment_date: DateTime
    payment_amount: Decimal
    is_confirmed: Boolean
    is_refunded: Boolean
    authorized_dealerId: Int
  }

  type PaymentRecibed {
    id: Int!
    payment_date: DateTime!
    payment_amount: Decimal!
    is_confirmed: Boolean!
    is_refunded: Boolean!
    authorized_dealerId: Int
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    authorized_dealer: UserClient
  }

  type Query {
    paymentRecibeds(pagination: Pagination): [PaymentRecibed!]!
    paymentRecibed(id: Int!): PaymentRecibed!
  }

  type Mutation {
    createPaymentRecibed(data: CreatePaymentRecibedInput!): PaymentRecibed!
    updatePaymentRecibed(
      id: Int!
      data: UpdatePaymentRecibedInput!
    ): PaymentRecibed!
    deletePaymentRecibed(id: Int!): PaymentRecibed!
  }
`;
