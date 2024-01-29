import { gql } from "graphql-tag";
export const PaymentMethodSchema = gql`
  input CreatePaymentMethodInput {
    payment_type: String!
    description: String
    payment_reference: String
  }

  input UpdatePaymentMethodInput {
    payment_type: String
    description: String
    payment_reference: String
  }

  type PaymentMethod {
    id: Int!
    payment_type: String!
    description: String
    payment_reference: String
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    payment_card: PaymentCard
    orders: [Order!]
  }

  type Query {
    paymentMethods(pagination: Pagination): [PaymentMethod!]!
    paymentMethod(id: Int!): PaymentMethod!
  }

  type Mutation {
    createPaymentMethod(data: CreatePaymentMethodInput!): PaymentMethod!
    updatePaymentMethod(
      id: Int!
      data: UpdatePaymentMethodInput!
    ): PaymentMethod!
    deletePaymentMethod(id: Int!): PaymentMethod!
  }
`;
